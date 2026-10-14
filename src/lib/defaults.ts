/**
 * Default content & portfolio.
 * - Used by `prisma/seed.ts` to fill a fresh database.
 * - Used as a fallback when a key is missing in the database (so the site never renders empty).
 * Everything here can be edited later from /hostpage.
 */
import type { CategoryDTO, ProjectDTO, SiteContent } from "./types";

const P = (name: string) => `/images/projects/${name}.jpg`;
export const IMG = {
  kitchen: P("modern-mutfak"),
  living: P("salon-oturma-grubu"),
  whiteKitchen: P("beyaz-l-mutfak"),
  marbleTv: P("mermer-tv-unitesi"),
  fireplaceTv: P("somine-efektli-tv-duvari"),
  woodTv: P("ahsap-lambri-tv-duvari"),
};

export const defaultContent: SiteContent = {
  announcement: {
    enabled: true,
    text: {
      tr: "Ücretsiz keşif ve fiyat teklifi için bize WhatsApp'tan yazın · Türkiye genelinde hizmet",
      en: "Message us on WhatsApp for a free site visit and quote · Serving all of Türkiye",
      ar: "راسلونا على واتساب لمعاينة مجانية وعرض سعر · خدماتنا في جميع أنحاء تركيا",
    },
    link: "/iletisim",
  },
  hero: {
    eyebrow: { tr: "Lüks İç Dekorasyon", en: "Luxury Interior Design", ar: "ديكورات داخلية فاخرة" },
    title: { tr: "Kaliteyi Evinize Taşıyoruz", en: "We Bring Quality Home", ar: "ننقل الجودة إلى منزلكم" },
    subtitle: {
      tr: "Huzur Dekor olarak yaşam alanlarınızı huzur ve şıklıkla buluşturuyoruz — boyadan mobilyaya, alçıpandan iç dekorasyonun en ince detayına kadar.",
      en: "At Huzur Dekor we bring calm and elegance to your living spaces — from paint to furniture, from drywall to the finest detail of interior design.",
      ar: "في Huzur Dekor نحوّل مساحاتكم إلى أماكن تنبض بالراحة والأناقة — من الدهان إلى الموبيليا، ومن الجبس بورد إلى أدق تفاصيل الديكور الداخلي.",
    },
    ctaPrimary: { tr: "Teklif Alın", en: "Get a Quote", ar: "اطلب عرض سعر" },
    ctaSecondary: { tr: "Projelerimiz", en: "Our Projects", ar: "شاهد أعمالنا" },
    images: [IMG.fireplaceTv, IMG.kitchen],
  },
  stats: { projects: 250, years: 10, clients: 200, satisfaction: 100 },
  services: {
    title: { tr: "Eviniz İçin Her Şey Tek Çatı Altında", en: "Everything Your Home Needs, Under One Roof", ar: "كل ما يحتاجه منزلك في مكان واحد" },
    subtitle: {
      tr: "Tasarımdan uygulamaya, tek bir ekip ve tek bir sorumlu ile.",
      en: "From design to installation — one team, one point of contact.",
      ar: "من التصميم إلى التنفيذ — فريق واحد ومسؤول واحد.",
    },
    items: [
      {
        icon: "interior",
        image: IMG.marbleTv,
        title: { tr: "İç Dekorasyon", en: "Interior Design", ar: "الديكور الداخلي" },
        text: {
          tr: "Zevkinize uygun, baştan sona lüks iç mekân tasarımı ve uygulaması.",
          en: "Complete, high-end interior design and fit-out tailored to your taste.",
          ar: "تصميم وتنفيذ متكامل للمساحات الداخلية بلمسة فاخرة تناسب ذوقكم.",
        },
      },
      {
        icon: "furniture",
        image: IMG.living,
        title: { tr: "Mobilya", en: "Furniture", ar: "الموبيليا" },
        text: {
          tr: "Dayanıklı malzemelerle modern ve klasik mobilya üretimi ve montajı.",
          en: "Modern and classic furniture, made and installed with durable materials.",
          ar: "تصنيع وتركيب موبيليا عصرية وكلاسيكية بجودة عالية وخامات متينة.",
        },
      },
      {
        icon: "paint",
        image: IMG.woodTv,
        title: { tr: "Boya & Badana", en: "Painting", ar: "الدهان" },
        text: {
          tr: "Şık renkler ve uzun ömürlü, temiz iç cephe boya uygulamaları.",
          en: "Elegant colours and clean, long-lasting interior paint finishes.",
          ar: "دهانات داخلية بألوان راقية وتشطيبات نظيفة تدوم طويلاً.",
        },
      },
      {
        icon: "ceiling",
        image: IMG.whiteKitchen,
        title: { tr: "Alçıpan & Kartonpiyer", en: "Drywall & Cornices", ar: "الجبس بورد والألتشبان" },
        text: {
          tr: "Gizli ışıklı asma tavan ve alçıpan duvar uygulamaları.",
          en: "Suspended ceilings with hidden lighting and drywall partitions.",
          ar: "أسقف مستعارة وجدران جبس بورد بتصاميم أنيقة مع إضاءة مخفية.",
        },
      },
      {
        icon: "kitchen",
        image: IMG.kitchen,
        title: { tr: "Mutfak Dolapları", en: "Kitchen Cabinets", ar: "المطابخ" },
        text: {
          tr: "Estetik ve kullanışlı, size özel tasarım mutfaklar.",
          en: "Bespoke kitchens that are as practical as they are beautiful.",
          ar: "مطابخ مصممة حسب الطلب تجمع بين الجمال وسهولة الاستخدام.",
        },
      },
      {
        icon: "tv",
        image: IMG.fireplaceTv,
        title: { tr: "TV Üniteleri", en: "TV Units", ar: "وحدات التلفزيون" },
        text: {
          tr: "Mermer, ahşap ve aydınlatmayla salonunuza değer katan TV duvarları.",
          en: "TV walls in marble, wood and light that elevate your living room.",
          ar: "جدران تلفزيون فاخرة برخام وخشب وإضاءة تُبرز جمال صالتكم.",
        },
      },
    ],
  },
  process: {
    title: { tr: "Çalışma Sürecimiz", en: "How We Work", ar: "مراحل العمل" },
    subtitle: {
      tr: "İlk görüşmeden anahtar teslimine kadar her adım net, planlı ve şeffaf.",
      en: "From the first meeting to handover, every step is clear, planned and transparent.",
      ar: "من اللقاء الأول حتى التسليم، كل خطوة واضحة ومخططة وشفافة.",
    },
    steps: [
      {
        image: IMG.living,
        title: { tr: "Keşif & Ölçüm", en: "Site Visit & Measuring", ar: "المعاينة والقياس" },
        text: {
          tr: "Mekânınızı yerinde inceliyor, ölçüleri alıyor ve beklentilerinizi dinliyoruz. Keşif ücretsizdir.",
          en: "We visit your space, take measurements and listen to what you want. The visit is free.",
          ar: "نعاين المكان على أرض الواقع، نأخذ القياسات ونستمع إلى تطلعاتكم. المعاينة مجانية.",
        },
      },
      {
        image: IMG.whiteKitchen,
        title: { tr: "Tasarım & Teklif", en: "Design & Quote", ar: "التصميم وعرض السعر" },
        text: {
          tr: "Zevkinize uygun tasarımı, malzeme seçeneklerini ve gizli maliyeti olmayan net fiyat teklifini birlikte belirliyoruz.",
          en: "Together we settle the design, the materials and a clear quote with no hidden costs.",
          ar: "نحدد معكم التصميم المناسب لذوقكم وخيارات الخامات وعرض سعر واضح دون تكاليف خفية.",
        },
      },
      {
        image: IMG.woodTv,
        title: { tr: "Uygulama", en: "Craftsmanship", ar: "التنفيذ" },
        text: {
          tr: "Uzman ekibimiz boya, alçıpan, mobilya ve montajı planlanan takvimde, temiz ve özenli şekilde uygular.",
          en: "Our skilled team handles painting, drywall, furniture and installation on schedule — cleanly and carefully.",
          ar: "ينفّذ فريقنا المتخصص الدهان والجبس بورد والموبيليا والتركيب حسب الجدول، بنظافة وعناية.",
        },
      },
      {
        image: IMG.fireplaceTv,
        title: { tr: "Teslim", en: "Handover", ar: "التسليم" },
        text: {
          tr: "Son kontrolleri yapıp mekânınızı tertemiz teslim ediyoruz. Huzur artık evinizde.",
          en: "After the final checks we hand over a spotless space. Calm has arrived at home.",
          ar: "بعد الفحص النهائي نسلّمكم المكان نظيفاً وجاهزاً. الهدوء الآن في منزلكم.",
        },
      },
    ],
  },
  why: {
    title: { tr: "Neden Huzur Dekor?", en: "Why Huzur Dekor?", ar: "لماذا Huzur Dekor؟" },
    subtitle: {
      tr: "İlk fikirden teslimata kadar yanınızdayız — zamanında teslim, şeffaf maliyet ve ödün vermediğimiz kalite anlayışıyla.",
      en: "We are with you from the first idea to handover — on time, with transparent costs and uncompromising quality.",
      ar: "نرافقكم من الفكرة الأولى حتى التسليم النهائي، بدقة في المواعيد وشفافية في التكلفة وجودة لا نساوم عليها.",
    },
    items: [
      {
        title: { tr: "Kaliteli Malzeme", en: "Quality Materials", ar: "جودة الخامات" },
        text: {
          tr: "Yıllarca dayanan sonuçlar için en iyi malzemeleri seçiyoruz.",
          en: "We choose the best materials for results that last for years.",
          ar: "نختار أفضل المواد لنتائج تدوم لسنوات.",
        },
      },
      {
        title: { tr: "Zamanında Teslim", en: "On-Time Delivery", ar: "التزام بالمواعيد" },
        text: {
          tr: "Net iş planı, söz verilen tarihte teslim.",
          en: "A clear work plan and delivery on the promised date.",
          ar: "خطة عمل واضحة وتسليم في الوقت المتفق عليه.",
        },
      },
      {
        title: { tr: "Şeffaf Fiyat", en: "Transparent Pricing", ar: "أسعار شفافة" },
        text: {
          tr: "Gizli maliyet olmadan, net fiyat teklifleri.",
          en: "Clear quotes with no hidden costs.",
          ar: "عروض أسعار واضحة دون أي تكاليف خفية.",
        },
      },
      {
        title: { tr: "Ücretsiz Keşif", en: "Free Site Visit", ar: "معاينة مجانية" },
        text: {
          tr: "Yerinde keşif ve danışmanlık için hiçbir ücret talep etmiyoruz.",
          en: "On-site consultation and measuring at no charge.",
          ar: "معاينة واستشارة في موقعكم دون أي رسوم.",
        },
      },
    ],
  },
  about: {
    title: { tr: "Huzur, Detaylarda Başlar", en: "Calm Begins in the Details", ar: "الهدوء يبدأ من التفاصيل" },
    intro: {
      tr: "Bize göre ev sadece duvarlardan ibaret değil; günlük hayatınızı kucaklayan bir yaşam alanıdır.",
      en: "To us, a home is more than walls — it is the space that embraces your everyday life.",
      ar: "نؤمن بأن المنزل ليس جدراناً فحسب، بل مساحة تحتضن حياتكم اليومية.",
    },
    story: {
      tr: "Huzur Dekor, Türkiye'de iç dekorasyon alanında uzman bir ekiptir. Bize göre ev sadece duvarlardan ibaret değil; günlük hayatınızı kucaklayan bir yaşam alanıdır.\n\nİlk fikirden teslimata kadar yanınızdayız — zamanında teslim, şeffaf maliyet ve ödün vermediğimiz kalite anlayışıyla. Boya, alçıpan, mutfak, TV ünitesi ve mobilyada tek ekip olarak çalışıyor, her projeyi kendi evimiz gibi sahipleniyoruz.",
      en: "Huzur Dekor is a team of interior specialists in Türkiye. To us, a home is more than walls — it is the space that embraces your everyday life.\n\nWe are with you from the first idea to handover — on time, with transparent costs and uncompromising quality. Painting, drywall, kitchens, TV units and furniture are handled by one team, and we treat every project as if it were our own home.",
      ar: "Huzur Dekor فريق متخصص في الديكور الداخلي في تركيا، نؤمن بأن المنزل ليس جدراناً فحسب، بل مساحة تحتضن حياتكم اليومية.\n\nنرافقكم من الفكرة الأولى حتى التسليم النهائي، بدقة في المواعيد وشفافية في التكلفة وجودة لا نساوم عليها. نعمل كفريق واحد في الدهان والجبس بورد والمطابخ ووحدات التلفزيون والموبيليا، ونتعامل مع كل مشروع كأنه بيتنا.",
    },
    quote: {
      tr: "Her evin bir hikâyesi var; biz o hikâyeye huzur katıyoruz.",
      en: "Every home has a story; we add calm to it.",
      ar: "لكل بيت حكاية، ونحن نضيف إليها الهدوء.",
    },
    mission: {
      tr: "Kaliteli malzeme, temiz işçilik ve dürüst fiyatla, her bütçeye yakışan şık yaşam alanları oluşturmak.",
      en: "To create elegant living spaces for every budget — with quality materials, clean workmanship and honest pricing.",
      ar: "أن نصنع مساحات معيشة أنيقة تناسب كل ميزانية، بخامات عالية الجودة وتنفيذ متقن وأسعار صادقة.",
    },
    image: IMG.marbleTv,
  },
  testimonials: {
    title: { tr: "Müşterilerimiz Ne Diyor?", en: "What Our Clients Say", ar: "ماذا يقول عملاؤنا؟" },
    // Add real client reviews from the host panel (Site İçerikleri → Müşteri Yorumları); the section stays hidden while empty.
    items: [],
  },
  cta: {
    title: { tr: "Projenize Bugün Başlayalım", en: "Let's Start Your Project Today", ar: "لنبدأ مشروعكم اليوم" },
    text: {
      tr: "WhatsApp veya e-posta üzerinden bize ulaşın; ücretsiz keşif ve danışmanlık için en kısa sürede dönüş yapalım.",
      en: "Reach us on WhatsApp or by email — we'll get back to you quickly for a free visit and consultation.",
      ar: "راسلونا على واتساب أو عبر البريد الإلكتروني، وسنعود إليكم بأسرع وقت مع استشارة مجانية.",
    },
    button: { tr: "Ücretsiz Teklif Alın", en: "Get a Free Quote", ar: "اطلب عرض سعر مجاني" },
    image: IMG.whiteKitchen,
  },
  brand: {
    tagline: { tr: "Kaliteyi Evinize Taşıyoruz", en: "We Bring Quality Home", ar: "ننقل الجودة إلى منزلكم" },
    footerText: {
      tr: "İç dekorasyon, mobilya, boya, alçıpan, mutfak ve TV ünitelerinde anahtar teslim çözümler.",
      en: "Turnkey solutions in interior design, furniture, painting, drywall, kitchens and TV units.",
      ar: "حلول متكاملة في الديكور الداخلي والموبيليا والدهان والجبس بورد والمطابخ ووحدات التلفزيون.",
    },
  },
  contact: {
    whatsapp: "+90 545 414 46 17",
    phone: "+90 545 414 46 17",
    email: "huzur.dekor111@gmail.com",
    address: { tr: "", en: "", ar: "" },
    hours: { tr: "", en: "", ar: "" },
    mapUrl: "",
    instagram: "https://www.instagram.com/huzur_dekor1",
    facebook: "",
    youtube: "",
    tiktok: "",
  },
  seo: {
    title: {
      tr: "Huzur Dekor — Kaliteyi Evinize Taşıyoruz",
      en: "Huzur Dekor — We Bring Quality Home",
      ar: "Huzur Dekor — ننقل الجودة إلى منزلكم",
    },
    description: {
      tr: "Huzur Dekor — İç dekorasyon, mobilya, boya, alçıpan, mutfak dolabı ve TV ünitesi. Ücretsiz keşif ve şeffaf fiyat teklifi.",
      en: "Huzur Dekor — interior design, furniture, painting, drywall, kitchen cabinets and TV units. Free site visit and transparent quotes.",
      ar: "Huzur Dekor — ديكورات داخلية، موبيليا، دهان، جبس بورد، مطابخ ووحدات تلفزيون. معاينة مجانية وعروض أسعار شفافة.",
    },
  },
};

export const defaultCategories: CategoryDTO[] = [
  { id: "cat-mutfak", slug: "mutfak", name: { tr: "Mutfak", en: "Kitchens", ar: "المطابخ" }, sortOrder: 0 },
  { id: "cat-tv", slug: "tv-uniteleri", name: { tr: "TV Üniteleri", en: "TV Units", ar: "وحدات التلفزيون" }, sortOrder: 1 },
  { id: "cat-salon", slug: "salon", name: { tr: "Salon & Oturma", en: "Living Rooms", ar: "الصالونات" }, sortOrder: 2 },
];

export type SeedProject = Omit<ProjectDTO, "id" | "visible" | "sortOrder" | "categoryId"> & { categorySlug: string };

export const defaultProjects: SeedProject[] = [
  {
    slug: "somine-efektli-tv-duvari",
    categorySlug: "tv-uniteleri",
    title: { tr: "Şömine Efektli TV Duvarı", en: "TV Wall with Fireplace Effect", ar: "جدار تلفزيون بتأثير المدفأة" },
    description: {
      tr: "Gri lambri paneller, mermer görünümlü zemin ve gizli LED aydınlatmayla tamamlanan TV duvarı. Yan tarafta ışıklı açık raf ünitesi ve asma alt dolap.",
      en: "A TV wall finished with grey slatted panels, a marble-look backdrop and hidden LED lighting, with a lit open shelving tower and a floating base cabinet.",
      ar: "جدار تلفزيون بألواح شرائحية رمادية وخلفية بمظهر الرخام وإضاءة LED مخفية، مع وحدة رفوف مضاءة وخزانة سفلية معلقة.",
    },
    location: "",
    year: "",
    images: [IMG.fireplaceTv],
    featured: true,
  },
  {
    slug: "modern-mutfak",
    categorySlug: "mutfak",
    title: { tr: "Modern Beyaz Mutfak", en: "Modern White Kitchen", ar: "مطبخ أبيض عصري" },
    description: {
      tr: "Beyaz kapaklı dolaplar, ışıklı cam üst dolaplar ve mermer desenli tezgâhla ferah bir mutfak. Asma tavan ve gizli ışık detaylarıyla tamamlandı.",
      en: "A bright kitchen with white cabinet doors, illuminated glass wall units and a marble-pattern worktop, finished with a suspended ceiling and hidden lighting.",
      ar: "مطبخ رحب بخزائن بيضاء وخزائن علوية زجاجية مضاءة وسطح عمل بنقشة الرخام، مع سقف مستعار وإضاءة مخفية.",
    },
    location: "",
    year: "",
    images: [IMG.kitchen],
    featured: true,
  },
  {
    slug: "mermer-tv-unitesi",
    categorySlug: "tv-uniteleri",
    title: { tr: "Mermer Panelli TV Ünitesi", en: "Marble-Panel TV Unit", ar: "وحدة تلفزيون بلوح رخامي" },
    description: {
      tr: "Mermer görünümlü panel, dikey lambri ve arkadan aydınlatmayla zarif bir TV duvarı; çıta detaylı duvarlar ve spot aydınlatmalı asma tavan.",
      en: "An elegant TV wall with a marble-look panel, vertical slats and backlighting, framed by moulded walls and a suspended ceiling with spotlights.",
      ar: "جدار تلفزيون أنيق بلوح بمظهر الرخام وشرائح عمودية وإضاءة خلفية، مع جدران بزخارف وسقف مستعار بإضاءة سبوت.",
    },
    location: "",
    year: "",
    images: [IMG.marbleTv],
    featured: true,
  },
  {
    slug: "beyaz-l-mutfak",
    categorySlug: "mutfak",
    title: { tr: "Klasik Beyaz L Mutfak", en: "Classic White L-Shaped Kitchen", ar: "مطبخ أبيض كلاسيكي على شكل L" },
    description: {
      tr: "Çerçeveli kapaklar, vitrinli üst dolaplar ve boy dolaplarıyla geniş L mutfak. Kartonpiyerli asma tavan ve spot aydınlatma.",
      en: "A spacious L-shaped kitchen with framed doors, glass-front wall units and tall cabinets, under a corniced ceiling with spotlights.",
      ar: "مطبخ واسع على شكل L بأبواب مؤطرة وخزائن علوية بواجهات زجاجية وخزائن طويلة، مع سقف بكورنيش وإضاءة سبوت.",
    },
    location: "",
    year: "",
    images: [IMG.whiteKitchen],
    featured: true,
  },
  {
    slug: "ahsap-lambri-tv-duvari",
    categorySlug: "tv-uniteleri",
    title: { tr: "Ahşap Lambri TV Duvarı", en: "Wood-Slat TV Wall", ar: "جدار تلفزيون بشرائح خشبية" },
    description: {
      tr: "Ceviz tonlu ahşap lambri, mermer panel ve gizli LED ile sıcak bir salon duvarı; cam kapaklı vitrin ve alçak TV sehpası.",
      en: "A warm living-room wall in walnut-tone slats with a marble panel and hidden LEDs, a glass-door display cabinet and a low TV console.",
      ar: "جدار صالة دافئ بشرائح خشبية بلون الجوز ولوح رخامي وإضاءة LED مخفية، مع خزانة عرض بأبواب زجاجية وطاولة تلفزيون منخفضة.",
    },
    location: "",
    year: "",
    images: [IMG.woodTv],
    featured: false,
  },
  {
    slug: "salon-oturma-grubu",
    categorySlug: "salon",
    title: { tr: "Salon & Oturma Grubu", en: "Living Room & Seating", ar: "صالون وطقم جلوس" },
    description: {
      tr: "Adaçayı yeşili duvar, kadife oturma grubu ve ahşap detaylarla sıcak, davetkâr bir oturma alanı.",
      en: "A warm, inviting living area with a sage-green wall, a velvet sofa set and wooden details.",
      ar: "مساحة جلوس دافئة ومرحّبة بجدار أخضر هادئ وطقم كنب مخملي وتفاصيل خشبية.",
    },
    location: "",
    year: "",
    images: [IMG.living],
    featured: false,
  },
];

/** Converts seed projects into DTOs (used as a fallback when the database is unreachable) */
export function fallbackProjects(): ProjectDTO[] {
  return defaultProjects.map((p, i) => {
    const { categorySlug, ...rest } = p;
    return {
      ...rest,
      id: `fallback-${p.slug}`,
      visible: true,
      sortOrder: i,
      categoryId: defaultCategories.find((c) => c.slug === categorySlug)?.id ?? null,
    };
  });
}
