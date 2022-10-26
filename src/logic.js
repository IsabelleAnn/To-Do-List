export let basketsLibrary = [];

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
    storeLibraryLocally();
}

export function editTaskInLibrary(taskObject, targetBasket, indexOfTask) {
    let findBasket = basketsLibrary.find(basket => basket.basketName === targetBasket);
    findBasket.tasks[indexOfTask] = taskObject;
    storeLibraryLocally();
}

export function addBasketToLibrary(basketObject) {
    basketsLibrary.push(basketObject);
    storeLibraryLocally();
}

export function removeTaskFromLibrary(basketTitle, index) {
    basketsLibrary.find((basket) => basket.basketName === basketTitle).tasks.splice(index, 1);
    storeLibraryLocally();
}

export function removeBasketFromLibrary(index) {
    basketsLibrary.splice(index, 1);
    storeLibraryLocally();
}

export function getLocalLibrary() {
    if (storageAvailable('localStorage')) {
        let baskets = localStorage.getItem('baskets');
        if (baskets) {
            basketsLibrary = JSON.parse(baskets);
        } else {
            console.log('Local Storage did not exist yet. Got empty library. []');
        }
    } else {
        console.log('Local Storage Unavailable');
    }
}

function storeLibraryLocally() {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('baskets', JSON.stringify(basketsLibrary));
    } else {
        console.log('Could not store locally');
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