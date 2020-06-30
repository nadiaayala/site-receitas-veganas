import { elements } from './base'
import { Fraction } from 'fractional'


export const renderRecipe = recipe => {
    const markup = `
    <figure class="recipe__fig">
                    <img src="${recipe.image}" alt="Tomato" class="recipe__img">
                    <h1 class="recipe__title">
                        <span>${recipe.title}</span>
                    </h1>
                </figure>
                <div class="recipe__details">
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="img/icons.svg#icon-stopwatch"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingMinutes}</span>
                        <span class="recipe__info-text"> minutes</span>
                    </div>
                    <div class="recipe__info">
                        <svg class="recipe__info-icon">
                            <use href="img/icons.svg#icon-man"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                        <span class="recipe__info-text"> servings</span>
                        <div class="recipe__info-buttons">
                            <button class="btn-tiny">
                                <svg>
                                    <use href="img/icons.svg#icon-circle-with-minus"></use>
                                </svg>
                            </button>
                            <button class="btn-tiny">
                                <svg>
                                    <use href="img/icons.svg#icon-circle-with-plus"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button class="recipe__love">
                        <svg class="header__likes">
                            <use href="img/icons.svg#icon-heart-outlined"></use>
                        </svg>
                    </button>
                </div>
                <div class="recipe__ingredients">
                    <ul class="recipe__ingredient-list">
                        ${recipe.ingredients.map(el => createIngredientMarkup(el.name, el.amount, el.unit)).join('')}
                    </ul>`
    elements.recipe.insertAdjacentHTML('afterbegin', markup);

};

const createIngredientMarkup = (name, amount, unit) => {
    const frAmount = new Fraction(amount);
    const markup = `
    <li class="recipe__item">
                            <svg class="recipe__icon">
                                <use href="img/icons.svg#icon-check"></use>
                            </svg>
                            <div class="recipe__count">${frAmount}</div>
                            <div class="recipe__ingredient">
                                <span class="recipe__unit">${unit}</span>
                                ${name}
                            </div>
                        </li>`;
                        return markup;
};

export const clearRecipe = () => {
    elements.recipe.innerHTML = '';
}
