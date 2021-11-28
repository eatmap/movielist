import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';

import ProtectedRoute from './components/protected-route';
import AuthRoute from './components/auth-route';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import NoFoundPage from './pages/404';
import SearchPage from './pages/search';
import WatchlistPage from './pages/watchlist';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<SearchPage />} />
          </Route>
          <Route exact path="/watchlist" element={<ProtectedRoute />}>
            <Route exact path="/watchlist" element={<WatchlistPage />} />
          </Route>
          <Route exact path="/login" element={<AuthRoute />}>
            <Route exact path="/login" element={<LoginPage />} />
          </Route>
          <Route exact path="/register" element={<AuthRoute />}>
            <Route exact path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="*" element={<NoFoundPage />} />
        </Routes>
        <ToastContainer theme="colored" />
      </Router>
    </ChakraProvider>
  );
}

export default App;
