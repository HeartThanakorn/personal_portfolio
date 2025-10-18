// Navbar HTML template
const navbarHTML = `
<!-- Navigation Bar -->
<nav class="navbar">
  <div class="nav-container">
    <div class="nav-logo">Thanakorn Thajan</div>
    <button class="nav-toggle" id="navToggle">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <ul class="nav-menu" id="navMenu">
      <li class="nav-item">
        <a href="main.html" class="nav-link" id="nav-main">Main</a>
      </li>
      <li class="nav-item">
        <a href="experience.html" class="nav-link" id="nav-experience">Experience</a>
      </li>
      <li class="nav-item">
        <a href="education.html" class="nav-link" id="nav-education">Education</a>
      </li>
      <li class="nav-item">
        <a href="certifications.html" class="nav-link" id="nav-certifications">Certifications</a>
      </li>
      <li class="nav-item">
        <a href="projects.html" class="nav-link" id="nav-projects">Projects</a>
      </li>
      <li class="nav-item">
        <a href="hackathon.html" class="nav-link" id="nav-hackathon">Hackathon</a>
      </li>
      <li class="nav-item">
        <a href="volunteering.html" class="nav-link" id="nav-volunteering">Volunteering</a>
      </li>
    </ul>
  </div>
</nav>
`;

// Load navbar
document.addEventListener("DOMContentLoaded", function () {
  // Insert navbar at the beginning of body
  document.body.insertAdjacentHTML("afterbegin", navbarHTML);

  // Set active link based on current page
  const currentPage = window.location.pathname.split("/").pop();
  const pageMap = {
    "main.html": "nav-main",
    "experience.html": "nav-experience",
    "education.html": "nav-education",
    "certifications.html": "nav-certifications",
    "projects.html": "nav-projects",
    "hackathon.html": "nav-hackathon",
    "volunteering.html": "nav-volunteering",
  };

  const activeLinkId = pageMap[currentPage];
  if (activeLinkId) {
    const activeLink = document.getElementById(activeLinkId);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  // Initialize mobile menu toggle after navbar is loaded
  initMobileMenu();
});

// Mobile menu toggle
function initMobileMenu() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });
  }
}
