import '@testing-library/jest-dom'; 
import filterDestinationsByType from '../components/FilterDestinations';
import filteredDestinationsSearch from '../components/FilterDestinationBySearch';

interface Destination {
    city: string;
    country: string;
    category: string[]; // Assuming category is an array of strings
}

describe('filterDestinationsByType', () => {
    const destinations = [
        { city: 'Paris', country: 'France', category: ['City', 'Culture'] },
        { city: 'Rome', country: 'Italy', category: ['City', 'Historical'] },
        { city: 'Tokyo', country: 'Japan', category: ['City', 'Culture'] },
    ];

    it('returns all destinations when no tags are provided', () => {
        const filteredDestinations = filterDestinationsByType(destinations);
        expect(filteredDestinations).toEqual(destinations);
    });

    it('filters destinations by provided tags', () => {
        const filteredDestinations = filterDestinationsByType(destinations, ['culture']);
        expect(filteredDestinations).toHaveLength(2); // Paris and Tokyo
        expect(filteredDestinations).toEqual([
            { city: 'Paris', country: 'France', category: ['City', 'Culture'] },
            { city: 'Tokyo', country: 'Japan', category: ['City', 'Culture'] },
        ]);
    });

    it('returns an empty array if no destinations match provided tags', () => {
        const filteredDestinations = filterDestinationsByType(destinations, ['beach']);
        expect(filteredDestinations).toEqual([]);
    });
});

describe('filteredDestinationsSearch', () => {
    const destinations = [
        { city: 'Paris', country: 'France', category: ['City', 'Culture'] },
        { city: 'Rome', country: 'Italy', category: ['City', 'Historical'] },
        { city: 'Tokyo', country: 'Japan', category: ['City', 'Culture'] },
    ];

    it('returns all destinations when search query is empty', () => {
        const filteredDestinations = filteredDestinationsSearch(destinations, '');
        expect(filteredDestinations).toEqual(destinations);
    });

    it('filters destinations by search query', () => {
        const filteredDestinations = filteredDestinationsSearch(destinations, 'Rome');
        expect(filteredDestinations).toHaveLength(1);
        expect(filteredDestinations[0]).toEqual({ city: 'Rome', country: 'Italy', category: ['City', 'Historical'] });
    });

    it('filters destinations by search query case-insensitively', () => {
        const filteredDestinations = filteredDestinationsSearch(destinations, 'tokyo');
        expect(filteredDestinations).toHaveLength(1); // Tokyo
        expect(filteredDestinations[0].city).toEqual('Tokyo');
    });

    it('returns empty array if no destinations match search query', () => {
        const filteredDestinations = filteredDestinationsSearch(destinations, 'beach');
        expect(filteredDestinations).toEqual([]);
    });
});