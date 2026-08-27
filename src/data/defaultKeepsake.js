import photosData from './photosData.json';

export const DEFAULT_KEEPSAKE = {
  templateSlug: "rakhi-special",
  category: "rakhi",
  senderName: "Divyam",
  receiverName: "Musu Didi",
  message: "Didi, har saal is din pr ek hi khayal aata hai, kitna lucky hun main jo aap meri behen ho 🪷 aap sirf meri behen nahi, meri sabse badi strength aur meri best friend bhi ho. Bachpan mein aapko kitna sataya, kitna pareshan kiya, phir bhi aapne hamesha mera saath diya. omg zada cringe hora. Doori chahe kitni bhi ho, aapke is bandhe hue dhaage mein mera pyaar aur hamesha aapki raksha karne ka vaada bandha rehega. Raksha Bandhan Mubarak ho motu! 🪔 Hamesha muskurati rehna, khush rehna — aapka bhai hamesha aapke saath hai. Yours Divyam. 🫶🏻",
  photos: photosData,
  customData: {
    role: "brother", // brother sending to sister
    voiceNote: ""
  },
  createdAt: "2026-08-27T00:00:00.000Z"
};

export const RAKHI_DESIGNS = [
  {
    id: "lotus",
    label: "Temple Lotus Rakhi",
    description: "A symbol of divine purity, lotus blessings, and lifelong protection.",
    icon: "🪷",
    colors: ["#dc2626", "#fbbf24"],
    accent: "#ef4444"
  },
  {
    id: "kundan",
    label: "Royal Kundan Rakhi",
    description: "Handcrafted royal kundan and radiant pearls — a regal treasure for this sacred day.",
    icon: "💎",
    colors: ["#7f1d1d", "#fde68a"],
    accent: "#d97706"
  },
  {
    id: "peacock",
    label: "Peacock Feather Rakhi",
    description: "Grace and Krishna's divine devotion woven into auspicious silk threads.",
    icon: "🦚",
    colors: ["#0369a1", "#fbbf24"],
    accent: "#0284c7"
  },
  {
    id: "mauli",
    label: "Traditional Mauli Rakhi",
    description: "The sacred Vedic red-and-yellow sanctified thread blessed by generations.",
    icon: "🧵",
    colors: ["#dc2626", "#fbbf24"],
    accent: "#ea580c"
  },
  {
    id: "pearl",
    label: "Gold Pearl Rakhi",
    description: "Lustrous white pearls & spun gold work — timeless grace wrapped in a brother's vow.",
    icon: "⚪",
    colors: ["#f5e6b8", "#b8860b"],
    accent: "#ca8a04"
  },
  {
    id: "zari",
    label: "Designer Zari Rakhi",
    description: "Intricate gold zari filigree embroidery that sparkles like an eternal promise.",
    icon: "✨",
    colors: ["#b45309", "#fef3c7"],
    accent: "#eab308"
  }
];

export const SACRED_PROMISES = [
  {
    id: 1,
    icon: "🛡️",
    title: "Lifelong Protection",
    sanskrit: "रक्षे मा चल मा चल",
    text: "No matter where life takes us, I promise to stand by your side as your protector and support your dreams in every step.",
    color: "#f59e0b"
  },
  {
    id: 2,
    icon: "🙏",
    title: "Endless Blessings",
    sanskrit: "शुभं करोति कल्याणम्",
    text: "Praying for your happiness, peace, success, and prosperity in every chapter of your life — may you always shine bright.",
    color: "#ec4899"
  },
  {
    id: 3,
    icon: "🎁",
    title: "Joy & Laughter",
    sanskrit: "सदा आनंदमयो भव",
    text: "Promising a lifetime of teasing, making you laugh through tough days, solving your worries, and keeping your secrets safe.",
    color: "#8b5cf6"
  },
  {
    id: 4,
    icon: "❤️",
    title: "Unbreakable Bond",
    sanskrit: "स्नेह सूत्रं सनातनम्",
    text: "Distance can never weaken our bond — your brother is always just a call away, cheering for you and loving you unconditionally.",
    color: "#ef4444"
  }
];
