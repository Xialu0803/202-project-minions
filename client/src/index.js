import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Departures from './pages/allUsers/Departures';
import Arrivals from './pages/allUsers/Arrivals';
import Baggage from './pages/allUsers/Baggage'
import Carousel from './pages/AirportEmployee/Carousel';
import Assignment from './pages/AirportEmployee/Assignment';
import Management from './pages/AirportEmployee/Management';
import Add from './pages/AirlineEmployee/Add';
import Change from './pages/AirlineEmployee/Change';
import Login from './components/Login'

ReactDOM.render(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Departures />} />
        <Route path="departures" element={<Departures />} />
        <Route path="arrivals" element={<Arrivals />} />
        <Route path="baggage" element={<Baggage />} />
        <Route path="gate_assignment" element={<Assignment />} />
        <Route path="gate_management" element={<Management />} />
        <Route path="carousel" element={<Carousel />} />
        <Route path="add_flight" element={<Add />} />
        <Route path="change_information" element={<Change />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
