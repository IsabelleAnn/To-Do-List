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
    console.log('addTaskToLibrary', taskObject, targetBasket);
    let findBasket = basketsLibrary.find(basket => basket.basketName === targetBasket);
    findBasket.tasks.push(taskObject);
}

export function editTaskInLibrary(taskObject, targetBasket, indexOfTask) {
    console.log('editTaskInLibrary', taskObject, targetBasket, indexOfTask);
    let findBasket = basketsLibrary.find(basket => basket.basketName === targetBasket);
    findBasket.tasks[indexOfTask] = taskObject;
    console.log(basketsLibrary);
}

export function addBasketToLibrary(basketObject) {
    console.log('addBasketToLibrary', basketObject);
    console
    basketsLibrary.push(basketObject);
}

export function removeTaskFromLibrary(basketTitle, index) {
    basketsLibrary.find((basket) => basket.basketName === basketTitle).tasks.splice(index, 1);
}

export function removeBasketFromLibrary(index) {
    basketsLibrary.splice(index, 1);
}

export function storeLibraryLocally() {

}

export function getLocalLibrary() {
    if (storageAvailable('localStorage')) {
        // Yippee! We can use localStorage awesomeness
    } else {
        // Too bad, no localStorage for us
    }

}

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}