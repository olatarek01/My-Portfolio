const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const themeToggleBtn = document.getElementById("theme-toggle-button");
const html = document.documentElement;
const menuBtn = document.querySelector(".mobile-menu-btn");
const filterButtons = document.querySelectorAll(".portfolio-filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");
const settingsToggle = document.getElementById("settings-toggle");
const settingsSidebar = document.getElementById("settings-sidebar");
const closeSettings = document.getElementById("close-settings");
const resetSettings = document.getElementById("reset-settings");
const scrollBtn = document.getElementById("scroll-to-top");
const firstSection = document.querySelector("section");
const fontOptions = document.querySelectorAll(".font-option");
const colorButtons = document.querySelectorAll("#theme-colors-grid button");
const carousel = document.getElementById("testimonials-carousel");
const cards = document.querySelectorAll(".testimonial-card");
const nextBtn = document.getElementById("next-testimonial");
const prevBtn = document.getElementById("prev-testimonial");
const indicators = document.querySelectorAll(".carousel-indicator");

// Scroll Spy
function setActiveLink(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

setActiveLink("hero-section");

window.addEventListener("scroll", () => {
  let currentSection = "hero-section";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.id;
    }
  });

  setActiveLink(currentSection);
});

// Theme Toggle
if (localStorage.getItem("theme") === "dark") {
  html.classList.add("dark");
  themeToggleBtn.setAttribute("aria-pressed", "true");
}

themeToggleBtn.addEventListener("click", () => {
  const isDark = html.classList.toggle("dark");
  themeToggleBtn.setAttribute("aria-pressed", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Mobile Menu
const navLinksContainer = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinksContainer.classList.toggle("active");
});

navLinksContainer.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("active");
  });
});

// Portfolio Filter Buttons
const activeClasses =
  "bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/50";
const defaultClasses =
  "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700";

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.className =
        "portfolio-filter px-8 py-3 rounded-xl transition-all duration-300 " +
        defaultClasses;
      btn.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.className =
      "portfolio-filter px-8 py-3 rounded-xl transition-all duration-300 " +
      activeClasses;
    button.setAttribute("aria-pressed", "true");

    portfolioItems.forEach((item) => {
      const category = item.dataset.category;
      item.style.display =
        filter === "all" || category === filter ? "block" : "none";
    });
  });
});

// Settings 
const defaultFont = "tajawal";
const defaultPrimary = colorButtons[0].dataset.primary;
const defaultSecondary = colorButtons[0].dataset.secondary;
let currentFont = defaultFont;
let currentPrimary = defaultPrimary;
let currentSecondary = defaultSecondary;

function openSidebar() {
  settingsSidebar.classList.add("translate-x-0");
  settingsSidebar.classList.remove("translate-x-full");
}
function closeSidebar() {
  settingsSidebar.classList.remove("translate-x-0");
  settingsSidebar.classList.add("translate-x-full");
}

settingsToggle.addEventListener("click", openSidebar);
closeSettings.addEventListener("click", closeSidebar);

document.addEventListener("click", (e) => {
  if (
    !settingsSidebar.contains(e.target) &&
    !settingsToggle.contains(e.target)
  ) {
    closeSidebar();
  }
});

// Font Options
fontOptions.forEach((btn) => {
  btn.addEventListener("click", () => {
    fontOptions.forEach((b) => {
      b.setAttribute("aria-checked", "false");
      b.classList.remove("active");
    });
    btn.setAttribute("aria-checked", "true");
    btn.classList.add("active");
    currentFont = btn.dataset.font;
    document.body.style.fontFamily = currentFont;
  });
});

// Color Buttons
colorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentPrimary = btn.dataset.primary;
    currentSecondary = btn.dataset.secondary;
    document.documentElement.style.setProperty(
      "--color-primary",
      currentPrimary
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      currentSecondary
    );
  });
});

// Reset Button
resetSettings.addEventListener("click", () => {
  currentFont = defaultFont;
  document.body.style.fontFamily = currentFont;
  currentPrimary = defaultPrimary;
  currentSecondary = defaultSecondary;
  document.documentElement.style.setProperty("--color-primary", currentPrimary);
  document.documentElement.style.setProperty(
    "--color-secondary",
    currentSecondary
  );

  fontOptions.forEach((b) => {
    if (b.dataset.font === defaultFont) {
      b.setAttribute("aria-checked", "true");
      b.classList.add("active");
    } else {
      b.setAttribute("aria-checked", "false");
      b.classList.remove("active");
    }
  });

  closeSidebar();
});

// Scroll to Top Button
window.addEventListener("scroll", () => {
  if (window.scrollY > firstSection.offsetHeight) {
    scrollBtn.classList.remove("opacity-0", "invisible");
    scrollBtn.classList.add("opacity-100", "visible");
  } else {
    scrollBtn.classList.remove("opacity-100", "visible");
    scrollBtn.classList.add("opacity-0", "invisible");
  }
});

scrollBtn.addEventListener("click", () => {
  firstSection.scrollIntoView({ behavior: "smooth" });
});

// Testimonials Carousel
document.addEventListener("DOMContentLoaded", () => {
  const carouselWrapper = document.querySelector("#testimonials-carousel").parentElement;
  let currentIndex = 0;

  function cardWidth() {
    return cards[0].getBoundingClientRect().width;
  }

  function updateIndicators() {
    indicators.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add("bg-accent");
        dot.classList.remove("bg-slate-400");
        dot.style.transform = "scale(1.3)";
      } else {
        dot.classList.remove("bg-accent");
        dot.classList.add("bg-slate-400");
        dot.style.transform = "scale(1)";
      }
      dot.setAttribute("aria-selected", i === currentIndex);
    });
  }

  // Next 
  nextBtn.addEventListener("click", () => {
    if (currentIndex >= cards.length - 1) {
      currentIndex = 0;
      carouselWrapper.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      currentIndex++;
      carouselWrapper.scrollBy({ left: cardWidth(), behavior: "smooth" });
    }
    updateIndicators();
  });

  // Previous
  prevBtn.addEventListener("click", () => {
    if (currentIndex <= 0) {
      currentIndex = cards.length - 1;
      carouselWrapper.scrollTo({ left: cardWidth() * currentIndex, behavior: "smooth" });
    } else {
      currentIndex--;
      carouselWrapper.scrollBy({ left: -cardWidth(), behavior: "smooth" });
    }
    updateIndicators();
  });

  // Indicators 
  indicators.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.index);
      const move = index - currentIndex;
      currentIndex = index;
      carouselWrapper.scrollBy({ left: cardWidth() * move, behavior: "smooth" });
      updateIndicators();
    });
  });

  window.addEventListener("resize", () => {
    currentIndex = 0;
    carouselWrapper.scrollTo({ left: 0 });
    updateIndicators();
  });

  updateIndicators();
});