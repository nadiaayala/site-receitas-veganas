import { elements } from './base';

export const renderLike = like => {
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${like.title}</h4>
                </div>
            </a>
        </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {

};

export const toggleLikedBtn = isLiked => {
    const iconString = isLiked === true ? 'img/icons.svg#icon-heart' : 'img/icons.svg#icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', iconString);
}

export const toggleLikesBtn = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};