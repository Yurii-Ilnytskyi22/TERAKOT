document.addEventListener("DOMContentLoaded", () => {
const links = document.querySelectorAll(".menu-nav a");
const sections = document.querySelectorAll(".menu");

if (!links.length) return; // 🔥 захист

// клік
links.forEach(link => {
link.addEventListener("click", (e) => {
e.preventDefault();

const id = link.getAttribute("href").substring(1);
const section = document.getElementById(id);

if (section) {
section.scrollIntoView({ behavior: "smooth" });
}

setActive(link);
});
});

// observer
const observer = new IntersectionObserver(
(entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const id = entry.target.id;

const activeLink = document.querySelector(
`.menu-nav a[href="#${id}"]`
);

if (activeLink) setActive(activeLink);
}
});
},
{
threshold: 0.4,
rootMargin: "-80px 0px -40% 0px"
}
);

sections.forEach(section => observer.observe(section));

function setActive(activeLink) {
links.forEach(l => l.classList.remove("active"));
activeLink.classList.add("active");

scrollToActive(activeLink);
}

function scrollToActive(activeLink) {
activeLink.scrollIntoView({
behavior: "smooth",
inline: "center",
block: "nearest"
});
}
});

document.addEventListener("DOMContentLoaded", () => {
const hearts = document.querySelectorAll(".fav");
const cartBar = document.querySelector(".cart-bar");
const cartText = document.querySelector(".cart-text");

let selected = new Set(); // 🔥 зберігає вибрані

hearts.forEach((heart, index) => {
heart.addEventListener("click", () => {
const id = index;

if (selected.has(id)) {
selected.delete(id);
heart.classList.remove("active");
} else {
if (selected.size >= 19) return; // 🔥 ліміт
selected.add(id);
heart.classList.add("active");
}

updateCart();
});
});

function updateCart() {
const count = selected.size;

if (count === 0) {
cartBar.classList.add("hidden");
} else {
cartBar.classList.remove("hidden");
}

cartText.textContent = `${count} Optionen ausgewählt`;
}
});

const id = heart.closest(".card").dataset.id;
selected.add(id);