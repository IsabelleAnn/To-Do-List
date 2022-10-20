export let basketsLibrary = [{
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

export class Basket {
    constructor(basketName = '', tasks = []) {
        this.basketName = basketName;
        this.tasks = tasks;
    }
}

export class Task {
    constructor(taskName = '', description = '', dueDate = '', priority = 'low') {
        this.taskName = taskName;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export function addTaskToLibrary(taskObject, targetBasket) {
    let findBasket = basketsLibrary.find(basket => basket.basketName === targetBasket);
    findBasket.tasks.push(taskObject);
}

export function addBasketToLibrary(basketObject) {
    console.log('addBasketToLibrary', basketObject);
    basketsLibrary.push(basketObject);
}

export function removeTaskFromLibrary(basketTitle, index) {
    basketsLibrary.find((basket) => basket.basketName === basketTitle).tasks.splice(index, 1);
}

export function removeBasketFromLibrary(index) {
    basketsLibrary.splice(index, 1);
}

// export function storeLibraryLocally() {

// }

// export function getLocalLibrary() {

// }