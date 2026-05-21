const toolSearch = document.querySelector("#toolSearch");
const articleSearch = document.querySelector("#articleSearch");
const toolCards = Array.from(document.querySelectorAll("[data-tool-card]"));
const articleCards = Array.from(document.querySelectorAll("[data-article-card]"));
const filterButtons = Array.from(document.querySelectorAll("[data-category-filter]"));
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
updateTools();
updateArticles();