/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_storage_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/storage.controller */ \"./src/controllers/storage.controller.js\");\n/* harmony import */ var _controllers_item_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controllers/item.controller */ \"./src/controllers/item.controller.js\");\n/* harmony import */ var _controllers_ui_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controllers/ui.controller */ \"./src/controllers/ui.controller.js\");\n// Imports\r\n\r\n\r\n\r\n\r\n\r\n/*_____________________________________________________________\r\n\r\n__________________________ App Controller _____________________\r\n\r\n_____________________________________________________________*/\r\n\r\nconst App = (function(ItemCtrl, StorageCtrl, UICtrl) {\r\n\r\n    // ______________________________________________________________________________________ Load event listeners\r\n    const loadEventListeners = function() {\r\n        // Get UI Selectors\r\n        const UISelectors = UICtrl.getSelectors();\r\n\r\n        // Add Item Event\r\n        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);\r\n\r\n        // Disable submit on enter, user has to click\r\n        document.addEventListener('keypress', function(e) {\r\n            if(e.keyCode === 13 || e.which === 13) {\r\n                e.preventDefault();\r\n                return false;\r\n            }\r\n        });\r\n\r\n        // Edit icon click event\r\n        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);\r\n\r\n        // Update item event\r\n        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);\r\n\r\n        // Delete item event\r\n        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);\r\n\r\n        // Back button event\r\n        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);\r\n\r\n        // Clear button event\r\n        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);\r\n\r\n    }\r\n\r\n    // ______________________________________________________________________________________ Add Item submit\r\n\r\n    const itemAddSubmit = function(e) {\r\n        // Get form input from UI Controller\r\n        const input = UICtrl.getItemInput();\r\n        // Check for name and calorie input\r\n        if (input.name !== '' && input.cost !== '') {\r\n            // Add item\r\n            const newItem = ItemCtrl.addItem(input.name, input.cost);\r\n            \r\n            // Add item to UI list\r\n            UICtrl.addListItem(newItem);\r\n\r\n            // Get total cost\r\n            const totalCost = ItemCtrl.getTotalCost();\r\n\r\n            // Add total cost to UI\r\n            UICtrl.showTotalCost(totalCost);\r\n\r\n            // Store in localStorage\r\n            StorageCtrl.storeItem(newItem);\r\n            \r\n            // Clear fields\r\n            UICtrl.clearInput();\r\n        }\r\n\r\n        e.preventDefault();\r\n    } \r\n\r\n    // ______________________________________________________________________________________ Click edit item (event delegation)\r\n\r\n    const itemEditClick = function(e) {\r\n        if (e.target.classList.contains('edit-item')) {\r\n\r\n            // Get list item id (item-0, item-1)\r\n            const listId = e.target.parentNode.parentNode.id;\r\n\r\n            // Break into an array\r\n            const listIdArray = listId.split('-');\r\n\r\n            // Get the actual id\r\n            const id = parseInt(listIdArray[1]);\r\n\r\n            // Get item\r\n            const itemToEdit = ItemCtrl.getItemById(id);\r\n\r\n            // Set current item\r\n            ItemCtrl.setCurrentItem(itemToEdit);\r\n\r\n            // Add item to form\r\n            UICtrl.addItemToForm();\r\n        }\r\n        e.preventDefault();\r\n    }\r\n\r\n    // ______________________________________________________________________________________ Update item submit\r\n\r\n    const itemUpdateSubmit = function(e) {\r\n        // Get item input\r\n        const input = UICtrl.getItemInput();\r\n\r\n        // Update item\r\n        const updatedItem = ItemCtrl.updateItem(input.name, input.cost);\r\n\r\n        // Update UI\r\n        UICtrl.updateListItem(updatedItem);\r\n\r\n        // Get total cost\r\n        const totalCost = ItemCtrl.getTotalCost();\r\n\r\n        // Add total cost to UI\r\n        UICtrl.showTotalCost(totalCost);\r\n\r\n        // Update localStorage\r\n        StorageCtrl.updateItemStorage(updatedItem);\r\n\r\n        UICtrl.clearEditState();\r\n\r\n        e.preventDefault();\r\n    }\r\n\r\n    // ______________________________________________________________________________________ Delete item submit\r\n\r\n    const itemDeleteSubmit = function(e) {\r\n        // Get current item\r\n        const currentItem = ItemCtrl.getCurrentItem();\r\n\r\n        // Delete from data structure\r\n        ItemCtrl.deleteItem(currentItem.id);\r\n\r\n        // Delete from UI\r\n        UICtrl.deleteListItem(currentItem.id);\r\n\r\n        // Get total cost\r\n        const totalCost = ItemCtrl.getTotalCost();\r\n\r\n        // Add total cost to UI\r\n        UICtrl.showTotalCost(totalCost);\r\n\r\n        // Delete from localStorage\r\n        StorageCtrl.deleteItemFromStorage(currentItem.id);\r\n\r\n        UICtrl.clearEditState();\r\n\r\n        e.preventDefault();\r\n    }\r\n\r\n    // ______________________________________________________________________________________ Clear items event\r\n\r\n    const clearAllItemsClick = function() {\r\n        // Delete all items from data structure\r\n        ItemCtrl.clearAllItems();\r\n\r\n        // Get total cost\r\n        const totalCost = ItemCtrl.getTotalCost();\r\n\r\n        // Add total cost to UI\r\n        UICtrl.showTotalCost(totalCost);\r\n\r\n        // Remove from UI\r\n        UICtrl.removeItems();\r\n\r\n        // Clear from localStorage\r\n        StorageCtrl.clearItemsStorageFromStorage();\r\n\r\n        // Hide list\r\n        UICtrl.hideList();\r\n    }\r\n\r\n    // ______________________________________________________________________________________ Public methods\r\n\r\n    return {\r\n        init: function() {\r\n            // Clear edit state / set initial set\r\n            UICtrl.clearEditState();\r\n\r\n            // Fetch items from data structure\r\n            const items = ItemCtrl.getItems();\r\n\r\n            // Populate list with items\r\n            // Check if any items\r\n            if(items.length === 0) {\r\n                UICtrl.hideList();\r\n            } else {\r\n                // Populate list with items\r\n                UICtrl.populateItemList(items);\r\n            }\r\n\r\n            // Get total cost\r\n            const totalCost = ItemCtrl.getTotalCost();\r\n\r\n            // Add total cost to UI\r\n            UICtrl.showTotalCost(totalCost);\r\n\r\n            // Load event listeners\r\n            loadEventListeners();\r\n        }\r\n    }\r\n    \r\n\r\n})(_controllers_item_controller__WEBPACK_IMPORTED_MODULE_1__[\"ItemCtrl\"], _controllers_storage_controller__WEBPACK_IMPORTED_MODULE_0__[\"StorageCtrl\"], _controllers_ui_controller__WEBPACK_IMPORTED_MODULE_2__[\"UICtrl\"]);\r\n\r\n\r\n\r\n/*_____________________________________________________________\r\n\r\n_________________________ Initialize App ______________________\r\n\r\n_____________________________________________________________*/\r\n\r\nApp.init();\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/controllers/item.controller.js":
/*!********************************************!*\
  !*** ./src/controllers/item.controller.js ***!
  \********************************************/
/*! exports provided: ItemCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ItemCtrl\", function() { return ItemCtrl; });\n/* harmony import */ var _models_item_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/item.model */ \"./src/models/item.model.js\");\n/* harmony import */ var _storage_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.controller */ \"./src/controllers/storage.controller.js\");\n\r\n\r\n\r\n/*_____________________________________________________________\r\n\r\n________________________ Item Controller ______________________\r\n\r\n_____________________________________________________________*/\r\n\r\nconst ItemCtrl = (function() {\r\n  // Item Contructor\r\n  /*const Item = function(id, name, cost) {\r\n      this.id = id;\r\n      this.name = name;\r\n      this.cost = cost;\r\n  }*/\r\n\r\n  // Data Structure / State\r\n  const data = {\r\n      // items: [\r\n          // { id: 0, name: 'adgs', cost: 1200},\r\n          // { id: 1, name: 'dfjd', cost: 400},\r\n          // { id: 2, name: 'bmeb', cost: 300}\r\n      // ],\r\n      items: _storage_controller__WEBPACK_IMPORTED_MODULE_1__[\"StorageCtrl\"].getItemsFromStorage(),\r\n      currentItem: null,\r\n      totalCost: 0\r\n  }\r\n\r\n  // Public methods\r\n  return {\r\n      getItems: function() {\r\n          return data.items;\r\n      },\r\n      addItem: function(name, cost) {\r\n          let ID;\r\n          // Create ID\r\n          if (data.items.length > 0) {\r\n              ID = data.items[data.items.length - 1].id + 1;\r\n          } else {\r\n              ID = 0;\r\n          }\r\n\r\n          // Cost to number\r\n          cost = parseInt(cost);\r\n\r\n          // Create new item\r\n          let newItem = new _models_item_model__WEBPACK_IMPORTED_MODULE_0__[\"Item\"](ID, name, cost);\r\n\r\n          // Add to items array\r\n          data.items.push(newItem);\r\n\r\n          return newItem;\r\n      },\r\n      getItemById: function(id) {\r\n          let found = null;\r\n          // Loop throught items\r\n          data.items.forEach(function(item) {\r\n              if (item.id === id) {\r\n                  found = item;\r\n              }\r\n          });\r\n          return found;\r\n      },\r\n      updateItem: function(name, cost) {\r\n          // Cost to number\r\n          cost = parseInt(cost);\r\n\r\n          let found = null;\r\n\r\n          data.items.forEach(function(item) {\r\n              if(item.id === data.currentItem.id) {\r\n                  item.name = name;\r\n                  item.cost = cost;\r\n                  found = item;\r\n              }\r\n          });\r\n\r\n          return found;\r\n      },\r\n      deleteItem: function(id) {\r\n          // Get ids\r\n          const ids = data.items.map(function(item) {\r\n              return item.id;\r\n          });\r\n\r\n          // Get index\r\n          const index = ids.indexOf(id);\r\n\r\n          // Remove item\r\n          data.items.splice(index, 1);\r\n      },\r\n      clearAllItems: function() {\r\n          data.items = [];\r\n      },\r\n      setCurrentItem: function(item) {\r\n          data.currentItem = item;\r\n      },\r\n      getCurrentItem: function() {\r\n          return data.currentItem;\r\n      },\r\n      getTotalCost: function() {\r\n          let total = 0;\r\n\r\n          // Loop throught items and add costs\r\n          data.items.forEach(function(item) {\r\n              total += item.cost;\r\n          });\r\n\r\n          // Set total in cost in data structure\r\n          data.totalCost = total;\r\n\r\n          //Return total\r\n          return data.totalCost;\r\n      },\r\n      logData: function() {\r\n          return data;\r\n      }\r\n  }\r\n})();\n\n//# sourceURL=webpack:///./src/controllers/item.controller.js?");

/***/ }),

/***/ "./src/controllers/storage.controller.js":
/*!***********************************************!*\
  !*** ./src/controllers/storage.controller.js ***!
  \***********************************************/
/*! exports provided: StorageCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StorageCtrl\", function() { return StorageCtrl; });\n/*_____________________________________________________________\r\n\r\n______________________ Storage Controller _____________________\r\n\r\n_____________________________________________________________*/\r\n\r\nconst StorageCtrl = (function() {\r\n    \r\n  // ______________________________________________________________________________________ Public methods\r\n\r\n  return {\r\n      storeItem: function(item) {\r\n          let items;\r\n          // Check if any items in localStorage\r\n          if(localStorage.getItem('items') === null) {\r\n              items = [];\r\n              // Push new item\r\n              items.push(item);\r\n              // Set localStorage\r\n              localStorage.setItem('items', JSON.stringify(items));\r\n          } else {\r\n              // Get content in localStorage\r\n              items = JSON.parse(localStorage.getItem('items'));\r\n\r\n              // Push new item\r\n              items.push(item);\r\n\r\n              // Reset localStorage\r\n              localStorage.setItem('items', JSON.stringify(items));\r\n          }\r\n      },\r\n      getItemsFromStorage: function() {\r\n          let items;\r\n          if(localStorage.getItem('items') === null) {\r\n              items = [];\r\n          } else {\r\n              items = JSON.parse(localStorage.getItem('items'));\r\n          }\r\n          return items;\r\n      },\r\n      updateItemStorage: function(updatedItem) {\r\n          let items = JSON.parse(localStorage.getItem('items'));\r\n\r\n          // Loop through items - update\r\n          items.forEach(function(item, index) {\r\n              if(updatedItem.id === item.id) {\r\n                  items.splice(index, 1, updatedItem);\r\n              }\r\n          });\r\n          localStorage.setItem('items', JSON.stringify(items));\r\n      },\r\n      deleteItemFromStorage: function(id) {\r\n          let items = JSON.parse(localStorage.getItem('items'));\r\n\r\n          // Loop through items - update\r\n          items.forEach(function(item, index) {\r\n              if(id === item.id) {\r\n                  items.splice(index, 1);\r\n              }\r\n          });\r\n          localStorage.setItem('items', JSON.stringify(items));\r\n      },\r\n      clearItemsStorageFromStorage: function() {\r\n          localStorage.removeItem('items');\r\n      }\r\n  }\r\n})();\r\n\n\n//# sourceURL=webpack:///./src/controllers/storage.controller.js?");

/***/ }),

/***/ "./src/controllers/ui.controller.js":
/*!******************************************!*\
  !*** ./src/controllers/ui.controller.js ***!
  \******************************************/
/*! exports provided: UICtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UICtrl\", function() { return UICtrl; });\n/* harmony import */ var _item_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item.controller */ \"./src/controllers/item.controller.js\");\n\r\n\r\n/*_____________________________________________________________\r\n\r\n_________________________ UI Controller _______________________\r\n\r\n_____________________________________________________________*/\r\n\r\nconst UICtrl = (function() {\r\n\r\n  const UISelectors = {\r\n      itemList: '#item-list',\r\n      listItems: '#item-list li',\r\n      addBtn: '.add-btn',\r\n      updateBtn: '.update-btn',\r\n      deleteBtn: '.delete-btn',\r\n      backBtn: '.back-btn',\r\n      clearBtn: '.clear-btn',\r\n      itemNameInput: '#item-name',\r\n      itemCostInput: '#item-cost',\r\n      totalCost: '.total-cost'\r\n  }\r\n\r\n  // ______________________________________________________________________________________ Public methods\r\n  return {\r\n      populateItemList: function(items) {\r\n          let html = '';\r\n\r\n          items.forEach(function(item) {\r\n              html += `<li id=\"item-${item.id}\" class=\"collection-item\">\r\n                          <strong>${item.name}: </strong> <em>${item.cost}</em>\r\n                          <a href=\"#\" class=\"secondary-content\">\r\n                              <i class=\"edit-item fa fa-pencil\"></i>\r\n                          </a>\r\n                      </li>`;\r\n          });\r\n\r\n          // Insert list items\r\n          document.querySelector(UISelectors.itemList).innerHTML = html;\r\n      },\r\n      getItemInput: function() {\r\n          return {\r\n              name: document.querySelector(UISelectors.itemNameInput).value,\r\n              cost: document.querySelector(UISelectors.itemCostInput).value\r\n          }\r\n      },\r\n      addListItem: function(item) {\r\n          // Show the list\r\n          document.querySelector(UISelectors.itemList).style.display = 'block';\r\n          // Create li element\r\n          const li = document.createElement('li');\r\n          // Add class \r\n          li.className = 'collection-item';\r\n          // Add ID\r\n          li.id = `item-${item.id}`;\r\n          // Add HTML\r\n          li.innerHTML = `<strong>${item.name}: </strong> <em>${item.cost}</em>\r\n                          <a href=\"#\" class=\"secondary-content\">\r\n                              <i class=\"edit-item fa fa-pencil\"></i>\r\n                          </a>`;\r\n          // Insert Item\r\n          document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);\r\n      },\r\n      updateListItem: function(item) {\r\n          let listItems = document.querySelectorAll(UISelectors.listItems);\r\n\r\n          // Turn Node list into array\r\n          listItems = Array.from(listItems);\r\n\r\n          listItems.forEach(function(listItem) {\r\n              const itemID = listItem.getAttribute('id');\r\n\r\n              if(itemID === `item-${item.id}`) {\r\n                  document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.cost}</em>\r\n                                                                      <a href=\"#\" class=\"secondary-content\">\r\n                                                                          <i class=\"edit-item fa fa-pencil\"></i>\r\n                                                                      </a>`;\r\n              }\r\n          });\r\n      },\r\n      deleteListItem: function(id) {\r\n          const itemID = `#item-${id}`;\r\n          const item = document.querySelector(itemID);\r\n          item.remove();\r\n      },\r\n      clearInput: function(){\r\n          document.querySelector(UISelectors.itemNameInput).value = '';\r\n          document.querySelector(UISelectors.itemCostInput).value = '';\r\n      },\r\n      addItemToForm: function() {\r\n          document.querySelector(UISelectors.itemNameInput).value = _item_controller__WEBPACK_IMPORTED_MODULE_0__[\"ItemCtrl\"].getCurrentItem().name;\r\n          document.querySelector(UISelectors.itemCostInput).value = _item_controller__WEBPACK_IMPORTED_MODULE_0__[\"ItemCtrl\"].getCurrentItem().cost;\r\n          UICtrl.showEditState();\r\n      },\r\n      removeItems: function() {\r\n          let listItems = document.querySelectorAll(UISelectors.listItems);\r\n\r\n          // Turn Node list into array\r\n          listItems = Array.from(listItems);\r\n\r\n          listItems.forEach(function(item) {\r\n              item.remove();\r\n          });\r\n      },\r\n      hideList: function(){\r\n          document.querySelector(UISelectors.itemList).style.display = 'none';\r\n      },\r\n      clearEditState: function() {\r\n          UICtrl.clearInput();\r\n          document.querySelector(UISelectors.updateBtn).style.display = 'none';\r\n          document.querySelector(UISelectors.deleteBtn).style.display = 'none';\r\n          document.querySelector(UISelectors.backBtn).style.display = 'none';\r\n          document.querySelector(UISelectors.addBtn).style.display = 'inline';\r\n      },\r\n      showEditState: function() {\r\n          document.querySelector(UISelectors.updateBtn).style.display = 'inline';\r\n          document.querySelector(UISelectors.deleteBtn).style.display = 'inline';\r\n          document.querySelector(UISelectors.backBtn).style.display = 'inline';\r\n          document.querySelector(UISelectors.addBtn).style.display = 'none';\r\n      },\r\n      showTotalCost: function(totalCost) {\r\n          document.querySelector(UISelectors.totalCost).textContent = totalCost;\r\n      },\r\n      getSelectors: function() {\r\n          return UISelectors;\r\n      }\r\n  }\r\n\r\n})();\n\n//# sourceURL=webpack:///./src/controllers/ui.controller.js?");

/***/ }),

/***/ "./src/models/item.model.js":
/*!**********************************!*\
  !*** ./src/models/item.model.js ***!
  \**********************************/
/*! exports provided: Item */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Item\", function() { return Item; });\nclass Item {\r\n  constructor(id, name, cost) {\r\n    this.id = id;\r\n    this.name = name;\r\n    this.cost = cost;\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/models/item.model.js?");

/***/ })

/******/ });