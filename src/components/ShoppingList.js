import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // items state is to be updated so we use the component holding itand will be rendered, ShoppingList
  useEffect(() => {
    fetch("http://localhost:4000/items")
    .then((res) => res.json())
    .then((items) => setItems(items));
  }, [])

  // function to be passed on to the ItemForm component as a prop.
  // Purpose: add a new list item automatically after POST request
  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }


  // function to be passed on to the Item component as a prop
  // Purpose: update the isInCart state after PATCH request
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else return item;
    });
    setItems(updatedItems);
  }

  // function to delete items when passed down to Items
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => 
      item.id !== deletedItem.id
    )
    setItems(updatedItems);
  }


  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} 
          item={item} 
          onUpdateItem={handleUpdateItem} 
          onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
