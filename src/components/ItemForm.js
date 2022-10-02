import React, { useState } from "react";

function ItemForm({onItemAdd}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");
 
 function handleSubmit(e){
  e.preventDefault()
  const newItems= {
    name:name,
    category:category,
    isInCart:false
  }
  
    fetch("http://localhost:4000/items", {
      method:'POST',
      headers:{
        'Content-Type':'application/JSON',
      }, 
      body: JSON.stringify(newItems),
    })
    .then((res)=>res.json())
    .then((items)=> onItemAdd(items))
   
 }

 

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;