// middleware/auth.js - Sessiyalarni tekshirish va contextni EJS-ga ulash

const TRANSLATIONS = {
  uz: {
    nav_home: "Bosh sahifa", nav_medicines: "Dorilar", nav_diseases: "Kasalliklar",
    nav_favorites: "Sevimlilar", nav_compare: "Solishtirish", drop_profile: "Mening profilim",
    drop_admin: "Admin boshqaruvi", drop_logout: "Tizimdan chiqish", btn_login: "Kirish",
    loading: "Yuklanmoqda...", footer_rights: "Barcha huquqlar himoyalangan.",
    footer_disclaimer: "Ushbu loyiha faqat tibbiy tanishuv maqsadida ishlab chiqilgan. Shifokor maslahatisiz dori qabul qilmang!",
    modal_login_title: "Tizimga kirish", modal_reg_title: "Ro'yxatdan o'tish", lbl_email: "Elektron pochta",
    lbl_password: "Parol", lbl_fullname: "To'liq ismingiz", lbl_confirm_password: "Parolni tasdiqlang",
    btn_login_submit: "Tizimga kirish", btn_register_submit: "Ro'yxatdan o'tish", login_switch_text: "Hisobingiz yo'qmi?",
    reg_switch_text: "Hisobingiz bormi?", link_register: "Ro'yxatdan o'tish", link_login: "Tizimga kirish",
    hero_badge: "Tibbiy ma'lumotlar kutubxonasi", hero_title_1: "Siz izlagan barcha",
    hero_title_2: "dorilar va kasalliklar", hero_title_3: "bir joyda!",
    hero_subtitle: "Dori vositalarining tarkibi, qo'llash usullari, nojo'ya ta'sirlari, o'zaro o'xshashliklari va kasallik belgilari haqida to'liq ilmiy ma'lumotlar portali.",
    tab_search_med: "Dori izlash", tab_search_dis: "Kasallik izlash", btn_search: "Izlash",
    placeholder_search_med: "Masalan: Paratsetamol, Aspirin...", placeholder_search_dis: "Masalan: Gripp, Gastrit...",
    stat_medicines: "Umumiy dorilar", stat_diseases: "Ro'yxatga olingan kasalliklar", stat_searches: "Faol qidiruvlar",
    stat_comparisons: "Solishtirishlar", section_trending_medicines: "Mashhur dori vositalari",
    section_popular_diseases: "Tez-tez uchraydigan kasalliklar", btn_view_all: "Barchasini ko'rish",
    filter_title: "Filtrlash", filter_category: "Turkumlar", filter_type_all: "Barcha turkumlar",
    filter_type_painkillers: "Og'riq qoldiruvchilar", filter_type_antibiotics: "Antibiotiklar",
    filter_type_cardio: "Yurak-qon tomir", filter_type_vitamins: "Vitaminlar", filter_type_digestive: "Ovqat hazm qilish",
    filter_prescription: "Retsept holati", filter_rx_all: "Hammasi", filter_rx_no: "Retseptsiz (OTC)",
    filter_rx_yes: "Faqat retseptli (Rx)", filter_sort: "Saralash", sort_popular: "Mashhurligi bo'yicha",
    sort_price_asc: "Narxi: arzonidan qimmatiga", sort_price_desc: "Narxi: qimmatidan arzoniga",
    sort_rating: "Reyting bo'yicha", sort_alpha: "Alifbo bo'yicha", found_items: "ta ma'lumot topildi",
    card_rx_yes: "Retseptli", card_rx_no: "Retseptsiz", card_btn_more: "Batafsil", card_price_from: "Narxi:",
    manufacturer: "Ishlab chiqaruvchi", dosage_info: "Dozalash", usage_instructions: "Qo'llash ko'rsatmalari",
    side_effects: "Nojo'ya ta'sirlari", warnings: "Maxsus ogohlantirishlar", similar_medicines: "O'xshash dori vositalari",
    add_to_compare: "Solishtirishga qo'shish", remove_from_compare: "Solishtirishdan o'chirish",
    btn_add_favorite: "Sevimlilarga qo'shish", btn_remove_favorite: "Sevimlilardan o'chirish",
    symptoms: "Kasallik belgilari (Simptomlar)", causes: "Kelib chiqish sabablari", prevention: "Oldini olish (Profilaktika)",
    treatment: "Davolash choralari", recommended_medicines: "Tavsiya etiladigan dorilar",
    reviews_title: "Foydalanuvchi fikrlari va sharhlari",
    reviews_empty: "Ushbu dori uchun hali fikrlar qoldirilmagan. Birinchi bo'lib sharh qoldiring!",
    review_add_title: "Fikr qoldirish", review_label_name: "Ismingiz", review_label_stars: "Bahoyingiz",
    review_label_comment: "Sharhingiz matni", btn_submit_review: "Sharh yuborish",
    compare_title: "Dorilarni solishtirish",
    compare_empty: "Solishtirish uchun hali dorilar tanlanmagan. Dorilar ro'yxatidan solishtirmoqchi bo'lgan 2-3 ta dorini tanlang.",
    btn_compare_now: "Solishtirish", btn_clear: "Tozalash", attr_price: "Narxi", attr_type: "Turi",
    attr_prescription: "Retsept holati", attr_rating: "Reyting", attr_manufacturer: "Ishlab chiqaruvchi",
    attr_side_effects: "Nojo'ya ta'sirlari", attr_dosage: "Dozalash", fav_title: "My Favorites",
    fav_med_tab: "Favorite Medicines", fav_dis_tab: "Favorite Diseases", fav_empty: "Your favorites list is empty.",
    profile_title: "Mening profilim", profile_joined: "Ro'yxatdan o'tilgan sana:", profile_role: "Rol:",
    profile_tab_info: "Shaxsiy ma'lumotlar", profile_tab_history: "Ko'rilganlar & Tarix",
    btn_save_changes: "O'zgarishlarni saqlash", lbl_new_password: "Yangi parol (ixtiyoriy)",
    recent_searches: "Oxirgi qidiruvlar", recently_viewed: "Oxirgi ko'rilgan dorilar va kasalliklar",
    btn_clear_history: "Tarixni tozalash", admin_title: "Admin Boshqaruv Paneli",
    admin_tab_med: "Dorilarni boshqarish", admin_tab_dis: "Kasalliklarni boshqarish",
    admin_tab_users: "Foydalanuvchilar", btn_add_new_med: "Yangi dori qo'shish",
    btn_add_new_dis: "Yangi kasallik qo'shish", col_name: "Nomi", col_price: "Narxi",
    col_type: "Turi", col_role: "Roli", col_joined: "Sana", col_actions: "Harakatlar",
    btn_edit: "Tahrirlash", btn_delete: "O'chirish"
  },
  en: {
    nav_home: "Home", nav_medicines: "Medicines", nav_diseases: "Diseases",
    nav_favorites: "Favorites", nav_compare: "Compare", drop_profile: "My Profile",
    drop_admin: "Admin Control", drop_logout: "Logout", btn_login: "Login",
    loading: "Loading...", footer_rights: "All rights reserved.",
    footer_disclaimer: "This project is built for medical information purposes only. Do not take medications without consulting a doctor!",
    modal_login_title: "Login", modal_reg_title: "Register", lbl_email: "Email Address",
    lbl_password: "Password", lbl_fullname: "Full Name", lbl_confirm_password: "Confirm Password",
    btn_login_submit: "Login", btn_register_submit: "Register", login_switch_text: "Don't have an account?",
    reg_switch_text: "Already have an account?", link_register: "Register", link_login: "Login",
    hero_badge: "Medical Information Library", hero_title_1: "All the",
    hero_title_2: "medicines & diseases", hero_title_3: "you seek in one place!",
    hero_subtitle: "A portal offering comprehensive, scientific information about medicine composition, usage methods, side effects, similarities, and disease symptoms.",
    tab_search_med: "Search Medicine", tab_search_dis: "Search Disease", btn_search: "Search",
    placeholder_search_med: "e.g., Paracetamol, Aspirin...", placeholder_search_dis: "e.g., Flu, Gastritis...",
    stat_medicines: "Total Medicines", stat_diseases: "Registered Diseases", stat_searches: "Active Searches",
    stat_comparisons: "Comparisons", section_trending_medicines: "Trending Medicines",
    section_popular_diseases: "Popular Diseases", btn_view_all: "View All",
    filter_title: "Filter", filter_category: "Categories", filter_type_all: "All Categories",
    filter_type_painkillers: "Painkillers", filter_type_antibiotics: "Antibiotics",
    filter_type_cardio: "Cardiovascular", filter_type_vitamins: "Vitamins", filter_type_digestive: "Digestive System",
    filter_prescription: "Prescription Status", filter_rx_all: "All", filter_rx_no: "Over-the-counter (OTC)",
    filter_rx_yes: "Prescription only (Rx)", filter_sort: "Sort by", sort_popular: "By Popularity",
    sort_price_asc: "Price: Low to High", sort_price_desc: "Price: High to Low",
    sort_rating: "By Rating", sort_alpha: "Alphabetical", found_items: "items found",
    card_rx_yes: "Prescription", card_rx_no: "OTC", card_btn_more: "Details", card_price_from: "Price:",
    manufacturer: "Manufacturer", dosage_info: "Dosage", usage_instructions: "Usage Instructions",
    side_effects: "Side Effects", warnings: "Special Warnings", similar_medicines: "Similar Medicines",
    add_to_compare: "Add to Compare", remove_from_compare: "Remove Compare",
    btn_add_favorite: "Add to Favorites", btn_remove_favorite: "Remove Favorite",
    symptoms: "Disease Symptoms", causes: "Causes", prevention: "Prevention",
    treatment: "Treatment Steps", recommended_medicines: "Recommended Medicines",
    reviews_title: "User Reviews & Ratings",
    reviews_empty: "No reviews left for this medicine yet. Be the first to leave one!",
    review_add_title: "Add a Review", review_label_name: "Your Name", review_label_stars: "Your Rating",
    review_label_comment: "Review Comment", btn_submit_review: "Submit Review",
    compare_title: "Compare Medicines",
    compare_empty: "No medicines selected for comparison yet. Select 2-3 medicines from the catalog to compare.",
    btn_compare_now: "Compare Now", btn_clear: "Clear All", attr_price: "Price", attr_type: "Type",
    attr_prescription: "Prescription", attr_rating: "Rating", attr_manufacturer: "Manufacturer",
    attr_side_effects: "Side Effects", attr_dosage: "Dosage", fav_title: "Favorites List",
    fav_med_tab: "Favorite Medicines", fav_dis_tab: "Favorite Diseases", fav_empty: "Favorites list is empty.",
    profile_title: "My Profile", profile_joined: "Joined Date:", profile_role: "Role:",
    profile_tab_info: "Personal Info", profile_tab_history: "Viewed & History",
    btn_save_changes: "Save Changes", lbl_new_password: "New Password (optional)",
    recent_searches: "Recent Searches", recently_viewed: "Recently Viewed Medicines & Diseases",
    btn_clear_history: "Clear History", admin_title: "Admin Dashboard",
    admin_tab_med: "Manage Medicines", admin_tab_dis: "Manage Diseases",
    admin_tab_users: "Users List", btn_add_new_med: "Add New Medicine",
    btn_add_new_dis: "Add New Disease", col_name: "Name", col_price: "Price",
    col_type: "Type", col_role: "Role", col_joined: "Joined Date", col_actions: "Actions",
    btn_edit: "Edit", btn_delete: "Delete"
  }
};

module.exports = {
  TRANSLATIONS, // Boshqa joylarda ham ishlatish uchun
  
  setUserContext: (req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.lang = req.cookies.lang || 'uz';
    res.locals.theme = req.cookies.theme || 'light';
    
    // EJS tarjima yordamchisi
    res.locals.t = (key) => {
      const lang = res.locals.lang;
      return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || key;
    };
    next();
  },
  
  requireLogin: (req, res, next) => {
    if (!req.session.user) {
      if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        return res.status(401).json({ error: "Avtorizatsiyadan o'ting!" });
      }
      return res.redirect('/?login_required=true');
    }
    next();
  },
  
  requireAdmin: (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
      if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        return res.status(403).json({ error: "Ruxsat etilmagan!" });
      }
      return res.status(403).render('404', { title: "Ruxsat etilmagan" });
    }
    next();
  }
};
