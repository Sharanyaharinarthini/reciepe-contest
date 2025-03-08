import React, { useState } from "react";

const recipesData = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    chef: "Chef A",
    description: "A delicious Indian curry",
    uploadDate: "2025-02-20",
    rating: 4.5,
    attributes: ["Contest Winner", "Featured"],
    mealType: "Dinner",
    dishType: "Curry",
  },
  {
    id: 2,
    name: "Mexican Tacos",
    chef: "Chef B",
    description: "Crispy and spicy tacos",
    uploadDate: "2025-01-15",
    rating: 4.7,
    attributes: ["Test Kitchen-Approved"],
    mealType: "Lunch",
    dishType: "Mexican",
  },
];

const RecipeContest = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (e) => {
    setSortType(e.target.value);
  };

  const handleFilterToggle = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const filteredRecipes = recipesData
    .filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.chef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((recipe) =>
      selectedFilters.length === 0 ||
      selectedFilters.some((filter) =>
        recipe.attributes.includes(filter) ||
        recipe.mealType === filter ||
        recipe.dishType === filter
      )
    )
    .sort((a, b) => {
      if (sortType === "newest") return new Date(b.uploadDate) - new Date(a.uploadDate);
      if (sortType === "oldest") return new Date(a.uploadDate) - new Date(b.uploadDate);
      if (sortType === "highest") return b.rating - a.rating;
      return a.rating - b.rating;
    });

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Recipe Contest</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={handleSearch}
        className="border p-2 mb-4 w-full"
      />
      <select onChange={handleSort} className="border p-2 mb-4 w-full">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="highest">Highest Rating</option>
        <option value="lowest">Lowest Rating</option>
      </select>
      <div className="mb-4">
        <button onClick={() => handleFilterToggle("Contest Winner")} className="m-1 p-2 border rounded">Contest Winner</button>
        <button onClick={() => handleFilterToggle("Featured")} className="m-1 p-2 border rounded">Featured</button>
        <button onClick={() => handleFilterToggle("Dinner")} className="m-1 p-2 border rounded">Dinner</button>
        <button onClick={() => handleFilterToggle("Mexican")} className="m-1 p-2 border rounded">Mexican</button>
      </div>
      <button onClick={clearFilters} className="mb-4 p-2 bg-red-500 text-white rounded">Clear Filters</button>
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id} className="border p-3 mb-2">
            <h2 className="text-xl font-semibold">{recipe.name}</h2>
            <p>Chef: {recipe.chef}</p>
            <p>Description: {recipe.description}</p>
            <p>Upload Date: {recipe.uploadDate}</p>
            <p>Rating: {recipe.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeContest;
