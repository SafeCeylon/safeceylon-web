'use client'

import React, { useEffect, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { usePathname } from 'next/navigation';
import GMaps_search from '@/components/gMaps_search';
import { any } from 'zod';



// import {locationTableData} from '@/app/(protected)/disaster/dashboard/page'

export default function GoogleMaps_withSearch() {
    const mapRef = React.useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [marker, setMarker] = useState<google.maps.Marker | null>(null);
    const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

    // Optional: Detect user's country code (this could be based on IP or other methods)
    const userCountryCode = 'LK'; // Example: 'LK' for Sri Lanka

    
    var pathname = usePathname().slice(10);
    
    switch (pathname) {
        case 'dashboard':
                // if the current page is disaster/dashboard/page.tsx, import locationTableData
                var { locationTableData } = require('@/app/(protected)/disaster/dashboard/page');
                break;
            default:
                locationTableData = [
                    {
                        type: "DEFAULT",
                        lat: 6.927079,
                        lng: 79.861244,
                    },
                ]            
        }

    // get the locationTableData from the page.tsx and make an add with (lat, lng) pairs
    var locations: any;
    var markerColor: any;
    if (locationTableData) {
        locations = locationTableData.map((location: any) => {
            
            // set marker color based on the type of the disaster
            switch (location.type) {
                case "Flood":
                    markerColor = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
                    break;
                case "LandSlide":
                    markerColor = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
                    break;
                case "Hurricane":
                    markerColor = "http://maps.google.com/mapfiles/ms/icons/purple-dot.png";
                    break;
                default:
                    markerColor = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
            }

            return { lat: location.lat, lng: location.lng, icon: markerColor };
        });
    }else{
        locations = [{ lat: 6.930744760579417, lng: 79.89585272911694 }]
    }
    


    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: "weekly",
                libraries: ['places'], // Include places library
            });

            const { Map } = await loader.importLibrary('maps');
            const { Autocomplete } = await loader.importLibrary('places');
            
            // Initial location (YHE DEFAULT LOCATION)
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

            // Initialize marker (THE DEFAULT MARKER)
            const markerInstance = new google.maps.Marker({
                map: mapInstance,
                position: locationInMap,
            });
            setMarker(markerInstance);

            // Add markers from the locationTableData
            for (let i = 0; i < locations.length; i++) {
                console.log("Setting marker at " + locations[i].lat + " " + locations[i].lng);
                new google.maps.Marker({
                    map: mapInstance,
                    position: {
                        lat: locations[i].lat,
                        lng: locations[i].lng,
                    },
                    icon: locations[i].icon,
                });
            }

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
        <div className='relative h-full '>
            <div className='z-10 mx-[25%] w-[50%] absolute flex justify-center items-center pt-2'>                    
                <GMaps_search />
            </div>
            <div className='h-full rounded-2xl' ref={mapRef}>
            </div>
        </div>
    );
}
