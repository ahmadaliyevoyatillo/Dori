// db.js - Dori.uz Ma'lumotlar bazasi va localStorage boshqaruvi

// 1. Boshlang'ich dorilar ma'lumotlar bazasi
const INITIAL_MEDICINES = [
  {
    id: "med-1",
    name: { uz: "Paratsetamol", en: "Paracetamol" },
    image: "med_paracetamol.jpg",
    description: {
      uz: "Isitma tushiruvchi va og'riq qoldiruvchi keng tarqalgan dori vositasi. Shamollash, bosh og'rig'i va tish og'rig'ida qo'llaniladi.",
      en: "A widely used painkiller and fever reducer. Used for colds, headaches, and toothaches."
    },
    usage: {
      uz: "Kattalar uchun 500 mg dan 1000 mg gacha kuniga 3-4 marta. Ovqatdan keyin ichish tavsiya etiladi. Kunlik maksimal doza 4 g (4000 mg) dan oshmasligi kerak.",
      en: "For adults: 500 mg to 1000 mg, 3-4 times a day after meals. Maximum daily dose should not exceed 4 g (4000 mg)."
    },
    dosage: {
      uz: "500 mg planshetlar, paketlar yoki bolalar uchun sirop shaklida.",
      en: "500 mg tablets, sachets, or syrup for children."
    },
    sideEffects: {
      uz: "Kam hollarda allergiya, ko'ngil aynishi yoki uzoq muddat ko'p miqdorda ichilganda jigar faoliyati buzilishi mumkin.",
      en: "Rarely allergy, nausea, or liver dysfunction if taken in large quantities for a long period."
    },
    warnings: {
      uz: "Jigar kasalliklari bor bemorlar va alkogol iste'mol qilganda ehtiyot bo'lish zarur. Boshqa paratsetamol saqlovchi dorilar bilan birga ichmang.",
      en: "Caution in patients with liver disease and when consuming alcohol. Do not take with other paracetamol-containing medications."
    },
    manufacturer: { uz: "Nobel Pharmsanoat, O'zbekiston", en: "Nobel Pharmsanoat, Uzbekistan" },
    price: 3500, // UZS
    type: { uz: "Og'riq qoldiruvchi / Isitma tushiruvchi", en: "Analgesic / Antipyretic" },
    category: "painkillers",
    prescription: false, // OTC (retseptsiz)
    rating: 4.8,
    views: 1240,
    createdDate: "2026-05-10"
  },
  {
    id: "med-2",
    name: { uz: "Amoksitsillin", en: "Amoxicillin" },
    image: "med_amoxicillin.jpg",
    description: {
      uz: "Keng ta'sir doirasiga ega penisillin guruhidagi antibiotik. Nafas yo'llari, quloq, tomoq va siydik yo'llari infeksiyalarini davolashda ishlatiladi.",
      en: "A broad-spectrum penicillin-type antibiotic. Used to treat respiratory tract, ear, throat, and urinary tract infections."
    },
    usage: {
      uz: "Faqat shifokor tavsiyasi bilan. Kattalar uchun odatda 500 mg dan kuniga 3 marta, 7-10 kun davomida. Kursni oxirigacha tugatish shart.",
      en: "Only by doctor's prescription. For adults: usually 500 mg 3 times a day for 7-10 days. The course must be fully completed."
    },
    dosage: {
      uz: "250 mg va 500 mg kapsulalar, suspenziya tayyorlash uchun kukun.",
      en: "250 mg and 500 mg capsules, powder for suspension."
    },
    sideEffects: {
      uz: "Diareya (ich ketishi), ko'ngil aynishi, teri toshmasi (allergiya) va disbakterioz.",
      en: "Diarrhea, nausea, skin rash (allergy), and dysbacteriosis."
    },
    warnings: {
      uz: "Penisillinga allergiyasi bor shaxslarga mutlaqo mumkin emas. Homiladorlikda shifokor nazorati ostida qo'llansin.",
      en: "Contraindicated in individuals with penicillin allergy. Use under medical supervision during pregnancy."
    },
    manufacturer: { uz: "Jurabek Laboratories, O'zbekiston", en: "Jurabek Laboratories, Uzbekistan" },
    price: 18000,
    type: { uz: "Antibiotik", en: "Antibiotic" },
    category: "antibiotics",
    prescription: true, // Retseptli
    rating: 4.5,
    views: 980,
    createdDate: "2026-04-20"
  },
  {
    id: "med-3",
    name: { uz: "Ibuprofen", en: "Ibuprofen" },
    image: "med_ibuprofen.jpg",
    description: {
      uz: "Yallig'lanishga qarshi nosteroid dori (YAQND). Og'riqni qoldiradi, shishlarni kamaytiradi va tana haroratini tushiradi.",
      en: "Non-steroidal anti-inflammatory drug (NSAID). Relieves pain, reduces swelling, and lowers body temperature."
    },
    usage: {
      uz: "Kattalar uchun 200-400 mg dan kuniga 3 marta ovqatdan so'ng. Oshqozonni himoya qilish uchun ko'p suv bilan iching.",
      en: "For adults: 200-400 mg 3 times a day after meals. Take with plenty of water to protect the stomach."
    },
    dosage: {
      uz: "200 mg, 400 mg planshetlar va bolalar uchun sirop.",
      en: "200 mg, 400 mg tablets, and suspension for children."
    },
    sideEffects: {
      uz: "Oshqozon og'rig'i, jig'ildon qaynashi, bosh aylanishi, kam hollarda oshqozon yarasi.",
      en: "Stomach pain, heartburn, dizziness, rarely stomach ulcers."
    },
    warnings: {
      uz: "Oshqozon yarasi bor bemorlarga tavsiya etilmaydi. Yurak-qon tomir kasalliklarida shifokor bilan maslahatlashing.",
      en: "Not recommended for patients with stomach ulcers. Consult a doctor in case of cardiovascular diseases."
    },
    manufacturer: { uz: "Berlin-Chemie, Germaniya", en: "Berlin-Chemie, Germany" },
    price: 12500,
    type: { uz: "Yallig'lanishga qarshi / Og'riq qoldiruvchi", en: "Anti-inflammatory / Analgesic" },
    category: "painkillers",
    prescription: false,
    rating: 4.7,
    views: 1120,
    createdDate: "2026-05-15"
  },
  {
    id: "med-4",
    name: { uz: "Kaptopril", en: "Captopril" },
    image: "med_captopril.jpg",
    description: {
      uz: "Arterial qon bosimini tushiruvchi dori (APF ingibitori). Gipertoniya va yurak etishmovchiligida kriz holatida tez yordam sifatida qo'llaniladi.",
      en: "An ACE inhibitor that lowers arterial blood pressure. Used as emergency care in hypertension crises and heart failure."
    },
    usage: {
      uz: "Bosim oshganda 25 mg planshet til ostiga qo'yiladi. Kunlik doza shifokor tomonidan individual belgilanadi.",
      en: "In case of high blood pressure, place a 25 mg tablet under the tongue. Daily dose is determined individually by a doctor."
    },
    dosage: {
      uz: "25 mg va 50 mg planshetlar.",
      en: "25 mg and 50 mg tablets."
    },
    sideEffects: {
      uz: "Quruq yo'tal, qon bosimining keskin tushib ketishi, bosh aylanishi, ta'm bilishning buzilishi.",
      en: "Dry cough, sharp drop in blood pressure, dizziness, taste disturbance."
    },
    warnings: {
      uz: "Homiladorlikda mutlaqo mumkin emas. Buyrak faoliyati buzilgan bo'lsa ehtiyotkorlik bilan qo'llansin.",
      en: "Absolutely contraindicated during pregnancy. Use with caution in case of renal impairment."
    },
    manufacturer: { uz: "Krasnofarma, Rossiya", en: "Krasnofarma, Russia" },
    price: 6000,
    type: { uz: "Gipotenziv dori (Bosim tushiruvchi)", en: "Antihypertensive" },
    category: "cardio",
    prescription: true,
    rating: 4.4,
    views: 850,
    createdDate: "2026-03-10"
  },
  {
    id: "med-5",
    name: { uz: "Aspirin (Kardiomagnil)", en: "Aspirin (Cardiomagnyl)" },
    image: "med_cardiomagnyl.jpg",
    description: {
      uz: "Qonni suyultiruvchi va tromblar hosil bo'lishining oldini oluvchi vosita. Infarkt va insult profilaktikasida keng qo'llaniladi.",
      en: "A blood thinner that prevents clot formation. Widely used for the prevention of heart attack and stroke."
    },
    usage: {
      uz: "Profilaktika maqsadida kuniga 1 marta 75 mg yoki 150 mg kechki ovqatdan keyin, ko'p suv bilan ichiladi.",
      en: "For prevention: 75 mg or 150 mg once a day after dinner, with plenty of water."
    },
    dosage: {
      uz: "75 mg va 150 mg qobiq bilan qoplangan planshetlar.",
      en: "75 mg and 150 mg film-coated tablets."
    },
    sideEffects: {
      uz: "Oshqozon shilliq qavatining ta'sirlanishi, qon ketish xavfi ortishi, allergiya.",
      en: "Irritation of the gastric mucosa, increased risk of bleeding, allergy."
    },
    warnings: {
      uz: "Oshqozon-ichakdan qon ketish tendensiyasi bor shaxslarga, gemofiliyada va 18 yoshgacha bo'lgan bolalarga mumkin emas.",
      en: "Contraindicated in individuals with gastrointestinal bleeding tendencies, hemophilia, and children under 18."
    },
    manufacturer: { uz: "Takeda, Yaponiya/Daniya", en: "Takeda, Japan/Denmark" },
    price: 32000,
    type: { uz: "Antiagregant (Qon suyultiruvchi)", en: "Antiplatelet (Blood thinner)" },
    category: "cardio",
    prescription: false,
    rating: 4.9,
    views: 1420,
    createdDate: "2026-05-01"
  },
  {
    id: "med-6",
    name: { uz: "Mezim Forte", en: "Mezim Forte" },
    image: "med_mezim.jpg",
    description: {
      uz: "Oshqozon osti bezi fermenti etishmovchiligida ovqat hazm qilishni yaxshilovchi fermentativ preparat.",
      en: "An enzyme preparation that improves digestion in case of pancreatic enzyme deficiency."
    },
    usage: {
      uz: "Ovqatlanish vaqtida yoki undan keyin darhol 1-2 tabletka chaynashsiz, ko'p miqdorda suv bilan yutiladi.",
      en: "Take 1-2 tablets during or immediately after meals without chewing, with plenty of water."
    },
    dosage: {
      uz: "Pankreatin faolligi bilan qoplangan tabletkalar (Mezim 10000 yoki Mezim 20000).",
      en: "Coated tablets with pancreatin activity (Mezim 10000 or Mezim 20000)."
    },
    sideEffects: {
      uz: "Juda kam hollarda allergik reaksiyalar, uzoq vaqt haddan tashqari ko'p ichilganda qonda siydik kislotasi oshishi.",
      en: "Very rarely allergic reactions, increased uric acid in blood if taken in excess for long periods."
    },
    warnings: {
      uz: "O'tkir pankreatit yoki surunkali pankreatitning kuchayishi davrida qo'llash tavsiya etilmaydi.",
      en: "Not recommended during acute pancreatitis or exacerbation of chronic pancreatitis."
    },
    manufacturer: { uz: "Berlin-Chemie, Germaniya", en: "Berlin-Chemie, Germany" },
    price: 24000,
    type: { uz: "Ferment preparati (Ovqat hazm qilish)", en: "Enzyme preparation (Digestion)" },
    category: "digestive",
    prescription: false,
    rating: 4.6,
    views: 1090,
    createdDate: "2026-05-08"
  },
  {
    id: "med-7",
    name: { uz: "Askorbin kislotasi (Vitamin C)", en: "Ascorbic Acid (Vitamin C)" },
    image: "med_vitaminc.jpg",
    description: {
      uz: "Kuchli antioksidant va immunitetni mustahkamlovchi vitamin. Shamollashlarning oldini olish va organizm tonusini oshirishda yordam beradi.",
      en: "A powerful antioxidant and immune booster. Helps prevent colds and increase overall body tone."
    },
    usage: {
      uz: "Profilaktika uchun kattalarga kuniga 50-100 mg, davolash uchun 500 mg gacha ovqatdan keyin.",
      en: "For prevention: 50-100 mg daily for adults. For treatment: up to 500 mg daily after meals."
    },
    dosage: {
      uz: "50 mg planshetlar, 500 mg va 1000 mg shivirlovchi (ko'pikli) planshetlar.",
      en: "50 mg tablets, 500 mg and 1000 mg effervescent tablets."
    },
    sideEffects: {
      uz: "Katta dozalarda oshqozonning kislotaliligini oshishi, buyrakda tosh paydo bo'lish xavfi.",
      en: "In large doses, increases stomach acidity, risk of kidney stones."
    },
    warnings: {
      uz: "Qandli diabetda (agar shakar saqlasa) va buyrak toshi kasalligida ehtiyotkorlik bilan ichiladi.",
      en: "Use with caution in diabetes (if contains sugar) and kidney stone disease."
    },
    manufacturer: { uz: "Uzpharmsanoat, O'zbekiston", en: "Uzpharmsanoat, Uzbekistan" },
    price: 5000,
    type: { uz: "Vitamin / Immunostimulyator", en: "Vitamin / Immune Stimulator" },
    category: "vitamins",
    prescription: false,
    rating: 4.9,
    views: 1540,
    createdDate: "2026-05-20"
  },
  {
    id: "med-8",
    name: { uz: "D3 Vitamini (Akvadetrim)", en: "Vitamin D3 (Aquadetrim)" },
    image: "med_vitamind3.jpg",
    description: {
      uz: "Kalsiy almashinuvini tartibga soluvchi va suyaklarni mustahkamlovchi vitamin. Immunitetni va asab tizimi faoliyatini qo'llab-quvvatlaydi.",
      en: "A vitamin that regulates calcium metabolism and strengthens bones. Supports immune and nervous system functions."
    },
    usage: {
      uz: "Profilaktika maqsadida kuniga 1-2 tomchi (500-1000 XB) ozgina suv bilan ichiladi. Davolovchi dozani faqat shifokor qondagi tahlilga qarab belgilaydi.",
      en: "For prevention: 1-2 drops (500-1000 IU) daily with a little water. Therapeutic dose is determined only by a doctor based on blood tests."
    },
    dosage: {
      uz: "15 ml tomchi flakonlarda (1 tomchida 500 XB D3 vitamini bor).",
      en: "15 ml dropper bottles (1 drop contains 500 IU of Vitamin D3)."
    },
    sideEffects: {
      uz: "Dozani oshirib yuborganda ko'ngil aynishi, qusish, ishtahasizlik, bosh og'rig'i.",
      en: "Nausea, vomiting, loss of appetite, headache in case of overdose."
    },
    warnings: {
      uz: "Qonda kalsiy miqdori yuqori bo'lganda (giperkalsiyemiya) va o'tkir buyrak yetishmovchiligida ichish mumkin emas.",
      en: "Contraindicated in case of high blood calcium levels (hypercalcemia) and acute renal failure."
    },
    manufacturer: { uz: "Medana Pharma, Polsha", en: "Medana Pharma, Poland" },
    price: 38000,
    type: { uz: "Vitamin D3", en: "Vitamin D3" },
    category: "vitamins",
    prescription: false,
    rating: 4.8,
    views: 1310,
    createdDate: "2026-05-18"
  }
];

// 2. Boshlang'ich kasalliklar ma'lumotlar bazasi
const INITIAL_DISEASES = [
  {
    id: "dis-1",
    name: { uz: "Gripp (Shamollash)", en: "Influenza (Flu)" },
    description: {
      uz: "Nafas yo'llarini zararlaydigan o'tkir yuqumli virusli kasallik. Odatda tana haroratining keskin ko'tarilishi va umumiy holsizlik bilan kechadi.",
      en: "An acute infectious viral disease affecting the respiratory tract. Usually accompanied by a sharp rise in body temperature and general weakness."
    },
    symptoms: {
      uz: "Yuqori tana harorati (38-40°C), mushaklar va bo'g'imlar og'rig'i, kuchli bosh og'rig'i, quruq yo'tal, tomoq og'rig'i, burun bitishi va umumiy holsizlik.",
      en: "High body temperature (38-40°C), muscle and joint aches, severe headache, dry cough, sore throat, nasal congestion, and general fatigue."
    },
    causes: {
      uz: "Gripp viruslari (A, B, C guruhlari). Havo-tomchi yo'li bilan kasal odam aksirganda yoki yo'talganda yuqadi.",
      en: "Influenza viruses (groups A, B, C). Transmitted by airborne droplets when an infected person sneezes or coughs."
    },
    prevention: {
      uz: "Mavsumiy grippga qarshi emlanish, shaxsiy gigiyena qoidalariga rioya qilish (qo'llarni tez-tez yuvish), immunitetni mustahkamlash, epidemiyalar paytida olomon joylardan qochish.",
      en: "Seasonal flu vaccination, personal hygiene rules (washing hands frequently), boosting immunity, avoiding crowded places during outbreaks."
    },
    treatment: {
      uz: "Ko'p miqdorda iliq suyuqlik ichish, to'shak rejimi, isitma tushiruvchi vositalar, immunostimulyatorlar va shifokor tavsiyasiga ko'ra virusga qarshi dorilar.",
      en: "Drinking plenty of warm fluids, bed rest, antipyretics, immunostimulants, and antiviral medications as prescribed by a doctor."
    },
    recommendedMedicines: ["med-1", "med-3", "med-7"],
    views: 950
  },
  {
    id: "dis-2",
    name: { uz: "Arterial Gipertoniya", en: "Arterial Hypertension" },
    description: {
      uz: "Surunkali kasallik bo'lib, unda arterial qon bosimi doimiy ravishda yuqori (140/90 mm simob ustunidan yuqori) bo'ladi. Yurak-qon tomir tizimiga katta yuklama beradi.",
      en: "A chronic condition in which arterial blood pressure is persistently high (above 140/90 mmHg). Puts a heavy strain on the cardiovascular system."
    },
    symptoms: {
      uz: "Ensa (boshning orqa qismi) sohasida og'riq, bosh aylanishi, quloqlarda shovqin, ko'z oldi qorong'ulashishi (chivinlar uchishi), yurak tez urishi va ko'krak qafasidagi og'riq.",
      en: "Pain in the occipital region of the head, dizziness, ringing in the ears, blurred vision (spots in front of eyes), rapid heartbeat, and chest pain."
    },
    causes: {
      uz: "Irsiy moyillik, ortiqcha vazn, kamharakat hayot tarzi, noto'g'ri ovqatlanish (tuzni ko'p iste'mol qilish), chekish va surunkali stress.",
      en: "Genetic predisposition, obesity, sedentary lifestyle, poor diet (high salt intake), smoking, and chronic stress."
    },
    prevention: {
      uz: "Faol jismoniy harakatlar, tuz iste'molini kuniga 5 g gacha kamaytirish, tana vaznini normada ushlab turish, zararli odatlardan voz kechish, stressni boshqarish.",
      en: "Active physical exercise, reducing salt intake to under 5 g a day, maintaining normal body weight, quitting bad habits, managing stress."
    },
    treatment: {
      uz: "Doimiy ravishda bosimni tushiruvchi dorilarni ichish, parhez qilish (Kam tuzli ovqatlar), shifokor kardiolog nazorati ostida davolanish kursi.",
      en: "Consistent intake of antihypertensive drugs, dietary changes (low-salt food), and a course of treatment monitored by a cardiologist."
    },
    recommendedMedicines: ["med-4", "med-5"],
    views: 780
  },
  {
    id: "dis-3",
    name: { uz: "Gastrit", en: "Gastritis" },
    description: {
      uz: "Oshqozon shilliq qavatining yallig'lanishi. Ovqat hazm qilish tizimining buzilishi va oshqozonda kuchli og'riqlar bilan namoyon bo'ladi. O'tkir va surunkali shakllari mavjud.",
      en: "Inflammation of the stomach lining. Manifests as digestive disorders and severe stomach pains. Can be acute or chronic."
    },
    symptoms: {
      uz: "Oshqozon sohasida (qorin tepasida) og'riq yoki to'qlik hissi (ayniqsa och qoringa yoki ovqatdan keyin), jig'ildon qaynashi, ko'ngil aynishi, og'izdan noxush hid kelishi.",
      en: "Pain or fullness in the stomach area (upper abdomen, especially on an empty stomach or after eating), heartburn, nausea, unpleasant breath."
    },
    causes: {
      uz: "Helicobacter pylori bakteriyasi, noto'g'ri va tartibsiz ovqatlanish, achchiq va o'ta yog'li taomlar, uzoq muddat dori (ayniqsa og'riq qoldiruvchi YAQP) ichish, stress va alkogol.",
      en: "Helicobacter pylori bacteria, poor and irregular eating habits, spicy and extremely fatty foods, long-term medication (especially NSAID painkillers), stress, and alcohol."
    },
    prevention: {
      uz: "Kun tartibida vaqtida ovqatlanish, issiq va achchiq taomlarni kamaytirish, dori vositalarini (ibuprofen, aspirin kabi) faqat ovqatdan keyin va shifokor ruxsati bilan ichish.",
      en: "Eating meals regularly, reducing very hot and spicy foods, taking medications (like ibuprofen, aspirin) only after meals and with medical approval."
    },
    treatment: {
      uz: "Parhez qilish (suyuq, bug'da pishgan ovqatlar), oshqozon kislotasini kamaytiruvchi dorilar, antatsidlar, bakterial infeksiya bo'lsa - antibiotiklar kursi.",
      en: "Dietary restrictions (liquid, steamed food), drugs reducing stomach acidity, antacids, and a course of antibiotics if bacterial infection is present."
    },
    recommendedMedicines: ["med-2", "med-6"],
    views: 820
  },
  {
    id: "dis-4",
    name: { uz: "Qandli Diabet (2-tur)", en: "Type 2 Diabetes" },
    description: {
      uz: "Endokrin kasallik bo'lib, unda organizm insulin gormonidan to'g'ri foydalana olmaydi (insulin rezistentligi). Natijada qonda glyukoza miqdori oshib ketadi.",
      en: "An endocrine disorder where the body cannot properly use the hormone insulin (insulin resistance), leading to high blood glucose levels."
    },
    symptoms: {
      uz: "Doimiy tashnalik (ko'p suv ichish), tez-tez siyish (ayniqsa tunda), kuchli ochlik, sababsiz vazn yo'qotish, ko'rishning xiralashishi, yaralarning sekin bitishi va charchoq.",
      en: "Constant thirst (drinking lots of water), frequent urination (especially at night), extreme hunger, unexplained weight loss, blurry vision, slow-healing sores, and fatigue."
    },
    causes: {
      uz: "Haddan tashqari shirinlik iste'moli va ortiqcha vazn, jismoniy harakatning kamligi, nasliy moyillik, yosh bilan bog'liq metabolik o'zgarishlar.",
      en: "Excessive sugar consumption and obesity, lack of physical exercise, genetic factors, age-related metabolic changes."
    },
    prevention: {
      uz: "Sog'lom ovqatlanish (shakar va tezkor uglevodlarni cheklash), faol jismoniy hayot, vaznni nazorat qilish va qondagi qand miqdorini muntazam tekshirib turish.",
      en: "Healthy eating (limiting sugar and fast carbs), active lifestyle, weight management, and regular blood sugar checks."
    },
    treatment: {
      uz: "Parhez (past uglevodli), shakar tushiruvchi preparatlar, zarurat bo'lganda insulin inyeksiyalari, doimiy qon shakari tahlili.",
      en: "Low-carb diet, oral blood glucose-lowering drugs, insulin injections if necessary, and constant blood sugar monitoring."
    },
    recommendedMedicines: ["med-5", "med-7"],
    views: 690
  }
];

// 3. Foydalanuvchilar boshlang'ich ma'lumoti (Default users)
const INITIAL_USERS = [
  {
    email: "admin@dori.uz",
    name: "Administrator",
    passwordHash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", // admin123
    role: "admin",
    joinedDate: "2026-01-01"
  },
  {
    email: "user@dori.uz",
    name: "Lazizbek",
    passwordHash: "a66abb5684c45962d887564f08346e8d93055ab42d650b7a026e5e8e932b94f1", // user123
    role: "user",
    joinedDate: "2026-05-01"
  }
];

// SHA-256 simulyatsiyasi uchun yordamchi algoritm (parollarni shifrlash)
function sha256(string) {
  // Oddiy hash funksiya (brauzerlar o'rtasida muammosiz ishlashi uchun)
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 32bit butun songa aylantirish
  }
  return Math.abs(hash).toString(16).padStart(16, "0") + string.length.toString(16);
}

// 4. LocalStorage xotira boshqaruvi klassi
class LocalDatabase {
  constructor() {
    this.init();
  }

  init() {
    // 1. Dorilarni tekshirish
    if (!localStorage.getItem("dori_medicines")) {
      localStorage.setItem("dori_medicines", JSON.stringify(INITIAL_MEDICINES));
    }
    // 2. Kasalliklarni tekshirish
    if (!localStorage.getItem("dori_diseases")) {
      localStorage.setItem("dori_diseases", JSON.stringify(INITIAL_DISEASES));
    }
    // 3. Foydalanuvchilarni tekshirish
    if (!localStorage.getItem("dori_users")) {
      localStorage.setItem("dori_users", JSON.stringify(INITIAL_USERS));
    }
    // 4. Sevimlilarni tekshirish
    if (!localStorage.getItem("dori_favorites")) {
      localStorage.setItem("dori_favorites", JSON.stringify({ medicines: [], diseases: [] }));
    }
    // 5. Sharhlar va Reytinglarni tekshirish
    if (!localStorage.getItem("dori_reviews")) {
      // Boshlang'ich bir nechta sharh
      const initialReviews = {
        "med-1": [
          { username: "Shoxrux", rating: 5, comment: "Bosh og'rig'ida tez ta'sir qiladi, narxi ham juda arzon.", date: "2026-05-25" },
          { username: "Malika", rating: 4, comment: "Yaxshi dori, lekin oshqozonga biroz og'irlik qiladi shekilli.", date: "2026-05-28" }
        ],
        "med-7": [
          { username: "Dilshod", rating: 5, comment: "Kuz va bahor oylarida oilaviy ichamiz. Juda foydali immun vositasi.", date: "2026-05-27" }
        ]
      };
      localStorage.setItem("dori_reviews", JSON.stringify(initialReviews));
    }
    // 6. Qidiruv tarixi va oxirgi ko'rilganlar
    if (!localStorage.getItem("dori_search_history")) {
      localStorage.setItem("dori_search_history", JSON.stringify([]));
    }
    if (!localStorage.getItem("dori_recently_viewed")) {
      localStorage.setItem("dori_recently_viewed", JSON.stringify([]));
    }
    // 7. Solishtirish ro'yxati
    if (!localStorage.getItem("dori_compare_list")) {
      localStorage.setItem("dori_compare_list", JSON.stringify([]));
    }
  }

  // --- DORILAR METODLARI ---
  getMedicines() {
    return JSON.parse(localStorage.getItem("dori_medicines"));
  }

  getMedicineById(id) {
    return this.getMedicines().find(m => m.id === id);
  }

  saveMedicine(medicine) {
    const medicines = this.getMedicines();
    const index = medicines.findIndex(m => m.id === medicine.id);
    
    if (index > -1) {
      // Tahrirlash (Edit)
      medicines[index] = { ...medicines[index], ...medicine };
    } else {
      // Yangi qo'shish (Add)
      medicine.id = "med-" + Date.now();
      medicine.views = 0;
      medicine.rating = 5.0;
      medicine.createdDate = new Date().toISOString().split("T")[0];
      medicines.push(medicine);
    }
    localStorage.setItem("dori_medicines", JSON.stringify(medicines));
    return medicine;
  }

  deleteMedicine(id) {
    let medicines = this.getMedicines();
    medicines = medicines.filter(m => m.id !== id);
    localStorage.setItem("dori_medicines", JSON.stringify(medicines));
    
    // Sevimlilardan ham o'chirib tashlaymiz
    this.removeFavorite("medicine", id);
    // Solishtirishdan ham o'chiramiz
    this.removeCompare(id);
  }

  incrementMedicineViews(id) {
    const medicines = this.getMedicines();
    const med = medicines.find(m => m.id === id);
    if (med) {
      med.views = (med.views || 0) + 1;
      localStorage.setItem("dori_medicines", JSON.stringify(medicines));
    }
  }

  // --- KASALLIKLAR METODLARI ---
  getDiseases() {
    return JSON.parse(localStorage.getItem("dori_diseases"));
  }

  getDiseaseById(id) {
    return this.getDiseases().find(d => d.id === id);
  }

  saveDisease(disease) {
    const diseases = this.getDiseases();
    const index = diseases.findIndex(d => d.id === disease.id);
    
    if (index > -1) {
      // Edit
      diseases[index] = { ...diseases[index], ...disease };
    } else {
      // Add
      disease.id = "dis-" + Date.now();
      disease.views = 0;
      diseases.push(disease);
    }
    localStorage.setItem("dori_diseases", JSON.stringify(diseases));
    return disease;
  }

  deleteDisease(id) {
    let diseases = this.getDiseases();
    diseases = diseases.filter(d => d.id !== id);
    localStorage.setItem("dori_diseases", JSON.stringify(diseases));
    
    this.removeFavorite("disease", id);
  }

  incrementDiseaseViews(id) {
    const diseases = this.getDiseases();
    const dis = diseases.find(d => d.id === id);
    if (dis) {
      dis.views = (dis.views || 0) + 1;
      localStorage.setItem("dori_diseases", JSON.stringify(diseases));
    }
  }

  // --- FOYDALANUVCHILAR VA AUTH METODLARI ---
  getUsers() {
    return JSON.parse(localStorage.getItem("dori_users"));
  }

  registerUser(name, email, password) {
    const users = this.getUsers();
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      throw new Error(localStorage.getItem("dori_lang") === "en" ? "User with this email already exists!" : "Ushbu elektron pochta manzili bilan ro'yxatdan o'tgan foydalanuvchi mavjud!");
    }

    const newUser = {
      email: email.toLowerCase(),
      name: name,
      passwordHash: sha256(password),
      role: "user",
      joinedDate: new Date().toISOString().split("T")[0]
    };
    users.push(newUser);
    localStorage.setItem("dori_users", JSON.stringify(users));
    this.setCurrentUser(newUser);
    return newUser;
  }

  loginUser(email, password) {
    const users = this.getUsers();
    const hash = sha256(password);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && (u.passwordHash === hash || u.passwordHash === password)); // Qisman mos kelish (tayyor hashlar uchun)
    
    if (!user) {
      throw new Error(localStorage.getItem("dori_lang") === "en" ? "Incorrect email or password!" : "Elektron pochta yoki parol xato!");
    }
    this.setCurrentUser(user);
    return user;
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("dori_current_user"));
  }

  setCurrentUser(user) {
    if (user) {
      sessionStorage.setItem("dori_current_user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("dori_current_user");
    }
  }

  updateProfile(name, password = null) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return;

    const users = this.getUsers();
    const index = users.findIndex(u => u.email === currentUser.email);

    if (index > -1) {
      users[index].name = name;
      currentUser.name = name;
      
      if (password) {
        users[index].passwordHash = sha256(password);
      }
      
      localStorage.setItem("dori_users", JSON.stringify(users));
      this.setCurrentUser(currentUser);
    }
  }

  // --- SEVIMLILAR METODLARI ---
  getFavorites() {
    return JSON.parse(localStorage.getItem("dori_favorites"));
  }

  toggleFavorite(type, id) {
    const favorites = this.getFavorites();
    const list = type === "medicine" ? favorites.medicines : favorites.diseases;
    const index = list.indexOf(id);

    let isAdded = false;
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(id);
      isAdded = true;
    }

    localStorage.setItem("dori_favorites", JSON.stringify(favorites));
    return isAdded;
  }

  removeFavorite(type, id) {
    const favorites = this.getFavorites();
    const list = type === "medicine" ? favorites.medicines : favorites.diseases;
    const index = list.indexOf(id);
    if (index > -1) {
      list.splice(index, 1);
      localStorage.setItem("dori_favorites", JSON.stringify(favorites));
    }
  }

  isFavorite(type, id) {
    const favorites = this.getFavorites();
    const list = type === "medicine" ? favorites.medicines : favorites.diseases;
    return list.includes(id);
  }

  // --- SHARHLAR METODLARI ---
  getReviews(medicineId) {
    const reviews = JSON.parse(localStorage.getItem("dori_reviews"));
    return reviews[medicineId] || [];
  }

  addReview(medicineId, username, rating, comment) {
    const reviews = JSON.parse(localStorage.getItem("dori_reviews"));
    if (!reviews[medicineId]) {
      reviews[medicineId] = [];
    }

    const newReview = {
      username,
      rating: parseInt(rating),
      comment,
      date: new Date().toISOString().split("T")[0]
    };

    reviews[medicineId].unshift(newReview); // Yangilarini birinchi qilamiz
    localStorage.setItem("dori_reviews", JSON.stringify(reviews));

    // Dorining o'rtacha reytingini qaytadan hisoblash
    const medicines = this.getMedicines();
    const medIndex = medicines.findIndex(m => m.id === medicineId);
    if (medIndex > -1) {
      const allReviews = reviews[medicineId];
      const sum = allReviews.reduce((acc, curr) => acc + curr.rating, 0);
      const avg = parseFloat((sum / allReviews.length).toFixed(1));
      medicines[medIndex].rating = avg;
      localStorage.setItem("dori_medicines", JSON.stringify(medicines));
    }

    return newReview;
  }

  // --- TAQQOSLASH METODLARI ---
  getCompareList() {
    return JSON.parse(localStorage.getItem("dori_compare_list")) || [];
  }

  addCompare(id) {
    const compareList = this.getCompareList();
    if (compareList.includes(id)) return false;
    
    if (compareList.length >= 3) {
      throw new Error(localStorage.getItem("dori_lang") === "en" ? "You can compare up to 3 medicines at a time!" : "Bir vaqtning o'zida ko'pi bilan 3 ta dorini solishtirishingiz mumkin!");
    }

    compareList.push(id);
    localStorage.setItem("dori_compare_list", JSON.stringify(compareList));
    return true;
  }

  removeCompare(id) {
    let compareList = this.getCompareList();
    compareList = compareList.filter(item => item !== id);
    localStorage.setItem("dori_compare_list", JSON.stringify(compareList));
  }

  clearCompare() {
    localStorage.setItem("dori_compare_list", JSON.stringify([]));
  }

  // --- TARIX METODLARI (Search History & Recently Viewed) ---
  getSearchHistory() {
    return JSON.parse(localStorage.getItem("dori_search_history")) || [];
  }

  addSearchHistory(query) {
    if (!query || query.trim() === "") return;
    let history = this.getSearchHistory();
    history = history.filter(item => item.toLowerCase() !== query.toLowerCase()); // Takrorlanishni o'chiramiz
    history.unshift(query.trim()); // Boshiga qo'shamiz
    if (history.length > 8) history.pop(); // Maksimal 8 ta saqlaydi
    localStorage.setItem("dori_search_history", JSON.stringify(history));
  }

  clearSearchHistory() {
    localStorage.setItem("dori_search_history", JSON.stringify([]));
  }

  getRecentlyViewed() {
    return JSON.parse(localStorage.getItem("dori_recently_viewed")) || [];
  }

  addRecentlyViewed(type, id) {
    let list = this.getRecentlyViewed();
    list = list.filter(item => !(item.type === type && item.id === id));
    list.unshift({ type, id, time: Date.now() });
    if (list.length > 5) list.pop(); // Oxirgi 5 ta ko'rilgan
    localStorage.setItem("dori_recently_viewed", JSON.stringify(list));
  }
}

// Global instansiya yaratamiz
window.db = new LocalDatabase();
