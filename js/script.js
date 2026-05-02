document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const body = document.body;

  // Mobile Navigation Functionality
  if (navToggle && nav) {
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.toggle("active");
      nav.classList.toggle("active");
      body.classList.toggle("menu-open");
    });

    // Close menu when clicking a nav link
    document.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", function () {
        navToggle.classList.remove("active");
        nav.classList.remove("active");
        body.classList.remove("menu-open");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        nav.classList.contains("active") &&
        !nav.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navToggle.classList.remove("active");
        nav.classList.remove("active");
        body.classList.remove("menu-open");
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("active")) {
        navToggle.classList.remove("active");
        nav.classList.remove("active");
        body.classList.remove("menu-open");
      }
    });
  }

  // Dropdown menus
  const dropdowns = document.querySelectorAll(".nav__item.dropdown");

  // Toggle mobile dropdowns
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector("> .nav__link");
    const menu = dropdown.querySelector(".dropdown-menu");

    trigger.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();

        // Close other dropdowns
        dropdowns.forEach((other) => {
          if (other !== dropdown) {
            other.querySelector(".dropdown-menu").style.maxHeight = null;
            other.querySelector("> .nav__link i").style.transform = null;
          }
        });

        // Toggle current dropdown
        if (menu.style.maxHeight) {
          menu.style.maxHeight = null;
          trigger.querySelector("i").style.transform = null;
        } else {
          menu.style.maxHeight = menu.scrollHeight + "px";
          trigger.querySelector("i").style.transform = "rotate(180deg)";
        }
      }
    });
  });

  // Close dropdowns when clicking outside (mobile)
  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 768 && !e.target.closest(".nav__item.dropdown")) {
      dropdowns.forEach((dropdown) => {
        dropdown.querySelector(".dropdown-menu").style.maxHeight = null;
        dropdown.querySelector("> .nav__link i").style.transform = null;
      });
    }
  });

  // Close dropdowns when clicking a link inside (mobile)
  document.querySelectorAll(".dropdown-menu .nav__link").forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        const dropdown = this.closest(".nav__item.dropdown");
        if (dropdown) {
          dropdown.querySelector(".dropdown-menu").style.maxHeight = null;
          dropdown.querySelector("> .nav__link i").style.transform = null;
        }
      }
    });
  });
});
