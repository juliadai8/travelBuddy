import React, { useState } from 'react';
import '../styles/FilterPanel.css';

interface FilterProps {
    categories: { [key: string]: string[] }; // Object containing category types as keys and corresponding categories as values
    onFilterChange: (selectedTags: string[]) => void;
}

const FilterPanel: React.FC<FilterProps> = ({categories, onFilterChange}) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleTagClick = (tag: string) => {
        const isSelected = selectedTags.includes(tag);

        if (isSelected) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        }
        else {
            setSelectedTags(selectedTags.concat([tag]));
        }
        onFilterChange(selectedTags);  // onFilterChange must be defined on homepage
    }

    return (
        <div id="filter-container">
            {
                Object.entries(categories).map(([category, tags]) => (
                    <div id="menu-container" key={category}>
                    <h4>{category}</h4>
                    <div id="checkbox-container">
                        {
                            tags.map(tag => (
                                // do we need a div for each checkbox?
                                <label>
                                    <input
                                        type="checkbox"
                                        value={tag}
                                        checked={selectedTags.includes(tag)}
                                        onChange={() => handleTagClick(tag)}
                                    />
                                    {tag}
                                </label>
                            ))
                        }
                    </div>
                    </div>
                ))
            }
        </div>
    )


};

export default FilterPanel