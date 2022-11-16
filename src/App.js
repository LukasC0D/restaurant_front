import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Home from './components/Home';
import Header from './components/header/Header';
import Register from './components/Register';
import Login from "./components/Login";
import Restaurant from './components/restourants/Restaurant';
import Restaurants from './components/restourants/Restaurants';
import Dishes from './components/dishes/Dishes';
import Dish from './components/dishes/Dish';
import RateDish from './components/rateDish/RateDish';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className="container py-3">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/:id" element={<Restaurant />} />
            <Route path="/restaurants/create" element={<Restaurant />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/dishes" element={<Dishes />} />
            <Route path="/rate/:id" element={<RateDish />} />
            <Route path="/dishes/:id" element={<Dish />} />
            <Route path="/dishes/create" element={<Dish />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
