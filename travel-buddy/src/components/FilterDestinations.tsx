// import React from 'react';
import React, { useState } from 'react';
import FilterMenu from './FilterMenu';


interface Destination {
    continent: string;
    country: string;
    city: string;
    category: string[];
}
/**
 * Helper function to check whether the input parameter is empty
 * @param val Value to check
 * @returns true if val is null, false otherwise
 */
function isEmpty(val: string | any[] | null | undefined){
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}
/**
 * Function to filter the list of destinations based on the desired category
 * @param destinations the list of the registered destinations
 * @param category  the category of which we want to filter the list by
 * @returns list of the filtered destinations
 */
function filterDestinationsByType(destinations: Destination[], categories ?: string[] ): Destination[] {
    if (isEmpty(categories)) {
        return destinations;
    }
    // Convert all category strings to lower case for comparison
    const lowercaseCategories = categories!.map(cat => cat.toLowerCase())
    return destinations.filter(destination => {
        // Convert all destination category strings to lower case for comparison
        const lowercaseDestinationCategories = destination.category.map(cat => cat.toLowerCase());
        // Check if all lowercase categories in lowercaseCategories are included in lowercaseDestinationCategories
        return lowercaseCategories.every(cat => lowercaseDestinationCategories.includes(cat));
    })
}

// // Example usage:
// const destinations: Destination[] = [
//     { continent: "Europe", country: "France", city: "Paris", category: ["City Break", "Culture"] },
//     { continent: "Asia", country: "Japan", city: "Tokyo", category: ["City Break", "Culture"] },
//     { continent: "North America", country: "USA", city: "New York", category: ["City Break", "Culture"] },
//     { continent: "Europe", country: "Italy", city: "Rome", category: ["City Break", "Culture"] },
//     { continent: "Africa", country: "Kenya", city: "Nairobi", category: ["City Break", "Safari"] },
//     { continent: "South America", country: "Peru", city: "Machu Picchu", category: ["City Break", "Historical"] }
// ];
// // const filteredDestinations = filterDestinationsByType(destinations, ["City Break", "Historical"]);
// const filteredDestinations = filterDestinationsByType(destinations, ["City Break", "Historical"]);
// console.log(filteredDestinations);





// const filter = () => {
//     return (
//         <>
        
  
//         </>
//     )
// }

// export default filter

// interface FilterProps {
//     categories: string[];
//     onFilterChange: (selectedCategories: string[]) => void;
// }

// const FilterMenu: React.FC<FilterProps> = ({ categories, onFilterChange }) => {
//     const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

//     const handleCategoryChange = (category: string) => {
//         const index = selectedCategories.indexOf(category);
//         if (index === -1) {
//             setSelectedCategories([...selectedCategories, category]);
//         } else {
//             setSelectedCategories(selectedCategories.filter(cat => cat !== category));
//         }
//     };

//     const handleApplyFilters = () => {
//         onFilterChange(selectedCategories);
//     };

//     return (
//         <div className="filter-menu">
//             <h3>Filter by Category</h3>
//             <ul>
//                 {categories.map(category => (
//                     <li key={category}>
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 value={category}
//                                 checked={selectedCategories.includes(category)}
//                                 onChange={() => handleCategoryChange(category)}
//                             />
//                             {category}
//                         </label>
//                     </li>
//                 ))}
//             </ul>
//             <button onClick={handleApplyFilters}>Apply Filters</button>
//         </div>
//     );
// };

// export default FilterMenu;