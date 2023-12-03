import "./App.css";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Services from "./pages/Services";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./privateRoute/PrivateRoute";
import ClientVisitHistory from "./components/client/ClientVisitHistory";
import { WrapMenuContext } from "./Contexts/WrapMenuContext";
import { MobileMenuContext } from "./Contexts/MobileMenuContext";
import { useState } from "react";

function App() {
  const [wrapMenu, setWrapMenu] = useState(false);
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  return (
    <>
      <WrapMenuContext.Provider value={{ wrapMenu, setWrapMenu }}>
        <MobileMenuContext.Provider
          value={{ toggleMobileMenu, setToggleMobileMenu }}
        >
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <PrivateRoute>
                  <Calendar />
                </PrivateRoute>
              }
            />
            <Route
              path="/clients"
              element={
                <PrivateRoute>
                  <Clients />
                </PrivateRoute>
              }
            />
            <Route
              path="/clients/:clientId"
              element={
                <PrivateRoute>
                  <ClientVisitHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="/services"
              element={
                <PrivateRoute>
                  <Services />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
          </Routes>
        </MobileMenuContext.Provider>
      </WrapMenuContext.Provider>
    </>
  );
}

export default App;
