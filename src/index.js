import { basketsLibrary } from './logic.js';
import { displayAllBaskets, displayBasketNavLinks } from './dom.js';

const contentArea = document.querySelector('.content');
const navArea = document.querySelector('#basket-filters');
const allTasksBtn = document.querySelector('#filter-all');
const tasksDueTodayBtn = document.querySelector('#filter-today');
const tasksDueThisWeekBtn = document.querySelector('#filter-week');

displayBasketNavLinks(basketsLibrary, navArea);
displayAllBaskets(basketsLibrary, contentArea);

export { contentArea, navArea, allTasksBtn, tasksDueTodayBtn, tasksDueThisWeekBtn }