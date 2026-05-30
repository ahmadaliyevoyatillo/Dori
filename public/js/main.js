// public/js/main.js - Dori.uz Client-side dynamic elementlar boshqaruvi

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. MAVZU (DARK MODE) TIZIMI ---
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      
      // Cookie-ni yangilash
      document.cookie = `theme=${isDark ? 'dark' : 'light'}; path=/; max-age=${365 * 24 * 60 * 60}`;
      
      const sun = document.querySelector(".sun-icon");
      const moon = document.querySelector(".moon-icon");
      if (isDark) {
        sun.style.display = "block";
        moon.style.display = "none";
      } else {
        sun.style.display = "none";
        moon.style.display = "block";
      }
    });
  }

  // --- 2. TILNI O'ZGARTIRISh TUGMASI ---
  const langToggleBtn = document.getElementById("lang-toggle-btn");
  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      const currentLabel = langToggleBtn.textContent.trim().toUpperCase();
      const targetLang = currentLabel === 'EN' ? 'en' : 'uz';
      window.location.href = `/set-language/${targetLang}`;
    });
  }

  // --- 3. TOAST BILDIRIShNOMA TIZIMI ---
  window.showToast = function(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

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
    setTimeout(() => { toast.remove(); }, 5000);
  };

  // --- 4. SEVIMLILARNI TOGGLE QILISh (AJAX) ---
  const favButtons = document.querySelectorAll(".card-favorite-btn, .details-fav-btn");
  favButtons.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const itemId = btn.getAttribute("data-id");
      const itemType = btn.getAttribute("data-type") || 'medicine';

      try {
        const response = await fetch('/favorites/toggle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ itemId, itemType })
        });

        const data = await response.json();

        if (response.status === 401) {
          document.getElementById("auth-modal").style.display = "flex";
          return;
        }

        if (data.success) {
          const isEn = document.documentElement.lang === 'en';
          if (data.added) {
            btn.classList.add("active");
            btn.querySelector("svg").setAttribute("fill", "currentColor");
            showToast(isEn ? "Successfully added to favorites!" : "Sevimlilarga muvaffaqiyatli qo'shildi!", "success");
          } else {
            btn.classList.remove("active");
            btn.querySelector("svg").setAttribute("fill", "none");
            showToast(isEn ? "Removed from favorites." : "Sevimlilardan olib tashlandi.", "info");
            
            // Agar sevimlilar sahifasida tursak kartani o'chirib yuboramiz
            if (window.location.pathname === '/favorites') {
              const card = btn.closest(".medicine-card, .disease-card");
              if (card) card.remove();
            }
          }
        } else {
          showToast(data.error || "Xatolik", "error");
        }
      } catch (err) {
        console.error(err);
        showToast("Server bilan bog'lanishda xato", "error");
      }
    });
  });

  // --- 5. TAQQOSLASH (COMPARE) TIZIMI (AJAX) ---
  const compareButtons = document.querySelectorAll(".card-compare-btn, .details-comp-btn");
  compareButtons.forEach(btn => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const id = btn.getAttribute("data-id");

      try {
        const response = await fetch('/compare/toggle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });

        const data = await response.json();
        const isEn = document.cookie.includes("lang=en");

        if (response.ok && data.success) {
          showToast(data.added ? 
            (isEn ? "Added to comparison list!" : "Solishtirish ro'yxatiga qo'shildi!") : 
            (isEn ? "Removed from comparison." : "Solishtirish ro'yxatidan o'chirildi."), 
            data.added ? "success" : "info"
          );
          
          syncCompareDrawer(data.compareItems);

          // Batafsil sahifadagi tugma matnini o'zgartirish
          if (btn.classList.contains("details-comp-btn")) {
            btn.querySelector("span").textContent = data.added ? 
              (isEn ? "Remove Compare" : "Solishtirishdan o'chirish") : 
              (isEn ? "Add to Compare" : "Solishtirishga qo'shish");
          }
        } else {
          showToast(data.error || "Xatolik", "error");
        }
      } catch (err) {
        console.error(err);
        showToast("Xatolik", "error");
      }
    });
  });

  // Drawer elementlarini boshqarish
  async function loadCompareData() {
    try {
      const res = await fetch('/compare/data');
      if (res.ok) {
        const data = await res.json();
        syncCompareDrawer(data.compareItems);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function syncCompareDrawer(items = []) {
    const drawer = document.getElementById("compare-drawer");
    const countEl = document.getElementById("compare-count");
    const container = document.getElementById("compare-drawer-items");
    
    if (!drawer || !countEl || !container) return;

    countEl.textContent = items.length;

    if (items.length > 0 && window.location.pathname !== '/compare') {
      const isEn = document.cookie.includes("lang=en");
      let html = "";
      items.forEach(med => {
        html += `
          <div class="compare-drawer-item">
            <span style="font-weight: 700;">${isEn ? med.name_en : med.name_uz}</span>
            <button class="compare-item-remove" data-id="${med.id}">×</button>
          </div>
        `;
      });
      container.innerHTML = html;
      drawer.classList.add("open");

      // O'chirish tugmalari eventlari
      container.querySelectorAll(".compare-item-remove").forEach(xbtn => {
        xbtn.addEventListener("click", async () => {
          const id = xbtn.getAttribute("data-id");
          const res = await fetch('/compare/toggle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
          });
          const d = await res.json();
          if (res.ok) {
            syncCompareDrawer(d.compareItems);
            showToast(isEn ? "Removed from comparison." : "Solishtirish ro'yxatidan o'chirildi.", "info");
            
            // Agar taqqoslash sahifasida tursak uni reload qilamiz
            if (window.location.pathname === '/compare') {
              window.location.reload();
            }
          }
        });
      });
    } else {
      drawer.classList.remove("open");
    }
  }

  // Tozalash tugmasi
  const compareClearBtn = document.getElementById("compare-clear-btn");
  if (compareClearBtn) {
    compareClearBtn.addEventListener("click", async () => {
      const res = await fetch('/compare/clear', { method: 'POST' });
      if (res.ok) {
        const isEn = document.cookie.includes("lang=en");
        syncCompareDrawer([]);
        showToast(isEn ? "Comparison list cleared." : "Solishtirish ro'yxati tozalandi.", "info");
        if (window.location.pathname === '/compare') {
          window.location.reload();
        }
      }
    });
  }

  const compareCloseBtn = document.getElementById("compare-close-btn");
  if (compareCloseBtn) {
    compareCloseBtn.addEventListener("click", () => {
      document.getElementById("compare-drawer").classList.remove("open");
    });
  }

  const compareNavBtn = document.getElementById("compare-navigate-btn");
  if (compareNavBtn) {
    compareNavBtn.addEventListener("click", () => {
      window.location.href = "/compare";
    });
  }

  // Load Compare drawer on startup
  loadCompareData();

  // --- 6. AUTO-COMPLETE QIDIRUV (NAVBAR) ---
  const navInput = document.getElementById("nav-search-input");
  const navSuggestions = document.getElementById("nav-search-suggestions");
  if (navInput && navSuggestions) {
    navInput.addEventListener("input", async (e) => {
      const val = e.target.value.trim();
      if (val.length < 2) {
        navSuggestions.style.display = "none";
        return;
      }

      try {
        const res = await fetch(`/api/search-suggest?q=${encodeURIComponent(val)}`);
        const data = await res.json();
        const isEn = document.cookie.includes("lang=en");

        if (data.length > 0) {
          let html = "";
          data.forEach(item => {
            const name = isEn ? item.name_en : item.name_uz;
            const route = `/${item.type}/${item.id}`;
            const badge = item.type === 'medicine' ? (isEn ? 'medicine' : 'dori') : (isEn ? 'disease' : 'kasallik');
            
            html += `
              <div class="suggestion-item" onclick="window.location.href='${route}'">
                <span class="suggestion-text">${name}</span>
                <span class="suggestion-type ${item.type === 'medicine' ? 'med' : 'dis'}">${badge}</span>
              </div>
            `;
          });
          navSuggestions.innerHTML = html;
          navSuggestions.style.display = "block";
        } else {
          navSuggestions.style.display = "none";
        }
      } catch (err) {
        console.error(err);
      }
    });

    navInput.addEventListener("blur", () => {
      setTimeout(() => { navSuggestions.style.display = "none"; }, 250);
    });
  }

  // --- 7. AUTH MODALLARNI NAZORAT QILISh ---
  const authModal = document.getElementById("auth-modal");
  if (authModal) {
    const loginForm = document.getElementById("login-form");
    const regForm = document.getElementById("register-form");
    const toReg = document.getElementById("to-register-link");
    const toLogin = document.getElementById("to-login-link");
    const mTitle = document.getElementById("auth-modal-title");

    if (toReg && toLogin) {
      toReg.addEventListener("click", () => {
        loginForm.style.display = "none";
        regForm.style.display = "block";
        mTitle.textContent = document.documentElement.lang === 'en' ? "Register" : "Ro'yxatdan o'tish";
      });

      toLogin.addEventListener("click", () => {
        regForm.style.display = "none";
        loginForm.style.display = "block";
        mTitle.textContent = document.documentElement.lang === 'en' ? "Login" : "Tizimga kirish";
      });
    }

    const closeBtn = document.getElementById("auth-modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => { authModal.style.display = "none"; });
    }

    // Login submit
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        try {
          const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });

          const data = await response.json();
          if (response.ok && data.success) {
            authModal.style.display = "none";
            showToast(data.message, "success");
            setTimeout(() => { window.location.reload(); }, 800);
          } else {
            showToast(data.error || "Xatolik yuz berdi", "error");
          }
        } catch (err) {
          showToast("Xatolik", "error");
        }
      });
    }

    // Register submit
    if (regForm) {
      regForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("reg-name").value;
        const email = document.getElementById("reg-email").value;
        const password = document.getElementById("reg-password").value;
        const confirm = document.getElementById("reg-confirm-password").value;
        const isEn = document.documentElement.lang === 'en';

        if (password !== confirm) {
          showToast(isEn ? "Passwords do not match!" : "Kiritilgan parollar bir-biriga mos kelmadi!", "error");
          return;
        }

        try {
          const response = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
          });

          const data = await response.json();
          if (response.ok && data.success) {
            authModal.style.display = "none";
            showToast(data.message, "success");
            setTimeout(() => { window.location.reload(); }, 800);
          } else {
            showToast(data.error || "Xatolik yuz berdi", "error");
          }
        } catch (err) {
          showToast("Xatolik", "error");
        }
      });
    }

    // URL orqali login_required bo'lsa modal ochish
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("login_required") === "true") {
      authModal.style.display = "flex";
    }
  }

  // --- 8. REVIEWS STAR BAHOLASH TIZIMI ---
  const starLabels = document.querySelectorAll("#rev-rating-group .rating-star-label");
  if (starLabels.length > 0) {
    let selectedRating = 5;
    
    // Hidden rating input yaratamiz (EJS formada yuborish uchun)
    const hiddenRating = document.createElement("input");
    hiddenRating.type = "hidden";
    hiddenRating.name = "rating";
    hiddenRating.id = "hidden-rating-input";
    hiddenRating.value = "5";
    
    const ratingGroup = document.getElementById("rev-rating-group");
    ratingGroup.appendChild(hiddenRating);

    starLabels.forEach(star => {
      star.addEventListener("click", () => {
        const val = parseInt(star.getAttribute("data-val"));
        selectedRating = val;
        hiddenRating.value = val.toString();
        
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
  }

  // Sharh jo'natish
  const clientReviewForm = document.getElementById("med-review-form");
  if (clientReviewForm) {
    clientReviewForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const username = document.getElementById("rev-username").value;
      const comment = document.getElementById("rev-comment").value;
      const rating = document.getElementById("hidden-rating-input").value;
      const action = clientReviewForm.getAttribute("action");

      try {
        const res = await fetch(action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, comment, rating })
        });
        
        const data = await res.json();
        if (res.ok && data.success) {
          showToast(data.message, "success");
          setTimeout(() => { window.location.reload(); }, 1000);
        } else {
          showToast(data.error || "Xatolik", "error");
        }
      } catch (err) {
        showToast("Xatolik", "error");
      }
    });
  }

  // Hamburger mobil toggle
  const hamburger = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  // Profil Dropdown toggle
  const userAvatarBtn = document.getElementById("user-avatar-btn");
  const profileDropdown = document.getElementById("profile-dropdown");
  if (userAvatarBtn && profileDropdown) {
    userAvatarBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      profileDropdown.style.display = profileDropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
      if (!userAvatarBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.style.display = "none";
      }
    });
  }
});
