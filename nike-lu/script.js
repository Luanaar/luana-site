const menuToggle = document.querySelector(".menu-toggle");
const desktopNav = document.querySelector(".desktop-nav");
const searchToggle = document.querySelector(".search-toggle");
const searchPanel = document.querySelector(".search-panel");
const searchInput = searchPanel.querySelector("input");
const searchButton = searchPanel.querySelector("button");
const announcement = document.querySelector(".announcement");

menuToggle.addEventListener("click", () => {
  const isOpen = desktopNav.classList.toggle("mobile-open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );
});

desktopNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    desktopNav.classList.remove("mobile-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

searchToggle.addEventListener("click", () => {
  const isOpen = searchPanel.classList.toggle("open");

  searchToggle.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    searchInput.focus();
  }
});

searchPanel.addEventListener("submit", (event) => {
  event.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    searchInput.focus();
    return;
  }

  // Demonstração: não consulta uma loja ou catálogo real.
  const message = document.createElement("p");
  message.className = "search-feedback";
  message.setAttribute("role", "status");
  message.textContent =
    `Pesquisa demonstrativa: "${query}". Conecte um catálogo para buscar produtos.`;

  const previousMessage =
    searchPanel.querySelector(".search-feedback");

  if (previousMessage) {
    previousMessage.remove();
  }

  searchPanel.appendChild(message);
});

// Alternância dos anúncios superiores.
const announcements = [
  {
    title: "↗ TÊNIS DE CORRIDA",
    description: "Encontre o seu tênis ideal.",
    link: "Saiba Mais"
  },
  {
    title: "NIKE TRAINING",
    description: "Supere seus limites todos os dias.",
    link: "Explorar"
  },
  {
    title: "NOVOS LANÇAMENTOS",
    description: "Descubra as novidades.",
    link: "Ver coleção"
  }
];

let currentAnnouncement = 0;

function renderAnnouncement() {
  const content = announcement.querySelector("p");
  const item = announcements[currentAnnouncement];

  content.innerHTML = "";

  const title = document.createElement("strong");
  title.textContent = item.title;

  const description = document.createElement("span");
  description.textContent = item.description;

  const link = document.createElement("a");
  link.href = "#lancamentos";
  link.textContent = item.link;

  content.append(title, description, link);
}

const arrows = announcement.querySelectorAll(".slide-arrow");

arrows[0].addEventListener("click", () => {
  currentAnnouncement =
    (currentAnnouncement - 1 + announcements.length) %
    announcements.length;

  renderAnnouncement();
});

arrows[1].addEventListener("click", () => {
  currentAnnouncement =
    (currentAnnouncement + 1) % announcements.length;

  renderAnnouncement();
});