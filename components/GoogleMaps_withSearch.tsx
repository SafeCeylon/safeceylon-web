'use client'

import React, { useEffect, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

export default function GoogleMaps_withSearch() {
    const mapRef = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [marker, setMarker] = useState<google.maps.Marker | null>(null);
    const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    // Optional: Detect user's country code (this could be based on IP or other methods)
    const userCountryCode = 'LK'; // Example: 'LK' for Sri Lanka

    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: "weekly",
                libraries: ['places'], // Include places library
            });

            const { Map } = await loader.importLibrary('maps');
            const { Autocomplete } = await loader.importLibrary('places');

            // Initial location
            const locationInMap = {
                lat: 6.927079,
                lng: 79.861244,
            };

            // Map options
            const options: google.maps.MapOptions = {
                center: locationInMap,
                zoom: 13,
                mapId: "NEXT_MAPS_TUTS",
            };

            // Initialize map
            const mapInstance = new Map(mapRef.current as HTMLDivElement, options);
            setMap(mapInstance);

            // Initialize marker
            const markerInstance = new google.maps.Marker({
                map: mapInstance,
                position: locationInMap,
            });
            setMarker(markerInstance);

            // Initialize place autocomplete
            const placeInput = document.getElementById('place-search-input') as HTMLInputElement;
            const placeAutocompleteInstance = new Autocomplete(placeInput, {
                types: ['geocode'],
                componentRestrictions: { country: userCountryCode }, // Restrict to specific country
            });
            setPlaceAutocomplete(placeAutocompleteInstance);

            // Add listener to handle place changes
            placeAutocompleteInstance.addListener('place_changed', () => {
                const place = placeAutocompleteInstance.getPlace();
                if (place.geometry) {
                    mapInstance.setCenter(place.geometry.location as google.maps.LatLng);
                    mapInstance.setZoom(15);

                    // Update marker position
                    markerInstance.setPosition(place.geometry.location as google.maps.LatLng);
                }
            });
        };

        initializeMap();
    }, []);

    return (
        <div className='relative h-full'>
            <input
                id='place-search-input'
                type='text'
                placeholder='Search for a place'
                className='absolute top-4 left-4 p-2 border rounded-md bg-white z-10'
            />
            <div className='h-full rounded-2xl' ref={mapRef}></div>
        </div>
    );
}
