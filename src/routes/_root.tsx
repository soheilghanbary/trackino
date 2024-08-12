import { Header } from '@/components/header';
import { ProtectedRoute } from '@/components/protected-route';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { About } from './about';
import { Dashboard } from './dashboard';
import { Home } from './home';
import { Login } from './login';
import { Register } from './register';

export const RouteProvider = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
