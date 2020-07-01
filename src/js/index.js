

import { elements, renderLoader, clearLoader } from './views/base';
import Search from './models/Search';
import Recipe from './models/Recipe';
import Likes from './models/Likes';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as likesView from './views/likesView';
import * as listView from './views/listView';


let state = {}


//Elements event listeners 
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    controlSearch();
    
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.results, goToPage, 10);
    }
} );

elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.recipe__love, .recipe__love *')) {
        controlLikes();
    }
    else if(e.target.matches('.recipe__btn, .recipe__btn *')){
        controlList();
    }
});

elements.searchResList.addEventListener('click', e => {
    controlRecipe();
});


//SEARCH CONTROLLER
const controlSearch = async () => {
    const query = searchView.getSearchInput();
    if(query){
        state.search = new Search(query);
        searchView.clearInput();
        try {
            await state.search.getResults();
            clearLoader();
            searchView.renderResults(state.search.results);
        }
        catch(error){
            console.log(`Something wrong with the search: ${error}`);
        }
    }
};




//RECIPE CONTROLLER
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    if(id){
        state.recipe = new Recipe(id);
        // renderLoader(elements.recipe);
        await state.recipe.getRecipe();
        recipeView.clearRecipe();
        recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

    }
};

//LIKES CONTROLLER
const controlLikes = () => {
    const id = state.recipe.id;
     // User has NOT yet liked current recipe
    if(!state.likes.isLiked(id)){
        const newLike = state.likes.addLike(id, state.recipe.title, state.recipe.image);
        likesView.renderLike(newLike);
        likesView.toggleLikedBtn(true);

    }

    // User HAS liked current recipe
    else{
        state.likes.deleteLike(id);
        likesView.toggleLikedBtn(false);
    }
    likesView.toggleLikesBtn(state.likes.getNumLikes());
};


// LIST CONTROLLER 
const controlList = () => {
    if (!state.list)  state.list = new List();
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.amount, el.unit, el.name);
        listView.renderItem(item);
    });
    console.log(state.list);
};

elements.shopping.addEventListener('click', e => {
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        const li = e.target.closest('.shopping__item');
        const id = li.dataset.itemid;
        state.list.deleteItem(id);
        elements.shopping.removeChild(li);
    }
});



//WINDOW EVENT LISTENERS
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', () => {
    state.likes = new Likes();
    likesView.toggleLikesBtn(state.likes.getNumLikes());
});
window.state = state;