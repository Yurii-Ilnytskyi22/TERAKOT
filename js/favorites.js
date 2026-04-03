document.addEventListener("DOMContentLoaded", () => {
const container = document.getElementById('favorites-container');
if (!container) return;

let favorites = JSON.parse(localStorage.getItem('cafe_favorites')) || [];

function renderFavorites() {
if (favorites.length === 0) {
container.innerHTML = "<p style='text-align:center; padding: 20px;'>Ви ще нічого не обрали</p>";
return;
}

container.innerHTML = "";
favorites.forEach(item => {
const card = document.createElement('div');
card.className = 'card';
card.innerHTML = `
<div class="card-info">
<h3>${item.name}</h3>
<div class="card-bottom">
<span class="price">${item.price}</span>
<span class="fav active" data-id="${item.id}">
<svg width="20px" height="20px"><use href="./images/symbol-defs.svg#icon-heart"></use></svg>
</span>
</div>
</div>
<img src="${item.img}" alt="${item.name}">
`;
container.appendChild(card);
});

// Видалення
const hearts = container.querySelectorAll('.fav');
hearts.forEach(heart => {
heart.addEventListener('click', () => {
const id = heart.dataset.id;
favorites = favorites.filter(item => item.id !== id);
localStorage.setItem('cafe_favorites', JSON.stringify(favorites));
renderFavorites();
});
});
}

renderFavorites();
});