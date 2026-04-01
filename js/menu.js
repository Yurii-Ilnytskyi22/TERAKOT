document.addEventListener("DOMContentLoaded", () => {
const links = document.querySelectorAll(".menu-nav a");
const sections = document.querySelectorAll(".menu");
const nav = document.querySelector(".menu-header");

// 👉 клік по кнопці
links.forEach(link => {
link.addEventListener("click", (e) => {
e.preventDefault();

const id = link.getAttribute("href").substring(1);
const section = document.getElementById(id);

section.scrollIntoView({
behavior: "smooth"
});

setActive(link);
});
});

// 👉 IntersectionObserver (підсвітка при скролі)
const observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
const id = entry.target.id;

const activeLink = document.querySelector(
`.menu-nav a[href="#${id}"]`
);

if (activeLink) {
setActive(activeLink);
}
}
});
},
{
threshold: 0.4,
rootMargin: "-80px 0px -40% 0px"
}
);

// 👉 підключаємо observer до секцій
sections.forEach(section => observer.observe(section));

// 👉 функція активації
function setActive(activeLink) {
links.forEach(l => l.classList.remove("active"));
activeLink.classList.add("active");

scrollToActive(activeLink);
}

// 👉 🔥 ГОЛОВНА ФУНКЦІЯ (фікс кнопки)
function scrollToActive(activeLink) {
activeLink.scrollIntoView({
behavior: "smooth",
inline: "center", // 🔥 центр
block: "nearest"
});
}
});