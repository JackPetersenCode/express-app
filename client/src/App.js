import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Layout from './pages/Layout';
import SearchResults from './pages/searchResults';
import Businesses from './pages/businesses';
import AddBusiness from './pages/addbusiness';
import Profile from './components/Profile';
import Register from './components/Register';
import Login from './components/Login';
import ReviewsPage from './pages/ReviewsPage';

function App() {
  
  const [profile, setProfile] = useState('');
  const [images, setImages] = useState([]);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Businesses/:name" element={<Businesses />} />
            <Route path=":input" element={<SearchResults />} />
            <Route path="AddBusiness" element={<AddBusiness profile={profile} setProfile={setProfile} />} />
            <Route path="Profile" element={<Profile profile={profile} setProfile={setProfile} />} />
            <Route path="Register" element={<Register profile={profile} setProfile={setProfile} />} />
            <Route path="Login" element={<Login profile={profile} setProfile={setProfile} />} />
            <Route path="ReviewsPage" element={<ReviewsPage profile={profile} />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )};

export default App;
