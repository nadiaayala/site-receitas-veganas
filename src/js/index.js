

import { elements } from './views/base';
import Search from './models/Search';

let state = {}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('Submited');
    controlSearch();
    
})

const controlSearch = async () => {
    //1. Create a new Search object
    state.search = new Search('burger');
    state.search.getResults();
    //2. Use its method to perform search
};