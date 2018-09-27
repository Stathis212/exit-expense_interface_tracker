/*_____________________________________________________________

______________________ Storage Controller _____________________

_____________________________________________________________*/

const StorageCtrl = (function() {
    
    // ______________________________________________________________________________________ Public methods

    return {
        storeItem: function() {
            let items;
            // Check if any items in localStorage
            if(localStorage.getItem('items') === null) {
                items = [];
                // Push new item
                items.push(item);
                // Set localStorage
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                // Get content in localStorage
                items = JSON.parse(localStorage.getItem('items'));

                // Push new item
                items.push(item);

                // Reset localStorage
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function() {
            let items;
            if(localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemStorage: function(updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'));

            // Loop through items - update
            items.forEach(function(item, index) {
                if(updateditem.id === item.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromStorage: function(id) {
            let items = JSON.parse(localStorage.getItem('items'));

            // Loop through items - update
            items.forEach(function(item, index) {
                if(id === item.id) {
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        clearItemsStorageFromStorage: function() {
            localStorage.removeItem('items');
        }
    }
})();


/*_____________________________________________________________

________________________ Item Controller ______________________

_____________________________________________________________*/

const ItemCtrl = (function() {
    // Item Contructor
    const Item = function(id, name, cost) {
        this.id = id;
        this.name = name;
        this.cost = cost;
    }

    // Data Structure / State
    const data = {
        // items: [
            // { id: 0, name: 'adgs', cost: 1200},
            // { id: 1, name: 'dfjd', cost: 400},
            // { id: 2, name: 'bmeb', cost: 300}
        // ],
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCost: 0
    }

    // Public methods
    return {
        getItems: function() {
            return data.items;
        },
        addItem: function(name, cost) {
            let ID;
            // Create ID
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Cost to number
            cost = parseInt(cost);

            // Create new item
            newItem = new Item(ID, name, cost);

            // Add to items array
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function(id) {
            let found = null;
            // Loop throught items
            data.items.forEach(function(item) {
                if (item.id === id) {
                    found = item;
                }
            });
            return found;
        },
        updateItem: function(name, cost) {
            // Cost to number
            cost = parseInt(cost);

            let found = null;

            data.items.forEach(function(item) {
                if(item.id === data.currentItem.id) {
                    item.name = name;
                    item.cost = cost;
                    found = item;
                }
            });

            return found;
        },
        deleteItem: function(id) {
            // Get ids
            const ids = data.items.map(function(item) {
                return item.id;
            });

            // Get index
            const index = ids.indexOf(id);

            // Remove item
            data.items.splice(index, 1);
        },
        clearAllItems: function() {
            data.items = [];
        },
        setCurrentItem: function(item) {
            data.currentItem = item;
        },
        getCurrentItem: function() {
            return data.currentItem;
        },
        getTotalCost: function() {
            let total = 0;

            // Loop throught items and add costs
            data.items.forEach(function(item) {
                total += item.cost;
            });

            // Set total in cost in data structure
            data.totalCost = total;

            //Return total
            return data.totalCost;
        },
        logData: function() {
            return data;
        }
    }
})();



/*_____________________________________________________________

_________________________ UI Controller _______________________

_____________________________________________________________*/

const UICtrl = (function() {

    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCostInput: '#item-cost',
        totalCost: '.total-cost'
    }

    // ______________________________________________________________________________________ Public methods
    return {
        populateItemList: function(items) {
            let html = '';

            items.forEach(function(item) {
                html += `<li id="item-${item.id}" class="collection-item">
                            <strong>${item.name}: </strong> <em>${item.cost}</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>
                        </li>`;
            });

            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                cost: document.querySelector(UISelectors.itemCostInput).value
            }
        },
        addListItem: function(item) {
            // Show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            // Add class 
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.cost}</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>`;
            // Insert Item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        updateListItem: function(item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn Node list into array
            listItems = Array.from(listItems);

            listItems.forEach(function(listItem) {
                const itemID = listItem.getAttribute('id');

                if(itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.cost}</em>
                                                                        <a href="#" class="secondary-content">
                                                                            <i class="edit-item fa fa-pencil"></i>
                                                                        </a>`;
                }
            });
        },
        deleteListItem: function(id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCostInput).value = '';
        },
        addItemToForm: function() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCostInput).value = ItemCtrl.getCurrentItem().cost;
            UICtrl.showEditState();
        },
        removeItems: function() {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn Node list into array
            listItems = Array.from(listItems);

            listItems.forEach(function(item) {
                item.remove();
            });
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function() {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        showTotalCost: function(totalCost) {
            document.querySelector(UISelectors.totalCost).textContent = totalCost;
        },
        getSelectors: function() {
            return UISelectors;
        }
    }

})();



/*_____________________________________________________________

__________________________ App Controller _____________________

_____________________________________________________________*/

const App = (function(ItemCtrl, StorageCtrl, UICtrl) {

    // ______________________________________________________________________________________ Load event listeners
    const loadEventListeners = function() {
        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        // Add Item Event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // Disable submit on enter, user has to click
        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });

        // Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        // Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        // Delete item event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // Back button event
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        // Clear button event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);

    }

    // ______________________________________________________________________________________ Add Item submit

    const itemAddSubmit = function(e) {
        // Get form input from UI Controller
        const input = UICtrl.getItemInput();
        // Check for name and calorie input
        if (input.name !== '' && input.cost !== '') {
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.cost);
            
            // Add item to UI list
            UICtrl.addListItem(newItem);

            // Get total cost
            const totalCost = ItemCtrl.getTotalCost();

            // Add total cost to UI
            UICtrl.showTotalCost(totalCost);

            // Store in localStorage
            StorageCtrl.storeItem(newItem);
            
            // Clear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    } 

    // ______________________________________________________________________________________ Click edit item (event delegation)

    const itemEditClick = function(e) {
        if (e.target.classList.contains('edit-item')) {

            // Get list item id (item-0, item-1)
            const listId = e.target.parentNode.parentNode.id;

            // Break into an array
            const listIdArray = listId.split('-');

            // Get the actual id
            const id = parseInt(listIdArray[1]);

            // Get item
            const itemToEdit = ItemCtrl.getItemById(id);

            // Set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToForm();
        }
        e.preventDefault();
    }

    // ______________________________________________________________________________________ Update item submit

    const itemUpdateSubmit = function(e) {
        // Get item input
        const input = UICtrl.getItemInput();

        // Update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.cost);

        // Update UI
        UICtrl.updateListItem(updatedItem);

        // Get total cost
        const totalCost = ItemCtrl.getTotalCost();

        // Add total cost to UI
        UICtrl.showTotalCost(totalCost);

        // Update localStorage
        StorageCtrl.updateItemStorage(updatedItem);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    // ______________________________________________________________________________________ Delete item submit

    const itemDeleteSubmit = function(e) {
        // Get current item
        const currentItem = ItemCtrl.getCurrentItem();

        // Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // Get total cost
        const totalCost = ItemCtrl.getTotalCost();

        // Add total cost to UI
        UICtrl.showTotalCost(totalCost);

        // Delete from localStorage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    // ______________________________________________________________________________________ Clear items event

    const clearAllItemsClick = function() {
        // Delete all items from data structure
        ItemCtrl.clearAllItems();

        // Get total cost
        const totalCost = ItemCtrl.getTotalCost();

        // Add total cost to UI
        UICtrl.showTotalCost(totalCost);

        // Remove from UI
        UICtrl.removeItems();

        // Clear from localStorage
        StorageCtrl.clearItemsStorageFromStorage();

        // Hide list
        UICtrl.hideList();
    }

    // ______________________________________________________________________________________ Public methods

    return {
        init: function() {
            // Clear edit state / set initial set
            UICtrl.clearEditState();

            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Populate list with items
            // Check if any items
            if(items.length === 0) {
                UICtrl.hideList();
            } else {
                // Populate list with items
                UICtrl.populateItemList(items);
            }

            // Get total cost
            const totalCost = ItemCtrl.getTotalCost();

            // Add total cost to UI
            UICtrl.showTotalCost(totalCost);

            // Load event listeners
            loadEventListeners();
        }
    }
    

})(ItemCtrl, StorageCtrl, UICtrl);



/*_____________________________________________________________

_________________________ Initialize App ______________________

_____________________________________________________________*/

App.init();