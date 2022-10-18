import { renderBasket, renderBasketToNav, renderTaskToBasket } from './dom.js';

let basketsLibrary = [{
        basketName: 'Knit Socks',
        tasks: [{
            taskName: 'Buy yarn A-1',
            description: 'Go to walmart to buy yellow yarn',
            dueDate: 'Today',
            priority: 'high',
        }, {
            taskName: 'Buy yarn A-2',
            description: 'Go to walmart to buy yellow yarn',
            dueDate: 'This Week',
            priority: 'medium',
        }]
    },
    {
        basketName: 'Build Lamp',
        tasks: [{
            taskName: 'Buy yarn B-1',
            description: 'Go to walmart to buy yellow yarn',
            dueDate: 'This Week',
            priority: 'low',
        }, {
            taskName: 'Buy yarn B-2',
            description: 'Go to walmart to buy yellow yarn',
            dueDate: 'Today',
            priority: 'none',
        }]
    }
];

class Basket {
    constructor(basketName = '', tasks = []) {
        this.basketName = basketName;
        this.tasks = tasks;
    }
}

class Task {
    constructor(taskName = '', description = '', dueDate = '', priority = 'low') {
            this.taskName = taskName;
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
        }
        // getTaskName() {
        //     return this.taskName;
        // }
        // getDescripition() {
        //     return this.description;
        // }
        // getdueDate() {
        //     return this.dueDate;
        // }
        // getPriority() {
        //     return this.priority;
        // }
        // getIsComplete() {
        //     return this.isComplete;
        // }
}

let myNewBasket = new Basket('A New Basket Test');
let myNewTask = new Task('A task name', 'pull out the mower from the garage and mow the lawn', 'Tonight')

createNewBasket(myNewBasket);
addTaskToBasket(myNewTask, myNewBasket.basketName);

function addTaskToBasket(taskObject, targetBasket) {
    let findBasket = basketsLibrary.find(basket => basket.basketName === targetBasket);
    findBasket.tasks.push(taskObject);
}

function removeTaskFromLibrary(basketTitle, index) {
    basketsLibrary.find((basket) => basket.basketName === basketTitle).tasks.splice(index, 1);
}

function createNewBasket(basketObject) {
    console.log('createNewBasket', basketObject);
    basketsLibrary.push(basketObject);

}

function removeBasketFromLibrary(index) {
    basketsLibrary.splice(index, 1);
}

function filterAllBaskets(library, wrapper) {
    library.forEach((basket) => {
        let renderedBasket = renderBasket(basket, wrapper);
        basket.tasks.forEach((task) => {
            renderTaskToBasket(task, renderedBasket);
        });
    });
}

function filterBasketsDue(library, date, wrapper) {
    let filteredBaskets = [];
    library.forEach((basket, index) => basket.tasks.forEach((task) => {
        if (task.dueDate === date) {
            if ((filteredBaskets[index] === undefined)) {
                filteredBaskets.push({ basketName: basket.basketName, tasks: [task] });
            } else {
                filteredBaskets[index].tasks.push(task);
            }
        }
    }));
    filterAllBaskets(filteredBaskets, wrapper);
}

function filterSelectedBasket(library, selectedBasket, wrapper) {
    let basket = library.find(b => b.basketName === selectedBasket);
    let renderedBasket = renderBasket(basket, wrapper);
    basket.tasks.forEach((task) => {
        renderTaskToBasket(task, renderedBasket);
    });
}

function createBasketNavLinks(library, navContainer) {
    library.forEach((basket) => {
        renderBasketToNav(basket.basketName, navContainer);
    });
}

export { addTaskToBasket, Basket, Task, basketsLibrary, createNewBasket, filterAllBaskets, filterBasketsDue, filterSelectedBasket, createBasketNavLinks, removeBasketFromLibrary, removeTaskFromLibrary };