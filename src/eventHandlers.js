import { et } from 'date-fns/locale';
import { renderBasketToNav, toggleSelectedLink, toggleTaskDescription, toggleTaskCompleted, removeBasket, removeTask, renderTaskToBasket } from './dom.js';
import { contentArea } from './index.js';
import { addTaskToBasket, Basket, Task, basketsLibrary, createNewBasket, filterAllBaskets, filterBasketsDue, filterSelectedBasket } from './logic.js';

var prevTarget = 'All Tasks';
var basketIndex;
var taskIndex;
var currentBasket;
let newBasketName;
let newTaskName;
let newTaskDescription;
let newTaskDueDate;
let newTaskPriority;

const mainNavLinks = document.querySelectorAll('.main-nav-link');
mainNavLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
});
const addBasketLink = document.querySelector('#add-basket-link');
addBasketLink.addEventListener('click', revealBasketForm);
const addBasketBtn = document.querySelector('#add-basket-btn');
addBasketBtn.addEventListener('click', addNewBasket);
const cancelBasketBtn = document.querySelector('#cancel-basket-btn');
cancelBasketBtn.addEventListener('click', cancelBasket);
const addTaskBtn = document.querySelector('#add-task-btn');
addTaskBtn.addEventListener('click', addNewTask);
const cancelTaskBtn = document.querySelector('#cancel-task-btn');
cancelTaskBtn.addEventListener('click', cancelTask);

export function addEventListenerToAddTaskLink(element) {
    element.addEventListener('click', addTaskLinkClick);
}
//////////////////////////////MOVE TO DOM//////////////////////////////

function revealBasketForm() {
    document.querySelector('#new-basket-form').classList.remove('hidden');
    document.querySelector('.forms').classList.remove('hidden');
}

function revealTaskForm() {
    document.querySelector('#new-task-form').classList.remove('hidden');
    document.querySelector('.forms').classList.remove('hidden');
}

function hideBasketForm() {
    document.querySelector('#new-basket-form').classList.add('hidden');
    document.querySelector('.forms').classList.add('hidden');
}

function hideTaskForm() {
    document.querySelector('#new-task-form').classList.add('hidden');
    document.querySelector('.forms').classList.add('hidden');
}

function emptyBasketForm() {
    document.querySelector('#basket-name').value = '';
}

function emptyTaskForm() {
    document.querySelector('#task-name').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#due-date').value = '';
    document.querySelector('#priority').value = 'none';
}

function addTaskLinkClick(e) {
    revealTaskForm();
    currentBasket = e.target.closest('.basket');
}

function cancelBasket(e) {
    e.preventDefault();
    hideBasketForm();
    emptyBasketForm();
}

function cancelTask(e) {
    e.preventDefault();
    hideTaskForm();
    emptyTaskForm();
}

function addNewBasket(e) {
    e.preventDefault();
    console.log('add new basket');
    newBasketName = document.querySelector('#basket-name').value;
    console.log(newBasketName);
    let newBasket = new Basket(newBasketName);
    createNewBasket(newBasket);
    renderBasketToNav(newBasket.basketName, document.querySelector('#basket-filters'));
    hideBasketForm();
    emptyBasketForm();
}

function addNewTask(e) {
    e.preventDefault();

    newTaskName = document.querySelector('#task-name').value;
    newTaskDescription = document.querySelector('#description').value;
    newTaskDueDate = document.querySelector('#due-date').value;
    newTaskPriority = document.querySelector('#priority').value;

    let newTask = new Task(newTaskName, newTaskDescription, newTaskDueDate, newTaskPriority);

    renderTaskToBasket(newTask, currentBasket);
    hideTaskForm();
    emptyTaskForm();
}

//////////////////////////////Content+Navigation Handlers//////////////////////////////

function handleNavClick(e) {
    console.log('handleNavClick', e);
    toggleSelectedLink(e.currentTarget);
    handleContentDisplay(basketsLibrary, e.currentTarget.innerText, contentArea);
    prevTarget = e.currentTarget.innerText;

}

function isClickOnXMark(className) {
    console.log('isClickOnXMark', className);

    return (className === 'fa-solid fa-xmark icon');

}

function handleBasketFilterClick(e) {
    console.log('handleBasketFilterClick', e);
    if (isClickOnXMark(e.target.className)) {
        console.log('xmark current target', e.currentTarget);
        handleContentRemoval(basketsLibrary, e.currentTarget);
    } else
    if (e.currentTarget.classList.contains('nav-link')) {
        handleNavClick(e);
    }
}

function handleTaskClick(e) {
    console.log('handleTaskClick', e);
    if (isClickOnXMark(e.target.className)) {
        console.log('xmark current target', e.currentTarget);
        handleContentRemoval(basketsLibrary, e.currentTarget);
    } else if (e.target.classList.contains('fa-square') || e.target.classList.contains('fa-square-check')) {
        console.log('toggleTaskCompleted', e.currentTarget);
        toggleTaskCompleted(e.currentTarget);
    } else {
        console.log('task targeted');
        console.log('open task details window');
        toggleTaskDescription(e.currentTarget);
    }

}

function handleContentDisplay(library, currentTarget, contentContainer) {
    console.log('handleContentDisplay', library, currentTarget, contentContainer);
    if (prevTarget !== currentTarget) {
        contentContainer.textContent = '';
        if (currentTarget === 'All Tasks') {
            filterAllBaskets(library, contentContainer);
            return;
        }
        if (currentTarget === 'Today' || currentTarget === 'This Week') {
            filterBasketsDue(library, currentTarget, contentContainer);
            return;
        }
        filterSelectedBasket(library, currentTarget, contentContainer);
    }

}

function handleContentRemoval(library, currentTarget) {
    console.log('handleContentRemoval', library, currentTarget);
    if (currentTarget.classList.contains('nav-link')) {
        basketIndex = library.indexOf(library.find((basket) => {
            if (basket.basketName === currentTarget.innerText) {
                return basket;
            }
        }));
        removeBasket(currentTarget, basketIndex);
    }

    if (currentTarget.className === 'task') {

        taskIndex = library.find((basket) => basket.basketName === currentTarget.closest('.basket').querySelector('.basket-name').innerText);
        taskIndex = taskIndex.tasks.indexOf(taskIndex.tasks.find((task) => {
            if (task.taskName === currentTarget.querySelector('.task-title-wrapper').innerText) {
                return task;
            }
        }));
        removeTask(currentTarget, currentTarget.closest('.basket').querySelector('.basket-name').innerText, taskIndex);
    }
}

export { addTaskLinkClick, handleBasketFilterClick, handleTaskClick }