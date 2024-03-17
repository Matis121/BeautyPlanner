import "./App.css";
import Clients from "./pages/Clients";
import Services from "./pages/Services";
import Calendar from "./pages/Calendar";
import Statistics from "./pages/Statistics";
import WorkHours from "./pages/WorkHours";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./privateRoute/PrivateRoute";
import ClientVisitHistory from "./components/client/ClientVisitHistory";
import { WrapMenuContext } from "./Contexts/WrapMenuContext";
import { MobileMenuContext } from "./Contexts/MobileMenuContext";
import { SmallCalendarContext } from "./Contexts/SmallCalendarContext";
import { UserDataContext } from "./Contexts/UserDataContext";
import { useEffect, useState } from "react";

function App() {
  const [wrapMenu, setWrapMenu] = useState(false);
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const [toggleSmallCalendar, setToggleSmallCalendar] = useState(true);

  const userToken: string | null = localStorage.getItem("user") ?? "";
  const userData = JSON.parse(userToken).username;

  // CHECK WIDTH
  const isMobile = window.innerWidth <= 768;

  // DEFAULT STATE OF SMALL CALENDAR ON MOBILE
  useEffect(() => {
    if (isMobile) {
      setToggleSmallCalendar(false);
    }
  }, []);

  return (
    <>
      <WrapMenuContext.Provider value={{ wrapMenu, setWrapMenu }}>
        <MobileMenuContext.Provider
          value={{ toggleMobileMenu, setToggleMobileMenu }}
        >
          <SmallCalendarContext.Provider
            value={{ toggleSmallCalendar, setToggleSmallCalendar }}
          >
            <UserDataContext.Provider value={{ userData }}>
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route
                  path="/resetPassword/:token"
                  element={<ResetPassword />}
                />

                <Route
                  path="/"
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
                  path="/statistics"
                  element={
                    <PrivateRoute>
                      <Statistics />
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
            </UserDataContext.Provider>
          </SmallCalendarContext.Provider>
        </MobileMenuContext.Provider>
      </WrapMenuContext.Provider>
    </>
  );
}

export default App;
