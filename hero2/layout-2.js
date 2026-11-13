(() => {
  "use strict";

  const services = [
    { title: "Warehousing\nwithout limits.", category: "01 — OPERATIONS", description: "Intelligent storage and fulfilment built around the way your business works.", video: "assets/videos/warehousing.mp4", poster: "assets/posters/warehousing.jpg", fallback: "warehouse" },
    { title: "Global reach.\nLocal precision.", category: "02 — GLOBAL REACH", description: "Move goods across borders with dependable freight solutions and clear visibility.", video: "assets/videos/global-freight.mp4", poster: "assets/posters/global-freight.jpg", fallback: "freight" },
    { title: "Movement\nmade smarter.", category: "03 — TRANSPORTATION", description: "Reliable transport and carefully planned routes that keep every delivery on track.", video: "assets/videos/transport.mp4", poster: "assets/posters/transport.jpg", fallback: "transport" },
    { title: "Closer to\nevery customer.", category: "04 — LAST MILE", description: "Coordinated distribution that gets products where they need to be, on time.", video: "assets/videos/distribution.mp4", poster: "assets/posters/distribution.jpg", fallback: "distribution" }
  ];

  const feature = document.querySelector(".scm2-feature");
  const featureVideo = document.querySelector(".scm2-feature__video");
  const featureSource = featureVideo?.querySelector("source");
  const buttons = [...document.querySelectorAll("[data-scm2-item]")];
  const title = document.querySelector("[data-scm2-title]");
  const category = document.querySelector("[data-scm2-category]");
  const description = document.querySelector("[data-scm2-description]");
  const current = document.querySelector("[data-scm2-current]");
  const progress = document.querySelector("[data-scm2-progress]");
  let active = 0;

  // Keep the video thumbnails moving when their local files are available.
  document.querySelectorAll(".scm2-service__visual").forEach((visual) => {
    const video = visual.querySelector("video");
    if (!video) return;
    video.addEventListener("loadeddata", () => visual.classList.add("has-video"), { once: true });
    video.play().catch(() => {});
  });

  function selectService(index) {
    const item = services[index];
    if (!item || index === active && feature.dataset.ready === "true") return;
    active = index;

    buttons.forEach((button, buttonIndex) => {
      const selected = buttonIndex === index;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    title.textContent = item.title;
    category.textContent = item.category;
    description.textContent = item.description;
    current.textContent = String(index + 1).padStart(2, "0");
    progress.style.width = `${(index + 1) * 25}%`;
    feature.classList.remove("has-video");
    feature.querySelector(".scm2-feature__fallback").className = `scm2-feature__fallback scm2-feature__fallback--${item.fallback}`;

    if (featureSource) {
      featureSource.src = item.video;
      featureVideo.poster = item.poster;
      featureVideo.load();
      featureVideo.addEventListener("loadeddata", () => feature.classList.add("has-video"), { once: true });
      featureVideo.play().catch(() => {});
    }
    feature.dataset.ready = "true";

    if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(".scm2-feature__content > *", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: .45, stagger: .06, ease: "power2.out" });
    }
  }

  buttons.forEach((button) => button.addEventListener("click", () => selectService(Number(button.dataset.scm2Item))));

  // The first video may already be playing from the HTML source.
  featureVideo?.addEventListener("loadeddata", () => feature.classList.add("has-video"), { once: true });
  featureVideo?.play().catch(() => {});

  if (window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.from(".scm2-heading > *", { y: 25, opacity: 0, duration: .8, stagger: .15, ease: "power3.out" });
    gsap.from(".scm2-feature", { y: 30, opacity: 0, duration: .9, delay: .15, ease: "power3.out" });
    // gsap.from(".scm2-service", { x: 25, opacity: 0, duration: .65, stagger: .1, delay: .3, ease: "power2.out" });
  }
})();
