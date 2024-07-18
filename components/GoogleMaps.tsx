'use cliet'

import React, { useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

export default function GoogleMaps() {

    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: "weekly",
            });

            const {Map} = await loader.importLibrary('maps');

            // location of Colombo
            const locationInMap = {
                lat: 6.927079,
                lng: 79.861244,
            };

            // MARKER

            const {Marker} = (await loader.importLibrary('marker')) as google.maps.MarkerLibrary;

            // Google Maps Options

            const options: google.maps.MapOptions = {
                center: locationInMap,
                zoom: 13,
                mapId: "NEXT_MAPS_TUTS",
            };

            const map = new Map(mapRef.current as HTMLDivElement, options);
            
            // Add the marker in the map

            const marker = new Marker({
                map: map,
                position: locationInMap, 
            })
            
        };

        initializeMap();

    }, []);

  return (
    <div className='h-full rounded-2xl' ref={mapRef} >
    </div>
  )
}
