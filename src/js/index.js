

import { elements, renderLoader, clearLoader } from './views/base';
import Search from './models/Search';
import * as searchView from './views/searchView';

let state = {}

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

elements.searchResList.addEventListener('click', e => {
    
});

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

const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');
    if(id){
        renderLoader(elements.recipe);
    }
};