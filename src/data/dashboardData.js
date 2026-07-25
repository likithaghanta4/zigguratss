export const visitData = {
  daywise: {
    label: "Today",
    profile: [6, 18, 14, 20, 17, 24, 22, 21],
    artwork: [2, 4, 5, 6, 5, 8, 7, 9],
    profileTotal: 142,
    artworkTotal: 46,
  },
  weekwise: {
    label: "This Week",
    profile: [28, 34, 39, 31, 42, 48, 44],
    artwork: [12, 16, 14, 19, 23, 27, 24],
    profileTotal: 266,
    artworkTotal: 135,
  },
  monthwise: {
    label: "This Month",
    profile: [92, 110, 104, 128, 134, 140, 152, 148],
    artwork: [38, 44, 48, 54, 61, 66, 72, 78],
    profileTotal: 1008,
    artworkTotal: 461,
  },
};

export const quickLinks = [
  "Dashboard",
  "My Profile",
  "Add Awards And Exhibition",
  "My Artwork",
  "Order Offer Enquiry",
  "Refund Orders",
  "Remark View",
  "My Order Detail",
  "Blog",
  "Logout",
];

export const studioSignals = [
  { label: "Exhibitions", value: "07" },
  { label: "Collectors", value: "58" },
  { label: "Open Queries", value: "11" },
];

export const basicInformationSteps = [
  "Basic Information",
  "Contact Details",
  "Country",
  "Address",
  "Creative Role",
  "Online Presence",
  "Artist Bio",
  "Achievements",
  "Profile Image",
];

export const documentUploadSteps = [
  "Profile Photo",
  "ID Document",
  "Studio Image",
  "Portfolio Link",
];

export const bankDetailSteps = [
  "Account Holder Name",
  "Account Number",
  "Account Name",
  "Bank Name",
  "IFSC Code",
  "Account ID Name",
];

export const educationStatusOptions = [
  "School Student",
  "College Student",
  "Employee",
];

export const countryOptions = ["India", "United States", "United Kingdom", "Canada", "Australia"];

export const stateOptions = [
  "Delhi",
  "Meghalaya",
  "Maharashtra",
  "Rajasthan",
  "Karnataka",
  "Uttar Pradesh",
  "Punjab",
  "Other",
];

export const mediumOptions = [
  "Painter",
  "Mixed Media Artist",
  "Digital Artist",
  "Sculptor",
  "Photographer",
];

export const genderOptions = ["Female", "Male", "Non-binary", "Prefer not to say"];

export const defaultProfileData = {
  fullName: "Riya Rohilla",
  email: "riyarohilla112@gmail.com",
  mobile: "",
  gender: "",
  dateOfBirth: "",
  country: "India",
  state: "",
  city: "",
  postalCode: "",
  specialty: "Painter",
  yearsExperience: "",
  website: "",
  instagram: "",
  bio: "",
  achievements: "",
  profileImage: "",
  documentProfilePhoto: "",
  documentIdFile: "",
  documentStudioImage: "",
  documentPortfolioLink: "",
  bankAccountHolderName: "",
  bankAccountNumber: "",
  bankAccountName: "",
  bankName: "",
  bankIfscCode: "",
  bankAccountIdName: "",
  educationStatus: "",
  educationInstituteName: "",
  educationYearOfStudy: "",
  educationExperience: "",
  educationJobTitle: "",
};

export const STORAGE_KEY = "ziguratss_admin_panel_state";

export const defaultAwardsData = {
  awards: [],
  solo: [],
  group: [],
};

export const defaultOfferEnquiries = [
  {
    id: 1,
    artworkName: "Monsoon Reverie I",
    customerName: "Aarav Mehta",
    offerPrice: 98000,
    date: "2026-04-21",
    isNew: true,
  },
  {
    id: 2,
    artworkName: "Silent Tides",
    customerName: "Naina Sharma",
    offerPrice: 64000,
    date: "2026-04-18",
    isNew: false,
  },
  {
    id: 3,
    artworkName: "Earthline Studies",
    customerName: "Kabir Singh",
    offerPrice: 121000,
    date: "2026-04-22",
    isNew: true,
  },
  {
    id: 4,
    artworkName: "Blue Archive",
    customerName: "Anika Das",
    offerPrice: 57000,
    date: "2026-04-15",
    isNew: false,
  },
];

export const defaultRefundRequests = [
  {
    id: 1,
    orderId: "RF-1041",
    artworkName: "Cobalt Horizon",
    customerName: "Rhea Jain",
    reason: "Packaging damage during transit.",
    status: "Pending",
  },
  {
    id: 2,
    orderId: "RF-1034",
    artworkName: "Autumn Script",
    customerName: "Vikram Khanna",
    reason: "Size mismatch with approved framing request.",
    status: "Approved",
  },
  {
    id: 3,
    orderId: "RF-1019",
    artworkName: "Muted Bloom",
    customerName: "Sara Kapoor",
    reason: "Return request exceeded policy window.",
    status: "Rejected",
  },
];

export const defaultRemarks = [
  {
    id: 1,
    author: "Gallery Curator",
    title: "Presentation quality",
    message: "Strong visual storytelling. The profile now feels premium and much easier to browse.",
    rating: 5,
  },
  {
    id: 2,
    author: "Collector Review",
    title: "Artwork detail clarity",
    message: "Collectors would benefit from one extra close-up image, but the composition is excellent.",
    rating: 4,
  },
  {
    id: 3,
    author: "Studio Team",
    title: "Response time",
    message: "Enquiry follow-up has improved, though commission FAQs could still be clearer.",
    rating: 4,
  },
];

export const defaultOrderDetails = [
  {
    id: 1,
    orderId: "ZG-2401",
    artworkName: "Monsoon Reverie I",
    customerName: "Aarav Mehta",
    amount: 98000,
    date: "2026-04-20",
    status: "In Transit",
    address: "12 Residency Road, New Delhi",
    notes: "Collector requested a handwritten authenticity note.",
    items: ["Original canvas", "Certificate of authenticity", "Premium crate packaging"],
  },
  {
    id: 2,
    orderId: "ZG-2394",
    artworkName: "Silent Tides",
    customerName: "Naina Sharma",
    amount: 64000,
    date: "2026-04-14",
    status: "Processing",
    address: "77 Lake View, Bengaluru",
    notes: "Frame selection pending client confirmation.",
    items: ["Framed artwork", "Wall-hanging kit"],
  },
  {
    id: 3,
    orderId: "ZG-2380",
    artworkName: "Earthline Studies",
    customerName: "Kabir Singh",
    amount: 121000,
    date: "2026-04-10",
    status: "Delivered",
    address: "21 Civil Lines, Jaipur",
    notes: "Delivery confirmed by collector on April 12.",
    items: ["Original mixed media work", "Insurance document", "Gallery invoice"],
  },
];
