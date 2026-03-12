document.addEventListener("DOMContentLoaded", () => {
  const cardsGrid = document.getElementById("flashcards-grid");
  const cards = Array.from(document.querySelectorAll(".flashcard"));
  const searchInput = document.getElementById("flashcard-search");
  const filterButtons = Array.from(document.querySelectorAll(".domain-filter"));
  const shuffleButton = document.getElementById("shuffle-cards");
  const flipVisibleButton = document.getElementById("flip-visible");
  const resetButton = document.getElementById("reset-cards");
  const cardsCount = document.getElementById("cards-count");

  let activeDomain = "all";
  let searchTimeout;

  function getVisibleCards() {
    return cards.filter(card => !card.classList.contains("hidden"));
  }

  function updateCount() {
    cardsCount.textContent = `${getVisibleCards().length} card(s) visible`;
  }

  function animateVisibleCards() {
    const visibleCards = getVisibleCards();

    visibleCards.forEach((card, index) => {
      card.classList.remove("pop-in");
      setTimeout(() => {
        card.classList.add("pop-in");
      }, index * 20);
    });
  }

  function filterCards({ animate = false } = {}) {
    const query = searchInput.value.trim().toLowerCase();
    const activeDomainLower = activeDomain.toLowerCase();

    cards.forEach(card => {
      const domain = (card.dataset.domain || "").toLowerCase();
      const searchableText = (card.dataset.search || "").toLowerCase();

      const matchesDomain =
        activeDomain === "all" || domain === activeDomainLower;

      const matchesSearch =
        query === "" || searchableText.includes(query);

      if (matchesDomain && matchesSearch) {
        card.classList.remove("hidden");
      } else {
        card.classList.remove("flipped");
        card.classList.add("hidden");
      }
    });

    updateCount();

    if (animate) {
      animateVisibleCards();
    }
  }

  cards.forEach(card => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("hidden")) {
        card.classList.toggle("flipped");
      }
    });
  });

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      activeDomain = button.dataset.domain;
      filterCards({ animate: true });
    });
  });

  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      filterCards({ animate: false });
    }, 120);
  });

  shuffleButton.addEventListener("click", () => {
    const visibleCards = getVisibleCards();

    for (let i = visibleCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [visibleCards[i], visibleCards[j]] = [visibleCards[j], visibleCards[i]];
    }

    const fragment = document.createDocumentFragment();
    visibleCards.forEach(card => fragment.appendChild(card));
    cardsGrid.appendChild(fragment);

    animateVisibleCards();
  });

  flipVisibleButton.addEventListener("click", () => {
    const visibleCards = getVisibleCards();

    visibleCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.toggle("flipped");
      }, index * 40);
    });
  });

  resetButton.addEventListener("click", () => {
    searchInput.value = "";
    activeDomain = "all";

    filterButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.domain === "all");
    });

    cards.forEach(card => {
      card.classList.remove("hidden", "flipped", "pop-in");
    });

    const fragment = document.createDocumentFragment();
    cards.forEach(card => fragment.appendChild(card));
    cardsGrid.appendChild(fragment);

    updateCount();
    animateVisibleCards();
  });

  updateCount();
});