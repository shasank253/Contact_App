import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ContactsPage from './pages/ContactsPage';
import ContactForm from './components/ContactForm';
import ContactDetail from './components/ContactDetail';
import DashboardPage from './pages/DashboardPage';
import MapComponent from './components/Map';
import { store } from './store/store';
import './App.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Contact Management System</h1>
      </nav>
      <div className="main-content">
        <div className="sidebar">
          <button onClick={() => navigate('/')} className="btn">Contacts</button>
          <button onClick={() => navigate('/dashboard')} className="btn">Dashboard</button>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<ContactsPage />} />
            <Route path="/add" element={<ContactForm />} />
            <Route path="/edit/:id" element={<ContactForm />} />
            <Route path="/details/:id" element={<ContactDetail />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/map" element={<MapComponent />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
