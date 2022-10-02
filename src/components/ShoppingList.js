import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
//import { response } from "msw/lib/types";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([{}]);

  useEffect (()=>{
   fetch('http://localhost:4000/items')
   .then((response)=>response.json())
   .then((items)=>{
    setItems(items)
   })
  }, [])
  
  function handleAddItem(items){
   setItems([{...items, items}])
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleUpdateItem(updatedItem){
    const updatedItems = items.map((item)=>{
      if (item.id === updatedItem.id){
        return updatedItem
      } else {
        return item
      }
    })
    setItems(updatedItems)
  }
  
  function handleDelete(deletedItem){
    const updatedItems = items.filter((item)=>item.id !== deletedItem)
    setItems(updatedItems)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemAdd={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} 
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDelete}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
