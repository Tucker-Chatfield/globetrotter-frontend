import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import FootprintList from './components/FootprintList/FootprintList';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as footprintService from './services/footprintService';
import * as authService from '../src/services/authService'; 

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); 
  const [footprints, setFootprints] = useState([]);

  useEffect(() => {
    const fetchAllFootprints = async () => {
      const footprintData = await footprintService.index();
      
      setFootprints(footprintData);
    };
    if (user) fetchAllFootprints();
  }, [user]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            // Protected Routes:
            <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/footprints" element={<FootprintList footprints={footprints} />} />
            </>
          ) : (
            // Public Routes:
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
