let basketsLibrary = [{ basketName: 'Knit Socks', tasks: [{ taskName: 'buy yarn', description: 'go to walmart to buy yellow yarn', dueDate: 'Sunday', priority: 'high', completed: 'false' }] }, { basketName: 'Build Lamp', tasks: [{ taskName: 'buy yarn', description: 'go to walmart to buy yellow yarn', dueDate: 'Sunday', priority: 'high', completed: 'false' }, { taskName: 'buy yarn', description: 'go to walmart to buy yellow yarn', dueDate: 'Sunday', priority: 'high', completed: 'false' }] }];

class Task {
    constructor(taskName, description, dueDate, priority = 'low', isComplete = false) {
        this.taskName = taskName;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = isComplete;
    }
    getTaskName() {
        return this.taskName;
    }
    getDescripition() {
        return this.description;
    }
    getdueDate() {
        return this.dueDate;
    }
    getPriority() {
        return this.priority;
    }
    getIsComplete() {
        return this.isComplete;
    }
}

class Basket {
    constructor(basketName = 'No Name', tasks = {}) {
        this.basketName = basketName;
        this.tasks = tasks;
    }
}

function addTaskToBasket(basketName, taskObject) {
    basketsLibrary[basketName].tasks.push(taskObject);
}


function removeTaskFromBasket(basketName, index) {
    basketsLibrary[basketName].tasks.splice(index, 1);
}

function addBasketToLibrary(basketObject) {
    basketsLibrary.push(basketObject);
}

function removeBasketFromLibrary(index) {
    basketsLibrary.splice(index, 1);

}

// basketsLibrary.forEach((basket) => {
//     console.log(basket);
// });

// addBasketToLibrary(new Basket());

// basketsLibrary.forEach((basket) => {
//     console.log(basket);
// });
// removeBasketFromLibrary(1);

// basketsLibrary.forEach((basket) => {
//     console.log(basket);
// });

// removeTaskFromBasket();

export {};