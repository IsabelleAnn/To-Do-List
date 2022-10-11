import { et } from 'date-fns/locale';
import { displayAllBaskets, displayBasketsDue, displaySelectedBasket, removeBasketFromDOM } from './dom.js';
import { contentArea } from './index.js';
import { basketsLibrary } from './logic.js';

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', navigateBaskets);
});
let current = 'All Tasks';

function navigateBaskets(e) {
    if (e.target.className === 'fa-solid fa-xmark icons') {
        let index = basketsLibrary.indexOf(basketsLibrary.find((basket, index) => {
            if (basket.basketName === e.currentTarget.innerText) {
                return basket;
            }
        }));
        removeBasketFromDOM(e.currentTarget, index);
    } else {
        handleClick(basketsLibrary, e.currentTarget.innerText, contentArea);
        current = e.currentTarget.innerText;
    }
}

function handleClick(library, filter, wrapper) {
    if (current !== filter) {
        contentArea.textContent = '';
        if (filter === 'All Tasks') {
            displayAllBaskets(library, wrapper);
            return;
        }
        if (filter === 'Today' || filter === 'This Week') {
            displayBasketsDue(library, filter, wrapper);
            return;
        }
        displaySelectedBasket(library, filter, wrapper);
    }
}

export { navigateBaskets }