import { et } from 'date-fns/locale';
import { renderBasketToNav, renderTaskToBasket, toggleSelectedLink, toggleTaskDescription, toggleTaskCompleted, removeBasketFromDOM, removeTaskFromDOM, filterAllBaskets, filterBasketsDue, filterSelectedBasket } from './dom.js';
import { Basket, Task, basketsLibrary, addBasketToLibrary, removeBasketFromLibrary, removeTaskFromLibrary } from './logic.js';

var prevTarget = 'All Tasks';

var currentBasket;

//////////////////////////////////////EVENT LISTENERS//////////////////////////////////////
const mainNavLinks = document.querySelectorAll('.main-nav-link');
mainNavLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
});

const addBasketBtn = document.querySelector('#add-basket-btn');
addBasketBtn.addEventListener('click', addNewBasket);
const cancelBasketBtn = document.querySelector('#cancel-basket-btn');
cancelBasketBtn.addEventListener('click', cancelBasket);
const addTaskSubmitBtn = document.querySelector('#add-task-btn');
addTaskSubmitBtn.addEventListener('click', addNewTask);
const cancelTaskBtn = document.querySelector('#cancel-task-btn');
cancelTaskBtn.addEventListener('click', cancelTask);

const addBasketLink = document.querySelector('#add-basket-link');
addBasketLink.addEventListener('click', revealAddBasketForm);
export function addEventListenerToAddTaskLink(element) {
    element.addEventListener('click', revealAddTaskForm);
}

function revealAddBasketForm() {
    document.querySelector('#new-basket-form').classList.remove('hidden');
    document.querySelector('.forms').classList.remove('hidden');
}

function revealAddTaskForm(e) {
    document.querySelector('#new-task-form').classList.remove('hidden');
    document.querySelector('.forms').classList.remove('hidden');
    currentBasket = e.target.closest('.basket');
}

function addNewBasket(e) {
    e.preventDefault();
    console.log('add new basket');
    let newBasketName = document.querySelector('#basket-name').value;
    console.log(newBasketName);
    let newBasket = new Basket(newBasketName);
    addBasketToLibrary(newBasket);
    renderBasketToNav(newBasket.basketName, document.querySelector('#basket-filters'));
    hideBasketForm();
    emptyBasketForm();
}

function addNewTask(e) {
    e.preventDefault();

    let newTaskName = document.querySelector('#task-name').value;
    let newTaskDescription = document.querySelector('#description').value;
    let newTaskDueDate = document.querySelector('#due-date').value;
    let newTaskPriority = document.querySelector('#priority').value;

    let newTask = new Task(newTaskName, newTaskDescription, newTaskDueDate, newTaskPriority);

    renderTaskToBasket(newTask, currentBasket);
    hideTaskForm();
    emptyTaskForm();
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

//////////////////////////////////////EVENT HANDLERS//////////////////////////////////////

function handleNavClick(e) {
    console.log('handleNavClick', e);
    toggleSelectedLink(e.currentTarget);
    const contentArea = document.querySelector('.content');
    handleContentDisplay(basketsLibrary, e.currentTarget.innerText, contentArea);
    prevTarget = e.currentTarget.innerText;
}

export function handleBasketFilterClick(e) {
    console.log('handleBasketFilterClick', e);
    if (isClickOnXMark(e.target)) {
        console.log('xmark current target', e.currentTarget);
        handleContentRemoval(basketsLibrary, e.currentTarget);
    } else
    if (e.currentTarget.classList.contains('nav-link')) {
        handleNavClick(e);
    }
}

export function handleTaskClick(e) {
    console.log('handleTaskClick', e);
    if (isClickOnXMark(e.target)) {
        console.log('xmark current target', e.currentTarget);
        handleContentRemoval(basketsLibrary, e.currentTarget);
    } else if (e.target.classList.contains('fa-pen-to-square')) {
        revealAddTaskForm(e);
        // editTask(e.currentTarget);
    } else if (e.target.classList.contains('fa-square') || e.target.classList.contains('fa-square-check')) {
        console.log('toggleTaskCompleted', e.currentTarget);
        toggleTaskCompleted(e.currentTarget);
    } else {
        toggleTaskDescription(e.currentTarget);
    }
}

function isClickOnXMark(target) {
    console.log('isClickOnXMark', target);
    return target.classList.contains('fa-xmark');
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
        let basketIndex = library.indexOf(library.find((basket) => {
            if (basket.basketName === currentTarget.innerText) {
                return basket;
            }
        }));
        removeBasketOnClick(currentTarget, basketIndex);
    }

    if (currentTarget.className === 'task') {
        let taskIndex = getTaskIndex(library, currentTarget);
        removeTaskOnClick(currentTarget, currentTarget.closest('.basket').querySelector('.basket-name').innerText, taskIndex);
    }
}

function getTaskIndex(library, currentTarget) {
    let taskIndex = library.find((basket) => basket.basketName === currentTarget.closest('.basket').querySelector('.basket-name').innerText);
    taskIndex = taskIndex.tasks.indexOf(taskIndex.tasks.find((task) => {
        if (task.taskName === currentTarget.querySelector('.task-title-wrapper').innerText) {
            return task;
        }
    }));
    return taskIndex;
}

function editTask(targetTask, basketName) {
    console.log(targetTask);
    let taskName = document.querySelector('#task-name').value;
    let taskDescription = document.querySelector('#description').value;
    let taskDueDate = document.querySelector('#due-date').value;
    let taskPriority = document.querySelector('#priority').value;
    editTaskInDOM();
    editTaskInLibrary(getTaskIndex(library, targetTask));
}

function removeBasketOnClick(targetBasket, index) {
    removeBasketFromDOM(targetBasket);
    removeBasketFromLibrary(index);
}

function removeTaskOnClick(targetTask, basketOfTask, index) {
    removeTaskFromDOM(targetTask);
    removeTaskFromLibrary(basketOfTask, index);
}