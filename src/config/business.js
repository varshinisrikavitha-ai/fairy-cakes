// Public listing details used for this unofficial design demo.
// Confirm every business detail with the owner before publication.
export const business = {
  name: 'Fairy Cakes (Home Bakes)',
  shortName: 'Fairy Cakes',
  phone: '+91 88078 38751',
  phoneHref: 'tel:+918807838751',
  whatsappNumber: '918807838751',
  location: 'Komarapalayam, Tamil Nadu',
  googleSearchUrl: 'https://www.google.com/search?q=Fairy+Cakes+Home+Bakes+Komarapalayam',
  disclaimer: 'Unofficial website concept created as a design demo. Business details, product availability and content must be confirmed by the owner before publication.',
};

export function whatsappUrl(message) {
  if (!business.whatsappNumber || !/^\d{8,15}$/.test(business.whatsappNumber) || !message) return null;
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  general: `Hi ${business.name}, I would like to enquire about your cakes.`,
  delivery: `Hi ${business.name}, I would like to enquire about cake delivery. Please confirm availability, delivery areas, charges and timings.`,
};
