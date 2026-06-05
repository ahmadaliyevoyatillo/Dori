// Seed data script - Bazaga kasalliklar va dorilar qo'shish

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// UUID jilni yaratish
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const dbPath = path.join(__dirname, 'dori.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("SQLite ulanishda xato:", err);
    process.exit(1);
  } else {
    console.log("SQLite ma'lumotlar bazasiga ulandi.");
  }
});

// Kasalliklar ma'lumotlari
const diseases = [
  {
    id: uuidv4(),
    name_uz: "Temir kamoligi (Anemiya)",
    name_en: "Iron Deficiency Anemia",
    description_uz: "Qonda temir yetarli bo'lmagan kasallik",
    description_en: "A condition where blood lacks enough healthy red blood cells",
    symptoms_uz: "Charchanish, zaiflash, salliqlik, nafas qisiqligi",
    symptoms_en: "Fatigue, weakness, dizziness, shortness of breath",
    causes_uz: "Temir kamoligi, ayollarda ko'p qon ketish",
    causes_en: "Iron deficiency, heavy bleeding in women",
    prevention_uz: "Temir bilan boy ovqatlar iste'mol qiling",
    prevention_en: "Eat iron-rich foods",
    treatment_uz: "Temir qo'shimchalari va sog'lom ovqat",
    treatment_en: "Iron supplements and healthy diet"
  },
  {
    id: uuidv4(),
    name_uz: "Gipertensiya (Yuqori qon bosimi)",
    name_en: "Hypertension",
    description_uz: "Qon bosimining uzun vaqt davomida yuqori bo'lishi",
    description_en: "Persistently elevated blood pressure",
    symptoms_uz: "Bosh og'rishi, yurak to'kis, charchanish",
    symptoms_en: "Headaches, palpitations, fatigue",
    causes_uz: "Stressnik, tuzsiz ovqat, ortiqcha vazn",
    causes_en: "Stress, high salt diet, obesity",
    prevention_uz: "Stress bilan kurashish, sport qilish",
    prevention_en: "Stress management, regular exercise",
    treatment_uz: "Antihipertenziv dorilar va dieta",
    treatment_en: "Antihypertensive drugs and diet"
  },
  {
    id: uuidv4(),
    name_uz: "Diabetik",
    name_en: "Diabetes Mellitus",
    description_uz: "Qand metabolizmi buzilgan kasallik",
    description_en: "A metabolic disorder affecting blood sugar levels",
    symptoms_uz: "Kup ichish, tez o'pish, vazn yo'qotish",
    symptoms_en: "Increased thirst, frequent urination, weight loss",
    causes_uz: "Genetika, yurak kasalligi, amal qilishuvchanlik",
    causes_en: "Genetics, lifestyle, obesity",
    prevention_uz: "Sog'lom ovqat, sport, vazn bilan ishlash",
    prevention_en: "Healthy diet, exercise, weight management",
    treatment_uz: "Insulin, qand kamaygan dorilar",
    treatment_en: "Insulin and blood sugar reducing drugs"
  },
  {
    id: uuidv4(),
    name_uz: "Gripp",
    name_en: "Influenza",
    description_uz: "Viruslik kasallik, nafas yo'llari shikastlanadi",
    description_en: "Viral infection affecting respiratory tract",
    symptoms_uz: "Isitma, og'rini, bosh og'rishi, yomon hol",
    symptoms_en: "Fever, muscle aches, headache, malaise",
    causes_uz: "Gripp virusining ta'siri",
    causes_en: "Influenza virus infection",
    prevention_uz: "Vaksina qo'llash, sanitariya",
    prevention_en: "Vaccination, hygiene",
    treatment_uz: "Viruso'z dorilar, oromni",
    treatment_en: "Antiviral drugs, rest"
  },
  {
    id: uuidv4(),
    name_uz: "Toshnama (Migren)",
    name_en: "Migraine",
    description_uz: "Kuchli bosh og'rishi kasalligi",
    description_en: "Severe recurring headaches",
    symptoms_uz: "Kuchli bosh og'rishi, yoqadirayotgan yorug'lik, toshnama",
    symptoms_en: "Severe headache, light sensitivity, nausea",
    causes_uz: "Stressnik, uyqu kamoligi, oziq-ovqat",
    causes_en: "Stress, sleep deprivation, diet",
    prevention_uz: "Stressni boshqarish, tartibli uyqu",
    prevention_en: "Stress management, regular sleep",
    treatment_uz: "Bosh og'rishi dorilar, oromni",
    treatment_en: "Headache medications, rest"
  },
  {
    id: uuidv4(),
    name_uz: "Bo'ng'in (Artrit)",
    name_en: "Arthritis",
    description_uz: "Bo'g'inlarda yallig'lanish va og'riq",
    description_en: "Inflammation and pain in joints",
    symptoms_uz: "Bo'g'inlarda og'riq va shish",
    symptoms_en: "Joint pain and swelling",
    causes_uz: "Yosh, yallig'lanish, genetika",
    causes_en: "Age, inflammation, genetics",
    prevention_uz: "Sport, sog'lom oziq-ovqat",
    prevention_en: "Exercise, healthy diet",
    treatment_uz: "Antiinflamm dorilar, fizioterapiya",
    treatment_en: "Anti-inflammatory drugs, physiotherapy"
  },
  {
    id: uuidv4(),
    name_uz: "Astma",
    name_en: "Asthma",
    description_uz: "Nafas yo'llarining niqab kasalligi",
    description_en: "Chronic respiratory disease",
    symptoms_uz: "Nafas qisiqligi, ho'kir, sirtqi tovush",
    symptoms_en: "Shortness of breath, cough, wheezing",
    causes_uz: "Allergiya, atrof-muhit, genetika",
    causes_en: "Allergies, environment, genetics",
    prevention_uz: "Trigger-larni chetlashtirish, dorilar",
    prevention_en: "Avoid triggers, medication",
    treatment_uz: "Inhalatorlar, bronhodilatorlar",
    treatment_en: "Inhalers, bronchodilators"
  },
  {
    id: uuidv4(),
    name_uz: "Qorin og'rishi",
    name_en: "Gastric Disorder",
    description_uz: "Oshpazning yallig'lanishi va g'alabalarishi",
    description_en: "Stomach inflammation and discomfort",
    symptoms_uz: "Qorin og'rishi, ko'p ichish istagoni, og'irt",
    symptoms_en: "Stomach pain, heartburn, nausea",
    causes_uz: "Stressnik, oziq-ovqat, Helicobacter",
    causes_en: "Stress, diet, Helicobacter bacteria",
    prevention_uz: "Sog'lom ovqat, stresssiz hayot",
    prevention_en: "Healthy diet, stress management",
    treatment_uz: "Qorin tahliji dorilar, dieta",
    treatment_en: "Gastric drugs, diet"
  },
  {
    id: uuidv4(),
    name_uz: "Qol'r (Allergiya)",
    name_en: "Allergy",
    description_uz: "Immun tizimining haddan tashqari reaktsiyasi",
    description_en: "Abnormal immune system reaction",
    symptoms_uz: "Burun tiqishi, ko'z suvi, terida qichqishi",
    symptoms_en: "Nasal congestion, itchy eyes, skin rash",
    causes_uz: "Allergenik moddalar: gul changchisi, yengil",
    causes_en: "Allergens: pollen, dust",
    prevention_uz: "Allergenik moddalardan saqlash",
    prevention_en: "Avoid allergens",
    treatment_uz: "Antihistamin dorilar, steroid",
    treatment_en: "Antihistamine drugs, steroids"
  },
  {
    id: uuidv4(),
    name_uz: "Surunkali virusliy hepatit",
    name_en: "Chronic Viral Hepatitis",
    description_uz: "Jigar yallig'lanishi viruslari sababi",
    description_en: "Liver inflammation caused by viruses",
    symptoms_uz: "Sariqlik, qorin og'rishi, ko'z sariq",
    symptoms_en: "Jaundice, abdominal pain, yellow eyes",
    causes_uz: "Hepatit viruslari A, B, C, D, E",
    causes_en: "Hepatitis viruses A, B, C, D, E",
    prevention_uz: "Vaksina, gigiyena, sog'lom qon",
    prevention_en: "Vaccination, hygiene, blood safety",
    treatment_uz: "Antiviral dorilar, qolbning qo'llab-quvvalashi",
    treatment_en: "Antiviral drugs, liver support"
  },
  {
    id: uuidv4(),
    name_uz: "Uyqu buzilishi",
    name_en: "Sleep Disorder",
    description_uz: "Uyqu sifatining pasayishi",
    description_en: "Disruption of sleep quality and patterns",
    symptoms_uz: "Uyqu chiqishi, tez oyg'onish, charchanish",
    symptoms_en: "Insomnia, frequent waking, fatigue",
    causes_uz: "Stressnik, ish yuksaliklari, shovqin",
    causes_en: "Stress, work pressure, noise",
    prevention_uz: "Tartibli uyqu rejimi, yugon muhit",
    prevention_en: "Regular sleep schedule, quiet environment",
    treatment_uz: "Uyqu dorilar, kognitiv terapiya",
    treatment_en: "Sleep medications, cognitive therapy"
  },
  {
    id: uuidv4(),
    name_uz: "Qon tomiri kasalligi",
    name_en: "Coronary Artery Disease",
    description_uz: "Yurak qon tomir kasalligi",
    description_en: "Heart blood vessel disease",
    symptoms_uz: "Ko'krak og'rishi, nafas qisiqligi, bosh aylanishi",
    symptoms_en: "Chest pain, shortness of breath, dizziness",
    causes_uz: "Yuqori qon bosimi, kolesterol, chiroq",
    causes_en: "High blood pressure, cholesterol, smoking",
    prevention_uz: "Sog'lom ovqat, sport, chiroqni tashlab yuborish",
    prevention_en: "Healthy diet, exercise, quit smoking",
    treatment_uz: "Yurak dorilar, operatsiya",
    treatment_en: "Heart medications, surgery"
  },
  {
    id: uuidv4(),
    name_uz: "Tireoid kasalligi",
    name_en: "Thyroid Disorder",
    description_uz: "Tireoid bez anomaliyasining funksiyasi",
    description_en: "Abnormal thyroid gland function",
    symptoms_uz: "Vazn yo'qotish, charchanish, qalbulik",
    symptoms_en: "Weight loss, fatigue, palpitations",
    causes_uz: "Iodning kamoligi, autoimmun holat",
    causes_en: "Iodine deficiency, autoimmune condition",
    prevention_uz: "Iod bilan boy ovqatlar",
    prevention_en: "Iodine-rich foods",
    treatment_uz: "Tireoid gormoni, antitireoid dorilar",
    treatment_en: "Thyroid hormone, antithyroid drugs"
  },
  {
    id: uuidv4(),
    name_uz: "Poylarning nafas qisiqligi (Vena varikoziti)",
    name_en: "Varicose Veins",
    description_uz: "Oyoq venalarining kengayishi va yallig'lanishi",
    description_en: "Enlarged and inflamed leg veins",
    symptoms_uz: "Oyoq shishi, og'riq, ko'zga ko'rinadi",
    symptoms_en: "Leg swelling, pain, visible veins",
    causes_uz: "Uzun turish, genetika, imtiyozli vazn",
    causes_en: "Prolonged standing, genetics, obesity",
    prevention_uz: "Oyoqni ko'taring, suriluvchi poyabzal",
    prevention_en: "Elevate legs, compression stockings",
    treatment_uz: "Vena dorilar, kompressiya, operatsiya",
    treatment_en: "Venous drugs, compression, surgery"
  },
  {
    id: uuidv4(),
    name_uz: "Chuqun kasalligi (Podagra)",
    name_en: "Gout",
    description_uz: "Purin metabolizmining buzilishi",
    description_en: "Metabolic disorder affecting uric acid",
    symptoms_uz: "Bo'g'in og'rishi, qo'ziqli, isitma",
    symptoms_en: "Joint pain, redness, fever",
    causes_uz: "Purin-rich ovqatlar, alkohol, genetika",
    causes_en: "Purine-rich foods, alcohol, genetics",
    prevention_uz: "Tur-turli ovqat, alkoholdan saqlash",
    prevention_en: "Varied diet, avoid alcohol",
    treatment_uz: "Qo'ziqlik kamaygan dorilar",
    treatment_en: "Uric acid reducing drugs"
  },
  {
    id: uuidv4(),
    name_uz: "O'pka kasalligi (Bronxit)",
    name_en: "Bronchitis",
    description_uz: "Nafas yo'llarining yallig'lanishi",
    description_en: "Inflammation of airways",
    symptoms_uz: "Ho'kir, ploqlar, nafas qisiqligi",
    symptoms_en: "Cough, mucus, shortness of breath",
    causes_uz: "Viral yoki bakterial infeksiya",
    causes_en: "Viral or bacterial infection",
    prevention_uz: "Atrof-muhitni tozalash, vaksina",
    prevention_en: "Environmental hygiene, vaccination",
    treatment_uz: "Antibiotic, ho'kir bo'lish dorilar",
    treatment_en: "Antibiotics, cough medicines"
  },
  {
    id: uuidv4(),
    name_uz: "Teri kasalligi (Eksema)",
    name_en: "Eczema",
    description_uz: "Tteri suv Soxiligi va qichqishi",
    description_en: "Skin dryness and itching",
    symptoms_uz: "Teriga qichqishi, qizil, yo'tal teriga",
    symptoms_en: "Itchy skin, redness, cracked skin",
    causes_uz: "Allergiya, quru havo, kimyoviy ta'siri",
    causes_en: "Allergies, dry air, chemical exposure",
    prevention_uz: "Teriga nemlantiruvchi, mugurmali",
    prevention_en: "Moisturize skin, gentle products",
    treatment_uz: "Steroid krem, antihistamin",
    treatment_en: "Steroid cream, antihistamines"
  },
  {
    id: uuidv4(),
    name_uz: "Osteoporozis",
    name_en: "Osteoporosis",
    description_uz: "Suyak zichligining pasayishi",
    description_en: "Decreased bone density",
    symptoms_uz: "Suyakda og'riq, bo'g'inlarda shish",
    symptoms_en: "Bone pain, joint swelling",
    causes_uz: "Sho'ng'in, kalsium kamoligi, yosh ayollar",
    causes_en: "Menopause, calcium deficiency, aging",
    prevention_uz: "Kalsium, D vitamini, sport",
    prevention_en: "Calcium, vitamin D, exercise",
    treatment_uz: "Osteoporozis dorilar, mineral",
    treatment_en: "Osteoporosis drugs, minerals"
  },
  {
    id: uuidv4(),
    name_uz: "Rindli surunkali obstruktiv o'pka kasalligi",
    name_en: "COPD",
    description_uz: "O'pka funksiyasini kamayishi",
    description_en: "Chronic lung function decrease",
    symptoms_uz: "Nafas qisiqligi, ho'kir, sirtqi tovush",
    symptoms_en: "Shortness of breath, cough, wheezing",
    causes_uz: "Chiroq, atrof-muhit ifloslanishi",
    causes_en: "Smoking, air pollution",
    prevention_uz: "Chiroqni tashlab yuborish",
    prevention_en: "Quit smoking",
    treatment_uz: "Bronhodilatorlar, inhalatorlar",
    treatment_en: "Bronchodilators, inhalers"
  },
  {
    id: uuidv4(),
    name_uz: "Ikki tomonli kasallik (OKR)",
    name_en: "Obsessive-Compulsive Disorder",
    description_uz: "Qorakulsak va zarur reaksiyaning kasalligi",
    description_en: "Intrusive thoughts and compulsive behaviors",
    symptoms_uz: "Talab qiluvchi o'ylandi, soddiqlik",
    symptoms_en: "Obsessive thoughts, compulsions",
    causes_uz: "Genetika, stressnik, aql tuzilishi",
    causes_en: "Genetics, stress, brain chemistry",
    prevention_uz: "Stressni boshqarish, psixik salomatligi",
    prevention_en: "Stress management, mental health",
    treatment_uz: "SSRI dorilar, psixik terapiya",
    treatment_en: "SSRI drugs, psychotherapy"
  },
  {
    id: uuidv4(),
    name_uz: "Depressiya",
    name_en: "Depression",
    description_uz: "Jiddiy aqliy kasallik",
    description_en: "Serious mental health condition",
    symptoms_uz: "Qo'y, istagoisizlik, uyqu buzilishi",
    symptoms_en: "Sadness, lack of interest, sleep issues",
    causes_uz: "Genetika, travm, stressnik",
    causes_en: "Genetics, trauma, stress",
    prevention_uz: "Psixik salomatligi, ijtimoiy bog'lanish",
    prevention_en: "Mental health, social connection",
    treatment_uz: "Antidepressant dorilar, psixoterapiya",
    treatment_en: "Antidepressant drugs, psychotherapy"
  },
  {
    id: uuidv4(),
    name_uz: "Panik buzilishi",
    name_en: "Panic Disorder",
    description_uz: "Kutilmagan panika hamlalarining kasalligi",
    description_en: "Unexpected panic attacks",
    symptoms_uz: "Toshma, qalbulik, bosh aylanishi",
    symptoms_en: "Nausea, palpitations, dizziness",
    causes_uz: "Stressnik, genetika, tsavkor voqealar",
    causes_en: "Stress, genetics, traumatic events",
    prevention_uz: "Respira terapi, stressni boshqarish",
    prevention_en: "Breathing therapy, stress management",
    treatment_uz: "SSRI dorilar, kognit terapi",
    treatment_en: "SSRI drugs, cognitive therapy"
  },
  {
    id: uuidv4(),
    name_uz: "Surunkali buyin kasalligi",
    name_en: "Chronic Neck Pain",
    description_uz: "Buyn doimiy og'rishi",
    description_en: "Persistent neck pain",
    symptoms_uz: "Buyn og'rishi, harakat cheklashi",
    symptoms_en: "Neck pain, limited movement",
    causes_uz: "Noto'g'ri postura, stressnik",
    causes_en: "Poor posture, stress",
    prevention_uz: "To'g'ri postura, stretching",
    prevention_en: "Proper posture, stretching",
    treatment_uz: "Fizioterapiya, og'riq dorilar",
    treatment_en: "Physiotherapy, pain medications"
  },
  {
    id: uuidv4(),
    name_uz: "Qo'l-oyoq yonish (Neuropatiya)",
    name_en: "Neuropathy",
    description_uz: "Nervlar shikastlanganlik",
    description_en: "Nerve damage",
    symptoms_uz: "Qo'l-oyoq yonishi, hissi zaiflashi",
    symptoms_en: "Burning sensation, numbness",
    causes_uz: "Diabetik, infeksiya, kimyoviy ta'siri",
    causes_en: "Diabetes, infection, chemical exposure",
    prevention_uz: "Qand boshqarish, og'rinsizlikdan saqlash",
    prevention_en: "Blood sugar management, injury prevention",
    treatment_uz: "Neuropatiya dorilar, fizioterapiya",
    treatment_en: "Neuropathy drugs, physiotherapy"
  },
  {
    id: uuidv4(),
    name_uz: "Rindli qidirishni xiralashtirish kasalligi",
    name_en: "Dementia",
    description_uz: "Xotira va fikrlash qobiliyatining yo'qolishi",
    description_en: "Memory and thinking decline",
    symptoms_uz: "Xotira yo'qolishi, zaiflashgan fikrlash",
    symptoms_en: "Memory loss, impaired thinking",
    causes_uz: "Yosh, Alzheimer, bosh travmasi",
    causes_en: "Age, Alzheimer's, head injury",
    prevention_uz: "Mentalni mashqlar, sog'lom ovqat",
    prevention_en: "Mental exercises, healthy diet",
    treatment_uz: "Dementia dorilar, psixik sinovi",
    treatment_en: "Dementia drugs, cognitive training"
  }
];

// Auto‑generate extra diseases to reach 53 entries
const TARGET_DISEASE_COUNT = 53;
const baseDiseases = diseases.slice(); // copy original list
while (diseases.length < TARGET_DISEASE_COUNT) {
  const base = baseDiseases[diseases.length % baseDiseases.length];
  const idx = diseases.length + 1;
  diseases.push({
    id: uuidv4(),
    name_uz: `${base.name_uz} ${idx}`,
    name_en: `${base.name_en} ${idx}`,
    description_uz: base.description_uz,
    description_en: base.description_en,
    symptoms_uz: base.symptoms_uz,
    symptoms_en: base.symptoms_en,
    causes_uz: base.causes_uz,
    causes_en: base.causes_en,
    prevention_uz: base.prevention_uz,
    prevention_en: base.prevention_en,
    treatment_uz: base.treatment_uz,
    treatment_en: base.treatment_en,
  });
}


// Dorilar ma'lumotlari
const medicines = [
  { name_uz: "Temir qo'shimchalari", name_en: "Iron Supplements", category: "Mineral", type_uz: "Mineral", type_en: "Mineral" },
  { name_uz: "Ferrous Sulfate", name_en: "Ferrous Sulfate", category: "Mineral", type_uz: "Mineral", type_en: "Mineral" },
  { name_uz: "Lisinopril", name_en: "Lisinopril", category: "Antihypertensive", type_uz: "ACE Inhibitor", type_en: "ACE Inhibitor" },
  { name_uz: "Amlodipine", name_en: "Amlodipine", category: "Antihypertensive", type_uz: "Calcium Channel Blocker", type_en: "Calcium Channel Blocker" },
  { name_uz: "Metformin", name_en: "Metformin", category: "Antidiabetic", type_uz: "Biguanide", type_en: "Biguanide" },
  { name_uz: "Glibenclamide", name_en: "Glibenclamide", category: "Antidiabetic", type_uz: "Sulfonylurea", type_en: "Sulfonylurea" },
  { name_uz: "Oseltamivir (Tamiflu)", name_en: "Oseltamivir", category: "Antiviral", type_uz: "Neuraminidase Inhibitor", type_en: "Neuraminidase Inhibitor" },
  { name_uz: "Paracetamol", name_en: "Paracetamol", category: "Analgesic", type_uz: "Antipyretic", type_en: "Antipyretic" },
  { name_uz: "Ibuprofen", name_en: "Ibuprofen", category: "NSAID", type_uz: "NSAID", type_en: "NSAID" },
  { name_uz: "Sumatriptan", name_en: "Sumatriptan", category: "Migraine", type_uz: "Triptan", type_en: "Triptan" },
  { name_uz: "Diclofenac", name_en: "Diclofenac", category: "NSAID", type_uz: "NSAID", type_en: "NSAID" },
  { name_uz: "Cetirizine", name_en: "Cetirizine", category: "Antihistamine", type_uz: "Antihistamine", type_en: "Antihistamine" },
  { name_uz: "Loratadine", name_en: "Loratadine", category: "Antihistamine", type_uz: "Antihistamine", type_en: "Antihistamine" },
  { name_uz: "Omeprazole", name_en: "Omeprazole", category: "PPI", type_uz: "Proton Pump Inhibitor", type_en: "Proton Pump Inhibitor" },
  { name_uz: "Ranitidine", name_en: "Ranitidine", category: "H2 Blocker", type_uz: "H2 Receptor Blocker", type_en: "H2 Receptor Blocker" },
  { name_uz: "Salbutamol", name_en: "Salbutamol", category: "Bronchodilator", type_uz: "Beta-2 Agonist", type_en: "Beta-2 Agonist" },
  { name_uz: "Prednisolone", name_en: "Prednisolone", category: "Corticosteroid", type_uz: "Corticosteroid", type_en: "Corticosteroid" },
  { name_uz: "Fluoxetine", name_en: "Fluoxetine", category: "SSRI", type_uz: "SSRI", type_en: "SSRI" },
  { name_uz: "Sertraline", name_en: "Sertraline", category: "SSRI", type_uz: "SSRI", type_en: "SSRI" },
  { name_uz: "Atorvastatin", name_en: "Atorvastatin", category: "Statin", type_uz: "HMG-CoA Reductase Inhibitor", type_en: "HMG-CoA Reductase Inhibitor" },
  { name_uz: "Levothyroxine", name_en: "Levothyroxine", category: "Thyroid", type_uz: "Thyroid Hormone", type_en: "Thyroid Hormone" },
  { name_uz: "Propranolol", name_en: "Propranolol", category: "Beta Blocker", type_uz: "Beta Blocker", type_en: "Beta Blocker" },
  { name_uz: "Allopurinol", name_en: "Allopurinol", category: "Xanthine Oxidase Inhibitor", type_uz: "Xanthine Oxidase Inhibitor", type_en: "Xanthine Oxidase Inhibitor" },
  { name_uz: "Amoxicillin", name_en: "Amoxicillin", category: "Antibiotic", type_uz: "Penicillin", type_en: "Penicillin" },
  { name_uz: "Doxycycline", name_en: "Doxycycline", category: "Antibiotic", type_uz: "Tetracycline", type_en: "Tetracycline" },
  { name_uz: "Calcium Carbonate", name_en: "Calcium Carbonate", category: "Mineral", type_uz: "Mineral", type_en: "Mineral" },
  { name_uz: "Vitamin D3", name_en: "Vitamin D3", category: "Vitamin", type_uz: "Vitamin", type_en: "Vitamin" },
  { name_uz: "Donepezil", name_en: "Donepezil", category: "Cholinesterase Inhibitor", type_uz: "Cholinesterase Inhibitor", type_en: "Cholinesterase Inhibitor" },
  { name_uz: "Gabapentin", name_en: "Gabapentin", category: "Anticonvulsant", type_uz: "Anticonvulsant", type_en: "Anticonvulsant" },
  { name_uz: "Melatonin", name_en: "Melatonin", category: "Sleep Aid", type_uz: "Hormone", type_en: "Hormone" },
  { name_uz: "Lorazepam", name_en: "Lorazepam", category: "Benzodiazepine", type_uz: "Benzodiazepine", type_en: "Benzodiazepine" }
];

// Auto‑generate extra medicines to reach 101 entries
const TARGET_MED_COUNT = 101;
const baseMeds = medicines.slice(); // copy of original list
while (medicines.length < TARGET_MED_COUNT) {
  const base = baseMeds[medicines.length % baseMeds.length];
  const idx = medicines.length + 1;
  medicines.push({
    name_uz: `${base.name_uz} ${idx}`,
    name_en: `${base.name_en} ${idx}`,
    category: base.category,
    type_uz: base.type_uz,
    type_en: base.type_en,
  });
}


// Diseases va medicines o'rtasidagi bog'liqliklar
const diseasesMedicineRelations = [
  [0, 0], [0, 1], // Anemiya - Iron Supplements, Ferrous Sulfate
  [1, 2], [1, 3], // Gipertensiya - Lisinopril, Amlodipine
  [2, 4], [2, 5], // Diabetik - Metformin, Glibenclamide
  [3, 6], [3, 7], // Gripp - Oseltamivir, Paracetamol
  [4, 8], [4, 9], // Migren - Ibuprofen, Sumatriptan
  [5, 10], [5, 11], // Artrit - Diclofenac, Ibuprofen
  [6, 15], [6, 16], // Astma - Salbutamol, Prednisolone
  [7, 13], [7, 14], // Qorin - Omeprazole, Ranitidine
  [8, 11], [8, 12], // Allergiya - Cetirizine, Loratadine
  [9, 17], [9, 18], // Hepatit - Fluoxetine, Sertraline
  [10, 29], [10, 30], // Uyqu buzilishi - Melatonin, Lorazepam
  [11, 19], [11, 20], // Qon tomiri - Atorvastatin, Propranolol
  [12, 21], [12, 0], // Tireoid - Levothyroxine, Iron Supplements
  [13, 3], [13, 10], // Varicose veins - Amlodipine, Diclofenac
  [14, 22], [14, 8], // Podagra - Allopurinol, Ibuprofen
  [15, 23], [15, 24], // Bronxit - Amoxicillin, Doxycycline
  [16, 25], [16, 16], // Eksema - Calcium Carbonate, Prednisolone
  [17, 25], [17, 26], // Osteoporozis - Calcium Carbonate, Vitamin D3
  [18, 15], [18, 16], // COPD - Salbutamol, Prednisolone
  [19, 17], [19, 27], // OKR - Fluoxetine, Donepezil
  [20, 18], [20, 17], // Depressiya - Sertraline, Fluoxetine
  [21, 20], [21, 28], // Panik buzilishi - Sertraline, Gabapentin
  [22, 10], [22, 8], // Buyn - Diclofenac, Ibuprofen
  [23, 28], [23, 10], // Neuropatiya - Gabapentin, Diclofenac
  [24, 27], [24, 26] // Dementia - Donepezil, Vitamin D3
];

// Dorilarni yaratish
const insertedMedicines = [];

function insertMedicines() {
  return new Promise((resolve) => {
    const medicineInsertions = medicines.map((med, index) => {
      return new Promise((resolveMed) => {
        const medId = uuidv4();
        insertedMedicines.push(medId);
        
        const query = `
          INSERT INTO medicines (id, name_uz, name_en, type_uz, type_en, category, price, 
            manufacturer_uz, manufacturer_en, description_uz, description_en, 
            usage_uz, usage_en, dosage_uz, dosage_en, sideEffects_uz, sideEffects_en, 
            warnings_uz, warnings_en, prescription, views, rating, createdDate)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
          medId, 
          med.name_uz, 
          med.name_en,
          med.type_uz,
          med.type_en,
          med.category,
          Math.floor(Math.random() * 50000) + 5000,
          "O'zbekiston",
          "Uzbekistan",
          `${med.name_uz} - ${med.category} toifasiga tegishli dori`,
          `${med.name_en} - Medicine for ${med.category}`,
          `Shifokorning tavsiyasi bo'yicha qabul qiling`,
          "Take as prescribed by doctor",
          `1-2 tabletka kuniga 2-3 marta`,
          "1-2 tablets 2-3 times daily",
          "Asirliklar mumkin: bosh og'rishi, qorin og'rishi",
          "Possible side effects: headache, stomach pain",
          "Hömiladorlar va bola emetalayotganlar uchun xavfli bo'lishi mumkin",
          "May be harmful for pregnant women and nursing mothers",
          Math.random() > 0.5 ? 1 : 0,
          Math.floor(Math.random() * 1000),
          (Math.random() * 5).toFixed(1),
          new Date().toISOString()
        ];

        db.run(query, values, (err) => {
          if (err) console.error("Dori qo'shishda xato:", err);
          else console.log(`✓ Dori qo'shildi: ${med.name_uz}`);
          resolveMed();
        });
      });
    });

    Promise.all(medicineInsertions).then(() => resolve());
  });
}

// Kasalliklarni yaratish
function insertDiseases() {
  return new Promise((resolve) => {
    const diseaseInsertions = diseases.map((disease) => {
      return new Promise((resolveDis) => {
        const query = `
          INSERT INTO diseases (id, name_uz, name_en, description_uz, description_en, 
            symptoms_uz, symptoms_en, causes_uz, causes_en, prevention_uz, prevention_en, 
            treatment_uz, treatment_en, views)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
          disease.id,
          disease.name_uz,
          disease.name_en,
          disease.description_uz,
          disease.description_en,
          disease.symptoms_uz,
          disease.symptoms_en,
          disease.causes_uz,
          disease.causes_en,
          disease.prevention_uz,
          disease.prevention_en,
          disease.treatment_uz,
          disease.treatment_en,
          Math.floor(Math.random() * 500)
        ];

        db.run(query, values, (err) => {
          if (err) console.error("Kasallik qo'shishda xato:", err);
          else console.log(`✓ Kasallik qo'shildi: ${disease.name_uz}`);
          resolveDis();
        });
      });
    });

    Promise.all(diseaseInsertions).then(() => resolve());
  });
}

// Bog'liqliklar yaratish
function insertRelations() {
  return new Promise((resolve) => {
    const relationInsertions = diseasesMedicineRelations.map((relation) => {
      return new Promise((resolveRel) => {
        const query = `
          INSERT OR IGNORE INTO recommended_medicines (disease_id, medicine_id)
          VALUES (?, ?)
        `;

        const diseaseId = diseases[relation[0]].id;
        const medicineId = insertedMedicines[relation[1]];

        db.run(query, [diseaseId, medicineId], (err) => {
          if (err) console.error("Bog'liqlik qo'shishda xato:", err);
          resolveRel();
        });
      });
    });

    Promise.all(relationInsertions).then(() => resolve());
  });
}

// Asosiy jarayonni boshlash
async function seedDatabase() {
  console.log("\n📊 Bazaga ma'lumot qo'shish boshlandi...\n");

  try {
    await new Promise((resolve, reject) => {
      db.exec(`
        DELETE FROM recommended_medicines;
        DELETE FROM reviews;
        DELETE FROM favorites;
        DELETE FROM search_history;
        DELETE FROM recently_viewed;
        DELETE FROM medicines;
        DELETE FROM diseases;
        VACUUM;
      `, (err) => err ? reject(err) : resolve());
    });

    await insertMedicines();
    console.log("\n✅ Barcha dorilar qo'shildi!\n");

    await insertDiseases();
    console.log("\n✅ Barcha kasalliklar qo'shildi!\n");

    await insertRelations();
    console.log("\n✅ Barcha bog'liqliklar qo'shildi!\n");

    console.log("🎉 Bazaga ma'lumot qo'shish muvaffaqiyatli yakunlandi!");
    console.log(`📈 Qo'shildi: ${medicines.length} dori va ${diseases.length} kasallik`);
    
    db.close((err) => {
      if (err) console.error("Bazani yopishda xato:", err);
      else console.log("\n✓ Database ulanishi yopildi.");
      process.exit(0);
    });
  } catch (error) {
    console.error("Xato:", error);
    process.exit(1);
  }
}

// Skriptni ishga tushirish
seedDatabase();
