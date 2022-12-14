import { renderBasketToNav, renderTaskToBasket, editTaskInDOM, toggleSelectedLink, toggleTaskDescription, toggleTaskCompleted, removeBasketFromDOM, removeTaskFromDOM, filterAllBaskets, filterBasketsDue, filterSelectedBasket } from './dom.js';
import { Basket, Task, basketsLibrary, addBasketToLibrary, removeBasketFromLibrary, removeTaskFromLibrary, addTaskToLibrary, editTaskInLibrary } from './logic.js';

var prevTarget = 'All Tasks';

var currentBasketElement;
var currentTaskElement;

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

const editTaskSubmitBtn = document.querySelector('#edit-task-btn');
editTaskSubmitBtn.addEventListener('click', editTask);
const cancelTaskBtn = document.querySelector('#cancel-task-btn');
cancelTaskBtn.addEventListener('click', cancelTask);
const cancelEditTaskBtn = document.querySelector('#edit-cancel-task-btn');
cancelEditTaskBtn.addEventListener('click', cancelEditTask);

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
    currentBasketElement = e.target.closest('.basket');
}

function revealEditTaskForm(e) {
    document.querySelector('#edit-task-form').classList.remove('hidden');
    document.querySelector('.forms').classList.remove('hidden');
    currentBasketElement = e.target.closest('.basket');
    currentTaskElement = e.target.closest('.task');
    displayTaskValuesOnForm(e.currentTarget, currentBasketElement);
}

function addNewBasket(e) {
    e.preventDefault();
    let newBasketName = document.querySelector('#basket-name').value;
    if (newBasketName.trim() !== '') {
        let newBasket = new Basket(newBasketName);
        addBasketToLibrary(newBasket);
        renderBasketToNav(newBasket.basketName, document.querySelector('#basket-filters'));
        const contentArea = document.querySelector('.content');
        handleContentDisplay(basketsLibrary, newBasketName, contentArea);
        let filters = document.querySelectorAll('.basket-filter-wrapper');
        let addedFilter = Array.from(filters).find((filter) => filter.querySelector('.filter-basket').innerText == newBasketName);
        toggleSelectedLink(addedFilter);
        hideBasketForm();
        emptyBasketForm();
    } else {
        document.querySelector('#basket-name').style.border = '2px solid #f54899';
    }
}

function validateNameInput(string) {
    if (string.trim() !== '') {
        return true;
    } else {
        return false;
    }
}

function addNewTask(e) {
    e.preventDefault();
    let newTaskName = document.querySelector('#task-name').value;
    if (validateNameInput(newTaskName)) {
        let newTaskDescription = document.querySelector('#description').value;
        let newTaskDueDate = document.querySelector('#due-date').value;
        let newTaskPriority = document.querySelector('#priority').value;
        let newTask = new Task(newTaskName, newTaskDescription, newTaskDueDate, newTaskPriority);
        renderTaskToBasket(newTask, currentBasketElement);
        addTaskToLibrary(newTask, currentBasketElement.querySelector('.basket-name').innerText);
        hideTaskForm();
        emptyTaskForm();
    } else {
        document.querySelector('#task-name').style.border = '2px solid #f54899';
    }
}

function editTask(e) {
    e.preventDefault();
    let editedTaskName = document.querySelector('#task-name-edit').value;
    if (validateNameInput(editedTaskName)) {
        let taskIndex = getTaskIndex(currentTaskElement);
        let prevPriorityClassName = currentTaskElement.querySelector('.fa-circle-exclamation').classList[3];
        let editedTaskDescription = document.querySelector('#description-edit').value;
        let editedTaskDueDate = document.querySelector('#due-date-edit').value;
        let editedTaskPriority = document.querySelector('#priority-edit').value;
        let editedTask = new Task(editedTaskName, editedTaskDescription, editedTaskDueDate, editedTaskPriority);
        emptyEditTaskForm();
        hideEditTaskForm();
        editTaskInDOM(editedTask, currentTaskElement, prevPriorityClassName);
        editTaskInLibrary(editedTask, currentBasketElement.querySelector('.basket-name').innerText, taskIndex);
    } else {
        document.querySelector('#task-name-edit').style.border = '2px solid #f54899';
    }
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

function cancelEditTask(e) {
    e.preventDefault();
    hideEditTaskForm();
    emptyEditTaskForm();
}

function hideBasketForm() {
    document.querySelector('#new-basket-form').classList.add('hidden');
    document.querySelector('.forms').classList.add('hidden');
}

function hideTaskForm() {
    document.querySelector('#new-task-form').classList.add('hidden');
    document.querySelector('.forms').classList.add('hidden');
}

function hideEditTaskForm() {
    document.querySelector('#edit-task-form').classList.add('hidden');
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

function emptyEditTaskForm() {
    document.querySelector('#task-name-edit').value = '';
    document.querySelector('#description-edit').value = '';
    document.querySelector('#due-date-edit').value = '';
    document.querySelector('#priority-edit').value = 'none';
}

//////////////////////////////////////EVENT HANDLERS//////////////////////////////////////

function handleNavClick(e) {
    toggleSelectedLink(e.currentTarget);
    const contentArea = document.querySelector('.content');
    handleContentDisplay(basketsLibrary, e.currentTarget.innerText, contentArea);
    prevTarget = e.currentTarget.innerText;
}

export function handleBasketFilterClick(e) {
    if (isClickOnXMark(e.target)) {
        handleContentRemoval(basketsLibrary, e.currentTarget);
    } else
    if (e.currentTarget.classList.contains('nav-link')) {
        handleNavClick(e);
    }
}

export function handleTaskClick(e) {
    if (isClickOnXMark(e.target)) {
        handleContentRemoval(basketsLibrary, e.currentTarget);
    } else if (e.target.classList.contains('fa-pen-to-square')) {
        revealEditTaskForm(e);
    } else if (e.target.classList.contains('fa-square') || e.target.classList.contains('fa-square-check')) {
        currentBasketElement = e.target.closest('.basket');
        toggleTaskCompleted(currentBasketElement, e.currentTarget, getTaskIndex(e.currentTarget));
    } else {
        toggleTaskDescription(e.currentTarget);
    }
}

function isClickOnXMark(target) {
    return target.classList.contains('fa-xmark');
}

function handleContentDisplay(basketsLibrary, currentTarget, contentContainer) {
    if (prevTarget !== currentTarget) {
        contentContainer.textContent = '';
        if (currentTarget === 'All Tasks') {
            filterAllBaskets(basketsLibrary, contentContainer);
            return;
        }
        if (currentTarget === 'Today' || currentTarget === 'This Week') {
            filterBasketsDue(basketsLibrary, currentTarget, contentContainer);
            return;
        }
        filterSelectedBasket(basketsLibrary, currentTarget, contentContainer);
    }
}

function handleContentRemoval(basketsLibrary, currentTarget) {
    if (currentTarget.classList.contains('nav-link')) {
        let basketIndex = basketsLibrary.indexOf(basketsLibrary.find((basket) => {
            if (basket.basketName === currentTarget.innerText) {
                return basket;
            }
        }));
        removeBasketOnClick(currentTarget, basketIndex);
    }
    if (currentTarget.className === 'task') {
        let taskIndex = getTaskIndex(currentTarget);
        removeTaskOnClick(currentTarget, currentTarget.closest('.basket').querySelector('.basket-name').innerText, taskIndex);
    }
}

function getTaskIndex(currentTarget) {
    let basketObject = basketsLibrary.find((basket) => basket.basketName === currentTarget.closest('.basket').querySelector('.basket-name').innerText);
    let taskIndex = basketObject.tasks.indexOf(basketObject.tasks.find((task) => {
        if (task.taskName === currentTarget.querySelector('.task-title-wrapper').innerText) {
            return task;
        }
    }));
    return taskIndex;
}

function getTaskValues(targetTask, currentBasketElement) {
    let currentTaskIndex = getTaskIndex(targetTask);
    let targetBasketName = currentBasketElement.closest('.basket').querySelector('.basket-name').innerText;
    let basketObject = basketsLibrary.find(basket => basket.basketName === targetBasketName);
    let currentTaskName = basketObject.tasks[currentTaskIndex].taskName;
    let currentTaskDescription = basketObject.tasks[currentTaskIndex].description;
    let currentTaskDueDate = basketObject.tasks[currentTaskIndex].dueDate;
    let currentTaskPriority = basketObject.tasks[currentTaskIndex].priority;

    return { currentTaskName, currentTaskDescription, currentTaskDueDate, currentTaskPriority };
}

function displayTaskValuesOnForm(targetTask, currentBasketElement) {
    document.querySelector('#task-name-edit').value = getTaskValues(targetTask, currentBasketElement).currentTaskName;
    document.querySelector('#description-edit').value = getTaskValues(targetTask, currentBasketElement).currentTaskDescription;
    document.querySelector('#due-date-edit').value = getTaskValues(targetTask, currentBasketElement).currentTaskDueDate;
    document.querySelector('#priority-edit').value = getTaskValues(targetTask, currentBasketElement).currentTaskPriority;
}

function removeBasketOnClick(targetBasket, index) {
    removeBasketFromDOM(targetBasket);
    removeBasketFromLibrary(index);
}

function removeTaskOnClick(targetTask, basketOfTask, index) {
    removeTaskFromDOM(targetTask);
    removeTaskFromLibrary(basketOfTask, index);
}