import { et } from 'date-fns/locale';
import { displayAllBaskets, displayBasketsDue, displaySelectedBasket, toggleSelectedLink, toggleTaskDetails, toggleTaskCompleted, removeBasket, removeTask } from './dom.js';
import { contentArea } from './index.js';
import { basketsLibrary } from './logic.js';

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', handleClick);
});
var prevTarget = 'All Tasks';
var basketIndex;
var taskIndex;

function handleClick(e) {
    console.log(e.currentTarget.className);
    if (e.target.className === 'fa-solid fa-xmark icons') {
        handleContentRemoval(basketsLibrary, e.currentTarget);
    } else if (e.currentTarget.classList.contains('nav-link')) {
        toggleSelectedLink(e.currentTarget);
        handleContentDisplay(basketsLibrary, e.currentTarget.innerText, contentArea);
        prevTarget = e.currentTarget.innerText;

    } else if (e.currentTarget.className === 'task') {
        if (e.target.classList.contains('fa-regular')) {
            toggleTaskCompleted(e.currentTarget);
        } else {
            console.log('task targeted');
            console.log('open task details window');
            toggleTaskDetails(e.currentTarget);
        }
    }
}

function handleContentDisplay(library, currentTarget, contentContainer) {

    if (prevTarget !== currentTarget) {
        contentContainer.textContent = '';
        if (currentTarget === 'All Tasks') {
            displayAllBaskets(library, contentContainer);
            return;
        }
        if (currentTarget === 'Today' || currentTarget === 'This Week') {
            displayBasketsDue(library, currentTarget, contentContainer);
            return;
        }
        displaySelectedBasket(library, currentTarget, contentContainer);
    }

}

function handleContentRemoval(library, currentTarget) {

    if (currentTarget.className === "basket-filter-wrapper nav-link") {
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

export { handleClick }