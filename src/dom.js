import { contentArea } from ".";

function displayAllBaskets(library, wrapper) {
    library.forEach((basket) => {
        let renderedBasket = renderBasket(basket, wrapper);
        basket.tasks.forEach((task) => {
            renderTask(task, renderedBasket);
        });
    });
}

function displayBasketsDue(library, date, wrapper) {
    let filteredBaskets = library.map((basket) => {
        return {...basket, tasks: basket.tasks.filter((task) => task.dueDate === date) }
    });
    displayAllBaskets(filteredBaskets, wrapper);
}

function displaySelectedBasket(library, selectedBasket, wrapper) {
    let basket = library.find(b => b.basketName == selectedBasket);
    let renderedBasket = renderBasket(basket, wrapper);
    basket.tasks.forEach((task) => {
        renderTask(task, renderedBasket);
    });
}

function renderTask(currentTask, currentBasket) {
    const taskWrapper = document.createElement('div');
    taskWrapper.classList.add('task');
    currentBasket.appendChild(taskWrapper);
    const taskDetails = document.createElement('div');
    taskDetails.classList.add('task-details');
    taskWrapper.appendChild(taskDetails);
    const taskTitleWrapper = document.createElement('div');
    taskTitleWrapper.classList.add('task-title-wrapper');
    taskDetails.appendChild(taskTitleWrapper);
    const uncheckedBoxIcon = document.createElement('i');
    uncheckedBoxIcon.classList.add('fa-regular', 'fa-square', 'icons');
    const checkedBoxIcon = document.createElement('i');
    checkedBoxIcon.classList.add('fa-regular', 'fa-square-check', 'icons', 'hidden');
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
    const priorityIcon = document.createElement('i');
    priorityIcon.classList.add('fa-solid', 'fa-circle-exclamation', 'icons');
    const xMarkIcon = document.createElement('i');
    xMarkIcon.classList.add('fa-solid', 'fa-xmark', 'icons');

    taskStatusWrapper.appendChild(dueDate);
    taskStatusWrapper.appendChild(priorityIcon);
    taskStatusWrapper.appendChild(xMarkIcon);

    const taskDescription = document.createElement('p');
    taskDescription.classList.add('task-description');
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
    const addTaskWrapper = document.createElement('div');
    addTaskWrapper.classList.add('add-task-wrapper');
    basketHeader.appendChild(basketNameWrapper);
    basketHeader.appendChild(addTaskWrapper);

    const checkListIcon = document.createElement('i');
    checkListIcon.classList.add('fa-sharp', 'fa-solid', 'fa-basket-shopping', 'icons');
    const basketName = document.createElement('h2');
    basketName.classList.add('basket-name');
    basketName.textContent = currentBasket.basketName;
    basketNameWrapper.appendChild(checkListIcon);
    basketNameWrapper.appendChild(basketName);

    const addTask = document.createElement('p');
    addTask.classList.add('add-task');
    const plusIcon = document.createElement('i');
    plusIcon.classList.add('fa-solid', 'fa-plus', 'icons');
    const span = document.createElement('span');
    addTaskWrapper.appendChild(addTask);
    addTask.appendChild(plusIcon);
    addTask.appendChild(span);
    span.textContent = ' Add Task';

    return tasksInBasket;
}

export { displayAllBaskets, displayBasketsDue, displaySelectedBasket }