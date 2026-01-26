document.addEventListener("DOMContentLoaded", function () {
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
