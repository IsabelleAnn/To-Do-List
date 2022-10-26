// let today = '2022-10-25';
export let basketsLibrary = [];
// {
//     basketName: 'Knit Socks',
//     tasks: [{
//         taskName: 'Buy yarn A-1',
//         description: 'Go to walmart to buy yellow yarn',
//         dueDate: today,
//         priority: 'high',
//     }, {
//         taskName: 'Buy yarn A-2',
//         description: 'Go to walmart to buy yellow yarn',
//         dueDate: today,
//         priority: 'medium',
//     }]
// },
// {
//     basketName: 'Build Lamp',
//     tasks: [{
//         taskName: 'Buy yarn B-1',
//         description: 'Go to walmart to buy yellow yarn',
//         dueDate: today,
//         priority: 'low',
//     }, {
//         taskName: 'Buy yarn B-2',
//         description: 'Go to walmart to buy yellow yarn',
//         dueDate: today,
//         priority: 'none',
//     }]
// }
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

export function storeLibraryLocally() {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('baskets', JSON.stringify(basketsLibrary));
    } else {
        console.log('Could not store locally');
    }
}

export function getLocalLibrary() {
    if (storageAvailable('localStorage')) {
        let baskets = localStorage.getItem('baskets');
        console.log(baskets);
        if (basketsLibrary) {
            console.log('baskets library', basketsLibrary);
            console.log('library in local storage:', baskets, typeof baskets);
            basketsLibrary = JSON.parse(baskets);

        } else {
            console.log('Baskets did not exist yet. Got empty library. []');
        }
        return basketsLibrary;
    } else {
        console.log('Local Storage Unavailable');
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