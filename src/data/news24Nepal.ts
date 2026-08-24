export interface News24Item {
  id: string;
  title: string;
  titleNepali: string;
  category: "शिक्षा तथा छात्रवृत्ति" | "भिसा तथा प्रमाणीकरण" | "विश्वविद्यालय साझेदारी" | "भाषा परीक्षा" | "समकक्षता तथा काउन्सिल";
  summary: string;
  date: string;
  timeAgo: string;
  isBreaking?: boolean;
  isTrending?: boolean;
  imageUrl?: string;
}

export const NEWS24_LATEST_FEED: News24Item[] = [
  {
    id: "edu-1",
    title: "Ministry of Education Updates Online NOC (No Objection Certificate) Guidelines for Study in South Korea",
    titleNepali: "शिक्षा मन्त्रालयद्वारा वैदेशिक अध्ययन अनुमति पत्र (NOC) डिजिटल प्रमाणीकरण निर्देशिका जारी",
    category: "शिक्षा तथा छात्रवृत्ति",
    date: "2026",
    timeAgo: "भर्खरै",
    isBreaking: true,
    isTrending: true,
    summary: "शिक्षा, विज्ञान तथा प्रविधि मन्त्रालयले दक्षिण कोरियामा उच्च शिक्षा अध्ययनका लागि जाने विद्यार्थीहरूका लागि डिजिटल NOC प्रमाणीकरण प्रणाली थप छिटो र पारदर्शी बनाएको छ।",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "edu-2",
    title: "Global Korea Scholarship (GKS 2026-2027) Full Tuition Quotas Announced for Nepali Students",
    titleNepali: "ग्लोबल कोरिया छात्रवृत्ति (GKS): नेपाली विद्यार्थीहरूका लागि १००% निःशुल्क कोटा सार्वजनिक",
    category: "शिक्षा तथा छात्रवृत्ति",
    date: "2026",
    timeAgo: "१ घण्टा अघि",
    isBreaking: false,
    isTrending: true,
    summary: "दक्षिण कोरिया सरकारको एनआईआईईडी (NIIED) अन्तर्गत नेपालका स्नातक, स्नातकोत्तर तथा विद्यावारिधि तहका योग्य विद्यार्थीहरूका लागि पूर्ण छात्रवृत्ति आवेदन प्रक्रिया प्रारम्भ भएको छ।",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "edu-3",
    title: "Tribhuvan University (TU) & Korean Universities Partner on STEM & Engineering Research Exchange",
    titleNepali: "त्रिभुवन विश्वविद्यालय र कोरियाली प्रविधि विश्वविद्यालयहरूबीच शैक्षिक आदानप्रदान सम्झौता",
    category: "विश्वविद्यालय साझेदारी",
    date: "2026",
    timeAgo: "२ घण्टा अघि",
    isBreaking: false,
    isTrending: true,
    summary: "इन्जिनियरिङ, रोबोटिक्स, कम्प्युटर साइन्स तथा जैविक प्रविधि अध्ययनरत नेपाली विद्यार्थीहरूका लागि कोरियाका प्रतिष्ठित विश्वविद्यालयमा क्रेडिट ट्रान्सफर र अनुसन्धान फेलोसिप उपलब्ध हुने भएको छ।",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "edu-4",
    title: "Education Ministry Inspection: Quality Standards & Student Protection Measures Enforced for Consultancies",
    titleNepali: "शैक्षिक परामर्श केन्द्रहरूको मापदण्ड अनुगमन: विद्यार्थीको अधिकार र पारदर्शी शुल्क अनिवार्य",
    category: "भिसा तथा प्रमाणीकरण",
    date: "2026",
    timeAgo: "४ घण्टा अघि",
    isBreaking: true,
    isTrending: false,
    summary: "मन्त्रालयको स्वीकृत सूचीमा रहेका आधिकारिक शैक्षिक परामर्श संस्थाहरूले मात्र विदेश अध्ययन परामर्श सेवा प्रवाह गर्न पाउने र परामर्शदाताहरूको प्रमाणीकरण विवरण अद्यावधिक गरिएको छ।",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "edu-5",
    title: "Korean Language (TOPIK & EPS-TOPIK) Exam Schedules and Study Prep Classes in Kathmandu",
    titleNepali: "कोरियन भाषा परीक्षा (TOPIK & EPS) को नयाँ तालिका तथा तयारी कक्षा मापदण्ड",
    category: "भाषा परीक्षा",
    date: "2026",
    timeAgo: "६ घण्टा अघि",
    isBreaking: false,
    isTrending: false,
    summary: "दक्षिण कोरियामा D-2 विश्वविद्यालय भर्ना तथा D-4 भाषा प्रशिक्षण भिसाका लागि अनिवार्य मानिने कोरियन भाषा दक्षता परीक्षा (TOPIK I & II) को फाराम भर्ने मिति निर्धारण गरिएको छ।",
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "edu-6",
    title: "Medical & Nursing Higher Studies: Verification and Recognition of Korean University Degrees",
    titleNepali: "नेपाल मेडिकल काउन्सिल तथा इन्जिनियरिङ काउन्सिलद्वारा विदेशी विश्वविद्यालयका उपाधि समकक्षता",
    category: "समकक्षता तथा काउन्सिल",
    date: "2026",
    timeAgo: "आज",
    isBreaking: false,
    isTrending: false,
    summary: "विदेशबाट स्नातक तथा स्नातकोत्तर अध्ययन पूरा गरी फर्केका विद्यार्थीहरूका लागि नेपालमा समकक्षता (Equivalence) लिने प्रक्रियालाई पूर्ण अनलाइन र सरलीकृत गरिएको छ।",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "edu-7",
    title: "Kathmandu University & Korean Partner Institutions Announce Joint Climate Science Grants",
    titleNepali: "काठमाडौँ विश्वविद्यालय र कोरियाली शैक्षिक संस्थाबीच वातावरण र प्रविधिमा संयुक्त छात्रवृत्ति",
    category: "विश्वविद्यालय साझेदारी",
    date: "2026",
    timeAgo: "हिजो",
    isBreaking: false,
    isTrending: false,
    summary: "नेपाली अनुसन्धाता तथा विद्यार्थीहरूलाई कोरियन सरकार र विश्वविद्यालय कोषबाट अनुसन्धान अनुदानसहित प्रत्यक्ष छात्रवृत्ति प्रदान गर्ने सहमति भएको छ।",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80",
  }
];
