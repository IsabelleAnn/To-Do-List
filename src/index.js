import { basketsLibrary } from './logic.js';
import { displayAllBaskets, displayBasketsDue, displaySelectedBasket } from './dom.js';
import { allTasksClickHandler, selectedBasketTasksClickHandler, thisWeekTasksClickHandler, todayTasksClickHandler } from './eventHandlers.js';

const contentArea = document.querySelector('.content');
const allTasksBtn = document.querySelector('#filter-all');
const tasksDueTodayBtn = document.querySelector('#filter-today');
const tasksDueThisWeekBtn = document.querySelector('#filter-week');

const basketLinks = document.querySelectorAll('.navLink');



// allTasksBtn.addEventListener('click', allTasksClickHandler);
// tasksDueTodayBtn.addEventListener('click', todayTasksClickHandler);
// tasksDueThisWeekBtn.addEventListener('click', thisWeekTasksClickHandler);




// let selectedB = 'Kit Socks';


// displayAllBaskets(basketsLibrary, contentArea);
// displayBasketsDue(basketsLibrary, 'TODAY', contentArea);
// displayBasketsDue(basketsLibrary, 'THIS WEEK', contentArea);
// displaySelectedBasket(basketsLibrary, selectedB, contentArea);
export { contentArea, allTasksBtn, tasksDueTodayBtn, tasksDueThisWeekBtn }