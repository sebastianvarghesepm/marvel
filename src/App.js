import './App.css';
import DataTable from './pages/DataTable';
import CharacterDetail from './pages/CharacterDetail'
import React, { Suspense} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route exact path="/"  element={<DataTable />} />
                <Route exact path="/character-detail"  element={<CharacterDetail />} />
              </Routes>
        </Suspense>
</Router>
  );
}

export default App;
