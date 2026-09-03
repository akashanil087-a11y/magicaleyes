/**
 * Camera line-art geometry for the Magical Eyes entry screen.
 *
 * Traced from the reference recording at 1900x904, so every coordinate below
 * lives in that pixel space. Each shape is normalised to a single <path> — even
 * circles and rounded rectangles — so that the draw-on reveal can apply
 * stroke-dasharray uniformly and getTotalLength() behaves predictably.
 *
 * Note the four arcs around the shutter release: the reference ring is
 * segmented, and that is expressed as real geometry rather than a dasharray,
 * because the draw-on animation owns stroke-dasharray on every path here.
 *
 * Order matters: it drives the reveal stagger (see MagicalEyesLoader). Shapes
 * are listed structure-first (plate, lens, knobs) and detail-last (knurling,
 * screws), which reads as the plate assembling itself.
 */

export interface CameraPath {
  /** SVG path data in the 1900x904 trace space. */
  readonly d: string;
  /** Optional transform, used by the strap lugs and screw slots. */
  readonly transform?: string;
}

export const CAMERA_VIEW_BOX = "220 80 1460 670";

export const CAMERA_PATHS: readonly CameraPath[] = [
  { d: "M355 370H1546L1633 457V590L1546 676H355L268 590V457Z" },
  { d: "M355 676L371 692H1530L1546 676" },
  { d: "M789 692L807 732H1093L1112 692" },
  { d: "M789 692L806 717H1094L1112 692" },
  { d: "M268 457H258A10 10 0 0 0 248 467V473A10 10 0 0 0 258 483H268" },
  { d: "M1633 457H1643A10 10 0 0 1 1653 467V568A10 10 0 0 1 1643 578H1633" },
  { d: "M-15 -15H15A6 6 0 0 1 21 -9V9A6 6 0 0 1 15 15H-15A6 6 0 0 1 -21 9V-9A6 6 0 0 1 -15 -15Z", transform: "translate(300 407) rotate(-45)" },
  { d: "M-15 -15H15A6 6 0 0 1 21 -9V9A6 6 0 0 1 15 15H-15A6 6 0 0 1 -21 9V-9A6 6 0 0 1 -15 -15Z", transform: "translate(1601 407) rotate(45)" },
  { d: "M846 117Q1067 79 1289 117" },
  { d: "M829 116H1306A14 14 0 0 1 1320 130V205H815V130A14 14 0 0 1 829 116Z" },
  { d: "M815 154H1320" },
  { d: "M815 169H1320" },
  { d: "M815 174H1320" },
  { d: "M811 205H1324A8 8 0 0 1 1332 213V236H803V213A8 8 0 0 1 811 205Z" },
  { d: "M803 236H1331A14 14 0 0 1 1345 250V370H789V250A14 14 0 0 1 803 236Z" },
  { d: "M789 298H1345" },
  { d: "M789 356H1345" },
  { d: "M559 311H634A4 4 0 0 1 638 315V319H555V315A4 4 0 0 1 559 311Z" },
  { d: "M549 319H645A3 3 0 0 1 648 322V335H546V322A3 3 0 0 1 549 319Z" },
  { d: "M554 335H639A2 2 0 0 1 641 337V344H552V337A2 2 0 0 1 554 335Z" },
  { d: "M537 344H656A2 2 0 0 1 658 346V352H535V346A2 2 0 0 1 537 344Z" },
  { d: "M531 352H663A2 2 0 0 1 665 354V360H529V354A2 2 0 0 1 531 352Z" },
  { d: "M524 360H669A2 2 0 0 1 671 362V370H522V362A2 2 0 0 1 524 360Z" },
  { d: "M706 292H756A5 5 0 0 1 761 297V300H701V297A5 5 0 0 1 706 292Z" },
  { d: "M697 300H764A3 3 0 0 1 767 303V320H694V303A3 3 0 0 1 697 300Z" },
  { d: "M700 320H761A2 2 0 0 1 763 322V339H698V322A2 2 0 0 1 700 320Z" },
  { d: "M688 339H773A2 2 0 0 1 775 341V349H686V341A2 2 0 0 1 688 339Z" },
  { d: "M685 349H777A2 2 0 0 1 779 351V357H683V351A2 2 0 0 1 685 349Z" },
  { d: "M680 357H781A2 2 0 0 1 783 359V370H678V359A2 2 0 0 1 680 357Z" },
  { d: "M1352 297L1362 288V286A4 4 0 0 1 1366 282H1404A4 4 0 0 1 1408 286V288L1418 297" },
  { d: "M1347 303A6 6 0 0 1 1353 297H1412A30 30 0 0 1 1442 327V370" },
  { d: "M1349 359V370" },
  { d: "M349 524A61 61 0 1 1 471 524A61 61 0 1 1 349 524Z" },
  { d: "M356 523.5A54 54 0 1 1 464 523.5A54 54 0 1 1 356 523.5Z" },
  { d: "M384 523.5A26 26 0 1 1 436 523.5A26 26 0 1 1 384 523.5Z" },
  { d: "M359 523.5A6 6 0 1 1 371 523.5A6 6 0 1 1 359 523.5Z" },
  { d: "M449 523.5A6 6 0 1 1 461 523.5A6 6 0 1 1 449 523.5Z" },
  { d: "M497 456.5A42 42 0 1 1 581 456.5A42 42 0 1 1 497 456.5Z" },
  { d: "M510.5 456.5A28.5 28.5 0 1 1 567.5 456.5A28.5 28.5 0 1 1 510.5 456.5Z" },
  { d: "M517.5 456.5A21.5 21.5 0 1 1 560.5 456.5A21.5 21.5 0 1 1 517.5 456.5Z" },
  { d: "M528 456.5A11 11 0 1 1 550 456.5A11 11 0 1 1 528 456.5Z" },
  { d: "M521 600.5A62.5 62.5 0 0 1 646 600.5V626A10 10 0 0 1 636 636H531A10 10 0 0 1 521 626Z" },
  { d: "M531 597.5A52.5 52.5 0 0 1 636 597.5V600A8 8 0 0 1 628 608H539A8 8 0 0 1 531 600Z" },
  { d: "M563 573.5A21.5 21.5 0 1 1 606 573.5A21.5 21.5 0 1 1 563 573.5Z" },
  { d: "M1065.5 523.5A88 88 0 1 1 1241.5 523.5A88 88 0 1 1 1065.5 523.5Z" },
  { d: "M1075.5 523.5A78 78 0 1 1 1231.5 523.5A78 78 0 1 1 1075.5 523.5Z" },
  { d: "M1107 512H1200A2 2 0 0 1 1202 514V532A2 2 0 0 1 1200 534H1107A2 2 0 0 1 1105 532V514A2 2 0 0 1 1107 512Z" },
  { d: "M1452 442H1511A78 78 0 0 1 1589 520V527A78 78 0 0 1 1511 605H1452A78 78 0 0 1 1374 527V520A78 78 0 0 1 1452 442Z" },
  { d: "M1453 449H1510A72 72 0 0 1 1582 521V526A72 72 0 0 1 1510 598H1453A72 72 0 0 1 1381 526V521A72 72 0 0 1 1453 449Z" },
  { d: "M1443 523.5A61 61 0 1 1 1565 523.5A61 61 0 1 1 1443 523.5Z" },
  { d: "M1450 523.5A54 54 0 1 1 1558 523.5A54 54 0 1 1 1450 523.5Z" },
  { d: "M1478.5 523.5A25.5 25.5 0 1 1 1529.5 523.5A25.5 25.5 0 1 1 1478.5 523.5Z" },
  { d: "M1497 475A7 7 0 1 1 1511 475A7 7 0 1 1 1497 475Z" },
  { d: "M1497 572A7 7 0 1 1 1511 572A7 7 0 1 1 1497 572Z" },
  { d: "M1267.5 529.5A38 38 0 1 1 1343.5 529.5A38 38 0 1 1 1267.5 529.5Z" },
  { d: "M1330.32 510.11A31.5 31.5 0 0 1 1330.32 548.89" },
  { d: "M1324.89 554.32A31.5 31.5 0 0 1 1286.11 554.32" },
  { d: "M1280.68 548.89A31.5 31.5 0 0 1 1280.68 510.11" },
  { d: "M1286.11 504.68A31.5 31.5 0 0 1 1324.89 504.68" },
  { d: "M797 300V355" },
  { d: "M803.87 300V355" },
  { d: "M810.75 300V355" },
  { d: "M817.62 300V355" },
  { d: "M824.49 300V355" },
  { d: "M831.37 300V355" },
  { d: "M838.24 300V355" },
  { d: "M845.11 300V355" },
  { d: "M851.99 300V355" },
  { d: "M858.86 300V355" },
  { d: "M865.73 300V355" },
  { d: "M872.61 300V355" },
  { d: "M879.48 300V355" },
  { d: "M886.35 300V355" },
  { d: "M893.23 300V355" },
  { d: "M900.1 300V355" },
  { d: "M906.97 300V355" },
  { d: "M913.85 300V355" },
  { d: "M920.72 300V355" },
  { d: "M927.59 300V355" },
  { d: "M934.47 300V355" },
  { d: "M941.34 300V355" },
  { d: "M948.22 300V355" },
  { d: "M955.09 300V355" },
  { d: "M961.96 300V355" },
  { d: "M968.84 300V355" },
  { d: "M975.71 300V355" },
  { d: "M982.58 300V355" },
  { d: "M989.46 300V355" },
  { d: "M996.33 300V355" },
  { d: "M1003.2 300V355" },
  { d: "M1010.08 300V355" },
  { d: "M1016.95 300V355" },
  { d: "M1023.82 300V355" },
  { d: "M1030.7 300V355" },
  { d: "M1037.57 300V355" },
  { d: "M1044.44 300V355" },
  { d: "M1051.32 300V355" },
  { d: "M1058.19 300V355" },
  { d: "M1065.06 300V355" },
  { d: "M1071.94 300V355" },
  { d: "M1078.81 300V355" },
  { d: "M1085.68 300V355" },
  { d: "M1092.56 300V355" },
  { d: "M1099.43 300V355" },
  { d: "M1106.3 300V355" },
  { d: "M1113.18 300V355" },
  { d: "M1120.05 300V355" },
  { d: "M1126.92 300V355" },
  { d: "M1133.8 300V355" },
  { d: "M1140.67 300V355" },
  { d: "M1147.54 300V355" },
  { d: "M1154.42 300V355" },
  { d: "M1161.29 300V355" },
  { d: "M1168.16 300V355" },
  { d: "M1175.04 300V355" },
  { d: "M1181.91 300V355" },
  { d: "M1188.78 300V355" },
  { d: "M1195.66 300V355" },
  { d: "M1202.53 300V355" },
  { d: "M1209.41 300V355" },
  { d: "M1216.28 300V355" },
  { d: "M1223.15 300V355" },
  { d: "M1230.03 300V355" },
  { d: "M1236.9 300V355" },
  { d: "M1243.77 300V355" },
  { d: "M1250.65 300V355" },
  { d: "M1257.52 300V355" },
  { d: "M1264.39 300V355" },
  { d: "M1271.27 300V355" },
  { d: "M1278.14 300V355" },
  { d: "M1285.01 300V355" },
  { d: "M1291.89 300V355" },
  { d: "M1298.76 300V355" },
  { d: "M1305.63 300V355" },
  { d: "M1312.51 300V355" },
  { d: "M1319.38 300V355" },
  { d: "M1326.25 300V355" },
  { d: "M1333.13 300V355" },
  { d: "M1340 300V355" },
  { d: "M356 400.5A16.5 16.5 0 1 1 389 400.5A16.5 16.5 0 1 1 356 400.5Z" },
  { d: "M-9.5 -3.5H9.5A3.5 3.5 0 0 1 13 0V0A3.5 3.5 0 0 1 9.5 3.5H-9.5A3.5 3.5 0 0 1 -13 0V0A3.5 3.5 0 0 1 -9.5 -3.5Z", transform: "translate(372.5 400.5) rotate(-45)" },
  { d: "M1510 400.5A16.5 16.5 0 1 1 1543 400.5A16.5 16.5 0 1 1 1510 400.5Z" },
  { d: "M-9.5 -3.5H9.5A3.5 3.5 0 0 1 13 0V0A3.5 3.5 0 0 1 9.5 3.5H-9.5A3.5 3.5 0 0 1 -13 0V0A3.5 3.5 0 0 1 -9.5 -3.5Z", transform: "translate(1526.5 400.5) rotate(-45)" },
  { d: "M356 647.5A16.5 16.5 0 1 1 389 647.5A16.5 16.5 0 1 1 356 647.5Z" },
  { d: "M-9.5 -3.5H9.5A3.5 3.5 0 0 1 13 0V0A3.5 3.5 0 0 1 9.5 3.5H-9.5A3.5 3.5 0 0 1 -13 0V0A3.5 3.5 0 0 1 -9.5 -3.5Z", transform: "translate(372.5 647.5) rotate(-45)" },
  { d: "M1510 647.5A16.5 16.5 0 1 1 1543 647.5A16.5 16.5 0 1 1 1510 647.5Z" },
  { d: "M-9.5 -3.5H9.5A3.5 3.5 0 0 1 13 0V0A3.5 3.5 0 0 1 9.5 3.5H-9.5A3.5 3.5 0 0 1 -13 0V0A3.5 3.5 0 0 1 -9.5 -3.5Z", transform: "translate(1526.5 647.5) rotate(-45)" },
];

/** Centre of the shutter release, shared by the disc, ring and label track. */
export const RELEASE_CENTER = { x: 1305.5, y: 529.5 } as const;
export const RELEASE_RADIUS = 25.5;

/**
 * Circle the "CLICK TO ENTER" label is set on. Baseline radius 43 puts the cap
 * height just outside the outer ring, and with a condensed face at 13px the
 * label spans ~136deg — matching the reference measurement.
 *
 * It starts at the BOTTOM of the ring and runs clockwise, so the 50% mark lands
 * on top dead centre. That is what the label is anchored to: SVG drops any glyph
 * that falls before offset 0, so centring the text on a track that started at
 * the top would silently clip its first half.
 *
 * The end point sits 0.1 to the RIGHT of the start, not the left. Both offsets
 * describe a near-degenerate arc, and the sign is what decides which of the two
 * candidate circles the large-arc flag resolves to — get it backwards and the
 * label quietly orbits a circle 86 units below the shutter release.
 */
export const RELEASE_TRACK = "M1305.5 572.5A43 43 0 1 1 1305.6 572.5";
