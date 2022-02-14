import { Route, Routes } from 'react-router-dom';
import './App.scss';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import SignIn from './components/Auth/SignIn';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<h1>dashboard</h1>} />
        </Route>
        <Route path="/settings" element={<ProtectedRoute />}>
          <Route path="/settings" element={<h1>settings</h1>} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
