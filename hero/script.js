(() => {
  "use strict";

  const cards = Array.from(document.querySelectorAll(".scm-video-card"));
  const dots = Array.from(document.querySelectorAll(".scm-pagination-dot"));
  const current = document.querySelector(".scm-current");
  const grid = document.querySelector(".scm-video-grid");
  let activeIndex = 0;

  // Mark only successfully loaded local videos as visible; the CSS fallback remains otherwise.
  cards.forEach((card) => {
    const video = card.querySelector("video");
    if (!video) return;
    video.addEventListener("loadeddata", () => card.classList.add("has-video"), { once: true });
    video.addEventListener("error", () => card.classList.remove("has-video"));
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => { /* Browser autoplay restrictions: poster/fallback stays visible. */ });
    }
  });

  function activateCard(index, shouldScroll = false) {
    activeIndex = index;
    cards.forEach((card, i) => card.classList.toggle("scm-video-card--active", i === index));
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
      dot.setAttribute("aria-pressed", String(i === index));
    });
    if (current) current.textContent = String(index + 1).padStart(2, "0");
    if (shouldScroll && window.matchMedia("(max-width: 650px)").matches) {
      cards[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  }

  cards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => activateCard(index));
    card.addEventListener("focusin", () => activateCard(index));
    card.addEventListener("click", () => activateCard(index, true));
  });
  dots.forEach((dot) => {
    dot.addEventListener("click", () => activateCard(Number(dot.dataset.target), true));
  });

  // GSAP entrance motion. The page remains usable if GSAP is unavailable.
  if (window.gsap) {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      gsap.from(".scm-showcase__topline", { y: -12, opacity: 0, duration: 0.65, ease: "power2.out" });
      gsap.from(".scm-hero__copy > *", {
        y: 22, opacity: 0, duration: 0.75, stagger: 0.11, delay: 0.12, ease: "power3.out"
      });
      gsap.from(".scm-video-card", {
        y: 35, opacity: 0, duration: 0.8, stagger: 0.12, delay: 0.25, ease: "power3.out"
      });
      if (window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from(".scm-next > *", {
          scrollTrigger: { trigger: ".scm-next", start: "top 82%" },
          y: 25, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power2.out"
        });
      }
    }
  }

  // Swiper is loaded for projects that later convert the mobile strip into a carousel.
  // This implementation intentionally uses native horizontal scroll for lighter interaction.
  void grid;
  void activeIndex;
})();
