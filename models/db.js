// models/db.js - SQLite ma'lumotlar bazasini yuklash va jadvallarni yaratish

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '..', 'dori.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("SQLite ulanishda xato:", err);
  } else {
    console.log("SQLite ma'lumotlar bazasiga muvaffaqiyatli ulandi.");
  }
});

// Bazani ketma-ketlikda sozlash
db.serialize(() => {
  // 1. Foydalanuvchilar jadvali
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      email TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      passwordHash TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      joinedDate TEXT NOT NULL
    )
  `);

  // 2. Dorilar jadvali
  db.run(`
    CREATE TABLE IF NOT EXISTS medicines (
      id TEXT PRIMARY KEY,
      image TEXT DEFAULT 'medicine-placeholder.svg',
      name_uz TEXT NOT NULL,
      name_en TEXT NOT NULL,
      type_uz TEXT NOT NULL,
      type_en TEXT NOT NULL,
      category TEXT NOT NULL,
      price INTEGER NOT NULL,
      manufacturer_uz TEXT NOT NULL,
      manufacturer_en TEXT NOT NULL,
      description_uz TEXT NOT NULL,
      description_en TEXT NOT NULL,
      usage_uz TEXT NOT NULL,
      usage_en TEXT NOT NULL,
      dosage_uz TEXT NOT NULL,
      dosage_en TEXT NOT NULL,
      sideEffects_uz TEXT NOT NULL,
      sideEffects_en TEXT NOT NULL,
      warnings_uz TEXT NOT NULL,
      warnings_en TEXT NOT NULL,
      prescription BOOLEAN DEFAULT 0,
      views INTEGER DEFAULT 0,
      rating REAL DEFAULT 5.0,
      createdDate TEXT NOT NULL
    )
  `);

  // 2a. Mavjud bazaga image ustunini qo'shish (migratsiya)
  db.all("PRAGMA table_info(medicines)", (err, cols) => {
    if (!err && !cols.some((col) => col.name === 'image')) {
      db.run("ALTER TABLE medicines ADD COLUMN image TEXT DEFAULT 'medicine-placeholder.svg'");
      console.log("Migratsiya: medicines jadvaliga image ustuni qo'shildi.");
    }
  });

  db.all("SELECT id FROM medicines", (err, rows) => {
    if (!err && rows && rows.length > 0) {
      const fallbackMap = {
        'med-1': 'med-1.svg',
        'med-2': 'med-2.svg',
        'med-3': 'med-3.svg',
        'med-4': 'med-4.svg',
        'med-5': 'med-5.svg',
        'med-6': 'med-6.svg',
        'med-7': 'med-7.svg',
        'med-8': 'med-8.svg'
      };

      const updates = rows
        .map((row) => `WHEN '${row.id}' THEN '${fallbackMap[row.id] || 'medicine-placeholder.svg'}'`)
        .join(' ');

      if (updates) {
        db.run(`UPDATE medicines SET image = CASE id ${updates} ELSE image END`);
      }
    }
  });

  // 3. Kasalliklar jadvali
  db.run(`
    CREATE TABLE IF NOT EXISTS diseases (
      id TEXT PRIMARY KEY,
      name_uz TEXT NOT NULL,
      name_en TEXT NOT NULL,
      description_uz TEXT NOT NULL,
      description_en TEXT NOT NULL,
      symptoms_uz TEXT NOT NULL,
      symptoms_en TEXT NOT NULL,
      causes_uz TEXT NOT NULL,
      causes_en TEXT NOT NULL,
      prevention_uz TEXT NOT NULL,
      prevention_en TEXT NOT NULL,
      treatment_uz TEXT NOT NULL,
      treatment_en TEXT NOT NULL,
      views INTEGER DEFAULT 0
    )
  `);

  // 4. Kasallikka tavsiya etilgan dorilar (N-to-N bog'liqlik)
  db.run(`
    CREATE TABLE IF NOT EXISTS recommended_medicines (
      disease_id TEXT,
      medicine_id TEXT,
      PRIMARY KEY (disease_id, medicine_id),
      FOREIGN KEY (disease_id) REFERENCES diseases(id) ON DELETE CASCADE,
      FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE CASCADE
    )
  `);

  // 5. Sevimlilar jadvali
  db.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      user_email TEXT,
      item_type TEXT, -- 'medicine' yoki 'disease'
      item_id TEXT,
      PRIMARY KEY (user_email, item_type, item_id),
      FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
    )
  `);

  // 6. Sharhlar va reytinglar
  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      medicine_id TEXT NOT NULL,
      username TEXT NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (medicine_id) REFERENCES medicines(id) ON DELETE CASCADE
    )
  `);

  // 7. Qidiruv tarixi
  db.run(`
    CREATE TABLE IF NOT EXISTS search_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_email TEXT NOT NULL,
      query TEXT NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
    )
  `);

  // 8. Oxirgi ko'rilganlar
  db.run(`
    CREATE TABLE IF NOT EXISTS recently_viewed (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_email TEXT NOT NULL,
      item_type TEXT NOT NULL,
      item_id TEXT NOT NULL,
      viewed_at INTEGER NOT NULL,
      FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
    )
  `);

  // --- SEED BO'LIMI (Boshlang'ich ma'lumotlarni yozish) ---
  
  // A. Foydalanuvchilarni to'ldirish
  db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
    if (row && row.count === 0) {
      const adminHash = bcrypt.hashSync("admin123", 10);
      const userHash = bcrypt.hashSync("user123", 10);
      const today = new Date().toISOString().split('T')[0];

      db.run("INSERT INTO users (email, name, passwordHash, role, joinedDate) VALUES (?, ?, ?, ?, ?)",
        ["admin@dori.uz", "Administrator", adminHash, "admin", today]
      );
      db.run("INSERT INTO users (email, name, passwordHash, role, joinedDate) VALUES (?, ?, ?, ?, ?)",
        ["user@dori.uz", "Lazizbek", userHash, "user", today]
      );
      console.log("Foydalanuvchilar jadvali boshlang'ich ma'lumotlar bilan to'ldirildi.");
    }
  });

  // B. Dorilarni to'ldirish
  db.get("SELECT COUNT(*) as count FROM medicines", (err, row) => {
    if (row && row.count === 0) {
      const initialMeds = [
        {
          id: "med-1",
          image: "med-1.svg",
          name_uz: "Paratsetamol", name_en: "Paracetamol",
          type_uz: "Og'riq qoldiruvchi / Isitma tushiruvchi", type_en: "Analgesic / Antipyretic",
          category: "painkillers",
          price: 3500,
          manufacturer_uz: "Nobel Pharmsanoat, O'zbekiston", manufacturer_en: "Nobel Pharmsanoat, Uzbekistan",
          description_uz: "Isitma tushiruvchi va og'riq qoldiruvchi keng tarqalgan dori vositasi. Shamollash, bosh og'rig'i va tish og'rig'ida qo'llaniladi.",
          description_en: "A widely used painkiller and fever reducer. Used for colds, headaches, and toothaches.",
          usage_uz: "Kattalar uchun 500 mg dan 1000 mg gacha kuniga 3-4 marta. Ovqatdan keyin ichish tavsiya etiladi. Kunlik maksimal doza 4 g (4000 mg) dan oshmasligi kerak.",
          usage_en: "For adults: 500 mg to 1000 mg, 3-4 times a day after meals. Maximum daily dose should not exceed 4 g (4000 mg).",
          dosage_uz: "500 mg planshetlar, paketlar yoki bolalar uchun sirop shaklida.",
          dosage_en: "500 mg tablets, sachets, or syrup for children.",
          sideEffects_uz: "Kam hollarda allergiya, ko'ngil aynishi yoki uzoq muddat ko'p miqdorda ichilganda jigar faoliyati buzilishi mumkin.",
          sideEffects_en: "Rarely allergy, nausea, or liver dysfunction if taken in large quantities for a long period.",
          warnings_uz: "Jigar kasalliklari bor bemorlar va alkogol iste'mol qilganda ehtiyot bo'lish zarur. Boshqa paratsetamol saqlovchi dorilar bilan birga ichmang.",
          warnings_en: "Caution in patients with liver disease and when consuming alcohol. Do not take with other paracetamol-containing medications.",
          prescription: 0, views: 1240, rating: 4.8, createdDate: "2026-05-10"
        },
        {
          id: "med-2",
          image: "med-2.svg",
          name_uz: "Amoksitsillin", name_en: "Amoxicillin",
          type_uz: "Antibiotik", type_en: "Antibiotic",
          category: "antibiotics",
          price: 18000,
          manufacturer_uz: "Jurabek Laboratories, O'zbekiston", manufacturer_en: "Jurabek Laboratories, Uzbekistan",
          description_uz: "Keng ta'sir doirasiga ega penisillin guruhidagi antibiotik. Nafas yo'llari, quloq, tomoq va siydik yo'llari infeksiyalarini davolashda ishlatiladi.",
          description_en: "A broad-spectrum penicillin-type antibiotic. Used to treat respiratory tract, ear, throat, and urinary tract infections.",
          usage_uz: "Faqat shifokor tavsiyasi bilan. Kattalar uchun odatda 500 mg dan kuniga 3 marta, 7-10 kun davomida. Kursni oxirigacha tugatish shart.",
          usage_en: "Only by doctor's prescription. For adults: usually 500 mg 3 times a day for 7-10 days. The course must be fully completed.",
          dosage_uz: "250 mg va 500 mg kapsulalar, suspenziya tayyorlash uchun kukun.",
          dosage_en: "250 mg and 500 mg capsules, powder for suspension.",
          sideEffects_uz: "Diareya (ich ketishi), ko'ngil aynishi, teri toshmasi (allergiya) va disbakterioz.",
          sideEffects_en: "Diarrhea, nausea, skin rash (allergy), and dysbacteriosis.",
          warnings_uz: "Penisillinga allergiyasi bor shaxslarga mutlaqo mumkin emas. Homiladorlikda shifokor nazorati ostida qo'llansin.",
          warnings_en: "Contraindicated in individuals with penicillin allergy. Use under medical supervision during pregnancy.",
          prescription: 1, views: 980, rating: 4.5, createdDate: "2026-04-20"
        },
        {
          id: "med-3",
          image: "med-3.svg",
          name_uz: "Ibuprofen", name_en: "Ibuprofen",
          type_uz: "Yallig'lanishga qarshi / Og'riq qoldiruvchi", type_en: "Anti-inflammatory / Analgesic",
          category: "painkillers",
          price: 12500,
          manufacturer_uz: "Berlin-Chemie, Germaniya", manufacturer_en: "Berlin-Chemie, Germany",
          description_uz: "Yallig'lanishga qarshi nosteroid dori (YAQND). Og'riqni qoldiradi, shishlarni kamaytiradi va tana haroratini tushiradi.",
          description_en: "Non-steroidal anti-inflammatory drug (NSAID). Relieves pain, reduces swelling, and lowers body temperature.",
          usage_uz: "Kattalar uchun 200-400 mg dan kuniga 3 marta ovqatdan so'ng. Oshqozonni himoya qilish uchun ko'p suv bilan iching.",
          usage_en: "For adults: 200-400 mg 3 times a day after meals. Take with plenty of water to protect the stomach.",
          dosage_uz: "200 mg, 400 mg planshetlar va bolalar uchun sirop.",
          dosage_en: "200 mg, 400 mg tablets, and suspension for children.",
          sideEffects_uz: "Oshqozon og'rig'i, jig'ildon qaynashi, bosh aylanishi, kam hollarda oshqozon yarasi.",
          sideEffects_en: "Stomach pain, heartburn, dizziness, rarely stomach ulcers.",
          warnings_uz: "Oshqozon yarasi bor bemorlarga va yurak-qon tomir kasalliklarida ehtiyotkorlik tavsiya etiladi.",
          warnings_en: "Caution recommended in patients with stomach ulcers and cardiovascular diseases.",
          prescription: 0, views: 1120, rating: 4.7, createdDate: "2026-05-15"
        },
        {
          id: "med-4",
          image: "med-4.svg",
          name_uz: "Kaptopril", name_en: "Captopril",
          type_uz: "Gipotenziv dori (Bosim tushiruvchi)", type_en: "Antihypertensive",
          category: "cardio",
          price: 6000,
          manufacturer_uz: "Krasnofarma, Rossiya", manufacturer_en: "Krasnofarma, Russia",
          description_uz: "Arterial qon bosimini tushiruvchi dori (APF ingibitori). Gipertoniya va yurak etishmovchiligida kriz holatida tez yordam sifatida qo'llaniladi.",
          description_en: "An ACE inhibitor that lowers arterial blood pressure. Used as emergency care in hypertension crises and heart failure.",
          usage_uz: "Bosim oshganda 25 mg planshet til ostiga qo'yiladi. Kunlik doza shifokor tomonidan belgilanadi.",
          usage_en: "In case of high blood pressure, place a 25 mg tablet under the tongue. Daily dose is determined by a doctor.",
          dosage_uz: "25 mg va 50 mg planshetlar.",
          dosage_en: "25 mg and 50 mg tablets.",
          sideEffects_uz: "Quruq yo'tal, qon bosimining keskin tushib ketishi, bosh aylanishi, ta'm bilishning buzilishi.",
          sideEffects_en: "Dry cough, sharp drop in blood pressure, dizziness, taste disturbance.",
          warnings_uz: "Homiladorlikda mutlaqo mumkin emas. Buyrak faoliyati buzilgan bo'lsa ehtiyotkorlik bilan qo'llansin.",
          warnings_en: "Absolutely contraindicated during pregnancy. Use with caution in case of renal impairment.",
          prescription: 1, views: 850, rating: 4.4, createdDate: "2026-03-10"
        },
        {
          id: "med-5",
          image: "med-5.svg",
          name_uz: "Aspirin (Kardiomagnil)", name_en: "Aspirin (Cardiomagnyl)",
          type_uz: "Antiagregant (Qon suyultiruvchi)", type_en: "Antiplatelet (Blood thinner)",
          category: "cardio",
          price: 32000,
          manufacturer_uz: "Takeda, Yaponiya/Daniya", manufacturer_en: "Takeda, Japan/Denmark",
          description_uz: "Qonni suyultiruvchi va tromblar hosil bo'lishining oldini oluvchi vosita. Infarkt va insult profilaktikasida keng qo'llaniladi.",
          description_en: "A blood thinner that prevents clot formation. Widely used for the prevention of heart attack and stroke.",
          usage_uz: "Profilaktika maqsadida kuniga 1 marta 75 mg yoki 150 mg kechki ovqatdan keyin, ko'p suv bilan ichiladi.",
          usage_en: "For prevention: 75 mg or 150 mg once a day after dinner, with plenty of water.",
          dosage_uz: "75 mg va 150 mg qobiq bilan qoplangan planshetlar.",
          dosage_en: "75 mg and 150 mg film-coated tablets.",
          sideEffects_uz: "Oshqozon shilliq qavatining ta'sirlanishi, qon ketish xavfi ortishi, allergiya.",
          sideEffects_en: "Irritation of the gastric mucosa, increased risk of bleeding, allergy.",
          warnings_uz: "Oshqozon-ichakdan qon ketish tendensiyasi bor shaxslarga va 18 yoshgacha bo'lgan bolalarga mumkin emas.",
          warnings_en: "Contraindicated in individuals with gastrointestinal bleeding tendencies and children under 18.",
          prescription: 0, views: 1420, rating: 4.9, createdDate: "2026-05-01"
        },
        {
          id: "med-6",
          image: "med-6.svg",
          name_uz: "Mezim Forte", name_en: "Mezim Forte",
          type_uz: "Ferment preparati (Ovqat hazm qilish)", type_en: "Enzyme preparation (Digestion)",
          category: "digestive",
          price: 24000,
          manufacturer_uz: "Berlin-Chemie, Germaniya", manufacturer_en: "Berlin-Chemie, Germany",
          description_uz: "Oshqozon osti bezi fermenti etishmovchiligida ovqat hazm qilishni yaxshilovchi fermentativ preparat.",
          description_en: "An enzyme preparation that improves digestion in case of pancreatic enzyme deficiency.",
          usage_uz: "Ovqatlanish vaqtida yoki undan keyin darhol 1-2 tabletka chaynashsiz, ko'p miqdorda suv bilan yutiladi.",
          usage_en: "Take 1-2 tablets during or immediately after meals without chewing, with plenty of water.",
          dosage_uz: "Pankreatin faolligi bilan qoplangan tabletkalar.",
          dosage_en: "Coated tablets with pancreatin activity.",
          sideEffects_uz: "Juda kam hollarda allergik reaksiyalar, oshqozon-ichak ta'sirlanishi.",
          sideEffects_en: "Very rarely allergic reactions, gastrointestinal irritation.",
          warnings_uz: "O'tkir pankreatit yoki surunkali pankreatitning kuchayishi davrida qo'llash tavsiya etilmaydi.",
          warnings_en: "Not recommended during acute pancreatitis or exacerbation of chronic pancreatitis.",
          prescription: 0, views: 1090, rating: 4.6, createdDate: "2026-05-08"
        },
        {
          id: "med-7",
          image: "med-7.svg",
          name_uz: "Vitamin C (Askorbin kislotasi)", name_en: "Vitamin C (Ascorbic Acid)",
          type_uz: "Vitamin / Immunostimulyator", type_en: "Vitamin / Immune Stimulator",
          category: "vitamins",
          price: 5000,
          manufacturer_uz: "Uzpharmsanoat, O'zbekiston", manufacturer_en: "Uzpharmsanoat, Uzbekistan",
          description_uz: "Kuchli antioksidant va immunitetni mustahkamlovchi vitamin. Shamollashlarning oldini olish va organizm tonusini oshirishda yordam beradi.",
          description_en: "A powerful antioxidant and immune booster. Helps prevent colds and increase overall body tone.",
          usage_uz: "Profilaktika uchun kattalarga kuniga 50-100 mg, davolash uchun 500 mg gacha ovqatdan keyin.",
          usage_en: "For prevention: 50-100 mg daily for adults. For treatment: up to 500 mg daily after meals.",
          dosage_uz: "50 mg planshetlar, 500 mg va 1000 mg shivirlovchi planshetlar.",
          dosage_en: "50 mg tablets, 500 mg and 1000 mg effervescent tablets.",
          sideEffects_uz: "Katta dozalarda oshqozonning kislotaliligini oshishi, buyrak toshi xavfi.",
          sideEffects_en: "In large doses, increases stomach acidity, risk of kidney stones.",
          warnings_uz: "Qandli diabetda (agar shakar saqlasa) va buyrak toshi kasalligida ehtiyotkorlik bilan ichiladi.",
          warnings_en: "Use with caution in diabetes (if contains sugar) and kidney stone disease.",
          prescription: 0, views: 1540, rating: 4.9, createdDate: "2026-05-20"
        },
        {
          id: "med-8",
          image: "med-8.svg",
          name_uz: "Vitamin D3 (Akvadetrim)", name_en: "Vitamin D3 (Aquadetrim)",
          type_uz: "Vitamin D3", type_en: "Vitamin D3",
          category: "vitamins",
          price: 38000,
          manufacturer_uz: "Medana Pharma, Polsha", manufacturer_en: "Medana Pharma, Poland",
          description_uz: "Kalsiy almashinuvini tartibga soluvchi va suyaklarni mustahkamlovchi vitamin. Immunitetni va asab tizimi faoliyatini qo'llab-quvvatlaydi.",
          description_en: "A vitamin that regulates calcium metabolism and strengthens bones. Supports immune and nervous system functions.",
          usage_uz: "Profilaktika maqsadida kuniga 1-2 tomchi ozgina suv bilan ichiladi.",
          usage_en: "For prevention: 1-2 drops daily with a little water.",
          dosage_uz: "15 ml tomchi flakonlarda (1 tomchida 500 XB bor).",
          dosage_en: "15 ml dropper bottles (1 drop contains 500 IU).",
          sideEffects_uz: "Dozani oshirib yuborganda ko'ngil aynishi, ishtahasizlik, bosh og'rig'i.",
          sideEffects_en: "Nausea, loss of appetite, headache in case of overdose.",
          warnings_uz: "Qonda kalsiy miqdori yuqori bo'lganda (giperkalsiyemiya) ichish mumkin emas.",
          warnings_en: "Contraindicated in case of high blood calcium levels (hypercalcemia).",
          prescription: 0, views: 1310, rating: 4.8, createdDate: "2026-05-18"
        }
      ];

      const stmt = db.prepare(`
        INSERT INTO medicines (
          id, image, name_uz, name_en, type_uz, type_en, category, price,
          manufacturer_uz, manufacturer_en, description_uz, description_en,
          usage_uz, usage_en, dosage_uz, dosage_en, sideEffects_uz, sideEffects_en,
          warnings_uz, warnings_en, prescription, views, rating, createdDate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      initialMeds.forEach(m => {
        stmt.run([
          m.id, m.image || 'medicine-placeholder.svg', m.name_uz, m.name_en, m.type_uz, m.type_en, m.category, m.price,
          m.manufacturer_uz, m.manufacturer_en, m.description_uz, m.description_en,
          m.usage_uz, m.usage_en, m.dosage_uz, m.dosage_en, m.sideEffects_uz, m.sideEffects_en,
          m.warnings_uz, m.warnings_en, m.prescription, m.views, m.rating, m.createdDate
        ]);
      });
      stmt.finalize();
      console.log("Dorilar jadvali boshlang'ich ma'lumotlar bilan to'ldirildi.");
    }
  });

  // C. Kasalliklarni to'ldirish
  db.get("SELECT COUNT(*) as count FROM diseases", (err, row) => {
    if (row && row.count === 0) {
      const initialDiseases = [
        {
          id: "dis-1",
          name_uz: "Gripp (Shamollash)", name_en: "Influenza (Flu)",
          description_uz: "Nafas yo'llarini zararlaydigan o'tkir yuqumli virusli kasallik. Odatda tana haroratining keskin ko'tarilishi va umumiy holsizlik bilan kechadi.",
          description_en: "An acute infectious viral disease affecting the respiratory tract. Usually accompanied by a sharp rise in body temperature and general weakness.",
          symptoms_uz: "Yuqori tana harorati (38-40°C), mushaklar va bo'g'imlar og'rig'i, kuchli bosh og'rig'i, quruq yo'tal, tomoq og'rig'i, burun bitishi va umumiy holsizlik.",
          symptoms_en: "High body temperature (38-40°C), muscle and joint aches, severe headache, dry cough, sore throat, nasal congestion, and general fatigue.",
          causes_uz: "Gripp viruslari (A, B, C guruhlari). Havo-tomchi yo'li bilan kasal odam aksirganda yoki yo'talganda yuqadi.",
          causes_en: "Influenza viruses (groups A, B, C). Transmitted by airborne droplets when an infected person sneezes or coughs.",
          prevention_uz: "Mavsumiy grippga qarshi emlanish, shaxsiy gigiyena qoidalariga rioya qilish (qo'llarni tez-tez yuvish), immunitetni mustahkamlash.",
          prevention_en: "Seasonal flu vaccination, personal hygiene rules (washing hands frequently), boosting immunity.",
          treatment_uz: "Ko'p miqdorda iliq suyuqlik ichish, to'shak rejimi, isitma tushiruvchi vositalar, shifokor nazorati ostida virusga qarshi dorilar.",
          treatment_en: "Drinking plenty of warm fluids, bed rest, antipyretics, and antiviral medications as prescribed.",
          views: 950
        },
        {
          id: "dis-2",
          name_uz: "Arterial Gipertoniya", name_en: "Arterial Hypertension",
          description_uz: "Surunkali kasallik bo'lib, unda arterial qon bosimi doimiy ravishda yuqori (140/90 mm simob ustunidan yuqori) bo'ladi. Yurak-qon tomir tizimiga katta yuklama beradi.",
          description_en: "A chronic condition in which arterial blood pressure is persistently high (above 140/90 mmHg). Puts a heavy strain on the cardiovascular system.",
          symptoms_uz: "Ensa (boshning orqa qismi) sohasida og'riq, bosh aylanishi, quloqlarda shovqin, ko'z oldi qorong'ulashishi, yurak tez urishi va ko'krak qafasidagi og'riq.",
          symptoms_en: "Pain in the occipital region of the head, dizziness, ringing in the ears, blurred vision, rapid heartbeat, and chest pain.",
          causes_uz: "Irsiy moyillik, ortiqcha vazn, kamharakat hayot tarzi, noto'g'ri ovqatlanish (tuzni ko'p iste'mol qilish), chekish va surunkali stress.",
          causes_en: "Genetic predisposition, obesity, sedentary lifestyle, poor diet (high salt intake), smoking, and chronic stress.",
          prevention_uz: "Faol jismoniy harakatlar, tuz iste'molini kuniga 5 g gacha kamaytirish, vaznni nazorat qilish, zararli odatlardan voz kechish.",
          prevention_en: "Active physical exercise, reducing salt intake to under 5 g a day, weight management, quitting bad habits.",
          treatment_uz: "Doimiy ravishda bosimni tushiruvchi dorilarni ichish, kam tuzli parhez, kardiolog nazorati ostida davolanish kursi.",
          treatment_en: "Consistent intake of antihypertensive drugs, low-salt diet, and a course of treatment monitored by a cardiologist.",
          views: 780
        },
        {
          id: "dis-3",
          name_uz: "Gastrit", name_en: "Gastritis",
          description_uz: "Oshqozon shilliq qavatining yallig'lanishi. Ovqat hazm qilish tizimining buzilishi va oshqozonda kuchli og'riqlar bilan namoyon bo'ladi.",
          description_en: "Inflammation of the stomach lining. Manifests as digestive disorders and severe stomach pains.",
          symptoms_uz: "Oshqozon sohasida og'riq yoki to'qlik hissi (och qoringa yoki ovqatdan keyin), jig'ildon qaynashi, ko'ngil aynishi, og'izdan noxush hid kelishi.",
          symptoms_en: "Pain or fullness in the stomach area (especially on an empty stomach or after eating), heartburn, nausea, unpleasant breath.",
          causes_uz: "Helicobacter pylori bakteriyasi, noto'g'ri va tartibsiz ovqatlanish, achchiq va yog'li taomlar, uzoq muddat og'riq qoldiruvchi (YAQND) ichish.",
          causes_en: "Helicobacter pylori bacteria, poor and irregular eating habits, spicy and fatty foods, long-term NSAID painkillers.",
          prevention_uz: "Vaqtida ovqatlanish, achchiq va yog'li taomlarni kamaytirish, dori vositalarini (ibuprofen, aspirin) faqat ovqatdan keyin ichish.",
          prevention_en: "Eating meals regularly, reducing spicy and fatty foods, taking NSAIDs only after meals.",
          treatment_uz: "Parhez (suyuq, bug'da pishgan taomlar), oshqozon kislotasini kamaytiruvchi dorilar, antatsidlar, antibiotiklar kursi (agar bakterial bo'lsa).",
          treatment_en: "Dietary restrictions, drugs reducing stomach acidity, antacids, and a course of antibiotics if bacterial.",
          views: 820
        },
        {
          id: "dis-4",
          name_uz: "Qandli Diabet (2-tur)", name_en: "Type 2 Diabetes",
          description_uz: "Endokrin kasallik bo'lib, unda organizm insulin gormonidan to'g'ri foydalana olmaydi (insulin rezistentligi). Natijada qonda glyukoza miqdori oshib ketadi.",
          description_en: "An endocrine disorder where the body cannot properly use the hormone insulin (insulin resistance), leading to high blood glucose levels.",
          symptoms_uz: "Doimiy tashnalik, tez-tez siyish (ayniqsa tunda), kuchli ochlik, sababsiz vazn yo'qotish, ko'rishning xiralashishi, yaralarning sekin bitishi va charchoq.",
          symptoms_en: "Constant thirst, frequent urination (especially at night), extreme hunger, unexplained weight loss, blurry vision, slow-healing sores, and fatigue.",
          causes_uz: "Haddan tashqari shirinlik iste'moli va ortiqcha vazn, kamharakat hayot, nasliy moyillik, metabolizm o'zgarishlari.",
          causes_en: "Excessive sugar consumption and obesity, lack of physical exercise, genetic factors, metabolic changes.",
          prevention_uz: "Sog'lom ovqatlanish (shakar va tezkor uglevodlarni cheklash), faol jismoniy hayot, vaznni nazorat qilish.",
          prevention_en: "Healthy eating (limiting sugar and fast carbs), active lifestyle, weight management.",
          treatment_uz: "Past uglevodli parhez, shakar tushiruvchi preparatlar, zarurat bo'lganda insulin inyeksiyalari, qon shakarini muntazam nazorat qilish.",
          treatment_en: "Low-carb diet, oral blood glucose-lowering drugs, insulin injections if necessary, and regular monitoring.",
          views: 690
        }
      ];

      const stmt = db.prepare(`
        INSERT INTO diseases (
          id, name_uz, name_en, description_uz, description_en,
          symptoms_uz, symptoms_en, causes_uz, causes_en,
          prevention_uz, prevention_en, treatment_uz, treatment_en, views
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      initialDiseases.forEach(d => {
        stmt.run([
          d.id, d.name_uz, d.name_en, d.description_uz, d.description_en,
          d.symptoms_uz, d.symptoms_en, d.causes_uz, d.causes_en,
          d.prevention_uz, d.prevention_en, d.treatment_uz, d.treatment_en, d.views
        ]);
      });
      stmt.finalize();
      console.log("Kasalliklar jadvali boshlang'ich ma'lumotlar bilan to'ldirildi.");

      // Kasalliklarga tavsiya etilgan dorilar aloqasini to'ldirish
      db.run("INSERT INTO recommended_medicines (disease_id, medicine_id) VALUES ('dis-1', 'med-1')");
      db.run("INSERT INTO recommended_medicines (disease_id, medicine_id) VALUES ('dis-1', 'med-3')");
      db.run("INSERT INTO recommended_medicines (disease_id, medicine_id) VALUES ('dis-1', 'med-7')");

      db.run("INSERT INTO recommended_medicines (disease_id, medicine_id) VALUES ('dis-2', 'med-4')");
      db.run("INSERT INTO recommended_medicines (disease_id, medicine_id) VALUES ('dis-2', 'med-5')");

      db.run("INSERT INTO recommended_medicines (disease_id, medicine_id) VALUES ('dis-3', 'med-2')");
      db.run("INSERT INTO recommended_medicines (disease_id, medicine_id) VALUES ('dis-3', 'med-6')");

      db.run("INSERT INTO recommended_medicines (disease_id, medicine_id) VALUES ('dis-4', 'med-5')");
      db.run("INSERT INTO recommended_medicines (disease_id, medicine_id) VALUES ('dis-4', 'med-7')");
      console.log("Kasalliklarga tavsiya etilgan dorilar aloqalari o'rnatildi.");
    }
  });

  // D. Sharhlarni to'ldirish
  db.get("SELECT COUNT(*) as count FROM reviews", (err, row) => {
    if (row && row.count === 0) {
      db.run("INSERT INTO reviews (medicine_id, username, rating, comment, date) VALUES (?, ?, ?, ?, ?)",
        ["med-1", "Shoxrux", 5, "Bosh og'rig'ida tez ta'sir qiladi, narxi ham juda arzon.", "2026-05-25"]
      );
      db.run("INSERT INTO reviews (medicine_id, username, rating, comment, date) VALUES (?, ?, ?, ?, ?)",
        ["med-1", "Malika", 4, "Yaxshi dori, lekin oshqozonga biroz og'irlik qiladi shekilli.", "2026-05-28"]
      );
      db.run("INSERT INTO reviews (medicine_id, username, rating, comment, date) VALUES (?, ?, ?, ?, ?)",
        ["med-7", "Dilshod", 5, "Kuz va bahor oylarida oilaviy ichamiz. Juda foydali immun vositasi.", "2026-05-27"]
      );
      console.log("Sharhlar jadvali boshlang'ich ma'lumotlar bilan to'ldirildi.");
    }
  });
});

module.exports = db;
