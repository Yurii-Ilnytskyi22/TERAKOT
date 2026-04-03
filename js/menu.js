document.addEventListener("DOMContentLoaded", () => {
// --- Частина 1: Навігація та Скрол ---
const links = document.querySelectorAll(".menu-nav a");
const sections = document.querySelectorAll(".menu");

if (links.length > 0) {
links.forEach(link => {
link.addEventListener("click", (e) => {
e.preventDefault();
const id = link.getAttribute("href").substring(1);
const section = document.getElementById(id);
if (section) {
section.scrollIntoView({ behavior: "smooth" });
}
});
});

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const id = entry.target.id;
const activeLink = document.querySelector(`.menu-nav a[href="#${id}"]`);
if (activeLink) {
links.forEach(l => l.classList.remove("active"));
activeLink.classList.add("active");
activeLink.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}
}
});
}, { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" });

sections.forEach(section => observer.observe(section));
}

// --- Частина 2: Обране та Модальна плашка ---
const hearts = document.querySelectorAll(".fav");
const cartBar = document.querySelector(".cart-bar");
const cartText = document.querySelector(".cart-text");

// Завантажуємо дані
let favorites = JSON.parse(localStorage.getItem('cafe_favorites')) || [];

// Функція оновлення плашки
function updateCartUI() {
if (!cartBar) return;
const count = favorites.length;
if (count > 0) {
cartBar.classList.remove("hidden");
cartText.textContent = `${count} Optionen ausgewählt`;
} else {
cartBar.classList.add("hidden");
}
}

// Перевірка сердечок при завантаженні
hearts.forEach(heart => {
const card = heart.closest('.card');
if (!card) return;

const id = card.dataset.id;
if (favorites.some(item => item.id === id)) {
heart.classList.add('active');
}

heart.addEventListener("click", (e) => {
e.stopPropagation();
const id = card.dataset.id;
const name = card.dataset.name;
const price = card.dataset.price;
const img = card.dataset.img;

if (heart.classList.contains('active')) {
favorites = favorites.filter(item => item.id !== id);
heart.classList.remove('active');
} else {
if (favorites.length >= 19) return;
favorites.push({ id, name, price, img });
heart.classList.add('active');
}

localStorage.setItem('cafe_favorites', JSON.stringify(favorites));
updateCartUI();
});
});

// Додаємо клік на саму плашку для переходу
if (cartBar) {
cartBar.style.cursor = "pointer";
cartBar.addEventListener("click", () => {
window.location.href = "favorites.html";
});
}

updateCartUI();
});



