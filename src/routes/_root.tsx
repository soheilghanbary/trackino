import { Header } from "@/components/header";
import { Spinner } from "@/components/icons/spinner";
import { ProtectedRoute } from "@/components/protected-route";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./home"));
const About = lazy(() => import("./about"));
const Register = lazy(() => import("./register"));
const Login = lazy(() => import("./login"));
const LogOut = lazy(() => import("./logout"));
const Dashboard = lazy(() => import("./dashboard"));
const Settings = lazy(() => import("./settings"));

const LoadingPage = () => (
  <div className="mx-auto flex min-h-40 w-full items-center justify-center">
    <Spinner className="fill-primary" />
  </div>
);

export const RouteProvider = () => (
  <BrowserRouter>
    <Header />
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="sign-out" element={<LogOut />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
