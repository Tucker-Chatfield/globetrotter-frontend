import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import FootprintList from './components/FootprintList/FootprintList';
import FootprintDetails from './components/FootprintDetails/FootprintDetails';
import FootprintForm from './components/FootprintForm/FootprintForm';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as footprintService from './services/footprintService';
import * as authService from '../src/services/authService'; 

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); 
  const [footprints, setFootprints] = useState([]);
  const navigate = useNavigate();

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

  const handleAddFootprint = async (footprintFormData) => {
    const newFootprint = await footprintService.create(footprintFormData);
    setFootprints([newFootprint, ...footprints]);
    navigate('/footprints');
  };

  const handleDeleteFootprint = async (footprintId) => {
    const deletedFootprint = await footprintService.deleteFootprint(footprintId);
    setFootprints(footprints.filter((footprint) => footprint._id !== deletedFootprint._id));
    navigate('/footprints');
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
            <Route path="/footprints/:footprintId" element={<FootprintDetails handleDeleteFootprint={handleDeleteFootprint} />} />
            <Route path="/footprints/new" element={<FootprintForm handleAddFootprint={handleAddFootprint} />} />
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
