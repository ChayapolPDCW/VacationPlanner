'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Plan creation state
  const [destination, setDestination] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [itinerary, setItinerary] = useState([]);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle user registration
  const handleRegister = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
        username,
        email,
        password,
      });
      setError('');
      alert('Registration successful! Please log in.');
    } catch (err) {
      setError(err.response?.data?.message || 'Error registering user');
    }
  };

  // Handle user login
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error logging in');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    setEmail('');
    setPassword('');
  };

  // Handle plan submission
  const handlePlanSubmit = async () => {
    if (!isLoggedIn) {
      setError('Please log in to create a plan');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/plans/create`,
        {
          title: destination,
          startLocation: destination,
          endLocation: endLocation || destination, // Fallback to destination if endLocation is empty
          startTime: startDate,
          endTime: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const planId = response.data.planId;
      const days = [];
      const start = new Date(startDate);
      const end = new Date(endDate);
      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        days.push({ date: new Date(d), places: [] });
      }
      setItinerary(days);
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating plan');
    }
  };

  // Render login/register form if not logged in
  if (!isLoggedIn) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Vacation Planner</h1>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleRegister}>Register</button>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  // Render plan creation form if logged in
  return (
    <div style={{ padding: '20px' }}>
      <h1>Vacation Planner</h1>
      <button onClick={handleLogout}>Logout</button>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
          />
          <br />
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            placeholder="Enter end location"
          />
          <br />
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <br />
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <br />
          <button onClick={handlePlanSubmit}>Create Plan</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {itinerary.map((day, index) => (
            <div key={index}>
              <h3>{day.date.toDateString()}</h3>
            </div>
          ))}
        </div>
        <div id="map" style={{ width: '50%', height: '400px' }}></div>
      </div>
    </div>
  );
}