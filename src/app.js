// Imports
import { StorageCtrl } from './controllers/storage.controller';
import { ItemCtrl } from './controllers/item.controller';
import { UICtrl } from './controllers/ui.controller';


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