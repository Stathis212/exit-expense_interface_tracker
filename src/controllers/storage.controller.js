/*_____________________________________________________________

______________________ Storage Controller _____________________

_____________________________________________________________*/

export const StorageCtrl = (function() {
    
  // ______________________________________________________________________________________ Public methods

  return {
      storeItem: function(item) {
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
              if(updatedItem.id === item.id) {
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
