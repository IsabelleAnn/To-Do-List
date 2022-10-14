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

addBasketToLibrary(myNewBasket);
addTaskToBasket(myNewBasket.basketName, myNewTask);

function addTaskToBasket(myBasket, taskObject) {
    let findBasket = basketsLibrary.find(basket => basket.basketName === myBasket);
    findBasket.tasks.push(taskObject);
}

function removeTaskFromLibrary(basketTitle, index) {
    basketsLibrary.find((basket) => basket.basketName === basketTitle).tasks.splice(index, 1);
}

function addBasketToLibrary(basketObject) {
    basketsLibrary.push(basketObject);
}

function removeBasketFromLibrary(index) {
    basketsLibrary.splice(index, 1);
}

export { basketsLibrary, removeBasketFromLibrary, removeTaskFromLibrary };