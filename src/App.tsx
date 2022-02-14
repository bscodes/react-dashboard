import { Route, Routes } from 'react-router-dom';
import './App.scss';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/Auth/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route path="/settings" element={<ProtectedRoute />}>
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
