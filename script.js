const toolSearch = document.querySelector("#toolSearch");
const articleSearch = document.querySelector("#articleSearch");
const toolCards = Array.from(document.querySelectorAll("[data-tool-card]"));
const articleCards = Array.from(document.querySelectorAll("[data-article-card]"));
const filterButtons = Array.from(document.querySelectorAll("[data-category-filter]"));
const carouselTrack = document.querySelector("[data-carousel-track]");
const carouselDots = Array.from(document.querySelectorAll("[data-carousel-dot]"));
const carouselPrev = document.querySelector("[data-carousel-prev]");
const carouselNext = document.querySelector("[data-carousel-next]");
const heroCarouselTrack = document.querySelector("[data-hero-carousel-track]");
const heroCarouselDots = Array.from(document.querySelectorAll("[data-hero-carousel-dot]"));
const heroCarouselPrev = document.querySelector("[data-hero-carousel-prev]");
const heroCarouselNext = document.querySelector("[data-hero-carousel-next]");
let activeCategory = "All";

function updateTools() {
  const query = (toolSearch?.value || "").trim().toLowerCase();
  toolCards.forEach((card) => {
    const matchesCategory = activeCategory === "All" || card.dataset.category === activeCategory;
    const matchesSearch = !query || card.dataset.search.includes(query);
    card.hidden = !(matchesCategory && matchesSearch);
  });
}

function updateArticles() {
  const query = (articleSearch?.value || "").trim().toLowerCase();
  articleCards.forEach((card) => {
    card.hidden = query && !card.dataset.search.includes(query);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.categoryFilter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    updateTools();
  });
});

toolSearch?.addEventListener("input", updateTools);
articleSearch?.addEventListener("input", updateArticles);

function scrollCarousel(direction) {
  if (!carouselTrack) return;
  const slide = carouselTrack.querySelector(".carousel-slide");
  const distance = slide ? slide.getBoundingClientRect().width + 16 : 340;
  carouselTrack.scrollBy({ left: direction * distance, behavior: "smooth" });
}

function updateCarouselDots() {
  if (!carouselTrack || !carouselDots.length) return;
  const slide = carouselTrack.querySelector(".carousel-slide");
  const width = slide ? slide.getBoundingClientRect().width + 16 : 340;
  const index = Math.round(carouselTrack.scrollLeft / width);
  carouselDots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
}

function getSlideDistance(track, selector) {
  const slide = track?.querySelector(selector);
  return slide ? slide.getBoundingClientRect().width + 18 : 220;
}

function scrollHeroCarousel(direction) {
  if (!heroCarouselTrack) return;
  heroCarouselTrack.scrollBy({ left: direction * getSlideDistance(heroCarouselTrack, ".hero-destination-card"), behavior: "smooth" });
}

function updateHeroCarouselDots() {
  if (!heroCarouselTrack || !heroCarouselDots.length) return;
  const width = getSlideDistance(heroCarouselTrack, ".hero-destination-card");
  const index = Math.round(heroCarouselTrack.scrollLeft / width);
  heroCarouselDots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === index));
}

carouselPrev?.addEventListener("click", () => scrollCarousel(-1));
carouselNext?.addEventListener("click", () => scrollCarousel(1));
carouselTrack?.addEventListener("scroll", updateCarouselDots, { passive: true });
heroCarouselPrev?.addEventListener("click", () => scrollHeroCarousel(-1));
heroCarouselNext?.addEventListener("click", () => scrollHeroCarousel(1));
heroCarouselTrack?.addEventListener("scroll", updateHeroCarouselDots, { passive: true });
carouselDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    if (!carouselTrack) return;
    const slide = carouselTrack.querySelector(".carousel-slide");
    const width = slide ? slide.getBoundingClientRect().width + 16 : 340;
    carouselTrack.scrollTo({ left: Number(dot.dataset.carouselDot) * width, behavior: "smooth" });
  });
});
heroCarouselDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    if (!heroCarouselTrack) return;
    heroCarouselTrack.scrollTo({ left: Number(dot.dataset.heroCarouselDot) * getSlideDistance(heroCarouselTrack, ".hero-destination-card"), behavior: "smooth" });
  });
});
setInterval(() => {
  if (document.hidden) return;
  if (heroCarouselTrack) {
    const atEnd = heroCarouselTrack.scrollLeft + heroCarouselTrack.clientWidth >= heroCarouselTrack.scrollWidth - 8;
    heroCarouselTrack.scrollTo({ left: atEnd ? 0 : heroCarouselTrack.scrollLeft + getSlideDistance(heroCarouselTrack, ".hero-destination-card"), behavior: "smooth" });
  }
  if (carouselTrack) {
    const atEnd = carouselTrack.scrollLeft + carouselTrack.clientWidth >= carouselTrack.scrollWidth - 8;
    carouselTrack.scrollTo({ left: atEnd ? 0 : carouselTrack.scrollLeft + getSlideDistance(carouselTrack, ".carousel-slide"), behavior: "smooth" });
  }
}, 4200);
updateTools();
updateArticles();
updateCarouselDots();
updateHeroCarouselDots();