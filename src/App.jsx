import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Dashboard from './components/Dashboard';
import DetailedView from './components/DetailedView';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/city/:cityName" element={<DetailedView />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
