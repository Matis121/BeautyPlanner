import "./App.css";
import Clients from "./pages/Clients";
import Services from "./pages/Services";
import Calendar from "./pages/Calendar";
import WorkHours from "./pages/WorkHours";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./privateRoute/PrivateRoute";
import ClientVisitHistory from "./components/client/ClientVisitHistory";
import { WrapMenuContext } from "./Contexts/WrapMenuContext";
import { MobileMenuContext } from "./Contexts/MobileMenuContext";
import { SmallCalendarContext } from "./Contexts/SmallCalendarContext";
import { useState } from "react";

function App() {
  const [wrapMenu, setWrapMenu] = useState(false);
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const [toggleSmallCalendar, setToggleSmallCalendar] = useState(true);

  return (
    <>
      <WrapMenuContext.Provider value={{ wrapMenu, setWrapMenu }}>
        <MobileMenuContext.Provider
          value={{ toggleMobileMenu, setToggleMobileMenu }}
        >
          <SmallCalendarContext.Provider
            value={{ toggleSmallCalendar, setToggleSmallCalendar }}
          >
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Calendar />
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
                path="/work-hours"
                element={
                  <PrivateRoute>
                    <WorkHours />
                  </PrivateRoute>
                }
              />
            </Routes>
          </SmallCalendarContext.Provider>
        </MobileMenuContext.Provider>
      </WrapMenuContext.Provider>
    </>
  );
}

export default App;
