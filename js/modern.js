/**
 * MODERN TECH PORTFOLIO - THANAKORN THAJAN
 * Interactive Controls: Theme Switcher, Filters, Accordions, Toasts
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbarScroll();
  initMobileMenu();
  initScrollSpy();
  initProjectFilter();
  initAccordion();
  initClipboardToast();
});

/* ==========================================================================
   1. THEME SWITCHER (Dark Default + Light Support with LocalStorage)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");
  
  // Check saved theme or system preference
  const savedTheme = localStorage.getItem("portfolio_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  const currentTheme = savedTheme ? savedTheme : "dark"; // Default to dark for tech aesthetics
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme") || "dark";
      const nextTheme = activeTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio_theme", theme);
    
    if (themeIcon) {
      if (theme === "light") {
        // Moon icon for switching back to dark
        themeIcon.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
        themeToggleBtn.setAttribute("title", "Switch to Dark Mode");
        themeToggleBtn.setAttribute("aria-label", "Switch to Dark Mode");
      } else {
        // Sun icon for switching to light
        themeIcon.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`;
        themeToggleBtn.setAttribute("title", "Switch to Light Mode");
        themeToggleBtn.setAttribute("aria-label", "Switch to Light Mode");
      }
    }
  }
}

/* ==========================================================================
   2. NAVBAR SCROLL ELEVATION
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector(".modern-navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });
}

/* ==========================================================================
   3. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close on nav link click
  navLinks.querySelectorAll(".nav-item-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("open");
    }
  });
}

/* ==========================================================================
   4. SCROLL SPY FOR ACTIVE NAV LINKS
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-item-link");
  if (!sections.length || !navLinks.length) return;

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 160;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   5. PROJECT ARCHIVE CATEGORY FILTER
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".archive-card");
  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Toggle active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedCategory = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category") || "";
        if (selectedCategory === "all" || categories.includes(selectedCategory)) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(10px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   6. 20-YEAR CAREER ACCORDION EXPANDER
   ========================================================================== */
function initAccordion() {
  const toggleBtn = document.getElementById("toggleCareerAccordion");
  const content = document.getElementById("priorCareerContent");
  if (!toggleBtn || !content) return;

  toggleBtn.addEventListener("click", () => {
    const isExpanded = content.classList.contains("expanded");
    if (isExpanded) {
      content.classList.remove("expanded");
      toggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        <span>+ View Prior Engineering & Operations Leadership (2004 - 2015)</span>
      `;
    } else {
      content.classList.add("expanded");
      toggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
        <span>− Hide Prior Leadership History</span>
      `;
    }
  });
}

/* ==========================================================================
   7. COPY EMAIL TO CLIPBOARD WITH FLOATING TOAST
   ========================================================================== */
function initClipboardToast() {
  const copyButtons = document.querySelectorAll(".js-copy-email");
  const toast = document.getElementById("emailToast");
  const emailToCopy = "t.thanakorn@hotmail.com";

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(emailToCopy).then(() => {
        showToast("Email copied to clipboard: " + emailToCopy);
      }).catch(() => {
        // Fallback prompt
        window.location.href = `mailto:${emailToCopy}`;
      });
    });
  });

  function showToast(message) {
    if (!toast) return;
    const toastMsg = toast.querySelector(".toast-msg") || toast;
    toastMsg.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }
}
