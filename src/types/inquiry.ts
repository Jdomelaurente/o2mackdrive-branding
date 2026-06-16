export type InquiryType = "car" | "sell-trade" | "contact" | "financing";

export type Inquiry = {
  type: InquiryType;
  fullName: string;
  contactNumber: string;
  email?: string;
  message: string;
  carSlug?: string;
};
