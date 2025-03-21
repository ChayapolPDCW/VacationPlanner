'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import {
  LoadScript,
  GoogleMap,
  Marker,
  Polyline,
  Autocomplete,
} from '@react-google-maps/api';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const libraries = ['places'];

export default function PlanDetails() {
  const router = useRouter();
  const { planId } = useParams();
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [itinerary, setItinerary] = useState([]);
  const [placeName, setPlaceName] = useState('');
  const [placeType, setPlaceType] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [error, setError] = useState('');
  const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
  const [markers, setMarkers] = useState([]);
  const [distances, setDistances] = useState({}); // Store distances and travel times

  useEffect(() => {
    if (planId !== 'new') {
      // Fetch existing plan details if editing
      const fetchPlan = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plans/${planId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const plan = response.data;
          setDestination(plan.title);
          setStartDate(plan.startTime.split('T')[0]);
          setEndDate(plan.endTime.split('T')[0]);

          // Fetch itinerary
          const itineraryResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plans/${planId}/itinerary`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setItinerary(itineraryResponse.data);

          // Set markers for existing places
          const newMarkers = [];
          itineraryResponse.data.forEach((day) => {
            day.places.forEach((place) => {
              if (place.lat && place.lng) {
                newMarkers.push({ lat: place.lat, lng: place.lng });
              }
            });
          });
          setMarkers(newMarkers);

          // Calculate distances for existing places
          calculateDistances(itineraryResponse.data);
        } catch (error) {
          setError(error.response?.data?.message || 'Error fetching plan');
        }
      };
      fetchPlan();
    }
  }, [planId]);

  const onDestinationLoad = (autocomplete) => {
    setDestinationAutocomplete(autocomplete);
  };

  const onPlaceLoad = (autocomplete) => {
    setPlaceAutocomplete(autocomplete);
  };

  const onDestinationPlaceChanged = () => {
    if (destinationAutocomplete) {
      const place = destinationAutocomplete.getPlace();
      setDestination(place.formatted_address || place.name);
      if (place.geometry) {
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  const onPlaceChanged = (dayIndex) => {
    if (placeAutocomplete) {
      const place = placeAutocomplete.getPlace();
      setPlaceName(place.formatted_address || place.name);
      if (place.geometry) {
        const newMarker = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setMarkers([...markers, newMarker]);
      }
    }
  };

  const handlePlanSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plans/create`,
        {
          title: destination,
          startLocation: destination,
          endLocation: destination,
          startTime: startDate,
          endTime: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const newPlanId = response.data.planId;
      const days = [];
      const start = new Date(startDate);
      const end = new Date(endDate);
      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        days.push({ date: new Date(d), places: [] });
      }
      setItinerary(days);
      router.push(`/plans/${newPlanId}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating plan');
    }
  };

  const handleAddPlace = async (dayIndex) => {
    if (!placeName) return;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plans/${planId}/itinerary`,
        {
          placeName,
          placeType,
          openTime,
          closeTime,
          date: itinerary[dayIndex].date.toISOString().split('T')[0],
          orderIndex: itinerary[dayIndex].places.length,
          lat: markers[markers.length - 1]?.lat || 0,
          lng: markers[markers.length - 1]?.lng || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const updatedItinerary = [...itinerary];
      updatedItinerary[dayIndex].places.push({
        id: `${dayIndex}-${placeName}-${Date.now()}`, // Temporary ID for DndKit
        placeName,
        placeType,
        openTime,
        closeTime,
        lat: markers[markers.length - 1]?.lat || 0,
        lng: markers[markers.length - 1]?.lng || 0,
      });
      setItinerary(updatedItinerary);
      setPlaceName('');
      setPlaceType('');
      setOpenTime('');
      setCloseTime('');

      // Recalculate distances
      calculateDistances(updatedItinerary);
    } catch (error) {
      setError(error.response?.data?.message || 'Error adding place');
    }
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setPlaceName(results[0].formatted_address);
        setMarkers([...markers, { lat, lng }]);
      }
    });
  };

  const calculateDistances = useCallback((itineraryData) => {
    const service = new window.google.maps.DistanceMatrixService();
    const newDistances = {};

    itineraryData.forEach((day, dayIndex) => {
      const places = day.places;
      if (places.length < 2) return;

      const origins = places.slice(0, -1).map((place) => ({
        lat: place.lat,
        lng: place.lng,
      }));
      const destinations = places.slice(1).map((place) => ({
        lat: place.lat,
        lng: place.lng,
      }));

      service.getDistanceMatrix(
        {
          origins,
          destinations,
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK') {
            response.rows.forEach((row, i) => {
              const element = row.elements[i];
              if (element.status === 'OK') {
                newDistances[`${dayIndex}-${i}`] = {
                  distance: element.distance.text,
                  duration: element.duration.text,
                };
              }
            });
            setDistances({ ...newDistances });
          }
        }
      );
    });
  }, []);

  const SortableItem = ({ place, placeIndex, dayIndex }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: place.id,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="mt-2 p-2 border rounded flex justify-between items-center cursor-move"
      >
        <div>
          <p className="font-semibold">📍 {place.placeName}</p>
          <p className="text-gray-600">{place.placeType}</p>
          <p className="text-gray-600">{place.openTime} - {place.closeTime}</p>
          {placeIndex < itinerary[dayIndex].places.length - 1 && distances[`${dayIndex}-${placeIndex}`] && (
            <p className="text-gray-600">
              {distances[`${dayIndex}-${placeIndex}`].distance}, {distances[`${dayIndex}-${placeIndex}`].duration}
            </p>
          )}
        </div>
      </div>
    );
  };

  const handleDragEnd = (event, dayIndex) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const updatedItinerary = [...itinerary];
      const oldIndex = updatedItinerary[dayIndex].places.findIndex((place) => place.id === active.id);
      const newIndex = updatedItinerary[dayIndex].places.findIndex((place) => place.id === over.id);

      const newPlaces = [...updatedItinerary[dayIndex].places];
      const [movedItem] = newPlaces.splice(oldIndex, 1);
      newPlaces.splice(newIndex, 0, movedItem);

      updatedItinerary[dayIndex].places = newPlaces;

      // Update visit_order in the backend
      updatedItinerary[dayIndex].places.forEach(async (place, index) => {
        try {
          await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plans/${planId}/itinerary/${place.id}`,
            { visitOrder: index },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
        } catch (error) {
          console.error('Error updating place order:', error);
        }
      });

      setItinerary(updatedItinerary);
      setMarkers(updatedItinerary.flatMap((day) =>
        day.places.map((place) => ({ lat: place.lat, lng: place.lng }))
      ));
      calculateDistances(updatedItinerary);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <div className="p-5">
        <h1 className="text-2xl font-bold">Create Plan</h1>
        <div className="mt-4 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Where do you want to go?</h2>
          <Autocomplete onLoad={onDestinationLoad} onPlaceChanged={onDestinationPlaceChanged}>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              className="border p-2 w-full rounded mt-2"
            />
          </Autocomplete>
          <div className="flex space-x-4 mt-2">
            <div className="w-1/2">
              <label>Start date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 w-full rounded mt-1"
              />
            </div>
            <div className="w-1/2">
              <label>End date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 w-full rounded mt-1"
              />
            </div>
          </div>
          {planId === 'new' && (
            <button onClick={handlePlanSubmit} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
              Create Plan
            </button>
          )}
        </div>

        {itinerary.length > 0 && (
          <div className="flex mt-4">
            <div className="w-1/2">
              <h2 className="text-lg font-bold">Itinerary ({itinerary.length} Days)</h2>
              {itinerary.map((day, index) => (
                <div key={index} className="mt-4 p-4 border rounded-lg">
                  <h3 className="text-lg font-semibold">{index + 1} {day.date.toLocaleDateString()}</h3>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(event) => handleDragEnd(event, index)}
                  >
                    <SortableContext
                      items={day.places.map((place) => place.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {day.places.map((place, placeIndex) => (
                        <SortableItem
                          key={place.id}
                          place={place}
                          placeIndex={placeIndex}
                          dayIndex={index}
                        />
                      ))}
                    </SortableContext>
                  </DndContext>
                  <Autocomplete onLoad={onPlaceLoad} onPlaceChanged={() => onPlaceChanged(index)}>
                    <input
                      type="text"
                      value={placeName}
                      onChange={(e) => setPlaceName(e.target.value)}
                      placeholder="Add a place"
                      className="border p-2 w-full rounded mt-2"
                    />
                  </Autocomplete>
                  <input
                    type="text"
                    placeholder="Place type (e.g., Restaurant)"
                    value={placeType}
                    onChange={(e) => setPlaceType(e.target.value)}
                    className="border p-2 w-full rounded mt-2"
                  />
                  <div className="flex space-x-4 mt-2">
                    <input
                      type="time"
                      value={openTime}
                      onChange={(e) => setOpenTime(e.target.value)}
                      className="border p-2 w-1/2 rounded"
                    />
                    <input
                      type="time"
                      value={closeTime}
                      onChange={(e) => setCloseTime(e.target.value)}
                      className="border p-2 w-1/2 rounded"
                    />
                  </div>
                  <button
                    onClick={() => handleAddPlace(index)}
                    className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                  >
                    Add a place
                  </button>
                </div>
              ))}
            </div>
            <div className="w-1/2 ml-4">
              <GoogleMap
                mapContainerStyle={{ height: '600px', width: '100%' }}
                center={mapCenter}
                zoom={10}
                onClick={handleMapClick}
              >
                {markers.map((marker, index) => (
                  <Marker key={index} position={marker} />
                ))}
                {markers.length > 1 && (
                  <Polyline
                    path={markers}
                    options={{
                      strokeColor: '#FF0000',
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                    }}
                  />
                )}
              </GoogleMap>
            </div>
          </div>
        )}

        {itinerary.length > 0 && (
          <button onClick={() => router.push(`/journal/${planId}`)} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
            Save
          </button>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </LoadScript>
  );
}