import React from 'react';
import { useState } from 'react'


const tags = [
    {tag: "Frankrike", id: 1},
    {tag: "Norge", id: 2},
    {tag: "Strand", id: 3},
    {tag: "Fjell", id: 4},
    {tag: "Storby", id: 5}
]

function Search() {
    const [searchItem, setSearchItem] = useState('')
    const [filteredTags, setFilteredTags] = useState(tags)

  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    const filteredItems = tags.filter((tag) =>
    tag.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredTags(filteredItems);
  }

  return (
    <>      
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder='Type to search'
      />
      <ul>
        {filteredTags.map(tag => <li key={tag.id}>{tag.tag}</li>)}
      </ul>
    </>
  )
}