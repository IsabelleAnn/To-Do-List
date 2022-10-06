import { displayAllBaskets, displayBasketsDue, displaySelectedBasket } from './dom.js';
import { contentArea, allTasksBtn, tasksDueTodayBtn, tasksDueThisWeekBtn } from './index.js';
import { basketsLibrary } from './logic.js';

// #filter-all #filter-today #filter-week #filter-basket(textContent)
const navLinks = document.querySelectorAll('.navLink');
navLinks.forEach(link => {
    // console.log(link.innerText);
    link.addEventListener('click', onClick);
})

// allTasksBtn.addEventListener('click', allTasksClickHandler);
// tasksDueTodayBtn.addEventListener('click', todayTasksClickHandler);
// tasksDueThisWeekBtn.addEventListener('click', thisWeekTasksClickHandler);

function onClick(e) {
    handleClick(basketsLibrary, e.target.innerText, contentArea);
}

function handleClick(library, filter, wrapper) {
    contentArea.textContent = '';
    if (filter === 'All Tasks') {
        displayAllBaskets(library, wrapper);
        return;
    }
    if (filter === 'Today') {
        displayBasketsDue(library, 'Today', wrapper);
        return;
    }
    if (filter === 'This Week') {
        displayBasketsDue(library, 'This Week', wrapper);
        return;
    }
    displaySelectedBasket(library, 'Knit Socks', wrapper);
}



// function allTasksClickHandler() {
//     contentArea.textContent = '';
//     displayAllBaskets(basketsLibrary, contentArea);
// }

// function todayTasksClickHandler() {
//     contentArea.textContent = '';
//     displayBasketsDue(basketsLibrary, 'TODAY', contentArea);
// }

// function thisWeekTasksClickHandler() {
//     contentArea.textContent = '';
//     displayBasketsDue(basketsLibrary, 'THIS WEEK', contentArea);
// }


// function selectedBasketTasksClickHandler() {
//     contentArea.textContent = '';
//     displaySelectedBasket(basketsLibrary, basketName, contentArea);
// }

// export { allTasksClickHandler, todayTasksClickHandler, thisWeekTasksClickHandler, selectedBasketTasksClickHandler }