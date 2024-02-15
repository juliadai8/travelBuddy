import React from 'react';

interface Destination {
    Continent: string;
    Country: string;
    City: string;
    Category: string[];
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
        const lowercaseDestinationCategories = destination.Category.map(cat => cat.toLowerCase());
        // Check if all lowercase categories in lowercaseCategories are included in lowercaseDestinationCategories
        return lowercaseCategories.every(cat => lowercaseDestinationCategories.includes(cat));
    })
}
// Example usage:
const destinations: Destination[] = [
    { Continent: "Europe", Country: "France", City: "Paris", Category: ["City Break", "Culture"] },
    { Continent: "Asia", Country: "Japan", City: "Tokyo", Category: ["City Break", "Culture"] },
    { Continent: "North America", Country: "USA", City: "New York", Category: ["City Break", "Culture"] },
    { Continent: "Europe", Country: "Italy", City: "Rome", Category: ["City Break", "Culture"] },
    { Continent: "Africa", Country: "Kenya", City: "Nairobi", Category: ["City Break", "Safari"] },
    { Continent: "South America", Country: "Peru", City: "Machu Picchu", Category: ["City Break", "Historical"] }
];
// const filteredDestinations = filterDestinationsByType(destinations, ["City Break", "Historical"]);
const filteredDestinations = filterDestinationsByType(destinations, ["City Break", "Historical"]);
console.log(filteredDestinations);