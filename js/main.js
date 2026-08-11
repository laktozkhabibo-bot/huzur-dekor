/* ═══════════════════════════════════════════
   Huzur Dekor — i18n (TR / AR) + content layer
   Default language: Türkçe
   ═══════════════════════════════════════════ */

/* Fallback content — used when content.json is missing or unreachable.
   content.json is the source of truth edited by the control panel. */
const FALLBACK = {
  brand: { name: "HUZUR", sub: "DEKOR", full: "HUZUR DEKOR" },
  images: {
    logo: "assets/logo.svg",
    logoMark: "assets/logo-mark.svg",
    favicon: "assets/logo-mark.svg",
    ogImage: "assets/logo.svg",
    gallery1: "assets/gallery-1.jpg",
    gallery2: "assets/gallery-2.jpg",
    gallery3: "assets/gallery-3.jpg",
    gallery4: "assets/gallery-4.jpg",
    gallery5: "assets/gallery-5.jpg",
    gallery6: "assets/gallery-6.jpg",
  },
  contact: {
    phoneDisplay: "+90 545 414 46 17",
    phoneRaw: "905454144617",
    email: "huzur.dekor111@gmail.com",
    instagram: "huzur_dekor1",
  },
  theme: {
    gold: "#b8892f",
    goldSoft: "#cfa858",
    cream: "#f7f2e9",
    creamDeep: "#f0e9dc",
    ink: "#2e2e2e",
  },
  meta: {
    titleTr: "Huzur Dekor — Kaliteyi Evinize Taşıyoruz",
    titleAr: "Huzur Dekor — ننقل الجودة إلى منزلكم",
    descTr: "Huzur Dekor — İç dekorasyon, boya, mobilya, alçıpan",
    descAr: "Huzur Dekor — ديكورات داخلية، دهان، موبيليا، جبس بورد",
  },
  text: {
    ar: {
      "nav.home": "الرئيسية",
      "nav.services": "خدماتنا",
      "nav.gallery": "أعمالنا",
      "nav.about": "من نحن",
      "nav.contact": "تواصل معنا",
      "hero.kicker": "ديكورات داخلية فاخرة",
      "hero.title": "ننقل الجودة إلى منزلكم",
      "hero.lede": "في Huzur Dekor نحوّل مساحاتكم إلى أماكن تنبض بالراحة والأناقة — من الدهان إلى الموبيليا، ومن الجبس بورد إلى أدق تفاصيل الديكور الداخلي.",
      "hero.cta1": "اطلب عرض سعر",
      "hero.cta2": "شاهد أعمالنا",
      "services.kicker": "خدماتنا",
      "services.title": "كل ما يحتاجه منزلك في مكان واحد",
      "services.s1.title": "الديكور الداخلي",
      "services.s1.desc": "تصميم وتنفيذ متكامل للمساحات الداخلية بلمسة فاخرة تناسب ذوقكم.",
      "services.s2.title": "الموبيليا",
      "services.s2.desc": "تصنيع وتركيب موبيليا عصرية وكلاسيكية بجودة عالية وخامات متينة.",
      "services.s3.title": "الدهان",
      "services.s3.desc": "دهانات داخلية بألوان راقية وتشطيبات نظيفة تدوم طويلاً.",
      "services.s4.title": "الجبس بورد والألتشبان",
      "services.s4.desc": "أسقف مستعارة وجدران جبس بورد بتصاميم أنيقة مع إضاءة مخفية.",
      "services.s5.title": "المطابخ",
      "services.s5.desc": "مطابخ مصممة حسب الطلب تجمع بين الجمال وسهولة الاستخدام.",
      "services.s6.title": "وحدات التلفزيون",
      "services.s6.desc": "جدران تلفزيون فاخرة برخام وخشب وإضاءة تُبرز جمال صالتكم.",
      "gallery.kicker": "معرض الأعمال",
      "gallery.title": "بعض أعمالنا",
      "about.kicker": "من نحن",
      "about.title": "الهدوء يبدأ من التفاصيل",
      "about.p1": "Huzur Dekor فريق متخصص في الديكور الداخلي في تركيا، نؤمن بأن المنزل ليس جدراناً فحسب، بل مساحة تحتضن حياتكم اليومية.",
      "about.p2": "نرافقكم من الفكرة الأولى حتى التسليم النهائي، بدقة في المواعيد وشفافية في التكلفة وجودة لا نساوم عليها.",
      "about.v1.title": "جودة الخامات",
      "about.v1.desc": "نختار أفضل المواد لنتائج تدوم لسنوات.",
      "about.v2.title": "التزام بالمواعيد",
      "about.v2.desc": "خطة عمل واضحة وتسليم في الوقت المتفق عليه.",
      "about.v3.title": "أسعار شفافة",
      "about.v3.desc": "عروض أسعار واضحة دون أي تكاليف خفية.",
      "contact.kicker": "تواصل معنا",
      "contact.title": "لنبدأ مشروعكم اليوم",
      "contact.lede": "راسلونا على واتساب أو عبر البريد الإلكتروني، وسنعود إليكم بأسرع وقت مع استشارة مجانية.",
      "contact.whatsapp": "واتساب",
      "contact.email": "البريد الإلكتروني",
      "contact.instagram": "إنستغرام",
      "contact.phone": "اتصال مباشر",
      "footer.slogan": "ننقل الجودة إلى منزلكم",
      "footer.rights": "جميع الحقوق محفوظة",
    },
    tr: {
      "nav.home": "Ana Sayfa",
      "nav.services": "Hizmetlerimiz",
      "nav.gallery": "Projelerimiz",
      "nav.about": "Hakkımızda",
      "nav.contact": "İletişim",
      "hero.kicker": "Lüks İç Dekorasyon",
      "hero.title": "Kaliteyi Evinize Taşıyoruz",
      "hero.lede": "Huzur Dekor olarak yaşam alanlarınızı huzur ve şıklıkla buluşturuyoruz — boyadan mobilyaya, alçıpandan iç dekorasyonun en ince detayına kadar.",
      "hero.cta1": "Teklif Alın",
      "hero.cta2": "Projelerimiz",
      "services.kicker": "Hizmetlerimiz",
      "services.title": "Eviniz İçin Her Şey Tek Çatı Altında",
      "services.s1.title": "İç Dekorasyon",
      "services.s1.desc": "Zevkinize uygun, baştan sona lüks iç mekân tasarımı ve uygulaması.",
      "services.s2.title": "Mobilya",
      "services.s2.desc": "Dayanıklı malzemelerle modern ve klasik mobilya üretimi ve montajı.",
      "services.s3.title": "Boya & Badana",
      "services.s3.desc": "Şık renkler ve uzun ömürlü, temiz iç cephe boya uygulamaları.",
      "services.s4.title": "Alçıpan & Kartonpiyer",
      "services.s4.desc": "Gizli ışıklı asma tavan ve alçıpan duvar uygulamaları.",
      "services.s5.title": "Mutfak Dolapları",
      "services.s5.desc": "Estetik ve kullanışlı, size özel tasarım mutfaklar.",
      "services.s6.title": "TV Üniteleri",
      "services.s6.desc": "Mermer, ahşap ve aydınlatmayla salonunuza değer katan TV duvarları.",
      "gallery.kicker": "Galeri",
      "gallery.title": "Bazı Çalışmalarımız",
      "about.kicker": "Hakkımızda",
      "about.title": "Huzur, Detaylarda Başlar",
      "about.p1": "Huzur Dekor, Türkiye'de iç dekorasyon alanında uzman bir ekiptir. Bize göre ev sadece duvarlardan ibaret değil; günlük hayatınızı kucaklayan bir yaşam alanıdır.",
      "about.p2": "İlk fikirden teslimata kadar yanınızdayız — zamanında teslim, şeffaf maliyet ve ödün vermediğimiz kalite anlayışıyla.",
      "about.v1.title": "Kaliteli Malzeme",
      "about.v1.desc": "Yıllarca dayanan sonuçlar için en iyi malzemeleri seçiyoruz.",
      "about.v2.title": "Zamanında Teslim",
      "about.v2.desc": "Net iş planı, söz verilen tarihte teslim.",
      "about.v3.title": "Şeffaf Fiyat",
      "about.v3.desc": "Gizli maliyet olmadan, net fiyat teklifleri.",
      "contact.kicker": "İletişim",
      "contact.title": "Projenize Bugün Başlayalım",
      "contact.lede": "WhatsApp veya e-posta üzerinden bize ulaşın; ücretsiz keşif ve danışmanlık için en kısa sürede dönüş yapalım.",
      "contact.whatsapp": "WhatsApp",
      "contact.email": "E-posta",
      "contact.instagram": "Instagram",
      "contact.phone": "Telefon",
      "footer.slogan": "Kaliteyi Evinize Taşıyoruz",
      "footer.rights": "Tüm hakları saklıdır",
    },
  },
};

let CONTENT = JSON.parse(JSON.stringify(FALLBACK));

/* ── helpers ── */
const el = (sel) => document.querySelector(sel);
const els = (sel) => document.querySelectorAll(sel);

function merge(base, over) {
  if (!over || typeof over !== "object") return base;
  const out = Array.isArray(base) ? base.slice() : { ...base };
  for (const [k, v] of Object.entries(over)) {
    if (v === undefined || v === null || v === "") continue;
    out[k] = v && typeof v === "object" && !Array.isArray(v) ? merge(base[k] || {}, v) : v;
  }
  return out;
}

function hexToRgba(hex, alpha) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
  if (!m) return `rgba(184, 137, 47, ${alpha})`;
  const [r, g, b] = [1, 2, 3].map((i) => parseInt(m[i], 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function setAttrAll(selector, attr, value) {
  if (!value) return;
  els(selector).forEach((node) => node.setAttribute(attr, value));
}

/* ── apply non-text content: images, links, colors, meta ── */
function applyContent(c) {
  const img = c.images || {};
  const contact = c.contact || {};
  const brand = c.brand || {};
  const theme = c.theme || {};

  // images
  Object.entries(img).forEach(([key, src]) => {
    if (!src) return;
    els(`[data-c="${key}"]`).forEach((node) => {
      if (node.tagName === "IMG") {
        node.onerror = null;
        node.src = src;
      }
    });
  });

  // favicon + social preview
  if (img.favicon) {
    ["#favicon", "#appleIcon"].forEach((sel) => {
      const node = el(sel);
      if (!node) return;
      node.href = img.favicon;
      if (sel === "#favicon") {
        node.type = img.favicon.startsWith("data:image/png")
          ? "image/png"
          : img.favicon.startsWith("data:image/jpeg")
          ? "image/jpeg"
          : img.favicon.endsWith(".svg") || img.favicon.startsWith("data:image/svg")
          ? "image/svg+xml"
          : "image/png";
      }
    });
  }
  if (img.ogImage && el("#ogImage")) el("#ogImage").content = img.ogImage;

  // brand wordmark
  if (brand.name) setTextAll('[data-c="brandName"]', brand.name);
  if (brand.sub) setTextAll('[data-c="brandSub"]', brand.sub);
  if (brand.full) setTextAll('[data-c="brandFull"]', brand.full);

  // contact links + labels
  if (contact.phoneRaw) {
    setAttrAll('[data-c="waLink"]', "href", `https://wa.me/${contact.phoneRaw}`);
    setAttrAll('[data-c="telLink"]', "href", `tel:+${contact.phoneRaw}`);
  }
  if (contact.phoneDisplay) setTextAll('[data-c="phoneText"]', contact.phoneDisplay);
  if (contact.email) {
    setAttrAll('[data-c="mailLink"]', "href", `mailto:${contact.email}`);
    setTextAll('[data-c="emailText"]', contact.email);
  }
  if (contact.instagram) {
    const handle = contact.instagram.replace(/^@/, "");
    setAttrAll('[data-c="igLink"]', "href", `https://instagram.com/${handle}`);
    setTextAll('[data-c="igText"]', "@" + handle);
  }

  // theme colours
  const root = document.documentElement.style;
  if (theme.gold) {
    root.setProperty("--gold", theme.gold);
    root.setProperty("--gold-faint", hexToRgba(theme.gold, 0.14));
  }
  if (theme.goldSoft) root.setProperty("--gold-soft", theme.goldSoft);
  if (theme.cream) {
    root.setProperty("--cream", theme.cream);
    const themeMeta = el('meta[name="theme-color"]');
    if (themeMeta) themeMeta.content = theme.cream;
  }
  if (theme.creamDeep) root.setProperty("--cream-deep", theme.creamDeep);
  if (theme.ink) root.setProperty("--ink", theme.ink);
}

function setTextAll(selector, value) {
  els(selector).forEach((node) => (node.textContent = value));
}

/* ── language ── */
const langSwitch = el("#langSwitch");

function applyLang(lang, animate = true) {
  const dict = (CONTENT.text && CONTENT.text[lang]) || FALLBACK.text[lang];
  const meta = CONTENT.meta || FALLBACK.meta;

  const swap = () => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = lang === "ar" ? meta.titleAr : meta.titleTr;
    const desc = lang === "ar" ? meta.descAr : meta.descTr;
    if (el("#metaDesc") && desc) el("#metaDesc").content = desc;
    if (el("#ogTitle")) el("#ogTitle").content = document.title;
    if (el("#ogDesc") && desc) el("#ogDesc").content = desc;

    els("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (dict[key] !== undefined) node.textContent = dict[key];
    });

    langSwitch.dataset.active = lang;
    langSwitch.querySelectorAll(".lang-opt").forEach((opt) => {
      opt.classList.toggle("active", opt.dataset.lang === lang);
    });
    try {
      localStorage.setItem("huzur-lang", lang);
    } catch (e) {}
  };

  if (animate) {
    document.body.classList.add("lang-fading");
    setTimeout(() => {
      swap();
      requestAnimationFrame(() => document.body.classList.remove("lang-fading"));
    }, 220);
  } else {
    swap();
  }
}

function currentLang() {
  return document.documentElement.lang === "ar" ? "ar" : "tr";
}

langSwitch.addEventListener("click", () => {
  applyLang(currentLang() === "ar" ? "tr" : "ar");
});

/* ── boot ── */
async function boot() {
  try {
    const res = await fetch("content.json", { cache: "no-store" });
    if (res.ok) CONTENT = merge(FALLBACK, await res.json());
  } catch (e) {
    /* offline / file:// — fallback content stays in place */
  }
  applyContent(CONTENT);

  let saved = null;
  try {
    saved = localStorage.getItem("huzur-lang");
  } catch (e) {}
  applyLang(saved === "ar" || saved === "tr" ? saved : "tr", false);
}

/* live preview from the control panel */
window.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.type !== "huzur:content" || !data.content) return;
  CONTENT = merge(FALLBACK, data.content);
  applyContent(CONTENT);
  applyLang(data.lang || currentLang(), false);
});

boot();

/* ── header shadow on scroll ── */
const header = el("#siteHeader");
window.addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", window.scrollY > 10),
  { passive: true }
);

/* ── mobile menu ── */
const menuBtn = el("#menuBtn");
const mainNav = el("#mainNav");

const setHeaderHeight = () =>
  document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
setHeaderHeight();
window.addEventListener("resize", setHeaderHeight, { passive: true });

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  mainNav.classList.toggle("open");
});
mainNav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menuBtn.classList.remove("open");
    mainNav.classList.remove("open");
  })
);

/* ── reveal on scroll ── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
els(".reveal").forEach((node) => observer.observe(node));

/* ── footer year ── */
el("#year").textContent = new Date().getFullYear();
