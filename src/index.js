import { basketsLibrary } from './logic.js';
import { displayAllBaskets, displayBasketsDue, displaySelectedBasket } from './dom.js';
import { allTasksClickHandler, selectedBasketTasksClickHandler, thisWeekTasksClickHandler, todayTasksClickHandler } from './eventHandlers.js';

const contentArea = document.querySelector('.content');
const allTasksBtn = document.querySelector('#filter-all');
const tasksDueTodayBtn = document.querySelector('#filter-today');
const tasksDueThisWeekBtn = document.querySelector('#filter-week');

const basketLinks = document.querySelectorAll('.navLink');

displayAllBaskets(basketsLibrary, contentArea);
export { contentArea, allTasksBtn, tasksDueTodayBtn, tasksDueThisWeekBtn }