/**
 * The studio's own accounts, in one place.
 *
 * These URLs are rendered in more than one component (the footer list and the
 * gallery lightbox), so they live here rather than being retyped — a profile
 * that moves should only have to be corrected once.
 */
export interface Social {
  readonly label: string;
  readonly href: string;
}

export const INSTAGRAM: Social = {
  label: "Instagram",
  href: "https://www.instagram.com/magical_eyes004/",
};

export const WHATSAPP: Social = {
  label: "WhatsApp",
  href: "https://wa.me/918943572124",
};

export const LINKEDIN: Social = {
  label: "LinkedIn",
  href: "https://www.linkedin.com/in/akash-anil-136a01190/",
};

/** Footer order: the two the studio publishes, with the direct line between. */
export const SOCIALS: readonly Social[] = [INSTAGRAM, WHATSAPP, LINKEDIN];
