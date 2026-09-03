/*
 * Regenerates src/components/wordmarkGeometry.ts.
 *
 * The entry loader reveals its wordmark the way the rest of the camera is
 * revealed: the letterforms trace themselves on with stroke-dashoffset and
 * then ink in. That needs real path geometry — SVG <text> has no measurable
 * length, and dash behaviour on text differs between engines — so this script
 * lifts the glyph outlines for the lockup straight out of the TTF and bakes
 * them into viewBox coordinates.
 *
 * Run with:  node scripts/build-wordmark.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";

const FONT = "src/handletteryean-nafiri/NafiriNafiriRegular-4BBnK.ttf";
const OUT = "src/components/wordmarkGeometry.ts";

/*
 * The lockup. This script is the only place these live — nothing downstream
 * re-derives them, so changing a value here and re-running is the whole edit.
 *
 * CENTER_X/BASELINE_Y sit the engraving in the clear plate that runs from the
 * left dial (x 646) to the shutter release ring (x 1065.5); FONT_SIZE is set so
 * the lockup fits that span with room on both sides.
 */
const FONT_SIZE = 31;
const LEAD_SCALE = 1.25;
const CENTER_X = 860;
const BASELINE_Y = 541;

const LEAD = "M";
const REST = "AGICAL EYES";

/*
 * Nafiri's space is 0.34em, but its capitals are drawn to overlap their
 * advances, so at this size the L and the E close the gap and the lockup reads
 * as one word. This widens the word space back to a legible gap; it costs ~12
 * units of the ~420 clear plate, which the lockup has to spare.
 */
const WORD_SPACE_EM = 0.4;

/* ------------------------------------------------------------------ tables */

function parseFont(path) {
  const buf = readFileSync(path);
  const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const tables = {};
  for (let i = 0, n = dv.getUint16(4); i < n; i++) {
    const o = 12 + 16 * i;
    tables[buf.toString("latin1", o, o + 4)] = dv.getUint32(o + 8);
  }

  const unitsPerEm = dv.getUint16(tables.head + 18);
  const longLoca = dv.getInt16(tables.head + 50) !== 0;
  const numGlyphs = dv.getUint16(tables.maxp + 4);

  const loca = [];
  for (let i = 0; i <= numGlyphs; i++) {
    loca.push(
      longLoca
        ? dv.getUint32(tables.loca + 4 * i)
        : dv.getUint16(tables.loca + 2 * i) * 2,
    );
  }

  const advance = [];
  for (let i = 0, n = dv.getUint16(tables.hhea + 34); i < n; i++) {
    advance.push(dv.getUint16(tables.hmtx + 4 * i));
  }

  return {
    dv,
    tables,
    unitsPerEm,
    loca,
    advance,
    cmap: parseCmap(dv, tables.cmap),
  };
}

/** Unicode BMP subtable only — the lockup is plain Latin capitals. */
function parseCmap(dv, cmapOff) {
  let fallback = null;
  for (let i = 0, n = dv.getUint16(cmapOff + 2); i < n; i++) {
    const p = cmapOff + 4 + 8 * i;
    const platform = dv.getUint16(p);
    const encoding = dv.getUint16(p + 2);
    const offset = dv.getUint32(p + 4);
    if (platform === 3 && (encoding === 1 || encoding === 10)) {
      return format4(dv, cmapOff + offset);
    }
    if (fallback === null) fallback = cmapOff + offset;
  }
  return format4(dv, fallback);
}

function format4(dv, sub) {
  const format = dv.getUint16(sub);
  if (format !== 4) throw new Error("cmap format " + format + " is not supported");

  const segX2 = dv.getUint16(sub + 6);
  const endO = sub + 14;
  const startO = endO + segX2 + 2;
  const deltaO = startO + segX2;
  const rangeO = deltaO + segX2;

  const map = new Map();
  for (let i = 0; i < segX2 / 2; i++) {
    const end = dv.getUint16(endO + 2 * i);
    const start = dv.getUint16(startO + 2 * i);
    const delta = dv.getInt16(deltaO + 2 * i);
    const rangeOffset = dv.getUint16(rangeO + 2 * i);
    for (let c = start; c <= end && c !== 0xffff; c++) {
      let g;
      if (rangeOffset === 0) {
        g = (c + delta) & 0xffff;
      } else {
        g = dv.getUint16(rangeO + 2 * i + rangeOffset + 2 * (c - start));
        if (g) g = (g + delta) & 0xffff;
      }
      if (g) map.set(c, g);
    }
  }
  return map;
}

/* ----------------------------------------------------------------- outlines */

function contours(font, gid) {
  const { dv, tables, loca } = font;
  if (loca[gid] === loca[gid + 1]) return [];

  const start = tables.glyf + loca[gid];
  const numContours = dv.getInt16(start);
  if (numContours < 0) throw new Error("glyph " + gid + " is composite; not supported");

  let p = start + 10;
  const ends = [];
  for (let i = 0; i < numContours; i++, p += 2) ends.push(dv.getUint16(p));
  const numPoints = ends[numContours - 1] + 1;

  p += 2 + dv.getUint16(p); // skip hinting instructions

  const flags = [];
  while (flags.length < numPoints) {
    const f = dv.getUint8(p++);
    flags.push(f);
    if (f & 8) for (let r = dv.getUint8(p++); r > 0; r--) flags.push(f);
  }

  // x and y deltas share a layout, differing only in which flag bits mark a
  // one-byte value and which mark "same as previous".
  const readDeltas = (shortBit, sameBit) => {
    const out = [];
    let v = 0;
    for (const f of flags) {
      if (f & shortBit) {
        const d = dv.getUint8(p);
        p += 1;
        v += f & sameBit ? d : -d;
      } else if (!(f & sameBit)) {
        v += dv.getInt16(p);
        p += 2;
      }
      out.push(v);
    }
    return out;
  };
  const xs = readDeltas(2, 16);
  const ys = readDeltas(4, 32);

  const out = [];
  let first = 0;
  for (const end of ends) {
    const pts = [];
    for (let i = first; i <= end; i++) {
      pts.push({ x: xs[i], y: ys[i], on: !!(flags[i] & 1) });
    }
    out.push(pts);
    first = end + 1;
  }
  return out;
}

/**
 * TrueType stores quadratics with the on-curve point between two consecutive
 * control points left implicit. Insert those, rotate the ring so it starts on
 * an on-curve point, then emit one closed subpath.
 */
function contourToPath(points, project) {
  const ring = [];
  for (let i = 0; i < points.length; i++) {
    const cur = points[i];
    const next = points[(i + 1) % points.length];
    ring.push(cur);
    if (!cur.on && !next.on) {
      ring.push({ x: (cur.x + next.x) / 2, y: (cur.y + next.y) / 2, on: true });
    }
  }

  const startIndex = ring.findIndex((pt) => pt.on);
  if (startIndex === -1) return "";
  const pts = ring.slice(startIndex).concat(ring.slice(0, startIndex));

  const at = (pt) => {
    const [x, y] = project(pt);
    return round(x) + " " + round(y);
  };

  let d = "M" + at(pts[0]);
  let i = 1;
  while (i < pts.length) {
    const pt = pts[i];
    if (pt.on) {
      d += "L" + at(pt);
      i += 1;
    } else {
      d += "Q" + at(pt) + " " + at(pts[(i + 1) % pts.length]);
      i += 2;
    }
  }
  return d + "Z";
}

const round = (n) => Math.round(n * 100) / 100;

/* ------------------------------------------------------------------- layout */

const font = parseFont(FONT);
const advanceOf = (gid) =>
  font.advance[Math.min(gid, font.advance.length - 1)] / font.unitsPerEm;

const run = [
  ...[...LEAD].map((ch) => ({ ch, size: FONT_SIZE * LEAD_SCALE })),
  ...[...REST].map((ch) => ({ ch, size: FONT_SIZE })),
].map((item) => {
  const gid = font.cmap.get(item.ch.codePointAt(0));
  if (gid === undefined) throw new Error("no glyph for " + JSON.stringify(item.ch));
  const extra = item.ch === " " ? WORD_SPACE_EM * item.size : 0;
  return { ...item, gid, advance: advanceOf(gid) * item.size + extra };
});

const width = run.reduce((sum, item) => sum + item.advance, 0);
let pen = CENTER_X - width / 2;

const glyphs = [];
for (const item of run) {
  const scale = item.size / font.unitsPerEm;
  const originX = pen;
  pen += item.advance;

  const shapes = contours(font, item.gid);
  if (!shapes.length) continue; // space

  const project = (pt) => [originX + pt.x * scale, BASELINE_Y - pt.y * scale];
  glyphs.push({
    ch: item.ch,
    d: shapes.map((c) => contourToPath(c, project)).join(""),
  });
}

/* ------------------------------------------------------------------- output */

const header = [
  "/*",
  " * GENERATED FILE — do not edit by hand. Run `node scripts/build-wordmark.mjs`.",
  " *",
  ' * Glyph outlines for the "' + LEAD + REST + '" plate engraving, lifted from',
  " * " + FONT + " and baked into the camera viewBox at",
  " * " + FONT_SIZE + "px (leading capital " + LEAD_SCALE + "x), baseline y=" +
    BASELINE_Y + ", centred on x=" + CENTER_X + ".",
  " *",
  " * One entry per glyph, with all of that glyph's contours in a single subpath",
  " * list so counters still punch through when the shape is filled.",
  " */",
  "",
  "/** Rendered width of the lockup, in viewBox units. */",
  "export const WORDMARK_WIDTH = " + round(width) + ";",
  "",
  "export const WORDMARK_PATHS: readonly string[] = [",
].join("\n");

const body = glyphs
  .map((g) => "  // " + g.ch + "\n  " + JSON.stringify(g.d) + ",")
  .join("\n");

writeFileSync(OUT, header + "\n" + body + "\n];\n", "utf8");

console.log("wrote " + OUT + ": " + glyphs.length + " glyphs, width " + round(width));
