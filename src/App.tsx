import React from 'react';
import {Routes, Route} from "react-router-dom";
import LocationComponent from "./findLocation";
import NotFound from "./notFound";

const App = () => {
  return(
    <div className="app">
      <Routes>
        <Route path="/" element={<LocationComponent />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </div>
  )
}


export default App;
