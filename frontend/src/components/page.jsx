import { GoogleMap as MapComponent, Marker, useLoadScript, Circle, StandaloneSearchBox } from "@react-google-maps/api"
import { useMemo, useState,useEffect, useRef} from "react"
import "./style.css"
import { Radius as RadiusIcon } from "lucide-react"


const GoogleMapComponent = ({
    Radius,
    setLatitude,
    setLongitude,
    style,
    address,
    setAddress,
    latitude,
    longitude,
}) => {
    const [map, setMap] =  useState(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    })

    // NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ฝากเเปะไว้ NEXT_GOOGLE_MAPS_API_KEY

    const center = useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude])

    const changeCoordinate = (coord, index) => {
        const { latlng } = coord;
        const lat = latlng.lat();
        const lng = latlng.lng();
        setLatitude(lat);
        setLongitude(lng);
    }

    useEffect(() => {
        map?.panTo({ lat: latitude, lng: longitude })
    }, [latitude, longitude])

    const inputRef = useRef();

    // ORIGINAL CODE
    // const handlePlaceChanged = () => {
    //     const [place] = inputRef.current.getPlaces();

    //     if (place){
    //         setAddress(place.formatted_address);
    //         setLatitude(place.geometry.location.lat());
    //         setLongitude(place.geometry.location.lng());
    //     }
    // }

    const handlePlaceChanged = () => {
        if (!inputRef.current) return;
        const places = inputRef.current.getPlaces();
        if (places.length === 0) return;
    
        const place = places[0]; // ใช้ place ที่เจอ
        setAddress(place.formatted_address);
        setLatitude(place.geometry.location.lat());
        setLongitude(place.geometry.location.lng());
    };
    

    return (
        <div className="w-full h-96">
            {
                !isLoaded ? (
                    <h1>Loading...</h1>
                ) : (
                    <MapComponent mapContainerClassName="map-container"
                    center={center}
                    zoom={15}
                    onLoad={(map) => setMap(map)}
                    >
                        
                        <StandaloneSearchBox
                        onLoad={(ref) => inputRef.current = ref}
                        onPlacesChanged={handlePlaceChanged}
                        >

                            <div className="relative ml-48 mt-[10px] w-[500px]">
                                <input
                                type = "text"
                                className = {'form-control text-black rounded-full bg-white ${style}'}
                                value = {address}
                                placeholder = "Seacrh Location..."
                                onChange = {(e) => setAddress(e.target.value)}
                                />

                            </div>

                        </StandaloneSearchBox>

                        <button className="z-50 flex justify-center items-center w-12 h-12 transition duration-300 rounded-full hover:bg-stone-100 border-2 border-cyan-400 absolute right-[60px] top-[17px]"
                        onClick = {() => map.panTo( {lat: latitude, lng: longitude})}
                        >
                            <span className="text-xs text-black">Click me</span>

                        
                        </button>

                    <Marker
                    draggable
                    animation={isLoaded ? google.maps.Animation.DROP : null}
                    onDragEnd={changeCoordinate}
                    position={{lat : latitude, lng : longitude}}
                    />

                    <Circle
                    options={{
                        fillColor: "#FF0000",
                        strokePosition: 0.8,
                        strokeColor: "#FF0000",
                        strokeWeight: 2,
                        fillOpacity: 0.35,
                    }}
                    />

                    </MapComponent>
                )
            }
        </div>
    )
}

export default GoogleMapComponent;
