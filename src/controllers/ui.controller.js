import { ItemCtrl } from './item.controller';

/*_____________________________________________________________

_________________________ UI Controller _______________________

_____________________________________________________________*/

export const UICtrl = (function() {

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