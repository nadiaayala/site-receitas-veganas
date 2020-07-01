import { Fraction } from 'fractional'
import { elements } from './base'

export const renderItem = item => {
    let markup = `
    <li class="shopping__item" data-itemid="${item.id}">
        <div class="shopping__count">
            <input type="number" value="${item.amount}" step="${item.amount}">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.name}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `
    elements.shopping.insertAdjacentHTML('beforeend', markup);

};