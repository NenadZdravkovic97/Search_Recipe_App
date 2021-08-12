const APP_ID = 'b77e8adb';
const APP_key = '7a563b45246dfdaf82c3ca9f84dd354e';

const searchForm = document.querySelector('form');
const searchIcon = document.querySelector('.search');
const searchResultDiv = document.querySelector('.search-results');
const container = document.querySelector('.container');
let query = '';

let templateHTML = data => {
    let template = '';
    data.map(item => {
        template += `
        <div class="item">
        <img src="${item.recipe.image}" alt="" />
        <div class="link__title">
            <h1 class="title">${item.recipe.label}</h1>
            <a href="${
                item.recipe.url
            }" target="_blank" class="view-button">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${Math.ceil(item.recipe.calories)}</p>
    </div>
        `;
    });
    searchResultDiv.innerHTML = template;
};

const fetchData = async function () {
    const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_key}&to10`;
    const response = await fetch(baseURL);
    const data = await response.json();
    templateHTML(data.hits);
};

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    query = e.target.querySelector('input').value;
    fetchData();
});

searchIcon.addEventListener('click', () => {
    query = document.querySelector('input').value;
    fetchData();
});
