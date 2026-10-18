// Yale School of Art — site interactions
// Mobile nav toggle, Quick Links panel, scroll reveal.

function toggleQuickLinks() {
  const panel = document.getElementById("quickLinksPanel");
  const btn = document.querySelector(".quick-links-btn");
  const isOpen = panel.classList.toggle("open");
  btn.setAttribute("aria-expanded", isOpen);

  // On small screens, the mobile nav and Quick Links share the header —
  // keep only one open at a time so they never overlap.
  if (isOpen) {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    if (navMenu && navMenu.classList.contains("open") && window.innerWidth < 1024) {
      navMenu.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const quickPanel = document.getElementById("quickLinksPanel");
  const quickBtn = document.querySelector(".quick-links-btn");

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);

    if (isOpen && quickPanel.classList.contains("open")) {
      quickPanel.classList.remove("open");
      quickBtn.setAttribute("aria-expanded", "false");
    }
  });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
});