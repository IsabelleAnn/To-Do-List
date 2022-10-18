import { basketsLibrary } from './logic.js';
import { filterAllBaskets, createBasketNavLinks } from './logic.js';

const contentArea = document.querySelector('.content');
const navArea = document.querySelector('#basket-filters');
const allTasksBtn = document.querySelector('#filter-all');
const tasksDueTodayBtn = document.querySelector('#filter-today');
const tasksDueThisWeekBtn = document.querySelector('#filter-week');

createBasketNavLinks(basketsLibrary, navArea);
filterAllBaskets(basketsLibrary, contentArea);

export { contentArea, navArea, allTasksBtn, tasksDueTodayBtn, tasksDueThisWeekBtn }