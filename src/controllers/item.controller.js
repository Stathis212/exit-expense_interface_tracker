import { Item } from '../models/item.model';
import { StorageCtrl } from './storage.controller';

/*_____________________________________________________________

________________________ Item Controller ______________________

_____________________________________________________________*/

export const ItemCtrl = (function() {
  // Item Contructor
  /*const Item = function(id, name, cost) {
      this.id = id;
      this.name = name;
      this.cost = cost;
  }*/

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
          let newItem = new Item(ID, name, cost);

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