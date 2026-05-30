// app.js - Dori.uz Asosiy mantiqiy boshqaruvchi (SPA Router va UI)

// --- 1. KO'P TILLILIK TIZIMI (I18N) ---
const TRANSLATIONS = {
  uz: {
    // Navigatsiya
    nav_home: "Bosh sahifa",
    nav_medicines: "Dorilar",
    nav_diseases: "Kasalliklar",
    nav_favorites: "Sevimlilar",
    nav_compare: "Solishtirish",
    drop_profile: "Mening profilim",
    drop_admin: "Admin boshqaruvi",
    drop_logout: "Tizimdan chiqish",
    btn_login: "Kirish",
    
    // Footer va Tizim
    loading: "Yuklanmoqda...",
    footer_rights: "Barcha huquqlar himoyalangan.",
    footer_disclaimer: "Ushbu loyiha faqat tibbiy tanishuv maqsadida ishlab chiqilgan. Shifokor maslahatisiz dori qabul qilmang!",
    
    // Auth Modal
    modal_login_title: "Tizimga kirish",
    modal_reg_title: "Ro'yxatdan o'tish",
    lbl_email: "Elektron pochta",
    lbl_password: "Parol",
    lbl_fullname: "To'liq ismingiz",
    lbl_confirm_password: "Parolni tasdiqlang",
    btn_login_submit: "Tizimga kirish",
    btn_register_submit: "Ro'yxatdan o'tish",
    login_switch_text: "Hisobingiz yo'qmi?",
    reg_switch_text: "Hisobingiz bormi?",
    link_register: "Ro'yxatdan o'tish",
    link_login: "Tizimga kirish",
    
    // Bosh sahifa (Hero)
    hero_badge: "Tibbiy ma'lumotlar kutubxonasi",
    hero_title_1: "Siz izlagan barcha",
    hero_title_2: "dorilar va kasalliklar",
    hero_title_3: "bir joyda!",
    hero_subtitle: "Dori vositalarining tarkibi, qo'llash usullari, nojo'ya ta'sirlari, o'zaro o'xshashliklari va kasallik belgilari haqida to'liq ilmiy ma'lumotlar portali.",
    tab_search_med: "Dori izlash",
    tab_search_dis: "Kasallik izlash",
    btn_search: "Izlash",
    placeholder_search_med: "Masalan: Paratsetamol, Aspirin...",
    placeholder_search_dis: "Masalan: Gripp, Gastrit...",
    
    // Statistika
    stat_medicines: "Umumiy dorilar",
    stat_diseases: "Ro'yxatga olingan kasalliklar",
    stat_searches: "Faol qidiruvlar",
    stat_comparisons: "Solishtirishlar",
    
    // Bo'lim sarlavhalari
    section_trending_medicines: "Mashhur dori vositalari",
    section_popular_diseases: "Tez-tez uchraydigan kasalliklar",
    btn_view_all: "Barchasini ko'rish",
    
    // Kataloglar va filtrlar
    filter_title: "Filtrlash",
    filter_category: "Turkumlar",
    filter_type_all: "Barcha turkumlar",
    filter_type_painkillers: "Og'riq qoldiruvchilar",
    filter_type_antibiotics: "Antibiotiklar",
    filter_type_cardio: "Yurak-qon tomir",
    filter_type_vitamins: "Vitaminlar",
    filter_type_digestive: "Ovqat hazm qilish",
    filter_prescription: "Retsept holati",
    filter_rx_all: "Hammasi",
    filter_rx_no: "Retseptsiz (OTC)",
    filter_rx_yes: "Faqat retseptli (Rx)",
    filter_sort: "Saralash",
    sort_popular: "Mashhurligi bo'yicha",
    sort_price_asc: "Narxi: arzonidan qimmatiga",
    sort_price_desc: "Narxi: qimmatidan arzoniga",
    sort_rating: "Reyting bo'yicha",
    sort_alpha: "Alifbo bo'yicha",
    found_items: "ta ma'lumot topildi",
    
    // Dori kartasi va tafsilotlari
    card_rx_yes: "Retseptli",
    card_rx_no: "Retseptsiz",
    card_btn_more: "Batafsil",
    card_price_from: "Narxi:",
    manufacturer: "Ishlab chiqaruvchi",
    dosage_info: "Dozalash",
    usage_instructions: "Qo'llash ko'rsatmalari",
    side_effects: "Nojo'ya ta'sirlari",
    warnings: "Maxsus ogohlantirishlar",
    similar_medicines: "O'xshash dori vositalari",
    add_to_compare: "Solishtirishga qo'shish",
    remove_from_compare: "Solishtirishdan o'chirish",
    btn_add_favorite: "Sevimlilarga qo'shish",
    btn_remove_favorite: "Sevimlilardan o'chirish",
    
    // Kasallik kartasi va tafsilotlari
    symptoms: "Kasallik belgilari (Simptomlar)",
    causes: "Kelib chiqish sabablari",
    prevention: "Oldini olish (Profilaktika)",
    treatment: "Davolash choralari",
    recommended_medicines: "Tavsiya etiladigan dorilar",
    
    // Sharhlar
    reviews_title: "Foydalanuvchi fikrlari va sharhlari",
    reviews_empty: "Ushbu dori uchun hali fikrlar qoldirilmagan. Birinchi bo'lib sharh qoldiring!",
    review_add_title: "Fikr qoldirish",
    review_label_name: "Ismingiz",
    review_label_stars: "Bahoyingiz",
    review_label_comment: "Sharhingiz matni",
    btn_submit_review: "Sharh yuborish",
    
    // Solishtirish sahifasi
    compare_title: "Dorilarni solishtirish",
    compare_empty: "Solishtirish uchun hali dorilar tanlanmagan. Dorilar ro'yxatidan solishtirmoqchi bo'lgan 2-3 ta dorini tanlang.",
    btn_compare_now: "Solishtirish",
    btn_clear: "Tozalash",
    attr_price: "Narxi",
    attr_type: "Turi",
    attr_prescription: "Retsept holati",
    attr_rating: "Reyting",
    attr_manufacturer: "Ishlab chiqaruvchi",
    attr_side_effects: "Nojo'ya ta'sirlari",
    attr_dosage: "Dozalash",
    
    // Sevimlilar sahifasi
    fav_title: "Sevimlilar ro'yxati",
    fav_med_tab: "Sevimlilar dorilar",
    fav_dis_tab: "Sevimlilar kasalliklar",
    fav_empty: "Sevimlilar ro'yxatingiz bo'sh.",
    
    // Profil sahifasi
    profile_title: "Mening profilim",
    profile_joined: "Ro'yxatdan o'tilgan sana:",
    profile_role: "Rol:",
    profile_tab_info: "Shaxsiy ma'lumotlar",
    profile_tab_history: "Ko'rilganlar & Tarix",
    btn_save_changes: "O'zgarishlarni saqlash",
    lbl_new_password: "Yangi parol (ixtiyoriy)",
    recent_searches: "Oxirgi qidiruvlar",
    recently_viewed: "Oxirgi ko'rilgan dorilar va kasalliklar",
    btn_clear_history: "Tarixni tozalash",
    
    // Admin Dashboard
    admin_title: "Admin Boshqaruv Paneli",
    admin_tab_med: "Dorilarni boshqarish",
    admin_tab_dis: "Kasalliklarni boshqarish",
    admin_tab_users: "Foydalanuvchilar",
    btn_add_new_med: "Yangi dori qo'shish",
    btn_add_new_dis: "Yangi kasallik qo'shish",
    col_name: "Nomi",
    col_price: "Narxi",
    col_type: "Turi",
    col_role: "Roli",
    col_joined: "Sana",
    col_actions: "Harakatlar",
    btn_edit: "Tahrirlash",
    btn_delete: "O'chirish",
    
    // Toasts va Ogohlantirishlar
    toast_login_success: "Tizimga muvaffaqiyatli kirdingiz!",
    toast_logout_success: "Tizimdan chiqdingiz.",
    toast_reg_success: "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi!",
    toast_pw_error: "Kiritilgan parollar bir-biriga mos kelmadi!",
    toast_fav_added: "Sevimlilarga muvaffaqiyatli qo'shildi!",
    toast_fav_removed: "Sevimlilardan olib tashlandi.",
    toast_comp_added: "Solishtirish ro'yxatiga qo'shildi!",
    toast_comp_removed: "Solishtirish ro'yxatidan o'chirildi.",
    toast_review_success: "Sharhingiz qabul qilindi, rahmat!",
    toast_admin_save_success: "Ma'lumot muvaffaqiyatli saqlandi!",
    toast_admin_delete_success: "Ma'lumot tizimdan o'chirildi."
  },
  en: {
    nav_home: "Home",
    nav_medicines: "Medicines",
    nav_diseases: "Diseases",
    nav_favorites: "Favorites",
    nav_compare: "Compare",
    drop_profile: "My Profile",
    drop_admin: "Admin Control",
    drop_logout: "Logout",
    btn_login: "Login",
    
    loading: "Loading...",
    footer_rights: "All rights reserved.",
    footer_disclaimer: "This project is built for medical information purposes only. Do not take medications without consulting a doctor!",
    
    modal_login_title: "Login",
    modal_reg_title: "Register",
    lbl_email: "Email Address",
    lbl_password: "Password",
    lbl_fullname: "Full Name",
    lbl_confirm_password: "Confirm Password",
    btn_login_submit: "Login",
    btn_register_submit: "Register",
    login_switch_text: "Don't have an account?",
    reg_switch_text: "Already have an account?",
    link_register: "Register",
    link_login: "Login",
    
    hero_badge: "Medical Information Library",
    hero_title_1: "All the",
    hero_title_2: "medicines & diseases",
    hero_title_3: "you seek in one place!",
    hero_subtitle: "A portal offering comprehensive, scientific information about medicine composition, usage methods, side effects, similarities, and disease symptoms.",
    tab_search_med: "Search Medicine",
    tab_search_dis: "Search Disease",
    btn_search: "Search",
    placeholder_search_med: "e.g., Paracetamol, Aspirin...",
    placeholder_search_dis: "e.g., Flu, Gastritis...",
    
    stat_medicines: "Total Medicines",
    stat_diseases: "Registered Diseases",
    stat_searches: "Active Searches",
    stat_comparisons: "Comparisons",
    
    section_trending_medicines: "Trending Medicines",
    section_popular_diseases: "Popular Diseases",
    btn_view_all: "View All",
    
    filter_title: "Filter",
    filter_category: "Categories",
    filter_type_all: "All Categories",
    filter_type_painkillers: "Painkillers",
    filter_type_antibiotics: "Antibiotics",
    filter_type_cardio: "Cardiovascular",
    filter_type_vitamins: "Vitamins",
    filter_type_digestive: "Digestive System",
    filter_prescription: "Prescription Status",
    filter_rx_all: "All",
    filter_rx_no: "Over-the-counter (OTC)",
    filter_rx_yes: "Prescription only (Rx)",
    filter_sort: "Sort by",
    sort_popular: "By Popularity",
    sort_price_asc: "Price: Low to High",
    sort_price_desc: "Price: High to Low",
    sort_rating: "By Rating",
    sort_alpha: "Alphabetical",
    found_items: "items found",
    
    card_rx_yes: "Prescription",
    card_rx_no: "OTC",
    card_btn_more: "Details",
    card_price_from: "Price:",
    manufacturer: "Manufacturer",
    dosage_info: "Dosage",
    usage_instructions: "Usage Instructions",
    side_effects: "Side Effects",
    warnings: "Special Warnings",
    similar_medicines: "Similar Medicines",
    add_to_compare: "Add to Compare",
    remove_from_compare: "Remove Compare",
    btn_add_favorite: "Add to Favorites",
    btn_remove_favorite: "Remove Favorite",
    
    symptoms: "Disease Symptoms",
    causes: "Causes",
    prevention: "Prevention",
    treatment: "Treatment Steps",
    recommended_medicines: "Recommended Medicines",
    
    reviews_title: "User Reviews & Ratings",
    reviews_empty: "No reviews left for this medicine yet. Be the first to leave one!",
    review_add_title: "Add a Review",
    review_label_name: "Your Name",
    review_label_stars: "Your Rating",
    review_label_comment: "Review Comment",
    btn_submit_review: "Submit Review",
    
    compare_title: "Compare Medicines",
    compare_empty: "No medicines selected for comparison yet. Select 2-3 medicines from the catalog to compare.",
    btn_compare_now: "Compare Now",
    btn_clear: "Clear All",
    attr_price: "Price",
    attr_type: "Type",
    attr_prescription: "Prescription",
    attr_rating: "Rating",
    attr_manufacturer: "Manufacturer",
    attr_side_effects: "Side Effects",
    attr_dosage: "Dosage",
    
    fav_title: "My Favorites",
    fav_med_tab: "Favorite Medicines",
    fav_dis_tab: "Favorite Diseases",
    fav_empty: "Your favorites list is empty.",
    
    profile_title: "My Profile",
    profile_joined: "Joined Date:",
    profile_role: "Role:",
    profile_tab_info: "Personal Info",
    profile_tab_history: "Viewed & History",
    btn_save_changes: "Save Changes",
    lbl_new_password: "New Password (optional)",
    recent_searches: "Recent Searches",
    recently_viewed: "Recently Viewed Medicines & Diseases",
    btn_clear_history: "Clear History",
    
    admin_title: "Admin Dashboard",
    admin_tab_med: "Manage Medicines",
    admin_tab_dis: "Manage Diseases",
    admin_tab_users: "Users List",
    btn_add_new_med: "Add New Medicine",
    btn_add_new_dis: "Add New Disease",
    col_name: "Name",
    col_price: "Price",
    col_type: "Type",
    col_role: "Role",
    col_joined: "Joined Date",
    col_actions: "Actions",
    btn_edit: "Edit",
    btn_delete: "Delete",
    
    toast_login_success: "Successfully logged in!",
    toast_logout_success: "Successfully logged out.",
    toast_reg_success: "Registration completed successfully!",
    toast_pw_error: "Passwords do not match!",
    toast_fav_added: "Successfully added to favorites!",
    toast_fav_removed: "Removed from favorites.",
    toast_comp_added: "Added to comparison list!",
    toast_comp_removed: "Removed from comparison.",
    toast_review_success: "Thank you, your review was submitted!",
    toast_admin_save_success: "Information successfully saved!",
    toast_admin_delete_success: "Information deleted from system."
  }
};

// --- 2. GLOBAL STATS (Mock-up) ---
let globalStats = {
  searches: 3450
};

// --- 3. CORE CONTROLLER CLASS ---
class ApplicationController {
  constructor() {
    this.currentLanguage = localStorage.getItem("dori_lang") || "uz";
    this.activeTheme = localStorage.getItem("dori_theme") || "light";
    this.activeRoute = "#home";
    this.activeSearchTab = "medicine"; // 'medicine' or 'disease'
    
    this.init();
  }

  init() {
    // A. Theme / Mavzuni yuklash
    if (this.activeTheme === "dark") {
      document.body.classList.add("dark");
      document.querySelector(".sun-icon").style.display = "block";
      document.querySelector(".moon-icon").style.display = "none";
    }

    // B. Lang / Tilni yuklash
    document.getElementById("lang-toggle-btn").textContent = this.currentLanguage === "uz" ? "EN" : "UZ";
    this.translateStaticHTML();

    // C. Auth / Avtorizatsiyani yuklash
    this.updateUserWidget();

    // D. Dori Solishtirish paneli
    this.updateCompareDrawer();

    // E. Eventlarni sozlash
    this.bindEvents();

    // F. SPA Router-ni ishga tushirish
    window.addEventListener("hashchange", () => this.handleRouting());
    this.handleRouting();
  }

  // --- INTERFEYS TILINI ALMAShTIRISH (I18N) ---
  t(key) {
    return TRANSLATIONS[this.currentLanguage][key] || key;
  }

  translateStaticHTML() {
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.getAttribute("data-i18n");
      element.textContent = this.t(key);
    });

    // Qidiruv inputlariga placeholderlarni o'rnatish
    const navInput = document.getElementById("nav-search-input");
    if (navInput) {
      navInput.placeholder = this.currentLanguage === "uz" ? "Dori yoki kasallikni qidiring..." : "Search medicine or disease...";
    }
  }

  // --- BIND EVENT LISTENERS ---
  bindEvents() {
    // 1. Mavzu (Dark Mode) tugmasi
    document.getElementById("theme-toggle-btn").addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      this.activeTheme = isDark ? "dark" : "light";
      localStorage.setItem("dori_theme", this.activeTheme);
      
      document.querySelector(".sun-icon").style.display = isDark ? "block" : "none";
      document.querySelector(".moon-icon").style.display = isDark ? "none" : "block";
    });

    // 2. Tilni o'zgartirish tugmasi
    document.getElementById("lang-toggle-btn").addEventListener("click", () => {
      this.currentLanguage = this.currentLanguage === "uz" ? "en" : "uz";
      localStorage.setItem("dori_lang", this.currentLanguage);
      document.getElementById("lang-toggle-btn").textContent = this.currentLanguage === "uz" ? "EN" : "UZ";
      
      this.translateStaticHTML();
      this.handleRouting(); // Dinamik yuklangan sahifani qayta chizish
      this.updateCompareDrawer();
    });

    // 3. Mobil menyu toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
    
    // Har bir havola bosilganda menyu yopilishi uchun
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });

    // 4. Qidiruv auto-suggest (navbar-dagi kichik qidiruv)
    const navSearch = document.getElementById("nav-search-input");
    const navSuggestions = document.getElementById("nav-search-suggestions");
    
    navSearch.addEventListener("input", (e) => {
      const val = e.target.value.trim().toLowerCase();
      if (val.length < 2) {
        navSuggestions.style.display = "none";
        return;
      }

      // Qidiruv mantiqi
      const medicines = window.db.getMedicines().filter(m => 
        m.name.uz.toLowerCase().includes(val) || m.name.en.toLowerCase().includes(val)
      );
      const diseases = window.db.getDiseases().filter(d => 
        d.name.uz.toLowerCase().includes(val) || d.name.en.toLowerCase().includes(val)
      );

      let html = "";
      let count = 0;

      medicines.slice(0, 4).forEach(m => {
        html += `
          <div class="suggestion-item" data-route="#medicine/${m.id}">
            <span class="suggestion-text">${m.name[this.currentLanguage]}</span>
            <span class="suggestion-type med">dori</span>
          </div>
        `;
        count++;
      });

      diseases.slice(0, 4).forEach(d => {
        html += `
          <div class="suggestion-item" data-route="#disease/${d.id}">
            <span class="suggestion-text">${d.name[this.currentLanguage]}</span>
            <span class="suggestion-type dis">kasallik</span>
          </div>
        `;
        count++;
      });

      if (count > 0) {
        navSuggestions.innerHTML = html;
        navSuggestions.style.display = "block";
        
        // Klik mantiqini bog'lash
        navSuggestions.querySelectorAll(".suggestion-item").forEach(item => {
          item.addEventListener("mousedown", (e) => {
            const route = item.getAttribute("data-route");
            window.location.hash = route;
            navSearch.value = "";
            navSuggestions.style.display = "none";
          });
        });
      } else {
        navSuggestions.style.display = "none";
      }
    });

    // Fokus yo'qolganda takliflarni yashirish
    navSearch.addEventListener("blur", () => {
      setTimeout(() => { navSuggestions.style.display = "none"; }, 200);
    });

    // 5. Auth / Kirish modal boshqaruvi
    const authModal = document.getElementById("auth-modal");
    const loginForm = document.getElementById("login-form");
    const regForm = document.getElementById("register-form");
    const switchReg = document.getElementById("to-register-link");
    const switchLogin = document.getElementById("to-login-link");
    const modalTitle = document.getElementById("auth-modal-title");
    
    document.getElementById("login-trigger-btn").addEventListener("click", () => {
      authModal.style.display = "flex";
    });

    document.getElementById("auth-modal-close").addEventListener("click", () => {
      authModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === authModal) {
        authModal.style.display = "none";
      }
      
      // Profil dropdown yopilishi
      const dropdown = document.getElementById("profile-dropdown");
      const avatarBtn = document.getElementById("user-avatar-btn");
      if (dropdown && avatarBtn && !avatarBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });

    switchReg.addEventListener("click", () => {
      loginForm.style.display = "none";
      regForm.style.display = "block";
      modalTitle.textContent = this.t("modal_reg_title");
    });

    switchLogin.addEventListener("click", () => {
      regForm.style.display = "none";
      loginForm.style.display = "block";
      modalTitle.textContent = this.t("modal_login_title");
    });

    // Profil menyusi ochilishi
    document.addEventListener("click", (e) => {
      const avatarBtn = document.getElementById("user-avatar-btn");
      const dropdown = document.getElementById("profile-dropdown");
      if (avatarBtn && avatarBtn.contains(e.target)) {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
      }
    });

    // Tizimdan chiqish (Logout)
    document.getElementById("drop-logout").addEventListener("click", () => {
      window.db.setCurrentUser(null);
      this.updateUserWidget();
      this.showToast(this.t("toast_logout_success"), "info");
      window.location.hash = "#home";
    });

    // Kirish va Ro'yxatdan o'tish formalarini jo'natish
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const pass = document.getElementById("login-password").value;
      try {
        window.db.loginUser(email, pass);
        authModal.style.display = "none";
        this.updateUserWidget();
        this.showToast(this.t("toast_login_success"), "success");
        loginForm.reset();
        this.handleRouting(); // Profil yoki Admin sahifalari yangilanishi uchun
      } catch (err) {
        this.showToast(err.message, "error");
      }
    });

    regForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reg-name").value;
      const email = document.getElementById("reg-email").value;
      const pass = document.getElementById("reg-password").value;
      const confirmPass = document.getElementById("reg-confirm-password").value;

      if (pass !== confirmPass) {
        this.showToast(this.t("toast_pw_error"), "error");
        return;
      }

      try {
        window.db.registerUser(name, email, pass);
        authModal.style.display = "none";
        this.updateUserWidget();
        this.showToast(this.t("toast_reg_success"), "success");
        regForm.reset();
        this.handleRouting();
      } catch (err) {
        this.showToast(err.message, "error");
      }
    });

    // Solishtirish jarayoni tugmalari
    document.getElementById("compare-navigate-btn").addEventListener("click", () => {
      window.location.hash = "#compare";
      document.getElementById("compare-drawer").classList.remove("open");
    });
    
    document.getElementById("compare-clear-btn").addEventListener("click", () => {
      window.db.clearCompare();
      this.updateCompareDrawer();
      this.showToast(this.t("toast_comp_removed"), "info");
      if (this.activeRoute === "#compare") {
        this.renderCompare(); // Solishtirish sahifasida tursa yangilaymiz
      }
    });

    document.getElementById("compare-close-btn").addEventListener("click", () => {
      document.getElementById("compare-drawer").classList.remove("open");
    });
  }

  // --- USER PROFILE HOlATI YANGILANIShI ---
  updateUserWidget() {
    const user = window.db.getCurrentUser();
    const guestBtn = document.getElementById("login-trigger-btn");
    const userWidget = document.getElementById("user-logged-in-widget");
    
    if (user) {
      guestBtn.style.display = "none";
      userWidget.style.display = "block";
      document.getElementById("user-avatar-initial").textContent = user.name.charAt(0).toUpperCase();
      document.getElementById("user-avatar-name").textContent = user.name;
      
      // Admin havolasini ko'rsatish yoki yashirish
      const adminLink = document.getElementById("drop-admin");
      if (user.role === "admin") {
        adminLink.style.display = "flex";
      } else {
        adminLink.style.display = "none";
      }
    } else {
      guestBtn.style.display = "flex";
      userWidget.style.display = "none";
    }
  }

  // --- SOLISHTIRISh PANELI (DRAWER) YANGILANIShI ---
  updateCompareDrawer() {
    const compareList = window.db.getCompareList();
    const drawer = document.getElementById("compare-drawer");
    const countEl = document.getElementById("compare-count");
    const itemsContainer = document.getElementById("compare-drawer-items");

    countEl.textContent = compareList.length;

    if (compareList.length > 0) {
      // Dinamik kartalarni yuklash
      let html = "";
      compareList.forEach(id => {
        const med = window.db.getMedicineById(id);
        if (med) {
          html += `
            <div class="compare-drawer-item">
              <span style="font-weight: 700;">${med.name[this.currentLanguage]}</span>
              <button class="compare-item-remove" data-id="${med.id}">×</button>
            </div>
          `;
        }
      });
      itemsContainer.innerHTML = html;

      // O'chirish tugmalari hodisalarini bog'lash
      itemsContainer.querySelectorAll(".compare-item-remove").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const id = btn.getAttribute("data-id");
          window.db.removeCompare(id);
          this.updateCompareDrawer();
          this.showToast(this.t("toast_comp_removed"), "info");
          
          if (this.activeRoute === "#compare") {
            this.renderCompare();
          } else {
            this.handleRouting(); // Katalog kartalari holati to'g'rilanishi uchun
          }
        });
      });

      // Agar xohlasa suzib chiqarish, lekin solishtirish sahifasida uni ko'rsatmaymiz
      if (this.activeRoute !== "#compare" && !drawer.classList.contains("open")) {
        drawer.classList.add("open");
      }
    } else {
      drawer.classList.remove("open");
    }
  }

  // --- TOAST BILDIRIShNOMA TIZIMI ---
  showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    let icon = "";
    if (type === "success") {
      icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else if (type === "error") {
      icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    } else if (type === "warning") {
      icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    } else {
      icon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--info)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      ${icon}
      <span>${message}</span>
    `;

    container.appendChild(toast);
    
    // 5 soniyadan keyin o'chirish
    setTimeout(() => {
      toast.remove();
    }, 5000);
  }

  // --- SPA ROUTER & VIEW GENERATION ---
  handleRouting() {
    const hash = window.location.hash || "#home";
    this.activeRoute = hash;

    // Nav havola faolligini sozlash
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
    const mainHash = hash.split("/")[0];
    const activeLink = document.getElementById(`link-${mainHash.replace("#", "")}`);
    if (activeLink) activeLink.classList.add("active");

    const contentContainer = document.getElementById("app-content");
    contentContainer.innerHTML = ""; // Tozalash

    // Yo'naltirish (Routing)
    if (hash === "#home") {
      this.renderHome();
    } else if (hash === "#medicines") {
      this.renderMedicines();
    } else if (hash.startsWith("#medicine/")) {
      const id = hash.split("/")[1];
      this.renderMedicineDetails(id);
    } else if (hash === "#diseases") {
      this.renderDiseases();
    } else if (hash.startsWith("#disease/")) {
      const id = hash.split("/")[1];
      this.renderDiseaseDetails(id);
    } else if (hash === "#favorites") {
      this.renderFavorites();
    } else if (hash === "#compare") {
      this.renderCompare();
    } else if (hash === "#profile") {
      this.renderProfile();
    } else if (hash === "#admin") {
      this.renderAdmin();
    } else {
      this.renderNotFound();
    }

    // Scrollni tepaga qaytarish
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- RENDER BO'LIMLARI ---

  // 1. Bosh Sahifa (Home)
  renderHome() {
    const content = document.getElementById("app-content");
    const medsCount = window.db.getMedicines().length;
    const disCount = window.db.getDiseases().length;
    
    let trendingMedsHtml = "";
    // Eng ko'p ko'rilgan 3 ta dori
    const trendingMeds = [...window.db.getMedicines()]
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);
      
    trendingMeds.forEach(m => {
      trendingMedsHtml += this.generateMedicineCardHTML(m);
    });

    let popularDisHtml = "";
    // Eng ko'p ko'rilgan 3 ta kasallik
    const popularDis = [...window.db.getDiseases()]
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);

    popularDis.forEach(d => {
      popularDisHtml += this.generateDiseaseCardHTML(d);
    });

    content.innerHTML = `
      <div class="page-view">
        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-glow-1"></div>
          <div class="hero-content">
            <div class="hero-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              <span>${this.t("hero_badge")}</span>
            </div>
            <h1 class="hero-title">
              <span>${this.t("hero_title_1")}</span> ${this.t("hero_title_2")} <br><span>${this.t("hero_title_3")}</span>
            </h1>
            <p class="hero-subtitle">${this.t("hero_subtitle")}</p>

            <!-- Katta markaziy qidiruv -->
            <div class="search-center">
              <div class="search-tabs">
                <button class="search-tab-btn ${this.activeSearchTab === 'medicine' ? 'active' : ''}" id="home-search-tab-med">${this.t("tab_search_med")}</button>
                <button class="search-tab-btn ${this.activeSearchTab === 'disease' ? 'active' : ''}" id="home-search-tab-dis">${this.t("tab_search_dis")}</button>
              </div>
              <div class="search-input-group">
                <svg class="search-group-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" class="search-main-input" id="home-search-input" placeholder="${this.activeSearchTab === 'medicine' ? this.t("placeholder_search_med") : this.t("placeholder_search_dis")}">
                <button class="search-submit-btn" id="home-search-btn">
                  <span>${this.t("btn_search")}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Statistika Grid -->
        <section class="stats-grid" style="margin-bottom: 4rem;">
          <div class="stat-card">
            <div class="stat-icon">💊</div>
            <div class="stat-info">
              <div class="stat-number">${medsCount}</div>
              <div class="stat-label">${this.t("stat_medicines")}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🏥</div>
            <div class="stat-info">
              <div class="stat-number">${disCount}</div>
              <div class="stat-label">${this.t("stat_diseases")}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔍</div>
            <div class="stat-info">
              <div class="stat-number">${globalStats.searches}</div>
              <div class="stat-label">${this.t("stat_searches")}</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">📊</div>
            <div class="stat-info">
              <div class="stat-number">${window.db.getCompareList().length}</div>
              <div class="stat-label">${this.t("stat_comparisons")}</div>
            </div>
          </div>
        </section>

        <!-- Mashhur dorilar bo'limi -->
        <section style="margin-bottom: 4rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h2>${this.t("section_trending_medicines")}</h2>
            <a href="#medicines" class="details-btn details-btn-secondary" style="padding: 0.4rem 1rem; font-size: 0.8rem;">${this.t("btn_view_all")}</a>
          </div>
          <div class="medicine-grid">${trendingMedsHtml}</div>
        </section>

        <!-- Mashhur kasalliklar bo'limi -->
        <section style="margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h2>${this.t("section_popular_diseases")}</h2>
            <a href="#diseases" class="details-btn details-btn-secondary" style="padding: 0.4rem 1rem; font-size: 0.8rem;">${this.t("btn_view_all")}</a>
          </div>
          <div class="disease-grid">${popularDisHtml}</div>
        </section>
      </div>
    `;

    // Tugma va qidiruv eventlarini ulash
    const tabMed = document.getElementById("home-search-tab-med");
    const tabDis = document.getElementById("home-search-tab-dis");
    const searchInp = document.getElementById("home-search-input");
    const searchBtn = document.getElementById("home-search-btn");

    tabMed.addEventListener("click", () => {
      this.activeSearchTab = "medicine";
      tabMed.classList.add("active");
      tabDis.classList.remove("active");
      searchInp.placeholder = this.t("placeholder_search_med");
    });

    tabDis.addEventListener("click", () => {
      this.activeSearchTab = "disease";
      tabDis.classList.add("active");
      tabMed.classList.remove("active");
      searchInp.placeholder = this.t("placeholder_search_dis");
    });

    const triggerSearch = () => {
      const q = searchInp.value.trim();
      if (!q) return;
      globalStats.searches++;
      window.db.addSearchHistory(q);
      
      if (this.activeSearchTab === "medicine") {
        window.location.hash = `#medicines?search=${encodeURIComponent(q)}`;
      } else {
        window.location.hash = `#diseases?search=${encodeURIComponent(q)}`;
      }
    };

    searchBtn.addEventListener("click", triggerSearch);
    searchInp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") triggerSearch();
    });

    // Dori kartasi sevimlilar va boshqa kliklarini ishga tushirish
    this.initCardEvents();
  }

  // 2. Dorilar Katalogi (Medicines)
  renderMedicines() {
    const content = document.getElementById("app-content");
    const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
    const searchVal = params.get("search") || "";
    
    let selectedCat = params.get("category") || "all";
    let selectedRx = params.get("prescription") || "all"; // 'all', 'otc', 'rx'
    let selectedSort = params.get("sort") || "popular";

    const applyFilters = () => {
      let meds = window.db.getMedicines();

      // A. Qidiruv filtri
      if (searchVal) {
        meds = meds.filter(m => 
          m.name.uz.toLowerCase().includes(searchVal.toLowerCase()) || 
          m.name.en.toLowerCase().includes(searchVal.toLowerCase()) ||
          m.description.uz.toLowerCase().includes(searchVal.toLowerCase()) ||
          m.description.en.toLowerCase().includes(searchVal.toLowerCase())
        );
      }

      // B. Kategoriya filtri
      if (selectedCat !== "all") {
        meds = meds.filter(m => m.category === selectedCat);
      }

      // C. Retseptlilik filtri
      if (selectedRx !== "all") {
        const needsRx = selectedRx === "rx";
        meds = meds.filter(m => m.prescription === needsRx);
      }

      // D. Saralash
      if (selectedSort === "popular") {
        meds.sort((a, b) => b.views - a.views);
      } else if (selectedSort === "price_asc") {
        meds.sort((a, b) => a.price - b.price);
      } else if (selectedSort === "price_desc") {
        meds.sort((a, b) => b.price - a.price);
      } else if (selectedSort === "rating") {
        meds.sort((a, b) => b.rating - a.rating);
      } else if (selectedSort === "alpha") {
        meds.sort((a, b) => a.name[this.currentLanguage].localeCompare(b.name[this.currentLanguage]));
      }

      return meds;
    };

    const filteredMeds = applyFilters();
    let medsCardsHtml = "";
    filteredMeds.forEach(m => {
      medsCardsHtml += this.generateMedicineCardHTML(m);
    });

    content.innerHTML = `
      <div class="page-view">
        <div class="catalog-layout">
          <!-- Sidebar Filters -->
          <aside class="filter-sidebar">
            <h3 class="filter-section-title">${this.t("filter_title")}</h3>
            
            <!-- Category filter -->
            <div class="filter-section">
              <h4 style="margin-bottom: 0.8rem; font-size: 0.9rem;">${this.t("filter_category")}</h4>
              <div class="filter-group">
                <label class="filter-option">
                  <input type="radio" name="cat" value="all" ${selectedCat === 'all' ? 'checked' : ''}>
                  <span>${this.t("filter_type_all")}</span>
                </label>
                <label class="filter-option">
                  <input type="radio" name="cat" value="painkillers" ${selectedCat === 'painkillers' ? 'checked' : ''}>
                  <span>${this.t("filter_type_painkillers")}</span>
                </label>
                <label class="filter-option">
                  <input type="radio" name="cat" value="antibiotics" ${selectedCat === 'antibiotics' ? 'checked' : ''}>
                  <span>${this.t("filter_type_antibiotics")}</span>
                </label>
                <label class="filter-option">
                  <input type="radio" name="cat" value="cardio" ${selectedCat === 'cardio' ? 'checked' : ''}>
                  <span>${this.t("filter_type_cardio")}</span>
                </label>
                <label class="filter-option">
                  <input type="radio" name="cat" value="vitamins" ${selectedCat === 'vitamins' ? 'checked' : ''}>
                  <span>${this.t("filter_type_vitamins")}</span>
                </label>
                <label class="filter-option">
                  <input type="radio" name="cat" value="digestive" ${selectedCat === 'digestive' ? 'checked' : ''}>
                  <span>${this.t("filter_type_digestive")}</span>
                </label>
              </div>
            </div>

            <!-- Prescription filter -->
            <div class="filter-section">
              <h4 style="margin-bottom: 0.8rem; font-size: 0.9rem;">${this.t("filter_prescription")}</h4>
              <div class="filter-group">
                <label class="filter-option">
                  <input type="radio" name="rx" value="all" ${selectedRx === 'all' ? 'checked' : ''}>
                  <span>${this.t("filter_rx_all")}</span>
                </label>
                <label class="filter-option">
                  <input type="radio" name="rx" value="otc" ${selectedRx === 'otc' ? 'checked' : ''}>
                  <span>${this.t("filter_rx_no")}</span>
                </label>
                <label class="filter-option">
                  <input type="radio" name="rx" value="rx" ${selectedRx === 'rx' ? 'checked' : ''}>
                  <span>${this.t("filter_rx_yes")}</span>
                </label>
              </div>
            </div>
          </aside>

          <!-- Main catalog section -->
          <div class="catalog-main">
            <div class="catalog-toolbar">
              <div>
                <span class="catalog-title">${this.t("nav_medicines")}</span>
                <span style="font-size: 0.85rem; color: var(--text-muted); margin-left: 0.5rem;">(${filteredMeds.length} ${this.t("found_items")})</span>
              </div>
              
              <div class="toolbar-controls">
                <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted);">${this.t("filter_sort")}:</span>
                <select class="sort-select" id="med-sort-select">
                  <option value="popular" ${selectedSort === 'popular' ? 'selected' : ''}>${this.t("sort_popular")}</option>
                  <option value="price_asc" ${selectedSort === 'price_asc' ? 'selected' : ''}>${this.t("sort_price_asc")}</option>
                  <option value="price_desc" ${selectedSort === 'price_desc' ? 'selected' : ''}>${this.t("sort_price_desc")}</option>
                  <option value="rating" ${selectedSort === 'rating' ? 'selected' : ''}>${this.t("sort_rating")}</option>
                  <option value="alpha" ${selectedSort === 'alpha' ? 'selected' : ''}>${this.t("sort_alpha")}</option>
                </select>
              </div>
            </div>

            <!-- Grid container -->
            <div class="medicine-grid" id="med-cards-container">
              ${medsCardsHtml || `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted); font-weight: 600;">Ma'lumot topilmadi.</div>`}
            </div>
          </div>
        </div>
      </div>
    `;

    // Filtr o'zgarishini kuzatish
    const handleFilterChange = () => {
      const cat = document.querySelector('input[name="cat"]:checked').value;
      const rx = document.querySelector('input[name="rx"]:checked').value;
      const sort = document.getElementById("med-sort-select").value;
      
      let newHash = `#medicines?category=${cat}&prescription=${rx}&sort=${sort}`;
      if (searchVal) newHash += `&search=${encodeURIComponent(searchVal)}`;
      window.location.hash = newHash;
    };

    document.querySelectorAll('input[name="cat"]').forEach(r => r.addEventListener("change", handleFilterChange));
    document.querySelectorAll('input[name="rx"]').forEach(r => r.addEventListener("change", handleFilterChange));
    document.getElementById("med-sort-select").addEventListener("change", handleFilterChange);

    this.initCardEvents();
  }

  // 3. Kasalliklar Katalogi (Diseases)
  renderDiseases() {
    const content = document.getElementById("app-content");
    const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
    const searchVal = params.get("search") || "";

    const applyFilters = () => {
      let diseases = window.db.getDiseases();
      if (searchVal) {
        diseases = diseases.filter(d => 
          d.name.uz.toLowerCase().includes(searchVal.toLowerCase()) ||
          d.name.en.toLowerCase().includes(searchVal.toLowerCase()) ||
          d.description.uz.toLowerCase().includes(searchVal.toLowerCase()) ||
          d.description.en.toLowerCase().includes(searchVal.toLowerCase()) ||
          d.symptoms.uz.toLowerCase().includes(searchVal.toLowerCase()) ||
          d.symptoms.en.toLowerCase().includes(searchVal.toLowerCase())
        );
      }
      return diseases;
    };

    const filteredDiseases = applyFilters();
    let disHtml = "";
    filteredDiseases.forEach(d => {
      disHtml += this.generateDiseaseCardHTML(d);
    });

    content.innerHTML = `
      <div class="page-view">
        <div style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.8rem; font-weight: 800; display: inline-block;">${this.t("nav_diseases")}</h2>
          <span style="font-size: 0.9rem; color: var(--text-muted); margin-left: 0.5rem;">(${filteredDiseases.length} ${this.t("found_items")})</span>
        </div>

        <div class="disease-grid">
          ${disHtml || `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted); font-weight: 600;">Hech qanday kasallik topilmadi.</div>`}
        </div>
      </div>
    `;

    this.initCardEvents();
  }

  // 4. Dori Tafsilotlari Sahifasi (Medicine Details)
  renderMedicineDetails(id) {
    const content = document.getElementById("app-content");
    const med = window.db.getMedicineById(id);
    
    if (!med) {
      this.renderNotFound();
      return;
    }

    // Ko'rishlar sonini oshiramiz va tarixga saqlaymiz
    window.db.incrementMedicineViews(med.id);
    window.db.addRecentlyViewed("medicine", med.id);

    const isFav = window.db.isFavorite("medicine", med.id);
    const compareList = window.db.getCompareList();
    const isCompared = compareList.includes(med.id);

    // O'xshash dorilarni topish (bir xil kategoriyadagi boshqa dorilar)
    let similarMedsHtml = "";
    const similarMeds = window.db.getMedicines()
      .filter(m => m.category === med.category && m.id !== med.id)
      .slice(0, 3);
      
    similarMeds.forEach(sm => {
      similarMedsHtml += this.generateMedicineCardHTML(sm);
    });

    // Sharhlar ro'yxati
    const reviews = window.db.getReviews(med.id);
    let reviewsHtml = "";
    if (reviews.length > 0) {
      reviews.forEach(r => {
        let stars = "";
        for (let i = 1; i <= 5; i++) {
          stars += `<span style="color: ${i <= r.rating ? 'var(--warning)' : 'var(--surface-border)'}">★</span>`;
        }
        reviewsHtml += `
          <div class="review-item">
            <div class="review-meta">
              <div class="review-user-row">
                <div class="avatar-circle" style="width: 24px; height: 24px; font-size: 0.75rem;">${r.username.charAt(0).toUpperCase()}</div>
                <span class="review-username">${r.username}</span>
              </div>
              <div class="review-stars">${stars}</div>
              <span class="review-date">${r.date}</span>
            </div>
            <p class="review-comment">${r.comment}</p>
          </div>
        `;
      });
    } else {
      reviewsHtml = `<p style="text-align: center; padding: 2rem; color: var(--text-muted);" data-i18n="reviews_empty">${this.t("reviews_empty")}</p>`;
    }

    content.innerHTML = `
      <div class="page-view">
        <div class="details-header">
          <div class="details-image-box">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.5 10.5C3.67 10.5 3 11.17 3 12s.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-15z"></path><rect x="2" y="5" width="20" height="14" rx="2" stroke-width="1.5"></rect><line x1="8" y1="5" x2="8" y2="19"></line></svg>
          </div>
          
          <div class="details-info">
            <div class="details-type-row">
              <span class="details-type">${med.type[this.currentLanguage]}</span>
              <span class="card-header-badge ${med.prescription ? 'badge-rx' : 'badge-otc'}" style="position: static;">
                ${med.prescription ? this.t("card_rx_yes") : this.t("card_rx_no")}
              </span>
            </div>
            
            <h1 class="details-title">${med.name[this.currentLanguage]}</h1>
            
            <div class="details-meta-row">
              <div class="meta-item">⭐ <span class="highlight">${med.rating}</span></div>
              <div class="meta-item">👁️ <span class="highlight">${med.views}</span></div>
              <div class="meta-item">${this.t("manufacturer")}: <span class="highlight">${med.manufacturer[this.currentLanguage]}</span></div>
            </div>

            <p class="details-desc">${med.description[this.currentLanguage]}</p>

            <div class="details-price-row">
              <div>
                <span class="card-price-label">${this.t("card_price_from")}</span>
                <div class="details-price">${med.price.toLocaleString()} UZS</div>
              </div>
              
              <div class="details-actions">
                <button class="details-btn details-btn-primary" id="det-fav-btn">
                  <span>${isFav ? this.t("btn_remove_favorite") : this.t("btn_add_favorite")}</span>
                </button>
                <button class="details-btn details-btn-secondary" id="det-comp-btn">
                  <span>${isCompared ? this.t("remove_from_compare") : this.t("add_to_compare")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="details-grid">
          <!-- Chap tomondagi Tafsilotlar -->
          <div>
            <div class="details-card-block">
              <h3 class="block-title">${this.t("usage_instructions")}</h3>
              <p class="block-text">${med.usage[this.currentLanguage]}</p>
            </div>

            <div class="details-card-block">
              <h3 class="block-title">${this.t("dosage_info")}</h3>
              <p class="block-text">${med.dosage[this.currentLanguage]}</p>
            </div>

            <div class="details-card-block">
              <h3 class="block-title">${this.t("side_effects")}</h3>
              <p class="block-text" style="color: #c2410c;">${med.sideEffects[this.currentLanguage]}</p>
            </div>

            <div class="details-card-block">
              <h3 class="block-title">${this.t("warnings")}</h3>
              <p class="block-text" style="color: #b91c1c; font-weight: 500;">${med.warnings[this.currentLanguage]}</p>
            </div>

            <!-- Fikr-mulohazalar bo'limi -->
            <div class="details-card-block">
              <h3 class="block-title">${this.t("reviews_title")}</h3>
              <div id="reviews-list-container">${reviewsHtml}</div>
              
              <!-- Sharh yozish formasi -->
              <div class="add-review-form">
                <h4 style="margin-bottom: 1rem; font-weight: 700;">${this.t("review_add_title")}</h4>
                <form id="med-review-form">
                  <div class="form-group">
                    <label class="form-label">${this.t("review_label_name")}</label>
                    <input type="text" class="form-input" id="rev-username" required placeholder="Masalan: Dilshod">
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">${this.t("review_label_stars")}</label>
                    <div class="rating-select-group" id="rev-rating-group">
                      <span class="rating-star-label active" data-val="1">★</span>
                      <span class="rating-star-label active" data-val="2">★</span>
                      <span class="rating-star-label active" data-val="3">★</span>
                      <span class="rating-star-label active" data-val="4">★</span>
                      <span class="rating-star-label active" data-val="5">★</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">${this.t("review_label_comment")}</label>
                    <textarea class="form-textarea" id="rev-comment" rows="3" required placeholder="Fikringizni shu yerga yozing..."></textarea>
                  </div>

                  <button type="submit" class="login-trigger-btn" style="padding: 0.6rem 1.5rem;">${this.t("btn_submit_review")}</button>
                </form>
              </div>
            </div>
          </div>

          <!-- O'ng tomondagi O'xshash dorilar -->
          <div>
            <h3 style="font-size: 1.2rem; margin-bottom: 1.2rem;">${this.t("similar_medicines")}</h3>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              ${similarMedsHtml || `<p style="color: var(--text-muted); font-size: 0.9rem;">O'xshash dorilar mavjud emas.</p>`}
            </div>
          </div>
        </div>
      </div>
    `;

    // --- BTN EVENTS FOR DETAILS PAGE ---

    // 1. Sevimlilar tugmasi
    const favBtn = document.getElementById("det-fav-btn");
    favBtn.addEventListener("click", () => {
      const added = window.db.toggleFavorite("medicine", med.id);
      this.showToast(added ? this.t("toast_fav_added") : this.t("toast_fav_removed"), added ? "success" : "info");
      favBtn.querySelector("span").textContent = added ? this.t("btn_remove_favorite") : this.t("btn_add_favorite");
    });

    // 2. Solishtirish tugmasi
    const compBtn = document.getElementById("det-comp-btn");
    compBtn.addEventListener("click", () => {
      const cList = window.db.getCompareList();
      if (cList.includes(med.id)) {
        window.db.removeCompare(med.id);
        this.updateCompareDrawer();
        this.showToast(this.t("toast_comp_removed"), "info");
        compBtn.querySelector("span").textContent = this.t("add_to_compare");
      } else {
        try {
          window.db.addCompare(med.id);
          this.updateCompareDrawer();
          this.showToast(this.t("toast_comp_added"), "success");
          compBtn.querySelector("span").textContent = this.t("remove_from_compare");
        } catch (err) {
          this.showToast(err.message, "error");
        }
      }
    });

    // 3. Sharh yulduzchalari
    let selectedRating = 5;
    const starLabels = document.getElementById("rev-rating-group").querySelectorAll(".rating-star-label");
    starLabels.forEach(star => {
      star.addEventListener("click", () => {
        const val = parseInt(star.getAttribute("data-val"));
        selectedRating = val;
        
        starLabels.forEach(s => {
          const sVal = parseInt(s.getAttribute("data-val"));
          if (sVal <= val) {
            s.classList.add("active");
          } else {
            s.classList.remove("active");
          }
        });
      });
    });

    // 4. Sharh yuborish
    const reviewForm = document.getElementById("med-review-form");
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("rev-username").value;
      const comment = document.getElementById("rev-comment").value;

      window.db.addReview(med.id, username, selectedRating, comment);
      this.showToast(this.t("toast_review_success"), "success");
      reviewForm.reset();
      
      // Sahifani to'liq qayta render qilamiz yangi reyting va sharhlar bilan
      this.renderMedicineDetails(med.id);
    });

    // Kichik dori kartalari uchun hodisalar
    this.initCardEvents();
  }

  // 5. Kasallik Tafsilotlari Sahifasi (Disease Details)
  renderDiseaseDetails(id) {
    const content = document.getElementById("app-content");
    const dis = window.db.getDiseaseById(id);

    if (!dis) {
      this.renderNotFound();
      return;
    }

    // Viewni oshirish
    window.db.incrementDiseaseViews(dis.id);
    window.db.addRecentlyViewed("disease", dis.id);

    const isFav = window.db.isFavorite("disease", dis.id);

    // Tavsiya qilingan dori kartalari
    let recommendedHtml = "";
    if (dis.recommendedMedicines && dis.recommendedMedicines.length > 0) {
      dis.recommendedMedicines.forEach(medId => {
        const med = window.db.getMedicineById(medId);
        if (med) {
          recommendedHtml += this.generateMedicineCardHTML(med);
        }
      });
    }

    content.innerHTML = `
      <div class="page-view">
        <div class="details-header" style="grid-template-columns: 1fr;">
          <div class="details-info">
            <div class="details-type-row">
              <span class="details-type" style="background: var(--info-light); color: var(--info);">${this.t("nav_diseases")}</span>
              <button class="details-btn details-btn-secondary" id="dis-fav-btn" style="margin-left: auto; padding: 0.4rem 1rem; font-size: 0.8rem;">
                <span>${isFav ? this.t("btn_remove_favorite") : this.t("btn_add_favorite")}</span>
              </button>
            </div>
            
            <h1 class="details-title" style="margin-bottom: 1.5rem;">${dis.name[this.currentLanguage]}</h1>
            
            <p class="details-desc" style="font-size: 1.1rem; line-height: 1.7; border-left: 4px solid var(--info); padding-left: 1.25rem;">
              ${dis.description[this.currentLanguage]}
            </p>
          </div>
        </div>

        <div class="details-grid">
          <!-- Chap tomon: Belgilar va davolash -->
          <div>
            <div class="details-card-block" style="border-left: 4px solid var(--warning);">
              <h3 class="block-title" style="color: var(--warning);">${this.t("symptoms")}</h3>
              <p class="block-text">${dis.symptoms[this.currentLanguage]}</p>
            </div>

            <div class="details-card-block">
              <h3 class="block-title">${this.t("causes")}</h3>
              <p class="block-text">${dis.causes[this.currentLanguage]}</p>
            </div>

            <div class="details-card-block" style="border-left: 4px solid var(--success);">
              <h3 class="block-title" style="color: var(--success);">${this.t("prevention")}</h3>
              <p class="block-text">${dis.prevention[this.currentLanguage]}</p>
            </div>

            <div class="details-card-block" style="border-left: 4px solid var(--info);">
              <h3 class="block-title" style="color: var(--info);">${this.t("treatment")}</h3>
              <p class="block-text">${dis.treatment[this.currentLanguage]}</p>
            </div>
          </div>

          <!-- O'ng tomon: Tavsiya qilinadigan dorilar -->
          <div>
            <h3 style="font-size: 1.2rem; margin-bottom: 1.2rem;">${this.t("recommended_medicines")}</h3>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              ${recommendedHtml || `<p style="color: var(--text-muted); font-size: 0.9rem;">Dorilar tavsiya etilmagan.</p>`}
            </div>
          </div>
        </div>
      </div>
    `;

    // Sevimlilarga qo'shish tugmasi
    const favBtn = document.getElementById("dis-fav-btn");
    favBtn.addEventListener("click", () => {
      const added = window.db.toggleFavorite("disease", dis.id);
      this.showToast(added ? this.t("toast_fav_added") : this.t("toast_fav_removed"), added ? "success" : "info");
      favBtn.querySelector("span").textContent = added ? this.t("btn_remove_favorite") : this.t("btn_add_favorite");
    });

    this.initCardEvents();
  }

  // 6. Solishtirish Sahifasi (Compare)
  renderCompare() {
    const content = document.getElementById("app-content");
    const compareList = window.db.getCompareList();

    if (compareList.length === 0) {
      content.innerHTML = `
        <div class="page-view" style="text-align: center; padding: 5rem 1rem;">
          <div style="font-size: 4rem; margin-bottom: 1.5rem;">📊</div>
          <h2>${this.t("compare_title")}</h2>
          <p style="color: var(--text-muted); max-width: 500px; margin: 1rem auto 2rem;" data-i18n="compare_empty">${this.t("compare_empty")}</p>
          <a href="#medicines" class="details-btn details-btn-primary" style="display: inline-flex;">${this.t("nav_medicines")}</a>
        </div>
      `;
      return;
    }

    const meds = compareList.map(id => window.db.getMedicineById(id)).filter(m => m !== undefined);

    let headersHtml = "<th>Attributes</th>";
    let priceHtml = `<td class="attribute-name">${this.t("attr_price")}</td>`;
    let typeHtml = `<td class="attribute-name">${this.t("attr_type")}</td>`;
    let rxHtml = `<td class="attribute-name">${this.t("attr_prescription")}</td>`;
    let ratingHtml = `<td class="attribute-name">${this.t("attr_rating")}</td>`;
    let manuHtml = `<td class="attribute-name">${this.t("attr_manufacturer")}</td>`;
    let dosageHtml = `<td class="attribute-name">${this.t("attr_dosage")}</td>`;
    let sideHtml = `<td class="attribute-name">${this.t("attr_side_effects")}</td>`;

    meds.forEach(m => {
      headersHtml += `
        <th>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <span style="font-size: 1.1rem; font-weight: 800;">${m.name[this.currentLanguage]}</span>
            <button class="admin-btn admin-btn-delete compare-matrix-remove" data-id="${m.id}" style="width: fit-content; padding: 0.2rem 0.5rem;">${this.t("btn_delete")}</button>
          </div>
        </th>
      `;
      priceHtml += `<td style="font-weight: 700; font-size: 1.1rem;">${m.price.toLocaleString()} UZS</td>`;
      typeHtml += `<td>${m.type[this.currentLanguage]}</td>`;
      rxHtml += `<td>${m.prescription ? this.t("card_rx_yes") : this.t("card_rx_no")}</td>`;
      ratingHtml += `<td style="font-weight: 700; color: var(--warning);">⭐ ${m.rating}</td>`;
      manuHtml += `<td>${m.manufacturer[this.currentLanguage]}</td>`;
      dosageHtml += `<td>${m.dosage[this.currentLanguage]}</td>`;
      sideHtml += `<td style="color: #c2410c; font-size: 0.85rem;">${m.sideEffects[this.currentLanguage]}</td>`;
    });

    content.innerHTML = `
      <div class="page-view">
        <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 1.5rem;">${this.t("compare_title")}</h2>
        
        <div style="overflow-x: auto; background: var(--surface); border-radius: var(--radius-md);">
          <table class="compare-matrix-table">
            <thead>
              <tr>${headersHtml}</tr>
            </thead>
            <tbody>
              <tr>${priceHtml}</tr>
              <tr>${typeHtml}</tr>
              <tr>${rxHtml}</tr>
              <tr>${ratingHtml}</tr>
              <tr>${manuHtml}</tr>
              <tr>${dosageHtml}</tr>
              <tr>${sideHtml}</tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Solishtirish jadvalidan olib tashlash tugmalari
    content.querySelectorAll(".compare-matrix-remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        window.db.removeCompare(id);
        this.updateCompareDrawer();
        this.showToast(this.t("toast_comp_removed"), "info");
        this.renderCompare();
      });
    });
  }

  // 7. Sevimlilar Sahifasi (Favorites)
  renderFavorites() {
    const content = document.getElementById("app-content");
    const favorites = window.db.getFavorites();

    let favMedsHtml = "";
    favorites.medicines.forEach(id => {
      const med = window.db.getMedicineById(id);
      if (med) favMedsHtml += this.generateMedicineCardHTML(med);
    });

    let favDisHtml = "";
    favorites.diseases.forEach(id => {
      const dis = window.db.getDiseaseById(id);
      if (dis) favDisHtml += this.generateDiseaseCardHTML(dis);
    });

    content.innerHTML = `
      <div class="page-view">
        <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 2rem;">${this.t("fav_title")}</h2>

        <div class="search-tabs" style="margin-bottom: 2rem;">
          <button class="search-tab-btn active" id="fav-tab-med">${this.t("fav_med_tab")} (${favorites.medicines.length})</button>
          <button class="search-tab-btn" id="fav-tab-dis">${this.t("fav_dis_tab")} (${favorites.diseases.length})</button>
        </div>

        <div id="fav-meds-section">
          <div class="medicine-grid">${favMedsHtml || `<div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);" data-i18n="fav_empty">${this.t("fav_empty")}</div>`}</div>
        </div>

        <div id="fav-diseases-section" style="display: none;">
          <div class="disease-grid">${favDisHtml || `<div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);" data-i18n="fav_empty">${this.t("fav_empty")}</div>`}</div>
        </div>
      </div>
    `;

    // Tablar o'zgarishi
    const tabMed = document.getElementById("fav-tab-med");
    const tabDis = document.getElementById("fav-tab-dis");
    const secMed = document.getElementById("fav-meds-section");
    const secDis = document.getElementById("fav-diseases-section");

    tabMed.addEventListener("click", () => {
      tabMed.classList.add("active");
      tabDis.classList.remove("active");
      secMed.style.display = "block";
      secDis.style.display = "none";
    });

    tabDis.addEventListener("click", () => {
      tabDis.classList.add("active");
      tabMed.classList.remove("active");
      secMed.style.display = "none";
      secDis.style.display = "block";
    });

    this.initCardEvents();
  }

  // 8. Foydalanuvchi Profili Sahifasi (User Profile)
  renderProfile() {
    const content = document.getElementById("app-content");
    const user = window.db.getCurrentUser();

    if (!user) {
      content.innerHTML = `
        <div style="text-align: center; padding: 5rem 1rem;">
          <div style="font-size: 4rem;">🔒</div>
          <h2 style="margin-top: 1rem;">Ushbu sahifani ko'rish uchun kirishingiz kerak</h2>
          <p style="color: var(--text-muted); margin: 0.5rem 0 1.5rem;">Iltimos, tizimga kiring yoki ro'yxatdan o'ting.</p>
          <button class="login-trigger-btn" style="margin: 0 auto;" onclick="document.getElementById('auth-modal').style.display='flex'">${this.t("btn_login")}</button>
        </div>
      `;
      return;
    }

    const history = window.db.getSearchHistory();
    let historyHtml = "";
    history.forEach(q => {
      historyHtml += `
        <span class="suggestion-type med" style="display:inline-block; margin:0.25rem; font-weight:600; cursor:pointer;" class="hist-pill">${q}</span>
      `;
    });

    // Oxirgi ko'rilganlar
    const viewed = window.db.getRecentlyViewed();
    let viewedHtml = "";
    viewed.forEach(item => {
      if (item.type === "medicine") {
        const med = window.db.getMedicineById(item.id);
        if (med) {
          viewedHtml += `
            <a href="#medicine/${med.id}" style="display:flex; align-items:center; gap:0.75rem; text-decoration:none; color:var(--text); padding:0.6rem; border:1px solid var(--surface-border); border-radius:8px; background:var(--surface);">
              <span>💊</span>
              <span style="font-weight:600;">${med.name[this.currentLanguage]}</span>
            </a>
          `;
        }
      } else {
        const dis = window.db.getDiseaseById(item.id);
        if (dis) {
          viewedHtml += `
            <a href="#disease/${dis.id}" style="display:flex; align-items:center; gap:0.75rem; text-decoration:none; color:var(--text); padding:0.6rem; border:1px solid var(--surface-border); border-radius:8px; background:var(--surface);">
              <span>🏥</span>
              <span style="font-weight:600;">${dis.name[this.currentLanguage]}</span>
            </a>
          `;
        }
      }
    });

    content.innerHTML = `
      <div class="page-view">
        <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 2rem;">${this.t("profile_title")}</h2>
        
        <div class="details-grid">
          <!-- Chap tomon: Tahrirlash -->
          <div class="details-card-block">
            <h3 class="block-title">${this.t("profile_tab_info")}</h3>
            
            <form id="profile-edit-form" style="margin-top: 1rem;">
              <div class="form-group">
                <label class="form-label">${this.t("lbl_fullname")}</label>
                <input type="text" class="form-input" id="prof-name" value="${user.name}" required>
              </div>
              <div class="form-group">
                <label class="form-label">${this.t("lbl_email")}</label>
                <input type="email" class="form-input" value="${user.email}" disabled style="background:var(--bg); cursor:not-allowed;">
              </div>
              
              <div style="display: grid; grid-template-columns: 1fr; gap: 1rem; margin: 1.5rem 0; border-top:1px solid var(--surface-border); padding-top:1rem;">
                <p style="font-size:0.85rem; color:var(--text-muted);"><strong>${this.t("profile_role")}</strong> ${user.role.toUpperCase()}</p>
                <p style="font-size:0.85rem; color:var(--text-muted);"><strong>${this.t("profile_joined")}</strong> ${user.joinedDate}</p>
              </div>

              <div class="form-group">
                <label class="form-label">${this.t("lbl_new_password")}</label>
                <input type="password" class="form-input" id="prof-pass" placeholder="••••••••">
              </div>

              <button type="submit" class="login-trigger-btn" style="padding:0.7rem 1.5rem; margin-top:1rem;">${this.t("btn_save_changes")}</button>
            </form>
          </div>

          <!-- O'ng tomon: Tarixlar -->
          <div>
            <div class="details-card-block" style="margin-bottom: 1.5rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                <h3 style="font-size:1.1rem; font-weight:700;">${this.t("recent_searches")}</h3>
                <button class="action-btn" id="prof-clear-history-btn" style="border:none; width:auto; height:auto; padding:0.25rem 0.5rem; font-size:0.75rem; color:var(--danger);">${this.t("btn_clear")}</button>
              </div>
              <div>${historyHtml || `<p style="color:var(--text-muted); font-size:0.85rem;">Tarix bo'sh.</p>`}</div>
            </div>

            <div class="details-card-block">
              <h3 style="font-size:1.1rem; font-weight:700; margin-bottom:1rem;">${this.t("recently_viewed")}</h3>
              <div style="display:flex; flex-direction:column; gap:0.75rem;">
                ${viewedHtml || `<p style="color:var(--text-muted); font-size:0.85rem;">Hali hech narsa ko'rilmagan.</p>`}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Hodisalarni ulash
    const form = document.getElementById("profile-edit-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("prof-name").value;
      const pass = document.getElementById("prof-pass").value;

      window.db.updateProfile(name, pass || null);
      this.showToast(this.t("toast_admin_save_success"), "success");
      this.updateUserWidget();
      this.renderProfile();
    });

    document.getElementById("prof-clear-history-btn").addEventListener("click", () => {
      window.db.clearSearchHistory();
      this.showToast(this.t("toast_comp_removed"), "info");
      this.renderProfile();
    });

    // Tarix pillerini bosganda qidirish
    content.querySelectorAll(".suggestion-type").forEach(pill => {
      pill.addEventListener("click", () => {
        const val = pill.textContent;
        window.location.hash = `#medicines?search=${encodeURIComponent(val)}`;
      });
    });
  }

  // 9. Admin Boshqaruv Paneli (Admin Console)
  renderAdmin() {
    const content = document.getElementById("app-content");
    const user = window.db.getCurrentUser();

    if (!user || user.role !== "admin") {
      content.innerHTML = `
        <div style="text-align: center; padding: 5rem 1rem;">
          <div style="font-size: 4rem;">🚫</div>
          <h2 style="margin-top: 1rem;">Ruxsat berilmagan</h2>
          <p style="color: var(--text-muted); margin: 0.5rem 0 1.5rem;">Sizda ushbu sahifani ko'rish uchun ma'mur (admin) huquqlari yo'q.</p>
          <a href="#home" class="details-btn details-btn-primary" style="margin: 0 auto; display:inline-flex;">Bosh sahifaga qaytish</a>
        </div>
      `;
      return;
    }

    const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
    const tab = params.get("tab") || "meds"; // 'meds', 'diseases', 'users'

    let tableHeader = "";
    let tableRows = "";
    let formHtml = "";

    const medicines = window.db.getMedicines();
    const diseases = window.db.getDiseases();
    const users = window.db.getUsers();

    if (tab === "meds") {
      // Dorilar jadvali
      tableHeader = `
        <th>ID</th>
        <th>${this.t("col_name")}</th>
        <th>${this.t("col_price")}</th>
        <th>${this.t("col_type")}</th>
        <th>${this.t("col_actions")}</th>
      `;
      medicines.forEach(m => {
        tableRows += `
          <tr>
            <td><code>${m.id}</code></td>
            <td><strong>${m.name[this.currentLanguage]}</strong></td>
            <td>${m.price.toLocaleString()} UZS</td>
            <td>${m.type[this.currentLanguage]}</td>
            <td>
              <div class="admin-action-row">
                <button class="admin-btn admin-btn-edit med-edit-btn" data-id="${m.id}">${this.t("btn_edit")}</button>
                <button class="admin-btn admin-btn-delete med-del-btn" data-id="${m.id}">${this.t("btn_delete")}</button>
              </div>
            </td>
          </tr>
        `;
      });

      // Dori qo'shish formasi
      formHtml = `
        <div class="details-card-block" id="admin-form-block" style="display:none; margin-bottom: 2rem;">
          <h3 class="block-title" id="form-title">${this.t("btn_add_new_med")}</h3>
          <form id="admin-med-form" style="margin-top: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <input type="hidden" id="form-med-id" value="">
            <div class="form-group">
              <label class="form-label">Dori nomi (UZ)</label>
              <input type="text" class="form-input" id="form-med-name-uz" required placeholder="Masalan: Paratsetamol">
            </div>
            <div class="form-group">
              <label class="form-label">Medicine Name (EN)</label>
              <input type="text" class="form-input" id="form-med-name-en" required placeholder="e.g., Paracetamol">
            </div>
            <div class="form-group">
              <label class="form-label">Turi (UZ)</label>
              <input type="text" class="form-input" id="form-med-type-uz" required placeholder="Og'riq qoldiruvchi">
            </div>
            <div class="form-group">
              <label class="form-label">Type (EN)</label>
              <input type="text" class="form-input" id="form-med-type-en" required placeholder="Analgesic">
            </div>
            <div class="form-group">
              <label class="form-label">Kategoriya (Katalog)</label>
              <select class="form-input" id="form-med-category" required>
                <option value="painkillers">painkillers</option>
                <option value="antibiotics">antibiotics</option>
                <option value="cardio">cardio</option>
                <option value="vitamins">vitamins</option>
                <option value="digestive">digestive</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Narxi (UZS)</label>
              <input type="number" class="form-input" id="form-med-price" required placeholder="3500">
            </div>
            <div class="form-group">
              <label class="form-label">Ishlab chiqaruvchi (UZ)</label>
              <input type="text" class="form-input" id="form-med-manu-uz" required placeholder="Nobel Pharmsanoat, O'zbekiston">
            </div>
            <div class="form-group">
              <label class="form-label">Manufacturer (EN)</label>
              <input type="text" class="form-input" id="form-med-manu-en" required placeholder="Nobel, Uzbekistan">
            </div>
            <div class="form-group" style="grid-column: 1/-1;">
              <label class="form-label">Tavsif (UZ)</label>
              <textarea class="form-textarea" id="form-med-desc-uz" rows="2" required placeholder="Isitma tushiruvchi dori..."></textarea>
            </div>
            <div class="form-group" style="grid-column: 1/-1;">
              <label class="form-label">Description (EN)</label>
              <textarea class="form-textarea" id="form-med-desc-en" rows="2" required placeholder="Fever reducer..."></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Qo'llash (UZ)</label>
              <textarea class="form-textarea" id="form-med-usage-uz" rows="2" required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Usage Instructions (EN)</label>
              <textarea class="form-textarea" id="form-med-usage-en" rows="2" required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Dozalash (UZ)</label>
              <textarea class="form-textarea" id="form-med-dose-uz" rows="2" required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Dosage (EN)</label>
              <textarea class="form-textarea" id="form-med-dose-en" rows="2" required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Nojo'ya ta'siri (UZ)</label>
              <textarea class="form-textarea" id="form-med-side-uz" rows="2" required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Side Effects (EN)</label>
              <textarea class="form-textarea" id="form-med-side-en" rows="2" required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Ogohlantirishlar (UZ)</label>
              <textarea class="form-textarea" id="form-med-warn-uz" rows="2" required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Warnings (EN)</label>
              <textarea class="form-textarea" id="form-med-warn-en" rows="2" required></textarea>
            </div>
            <div class="form-group" style="display:flex; align-items:center; gap:0.5rem;">
              <input type="checkbox" id="form-med-rx" style="width:20px; height:20px;">
              <label class="form-label" style="margin-bottom:0;" for="form-med-rx">Retsept asosida beriladi (Prescription Rx)</label>
            </div>

            <div style="grid-column: 1/-1; display:flex; gap:0.5rem; justify-content:flex-end; margin-top:1rem;">
              <button type="button" class="details-btn details-btn-secondary" id="form-cancel-btn">${this.t("btn_clear")}</button>
              <button type="submit" class="details-btn details-btn-primary">${this.t("btn_save_changes")}</button>
            </div>
          </form>
        </div>
      `;
    } else if (tab === "diseases") {
      // Kasalliklar jadvali
      tableHeader = `
        <th>ID</th>
        <th>${this.t("col_name")}</th>
        <th>${this.t("col_actions")}</th>
      `;
      diseases.forEach(d => {
        tableRows += `
          <tr>
            <td><code>${d.id}</code></td>
            <td><strong>${d.name[this.currentLanguage]}</strong></td>
            <td>
              <div class="admin-action-row">
                <button class="admin-btn admin-btn-edit dis-edit-btn" data-id="${d.id}">${this.t("btn_edit")}</button>
                <button class="admin-btn admin-btn-delete dis-del-btn" data-id="${d.id}">${this.t("btn_delete")}</button>
              </div>
            </td>
          </tr>
        `;
      });

      // Kasallik qo'shish formasi
      formHtml = `
        <div class="details-card-block" id="admin-form-block" style="display:none; margin-bottom: 2rem;">
          <h3 class="block-title" id="form-title">${this.t("btn_add_new_dis")}</h3>
          <form id="admin-dis-form" style="margin-top: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <input type="hidden" id="form-dis-id" value="">
            <div class="form-group">
              <label class="form-label">Kasallik nomi (UZ)</label>
              <input type="text" class="form-input" id="form-dis-name-uz" required placeholder="Masalan: Gripp">
            </div>
            <div class="form-group">
              <label class="form-label">Disease Name (EN)</label>
              <input type="text" class="form-input" id="form-dis-name-en" required placeholder="e.g., Influenza">
            </div>
            <div class="form-group" style="grid-column:1/-1;">
              <label class="form-label">Tavsif (UZ)</label>
              <textarea class="form-textarea" id="form-dis-desc-uz" rows="2" required></textarea>
            </div>
            <div class="form-group" style="grid-column:1/-1;">
              <label class="form-label">Description (EN)</label>
              <textarea class="form-textarea" id="form-dis-desc-en" rows="2" required></textarea>
            </div>
            <div class="form-group" style="grid-column:1/-1;">
              <label class="form-label">Belgilari / Simptomlar (UZ)</label>
              <textarea class="form-textarea" id="form-dis-symp-uz" rows="2" required></textarea>
            </div>
            <div class="form-group" style="grid-column:1/-1;">
              <label class="form-label">Symptoms (EN)</label>
              <textarea class="form-textarea" id="form-dis-symp-en" rows="2" required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Sabablari (UZ)</label>
              <textarea class="form-textarea" id="form-dis-cause-uz" rows="2" required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Causes (EN)</label>
              <textarea class="form-textarea" id="form-dis-cause-en" rows="2" required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Profilaktika (UZ)</label>
              <textarea class="form-textarea" id="form-dis-prev-uz" rows="2" required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Prevention (EN)</label>
              <textarea class="form-textarea" id="form-dis-prev-en" rows="2" required></textarea>
            </div>
            <div class="form-group" style="grid-column:1/-1;">
              <label class="form-label">Davolash (UZ)</label>
              <textarea class="form-textarea" id="form-dis-treat-uz" rows="2" required></textarea>
            </div>
            <div class="form-group" style="grid-column:1/-1;">
              <label class="form-label">Treatment (EN)</label>
              <textarea class="form-textarea" id="form-dis-treat-en" rows="2" required></textarea>
            </div>

            <div style="grid-column: 1/-1; display:flex; gap:0.5rem; justify-content:flex-end; margin-top:1rem;">
              <button type="button" class="details-btn details-btn-secondary" id="form-cancel-btn">${this.t("btn_clear")}</button>
              <button type="submit" class="details-btn details-btn-primary">${this.t("btn_save_changes")}</button>
            </div>
          </form>
        </div>
      `;
    } else {
      // Foydalanuvchilar ro'yxati
      tableHeader = `
        <th>Email</th>
        <th>${this.t("lbl_fullname")}</th>
        <th>${this.t("profile_role")}</th>
        <th>${this.t("profile_joined")}</th>
      `;
      users.forEach(u => {
        tableRows += `
          <tr>
            <td><code>${u.email}</code></td>
            <td><strong>${u.name}</strong></td>
            <td><span class="suggestion-type ${u.role === 'admin' ? 'dis' : 'med'}">${u.role.toUpperCase()}</span></td>
            <td>${u.joinedDate}</td>
          </tr>
        `;
      });
    }

    content.innerHTML = `
      <div class="page-view">
        <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 2rem;">${this.t("admin_title")}</h2>

        <div class="admin-layout">
          <!-- Sidebar tabs -->
          <aside class="admin-sidebar">
            <button class="admin-nav-btn ${tab === 'meds' ? 'active' : ''}" id="adm-tab-med">${this.t("admin_tab_med")}</button>
            <button class="admin-nav-btn ${tab === 'diseases' ? 'active' : ''}" id="adm-tab-dis">${this.t("admin_tab_dis")}</button>
            <button class="admin-nav-btn ${tab === 'users' ? 'active' : ''}" id="adm-tab-users">${this.t("admin_tab_users")}</button>
          </aside>

          <!-- Main content area -->
          <div>
            <!-- Yuqori qismdagi qo'shish tugmasi (Usersda kerakmas) -->
            ${tab !== "users" ? `
              <div style="display:flex; justify-content:flex-end; margin-bottom:1rem;">
                <button class="login-trigger-btn" id="admin-add-toggle-btn">
                  <span>${tab === 'meds' ? this.t("btn_add_new_med") : this.t("btn_add_new_dis")}</span>
                </button>
              </div>
            ` : ""}

            <!-- Qo'shish/Tahrirlash formasi -->
            ${formHtml}

            <!-- Jadval -->
            <div style="overflow-x: auto;">
              <table class="admin-table">
                <thead>
                  <tr>${tableHeader}</tr>
                </thead>
                <tbody>
                  ${tableRows}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    // --- ADMIN EVENTS ---

    // 1. Sidebar tab almashtirishlari
    document.getElementById("adm-tab-med").addEventListener("click", () => { window.location.hash = "#admin?tab=meds"; });
    document.getElementById("adm-tab-dis").addEventListener("click", () => { window.location.hash = "#admin?tab=diseases"; });
    document.getElementById("adm-tab-users").addEventListener("click", () => { window.location.hash = "#admin?tab=users"; });

    // 2. Add formani ochish toggle
    const addToggleBtn = document.getElementById("admin-add-toggle-btn");
    const formBlock = document.getElementById("admin-form-block");
    if (addToggleBtn && formBlock) {
      addToggleBtn.addEventListener("click", () => {
        formBlock.style.display = formBlock.style.display === "block" ? "none" : "block";
        document.getElementById("form-title").textContent = tab === "meds" ? this.t("btn_add_new_med") : this.t("btn_add_new_dis");
        
        // Formani tozalash (yangi qo'shish bo'lgani uchun)
        const medIdInp = document.getElementById("form-med-id");
        const disIdInp = document.getElementById("form-dis-id");
        if (medIdInp) document.getElementById("admin-med-form").reset();
        if (disIdInp) document.getElementById("admin-dis-form").reset();
        if (medIdInp) medIdInp.value = "";
        if (disIdInp) disIdInp.value = "";
      });

      document.getElementById("form-cancel-btn").addEventListener("click", () => {
        formBlock.style.display = "none";
      });
    }

    // 3. O'chirish hodisalari (Meds / Diseases)
    content.querySelectorAll(".med-del-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Chindan ham ushbu dorini o'chirib tashlamoqchimisiz?")) {
          window.db.deleteMedicine(id);
          this.showToast(this.t("toast_admin_delete_success"), "success");
          this.renderAdmin();
        }
      });
    });

    content.querySelectorAll(".dis-del-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Chindan ham ushbu kasallikni o'chirib tashlamoqchimisiz?")) {
          window.db.deleteDisease(id);
          this.showToast(this.t("toast_admin_delete_success"), "success");
          this.renderAdmin();
        }
      });
    });

    // 4. Tahrirlash (Edit) tugmalari bosilishi
    content.querySelectorAll(".med-edit-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const m = window.db.getMedicineById(id);
        if (m) {
          formBlock.style.display = "block";
          document.getElementById("form-title").textContent = this.currentLanguage === "uz" ? "Dorini tahrirlash" : "Edit Medicine";
          
          document.getElementById("form-med-id").value = m.id;
          document.getElementById("form-med-name-uz").value = m.name.uz;
          document.getElementById("form-med-name-en").value = m.name.en;
          document.getElementById("form-med-type-uz").value = m.type.uz;
          document.getElementById("form-med-type-en").value = m.type.en;
          document.getElementById("form-med-category").value = m.category;
          document.getElementById("form-med-price").value = m.price;
          document.getElementById("form-med-manu-uz").value = m.manufacturer.uz;
          document.getElementById("form-med-manu-en").value = m.manufacturer.en;
          document.getElementById("form-med-desc-uz").value = m.description.uz;
          document.getElementById("form-med-desc-en").value = m.description.en;
          document.getElementById("form-med-usage-uz").value = m.usage.uz;
          document.getElementById("form-med-usage-en").value = m.usage.en;
          document.getElementById("form-med-dose-uz").value = m.dosage.uz;
          document.getElementById("form-med-dose-en").value = m.dosage.en;
          document.getElementById("form-med-side-uz").value = m.sideEffects.uz;
          document.getElementById("form-med-side-en").value = m.sideEffects.en;
          document.getElementById("form-med-warn-uz").value = m.warnings.uz;
          document.getElementById("form-med-warn-en").value = m.warnings.en;
          document.getElementById("form-med-rx").checked = m.prescription;
          
          window.scrollTo({ top: formBlock.offsetTop - 100, behavior: "smooth" });
        }
      });
    });

    content.querySelectorAll(".dis-edit-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const d = window.db.getDiseaseById(id);
        if (d) {
          formBlock.style.display = "block";
          document.getElementById("form-title").textContent = this.currentLanguage === "uz" ? "Kasallikni tahrirlash" : "Edit Disease";

          document.getElementById("form-dis-id").value = d.id;
          document.getElementById("form-dis-name-uz").value = d.name.uz;
          document.getElementById("form-dis-name-en").value = d.name.en;
          document.getElementById("form-dis-desc-uz").value = d.description.uz;
          document.getElementById("form-dis-desc-en").value = d.description.en;
          document.getElementById("form-dis-symp-uz").value = d.symptoms.uz;
          document.getElementById("form-dis-symp-en").value = d.symptoms.en;
          document.getElementById("form-dis-cause-uz").value = d.causes.uz;
          document.getElementById("form-dis-cause-en").value = d.causes.en;
          document.getElementById("form-dis-prev-uz").value = d.prevention.uz;
          document.getElementById("form-dis-prev-en").value = d.prevention.en;
          document.getElementById("form-dis-treat-uz").value = d.treatment.uz;
          document.getElementById("form-dis-treat-en").value = d.treatment.en;

          window.scrollTo({ top: formBlock.offsetTop - 100, behavior: "smooth" });
        }
      });
    });

    // 5. Formalarni saqlash submit
    const medForm = document.getElementById("admin-med-form");
    if (medForm) {
      medForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("form-med-id").value;
        const newMed = {
          name: { uz: document.getElementById("form-med-name-uz").value, en: document.getElementById("form-med-name-en").value },
          type: { uz: document.getElementById("form-med-type-uz").value, en: document.getElementById("form-med-type-en").value },
          category: document.getElementById("form-med-category").value,
          price: parseInt(document.getElementById("form-med-price").value),
          manufacturer: { uz: document.getElementById("form-med-manu-uz").value, en: document.getElementById("form-med-manu-en").value },
          description: { uz: document.getElementById("form-med-desc-uz").value, en: document.getElementById("form-med-desc-en").value },
          usage: { uz: document.getElementById("form-med-usage-uz").value, en: document.getElementById("form-med-usage-en").value },
          dosage: { uz: document.getElementById("form-med-dose-uz").value, en: document.getElementById("form-med-dose-en").value },
          sideEffects: { uz: document.getElementById("form-med-side-uz").value, en: document.getElementById("form-med-side-en").value },
          warnings: { uz: document.getElementById("form-med-warn-uz").value, en: document.getElementById("form-med-warn-en").value },
          prescription: document.getElementById("form-med-rx").checked
        };
        
        if (id) newMed.id = id;

        window.db.saveMedicine(newMed);
        this.showToast(this.t("toast_admin_save_success"), "success");
        this.renderAdmin();
      });
    }

    const disForm = document.getElementById("admin-dis-form");
    if (disForm) {
      disForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("form-dis-id").value;
        const newDis = {
          name: { uz: document.getElementById("form-dis-name-uz").value, en: document.getElementById("form-dis-name-en").value },
          description: { uz: document.getElementById("form-dis-desc-uz").value, en: document.getElementById("form-dis-desc-en").value },
          symptoms: { uz: document.getElementById("form-dis-symp-uz").value, en: document.getElementById("form-dis-symp-en").value },
          causes: { uz: document.getElementById("form-dis-cause-uz").value, en: document.getElementById("form-dis-cause-en").value },
          prevention: { uz: document.getElementById("form-dis-prev-uz").value, en: document.getElementById("form-dis-prev-en").value },
          treatment: { uz: document.getElementById("form-dis-treat-uz").value, en: document.getElementById("form-dis-treat-en").value },
          recommendedMedicines: [] // Yaratilganda bo'sh bo'ladi
        };

        if (id) newDis.id = id;

        window.db.saveDisease(newDis);
        this.showToast(this.t("toast_admin_save_success"), "success");
        this.renderAdmin();
      });
    }
  }

  renderNotFound() {
    document.getElementById("app-content").innerHTML = `
      <div class="page-view" style="text-align: center; padding: 5rem 1rem;">
        <h1 style="font-size: 5rem; color: var(--primary);">404</h1>
        <h2>Sahifa topilmadi</h2>
        <p style="color: var(--text-muted); margin: 0.5rem 0 1.5rem;">Siz so'ragan manzil topilmadi yoki o'chirilgan bo'lishi mumkin.</p>
        <a href="#home" class="details-btn details-btn-primary" style="margin: 0 auto; display:inline-flex;">Bosh sahifaga qaytish</a>
      </div>
    `;
  }

  // --- HTML KOD GENERATSIYA FUNKSIYALARI ---

  generateMedicineCardHTML(m) {
    const isFav = window.db.isFavorite("medicine", m.id);
    return `
      <div class="medicine-card" data-id="${m.id}">
        <span class="card-header-badge ${m.prescription ? 'badge-rx' : 'badge-otc'}">
          ${m.prescription ? this.t("card_rx_yes") : this.t("card_rx_no")}
        </span>
        
        <button class="card-favorite-btn ${isFav ? 'active' : ''}" data-id="${m.id}" data-type="medicine" title="Sevimlilarga qo'shish">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>

        <div class="card-image-box">
          <!-- Inline pill dynamic graphic -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.5 10.5C3.67 10.5 3 11.17 3 12s.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5h-15z"></path><rect x="2" y="5" width="20" height="14" rx="2" stroke-width="1.5"></rect><line x1="8" y1="5" x2="8" y2="19"></line></svg>
        </div>

        <div class="card-body">
          <span class="card-type">${m.type[this.currentLanguage]}</span>
          <h3 class="card-name">${m.name[this.currentLanguage]}</h3>
          <p class="card-desc">${m.description[this.currentLanguage]}</p>
          
          <div class="card-rating">⭐ ${m.rating}</div>
          
          <div class="card-footer">
            <div>
              <span class="card-price-label">${this.t("card_price_from")}</span>
              <div class="card-price">${m.price.toLocaleString()} UZS</div>
            </div>
            
            <button class="card-action-btn card-more-btn" data-id="${m.id}">${this.t("card_btn_more")}</button>
          </div>
        </div>
      </div>
    `;
  }

  generateDiseaseCardHTML(d) {
    const isFav = window.db.isFavorite("disease", d.id);
    return `
      <div class="disease-card" data-id="${d.id}">
        <button class="card-favorite-btn ${isFav ? 'active' : ''}" data-id="${d.id}" data-type="disease" title="Sevimlilarga qo'shish">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>

        <h3 class="dis-card-name">${d.name[this.currentLanguage]}</h3>
        <p class="dis-card-desc">${d.description[this.currentLanguage]}</p>
        
        <div class="symptoms-preview">
          <div class="symptoms-preview-title">${this.t("symptoms")}</div>
          <p class="symptoms-preview-text">${d.symptoms[this.currentLanguage]}</p>
        </div>

        <div class="dis-card-footer">
          <span class="recommended-count">${d.recommendedMedicines ? d.recommendedMedicines.length : 0} tavsiya etilgan dori</span>
          <button class="card-action-btn dis-more-btn" data-id="${d.id}" style="background:var(--secondary);">${this.t("card_btn_more")}</button>
        </div>
      </div>
    `;
  }

  // --- KARTALARDAGI TUGMALAR EVENTLARINI BIND QILISH ---
  initCardEvents() {
    // 1. Dori/Kasallik Batafsil sahifasiga o'tish (havolalarni o'rniga dinamik qilish)
    document.querySelectorAll(".card-more-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        window.location.hash = `#medicine/${id}`;
      });
    });

    document.querySelectorAll(".dis-more-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        window.location.hash = `#disease/${id}`;
      });
    });

    // Karta o'zini bosganda ham batafsilga o'tish
    document.querySelectorAll(".medicine-card").forEach(card => {
      card.addEventListener("click", (e) => {
        // Agar sevimlilar tugmasi bosilgan bo'lsa, bu click ishlamasin
        if (e.target.closest(".card-favorite-btn") || e.target.closest(".card-action-btn")) return;
        const id = card.getAttribute("data-id");
        window.location.hash = `#medicine/${id}`;
      });
    });

    document.querySelectorAll(".disease-card").forEach(card => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".card-favorite-btn") || e.target.closest(".card-action-btn")) return;
        const id = card.getAttribute("data-id");
        window.location.hash = `#disease/${id}`;
      });
    });

    // 2. Sevimlilarni toggler qilish
    document.querySelectorAll(".card-favorite-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        const type = btn.getAttribute("data-type");
        const added = window.db.toggleFavorite(type, id);

        // Tugma holatini to'g'rilaymiz
        if (added) {
          btn.classList.add("active");
          btn.querySelector("svg").setAttribute("fill", "currentColor");
          this.showToast(this.t("toast_fav_added"), "success");
        } else {
          btn.classList.remove("active");
          btn.querySelector("svg").setAttribute("fill", "none");
          this.showToast(this.t("toast_fav_removed"), "info");
        }

        // Agar sevimlilar sahifasida tursak va o'chirilgan bo'lsa, butun sahifani qayta chizamiz
        if (this.activeRoute === "#favorites") {
          this.renderFavorites();
        }
      });
    });
  }
}

// Barcha boshqaruvchini yuklash tugagach ishga tushiramiz
window.addEventListener("DOMContentLoaded", () => {
  window.app = new ApplicationController();
});
