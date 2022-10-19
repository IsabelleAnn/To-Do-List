import { handleBasketFilterClick, handleTaskClick, addEventListenerToAddTaskLink } from './eventHandlers.js';
import { removeBasketFromLibrary, removeTaskFromLibrary } from './logic.js';

var baskets;
var basketToDelete;

function renderBasketToNav(basketName, navWrapper) {
    const basketFilterWrapper = document.createElement('li');
    basketFilterWrapper.classList.add('basket-filter-wrapper', 'nav-link');
    basketFilterWrapper.addEventListener('click', handleBasketFilterClick);
    const filterBasketName = document.createElement('h3');
    filterBasketName.classList.add('filter-basket');
    filterBasketName.textContent = basketName;

    navWrapper.appendChild(basketFilterWrapper);
    basketFilterWrapper.appendChild(createBasketIcon());
    basketFilterWrapper.appendChild(filterBasketName);
    basketFilterWrapper.appendChild(createXMarkIcon());
}

function renderTaskToBasket(currentTask, currentBasket) {
    const taskWrapper = document.createElement('div');
    taskWrapper.classList.add('task');
    currentBasket.appendChild(taskWrapper);
    taskWrapper.addEventListener('click', handleTaskClick);
    const taskDetails = document.createElement('div');
    taskDetails.classList.add('task-details');
    taskWrapper.appendChild(taskDetails);
    const taskTitleWrapper = document.createElement('div');
    taskTitleWrapper.classList.add('task-title-wrapper');
    taskDetails.appendChild(taskTitleWrapper);
    const uncheckedBoxIcon = document.createElement('i');
    uncheckedBoxIcon.classList.add('fa-regular', 'fa-square', 'icon');
    const checkedBoxIcon = document.createElement('i');
    checkedBoxIcon.classList.add('fa-regular', 'fa-square-check', 'icon', 'hidden');
    const taskTitle = document.createElement('h4');
    taskTitle.textContent = currentTask.taskName;
    taskTitleWrapper.appendChild(uncheckedBoxIcon);
    taskTitleWrapper.appendChild(checkedBoxIcon);
    taskTitleWrapper.appendChild(taskTitle);

    const taskStatusWrapper = document.createElement('div');
    taskStatusWrapper.classList.add('task-status-wrapper');
    taskDetails.appendChild(taskStatusWrapper);
    const dueDate = document.createElement('p');
    dueDate.textContent = currentTask.dueDate;
    // dueDate.classList.add('hidden');
    const priorityIcon = document.createElement('i');
    priorityIcon.classList.add('fa-solid', 'fa-circle-exclamation', 'icon');

    switch (currentTask.priority) {
        case 'high':
            priorityIcon.classList.add('high-priority');
            break;
        case 'medium':
            priorityIcon.classList.add('medium-priority');
            break;
        case 'low':
            priorityIcon.classList.add('low-priority');
            break;
        default:
            priorityIcon.classList.add('no-priority');
            break;
    }

    taskStatusWrapper.appendChild(dueDate);
    taskStatusWrapper.appendChild(priorityIcon);
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-regular', 'fa-pen-to-square', 'icon');
    taskStatusWrapper.appendChild(editIcon);
    taskStatusWrapper.appendChild(createXMarkIcon());

    const taskDescription = document.createElement('p');
    taskDescription.classList.add('task-description', 'hidden');
    taskDescription.textContent = currentTask.description;
    taskWrapper.appendChild(taskDescription);

}

function renderBasket(currentBasket, container) {
    const basketWrapper = document.createElement('div');
    basketWrapper.classList.add('basket');
    const basketHeader = document.createElement('div');
    basketHeader.classList.add('basket-header');
    const tasksInBasket = document.createElement('div');
    tasksInBasket.classList.add('tasks-in-basket');

    container.appendChild(basketWrapper);
    basketWrapper.appendChild(basketHeader);
    basketWrapper.appendChild(tasksInBasket);

    const basketNameWrapper = document.createElement('div');
    basketNameWrapper.classList.add('basket-name-wrapper');

    basketHeader.appendChild(basketNameWrapper);
    basketHeader.appendChild(createAddTaskLink('task'));

    const basketName = document.createElement('h2');
    basketName.classList.add('basket-name');
    basketName.textContent = currentBasket.basketName;
    basketNameWrapper.appendChild(createBasketIcon());
    basketNameWrapper.appendChild(basketName);

    return tasksInBasket;
}

function createXMarkIcon() {
    const xMarkIcon = document.createElement('i');
    xMarkIcon.classList.add('fa-solid', 'fa-xmark', 'icon');

    return xMarkIcon;
}

function createBasketIcon() {
    const basketIcon = document.createElement('i');
    basketIcon.classList.add('fa-sharp', 'fa-solid', 'fa-basket-shopping', 'icon');

    return basketIcon;
}

function createAddTaskLink(adderName) {
    const adderWrapper = document.createElement('div');
    adderWrapper.classList.add(`add-${adderName}-wrapper`);
    const adder = document.createElement('p');
    adder.classList.add(`add-${adderName}`);
    const plusIcon = document.createElement('i');
    plusIcon.classList.add('fa-solid', 'fa-plus', 'icon');
    const span = document.createElement('span');
    addEventListenerToAddTaskLink(adderWrapper);
    adderWrapper.appendChild(adder);
    adder.appendChild(plusIcon);
    adder.appendChild(span);
    span.textContent = ` Add ${adderName.charAt(0).toUpperCase()+adderName.slice(1)}`;

    return adderWrapper;
}

function toggleTaskCompleted(targetTask) {
    targetTask.querySelector('h4').classList.toggle('task-checked');

    if (targetTask.querySelector('.fa-square-check').classList.contains('hidden')) {
        targetTask.querySelector('.fa-square-check').classList.remove('hidden');
        targetTask.querySelector('.fa-square').classList.add('hidden');
    } else {
        targetTask.querySelector('.fa-square-check').classList.add('hidden');
        targetTask.querySelector('.fa-square').classList.remove('hidden');
    }
}

function toggleTaskDescription(targetTask) {
    console.log(targetTask);
    if (targetTask.querySelector('.task-description').classList.contains('hidden')) {
        targetTask.querySelector('.task-description').classList.remove('hidden');
    } else {
        targetTask.querySelector('.task-description').classList.add('hidden');
    }

}

function toggleSelectedLink(targetLink) {
    if (document.querySelector('.selected')) {
        document.querySelector('.selected').classList.remove('selected');
    }
    targetLink.classList.add('selected');
}

function removeBasket(targetBasket, index) {
    console.log('removeBasket', targetBasket, index);
    baskets = Array.from(document.querySelectorAll('.basket'));
    basketToDelete = baskets.find((parent) => {
        if (parent.querySelector('.basket-name').textContent === targetBasket.innerText) {
            return parent;
        }
    });
    if (basketToDelete !== undefined) {
        basketToDelete.remove();
    }
    removeBasketFromLibrary(index);
    console.log('removeBasketFromLibrary', index);
    targetBasket.remove();
}

function removeTask(targetTask, basketOfTask, index) {
    removeTaskFromLibrary(basketOfTask, index);
    targetTask.remove();
}





export { renderBasketToNav, renderBasket, renderTaskToBasket, toggleSelectedLink, toggleTaskDescription, toggleTaskCompleted, removeBasket, removeTask }