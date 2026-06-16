export type NavigationLink = {
  label: string;
  href: string;
};

export type SiteInfo = {
  businessName: string;
  tagline: string;
  description: string;
  phone: string;
  messengerLink: string;
  facebookLink: string;
  email: string;
  location: string;
  navigation: NavigationLink[];
  primaryCtaLabel: string;
};
