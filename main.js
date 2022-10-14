/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"displayAllBaskets\": () => (/* binding */ displayAllBaskets),\n/* harmony export */   \"displayBasketNavLinks\": () => (/* binding */ displayBasketNavLinks),\n/* harmony export */   \"displayBasketsDue\": () => (/* binding */ displayBasketsDue),\n/* harmony export */   \"displaySelectedBasket\": () => (/* binding */ displaySelectedBasket),\n/* harmony export */   \"removeBasket\": () => (/* binding */ removeBasket),\n/* harmony export */   \"removeTask\": () => (/* binding */ removeTask),\n/* harmony export */   \"toggleSelectedLink\": () => (/* binding */ toggleSelectedLink),\n/* harmony export */   \"toggleTaskCompleted\": () => (/* binding */ toggleTaskCompleted),\n/* harmony export */   \"toggleTaskDetails\": () => (/* binding */ toggleTaskDetails)\n/* harmony export */ });\n/* harmony import */ var _eventHandlers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventHandlers.js */ \"./src/eventHandlers.js\");\n/* harmony import */ var _logic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logic.js */ \"./src/logic.js\");\n\n\n\nvar baskets;\nvar basketToDelete;\nvar navLinks;\nvar navLinkSelected;\n\nfunction displayAllBaskets(library, wrapper) {\n    library.forEach((basket) => {\n        let renderedBasket = renderBasket(basket, wrapper);\n        basket.tasks.forEach((task) => {\n            renderTaskToBasket(task, renderedBasket);\n        });\n    });\n}\n\nfunction displayBasketsDue(library, date, wrapper) {\n    let filteredBaskets = [];\n    library.forEach((basket, index) => basket.tasks.forEach((task) => {\n        if (task.dueDate === date) {\n            if ((filteredBaskets[index] === undefined)) {\n                filteredBaskets.push({ basketName: basket.basketName, tasks: [task] });\n            } else {\n                filteredBaskets[index].tasks.push(task);\n            }\n        }\n    }));\n    displayAllBaskets(filteredBaskets, wrapper);\n}\n\nfunction displaySelectedBasket(library, selectedBasket, wrapper) {\n    let basket = library.find(b => b.basketName === selectedBasket);\n    let renderedBasket = renderBasket(basket, wrapper);\n    basket.tasks.forEach((task) => {\n        renderTaskToBasket(task, renderedBasket);\n    });\n}\n\nfunction displayBasketNavLinks(library, navContainer) {\n    library.forEach((basket) => {\n        renderBasketToNav(basket.basketName, navContainer);\n    });\n}\n\nfunction renderBasketToNav(basketName, navWrapper) {\n    const basketFilterWrapper = document.createElement('li');\n    basketFilterWrapper.classList.add('basket-filter-wrapper', 'nav-link');\n    basketFilterWrapper.addEventListener('click', _eventHandlers_js__WEBPACK_IMPORTED_MODULE_0__.handleClick);\n    const filterBasketName = document.createElement('h3');\n    filterBasketName.classList.add('filter-basket');\n    filterBasketName.textContent = basketName;\n\n    navWrapper.appendChild(basketFilterWrapper);\n    basketFilterWrapper.appendChild(createBasketIcon());\n    basketFilterWrapper.appendChild(filterBasketName);\n    basketFilterWrapper.appendChild(createXMarkIcon());\n}\n\nfunction renderTaskToBasket(currentTask, currentBasket) {\n    const taskWrapper = document.createElement('div');\n    taskWrapper.classList.add('task');\n    currentBasket.appendChild(taskWrapper);\n    taskWrapper.addEventListener('click', _eventHandlers_js__WEBPACK_IMPORTED_MODULE_0__.handleClick);\n    const taskDetails = document.createElement('div');\n    taskDetails.classList.add('task-details');\n    taskWrapper.appendChild(taskDetails);\n    const taskTitleWrapper = document.createElement('div');\n    taskTitleWrapper.classList.add('task-title-wrapper');\n    taskDetails.appendChild(taskTitleWrapper);\n    const uncheckedBoxIcon = document.createElement('i');\n    uncheckedBoxIcon.classList.add('fa-regular', 'fa-square', 'icons');\n    const checkedBoxIcon = document.createElement('i');\n    checkedBoxIcon.classList.add('fa-regular', 'fa-square-check', 'icons', 'hidden');\n    const taskTitle = document.createElement('h4');\n    taskTitle.textContent = currentTask.taskName;\n    taskTitleWrapper.appendChild(uncheckedBoxIcon);\n    taskTitleWrapper.appendChild(checkedBoxIcon);\n    taskTitleWrapper.appendChild(taskTitle);\n\n    const taskStatusWrapper = document.createElement('div');\n    taskStatusWrapper.classList.add('task-status-wrapper');\n    taskDetails.appendChild(taskStatusWrapper);\n    const dueDate = document.createElement('p');\n    dueDate.textContent = currentTask.dueDate;\n    dueDate.classList.add('hidden');\n    const priorityIcon = document.createElement('i');\n    priorityIcon.classList.add('fa-solid', 'fa-circle-exclamation', 'icons');\n\n    switch (currentTask.priority) {\n        case 'high':\n            priorityIcon.classList.add('high-priority');\n            break;\n        case 'medium':\n            priorityIcon.classList.add('medium-priority');\n            break;\n        case 'low':\n            priorityIcon.classList.add('low-priority');\n            break;\n        default:\n            priorityIcon.classList.add('no-priority');\n            break;\n    }\n\n    taskStatusWrapper.appendChild(dueDate);\n    taskStatusWrapper.appendChild(priorityIcon);\n    taskStatusWrapper.appendChild(createXMarkIcon());\n\n    const taskDescription = document.createElement('p');\n    taskDescription.classList.add('task-description', 'hidden');\n    taskDescription.textContent = currentTask.description;\n    taskWrapper.appendChild(taskDescription);\n\n}\n\n\n\nfunction renderBasket(currentBasket, container) {\n    const basketWrapper = document.createElement('div');\n    basketWrapper.classList.add('basket');\n    const basketHeader = document.createElement('div');\n    basketHeader.classList.add('basket-header');\n    const tasksInBasket = document.createElement('div');\n    tasksInBasket.classList.add('tasks-in-basket');\n\n    container.appendChild(basketWrapper);\n    basketWrapper.appendChild(basketHeader);\n    basketWrapper.appendChild(tasksInBasket);\n\n    const basketNameWrapper = document.createElement('div');\n    basketNameWrapper.classList.add('basket-name-wrapper');\n\n    basketHeader.appendChild(basketNameWrapper);\n    basketHeader.appendChild(createAddBtn('task'));\n\n    const basketName = document.createElement('h2');\n    basketName.classList.add('basket-name');\n    basketName.textContent = currentBasket.basketName;\n    basketNameWrapper.appendChild(createBasketIcon());\n    basketNameWrapper.appendChild(basketName);\n\n    return tasksInBasket;\n}\n\nfunction createXMarkIcon() {\n    const xMarkIcon = document.createElement('i');\n    xMarkIcon.classList.add('fa-solid', 'fa-xmark', 'icons');\n\n    return xMarkIcon;\n}\n\nfunction createBasketIcon() {\n    const basketIcon = document.createElement('i');\n    basketIcon.classList.add('fa-sharp', 'fa-solid', 'fa-basket-shopping', 'icons');\n\n    return basketIcon;\n}\n\nfunction createAddBtn(adderName) {\n    const adderWrapper = document.createElement('div');\n    adderWrapper.classList.add(`add-${adderName}-wrapper`);\n    const adder = document.createElement('p');\n    adder.classList.add(`add-${adderName}`);\n    const plusIcon = document.createElement('i');\n    plusIcon.classList.add('fa-solid', 'fa-plus', 'icons');\n    const span = document.createElement('span');\n    adderWrapper.appendChild(adder);\n    adder.appendChild(plusIcon);\n    adder.appendChild(span);\n    span.textContent = ` Add ${adderName.charAt(0).toUpperCase()+adderName.slice(1)}`;\n\n    return adderWrapper;\n}\n\nfunction toggleTaskCompleted(targetTask) {\n    targetTask.querySelector('h4').classList.toggle('task-checked');\n\n    if (targetTask.querySelector('.fa-square-check').classList.contains('hidden')) {\n        targetTask.querySelector('.fa-square-check').classList.remove('hidden');\n        targetTask.querySelector('.fa-square').classList.add('hidden');\n    } else {\n        targetTask.querySelector('.fa-square-check').classList.add('hidden');\n        targetTask.querySelector('.fa-square').classList.remove('hidden');\n    }\n}\n\nfunction toggleTaskDetails(targetTask) {\n    // console.log(targetTask);\n}\n\nfunction toggleSelectedLink(targetLink) {\n    document.querySelector('.selected').classList.remove('selected');\n    targetLink.classList.add('selected');\n}\n\nfunction removeBasket(targetBasket, index) {\n    baskets = Array.from(document.querySelectorAll('.basket'));\n    basketToDelete = baskets.find((parent) => {\n        if (parent.querySelector('.basket-name').textContent === targetBasket.innerText) {\n            return parent;\n        }\n    });\n    if (basketToDelete !== undefined) {\n        basketToDelete.remove();\n    }\n    (0,_logic_js__WEBPACK_IMPORTED_MODULE_1__.removeBasketFromLibrary)(index);\n    targetBasket.remove();\n}\n\nfunction removeTask(targetTask, basketOfTask, index) {\n    (0,_logic_js__WEBPACK_IMPORTED_MODULE_1__.removeTaskFromLibrary)(basketOfTask, index);\n    targetTask.remove();\n}\n\n\n\n\n//# sourceURL=webpack://to-do-list/./src/dom.js?");

/***/ }),

/***/ "./src/eventHandlers.js":
/*!******************************!*\
  !*** ./src/eventHandlers.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handleClick\": () => (/* binding */ handleClick)\n/* harmony export */ });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ \"./src/index.js\");\n/* harmony import */ var _logic_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logic.js */ \"./src/logic.js\");\n\n\n\n\n\nconst navLinks = document.querySelectorAll('.nav-link');\nnavLinks.forEach(link => {\n    link.addEventListener('click', handleClick);\n});\nvar prevTarget = 'All Tasks';\nvar basketIndex;\nvar taskIndex;\n\nfunction handleClick(e) {\n    console.log(e.currentTarget.className);\n    if (e.target.className === 'fa-solid fa-xmark icons') {\n        handleContentRemoval(_logic_js__WEBPACK_IMPORTED_MODULE_2__.basketsLibrary, e.currentTarget);\n    } else if (e.currentTarget.classList.contains('nav-link')) {\n        (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleSelectedLink)(e.currentTarget);\n        handleContentDisplay(_logic_js__WEBPACK_IMPORTED_MODULE_2__.basketsLibrary, e.currentTarget.innerText, _index_js__WEBPACK_IMPORTED_MODULE_1__.contentArea);\n        prevTarget = e.currentTarget.innerText;\n\n    } else if (e.currentTarget.className === 'task') {\n        if (e.target.classList.contains('fa-regular')) {\n            (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleTaskCompleted)(e.currentTarget);\n        } else {\n            console.log('task targeted');\n            console.log('open task details window');\n            (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.toggleTaskDetails)(e.currentTarget);\n        }\n    }\n}\n\nfunction handleContentDisplay(library, currentTarget, contentContainer) {\n\n    if (prevTarget !== currentTarget) {\n        contentContainer.textContent = '';\n        if (currentTarget === 'All Tasks') {\n            (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.displayAllBaskets)(library, contentContainer);\n            return;\n        }\n        if (currentTarget === 'Today' || currentTarget === 'This Week') {\n            (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.displayBasketsDue)(library, currentTarget, contentContainer);\n            return;\n        }\n        (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.displaySelectedBasket)(library, currentTarget, contentContainer);\n    }\n\n}\n\nfunction handleContentRemoval(library, currentTarget) {\n\n    if (currentTarget.className === \"basket-filter-wrapper nav-link\") {\n        basketIndex = library.indexOf(library.find((basket) => {\n            if (basket.basketName === currentTarget.innerText) {\n                return basket;\n            }\n        }));\n        (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.removeBasket)(currentTarget, basketIndex);\n    }\n\n    if (currentTarget.className === 'task') {\n\n        taskIndex = library.find((basket) => basket.basketName === currentTarget.closest('.basket').querySelector('.basket-name').innerText);\n        taskIndex = taskIndex.tasks.indexOf(taskIndex.tasks.find((task) => {\n            if (task.taskName === currentTarget.querySelector('.task-title-wrapper').innerText) {\n                return task;\n            }\n        }));\n        (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.removeTask)(currentTarget, currentTarget.closest('.basket').querySelector('.basket-name').innerText, taskIndex);\n    }\n}\n\n\n\n//# sourceURL=webpack://to-do-list/./src/eventHandlers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"allTasksBtn\": () => (/* binding */ allTasksBtn),\n/* harmony export */   \"contentArea\": () => (/* binding */ contentArea),\n/* harmony export */   \"navArea\": () => (/* binding */ navArea),\n/* harmony export */   \"tasksDueThisWeekBtn\": () => (/* binding */ tasksDueThisWeekBtn),\n/* harmony export */   \"tasksDueTodayBtn\": () => (/* binding */ tasksDueTodayBtn)\n/* harmony export */ });\n/* harmony import */ var _logic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logic.js */ \"./src/logic.js\");\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n\n\n\nconst contentArea = document.querySelector('.content');\nconst navArea = document.querySelector('#basket-filters');\nconst allTasksBtn = document.querySelector('#filter-all');\nconst tasksDueTodayBtn = document.querySelector('#filter-today');\nconst tasksDueThisWeekBtn = document.querySelector('#filter-week');\n\n(0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.displayBasketNavLinks)(_logic_js__WEBPACK_IMPORTED_MODULE_0__.basketsLibrary, navArea);\n(0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.displayAllBaskets)(_logic_js__WEBPACK_IMPORTED_MODULE_0__.basketsLibrary, contentArea);\n\n\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

/***/ }),

/***/ "./src/logic.js":
/*!**********************!*\
  !*** ./src/logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"basketsLibrary\": () => (/* binding */ basketsLibrary),\n/* harmony export */   \"removeBasketFromLibrary\": () => (/* binding */ removeBasketFromLibrary),\n/* harmony export */   \"removeTaskFromLibrary\": () => (/* binding */ removeTaskFromLibrary)\n/* harmony export */ });\nlet basketsLibrary = [{\n        basketName: 'Knit Socks',\n        tasks: [{\n            taskName: 'Buy yarn A-1',\n            description: 'Go to walmart to buy yellow yarn',\n            dueDate: 'Today',\n            priority: 'high',\n        }, {\n            taskName: 'Buy yarn A-2',\n            description: 'Go to walmart to buy yellow yarn',\n            dueDate: 'This Week',\n            priority: 'medium',\n        }]\n    },\n    {\n        basketName: 'Build Lamp',\n        tasks: [{\n            taskName: 'Buy yarn B-1',\n            description: 'Go to walmart to buy yellow yarn',\n            dueDate: 'This Week',\n            priority: 'low',\n        }, {\n            taskName: 'Buy yarn B-2',\n            description: 'Go to walmart to buy yellow yarn',\n            dueDate: 'Today',\n            priority: 'none',\n        }]\n    }\n];\n\nclass Basket {\n    constructor(basketName = '', tasks = []) {\n        this.basketName = basketName;\n        this.tasks = tasks;\n    }\n}\n\nclass Task {\n    constructor(taskName = '', description = '', dueDate = '', priority = 'low') {\n            this.taskName = taskName;\n            this.description = description;\n            this.dueDate = dueDate;\n            this.priority = priority;\n        }\n        // getTaskName() {\n        //     return this.taskName;\n        // }\n        // getDescripition() {\n        //     return this.description;\n        // }\n        // getdueDate() {\n        //     return this.dueDate;\n        // }\n        // getPriority() {\n        //     return this.priority;\n        // }\n        // getIsComplete() {\n        //     return this.isComplete;\n        // }\n}\n\nlet myNewBasket = new Basket('A New Basket Test');\nlet myNewTask = new Task('A task name', 'pull out the mower from the garage and mow the lawn', 'Tonight')\n\naddBasketToLibrary(myNewBasket);\naddTaskToBasket(myNewBasket.basketName, myNewTask);\n\nfunction addTaskToBasket(myBasket, taskObject) {\n    let findBasket = basketsLibrary.find(basket => basket.basketName === myBasket);\n    findBasket.tasks.push(taskObject);\n}\n\nfunction removeTaskFromLibrary(basketTitle, index) {\n    basketsLibrary.find((basket) => basket.basketName === basketTitle).tasks.splice(index, 1);\n}\n\nfunction addBasketToLibrary(basketObject) {\n    basketsLibrary.push(basketObject);\n}\n\nfunction removeBasketFromLibrary(index) {\n    basketsLibrary.splice(index, 1);\n}\n\n\n\n//# sourceURL=webpack://to-do-list/./src/logic.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;