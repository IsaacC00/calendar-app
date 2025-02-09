import { Navigate, Route, Routes } from "react-router"
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { getEnvVariables } from "../helpers/getEnvVariables";
import { useEffect } from "react";
import { useAuthStore } from "../hooks/useAuthStore";

export const AppRoute = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();

  }, [])

  if (status === 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }

  getEnvVariables();

  return (
    <Routes>
      {
        //? evaluamos para indicar una u otra ruta
        (status === 'not-authenticated')
          ? (
            <>
              <Route path="/auth/*" element={<LoginPage />} />
              <Route path="/*" element={<Navigate to='auth/login' />} />
            </>

          )
          : (
            <>
              <Route path="/" element={<CalendarPage />} />
              <Route path="/*" element={<Navigate to='/' />} />

            </>
          )
      }
    </Routes>
  )
}
