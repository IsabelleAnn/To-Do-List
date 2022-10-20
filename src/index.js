import { basketsLibrary } from './logic.js';
import { createBasketNavLinks, filterAllBaskets } from './dom.js'

function loadInitialPageContent() {
    const contentArea = document.querySelector('.content');
    const navArea = document.querySelector('#basket-filters');
    createBasketNavLinks(basketsLibrary, navArea);
    filterAllBaskets(basketsLibrary, contentArea);
}

loadInitialPageContent();