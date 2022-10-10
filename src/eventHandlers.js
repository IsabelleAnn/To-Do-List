import { displayAllBaskets, displayBasketsDue, displaySelectedBasket } from './dom.js';
import { contentArea, allTasksBtn, tasksDueTodayBtn, tasksDueThisWeekBtn } from './index.js';
import { basketsLibrary } from './logic.js';

const navLinks = document.querySelectorAll('.navLink');
let current = 'All Tasks';

navLinks.forEach(link => {
    link.addEventListener('click', onClick);
});

function onClick(e) {
    handleClick(basketsLibrary, e.target.innerText, contentArea);
    current = e.target.innerText;
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