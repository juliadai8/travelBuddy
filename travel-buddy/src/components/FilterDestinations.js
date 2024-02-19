"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param val Helper function to check whether the input parameter is empty
 * @returns true if val is null, false otherwise
 */
function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}
/**
 * Function to filter the list of destinations based on the desired category
 * @param destinations the list of the registered destinations
 * @param category  the category of which we want to filter the list by
 * @returns list of the filtered destinations
 */
function filterDestinationsByType(destinations, categories) {
    if (isEmpty(categories)) {
        return destinations;
    }
    // Convert all category strings to lower case for comparison
    var lowercaseCategories = categories.map(function (cat) { return cat.toLowerCase(); });
    return destinations.filter(function (destination) {
        // Convert all destination category strings to lower case for comparison
        var lowercaseDestinationCategories = destination.Category.map(function (cat) { return cat.toLowerCase(); });
        // Check if all lowercase categories in lowercaseCategories are included in lowercaseDestinationCategories
        return lowercaseCategories.every(function (cat) { return lowercaseDestinationCategories.includes(cat); });
    });
}
// Example usage:
var destinations = [
    { Continent: "Europe", Country: "France", City: "Paris", Category: ["City Break", "Culture"] },
    { Continent: "Asia", Country: "Japan", City: "Tokyo", Category: ["City Break", "Culture"] },
    { Continent: "North America", Country: "USA", City: "New York", Category: ["City Break", "Culture"] },
    { Continent: "Europe", Country: "Italy", City: "Rome", Category: ["City Break", "Culture"] },
    { Continent: "Africa", Country: "Kenya", City: "Nairobi", Category: ["City Break", "Safari"] },
    { Continent: "South America", Country: "Peru", City: "Machu Picchu", Category: ["City Break", "Historical"] }
];
// const filteredDestinations = filterDestinationsByType(destinations, ["City Break", "Historical"]);
var filteredDestinations = filterDestinationsByType(destinations, ["City Break", "Historical"]);
console.log(filteredDestinations);
