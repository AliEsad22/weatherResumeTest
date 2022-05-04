import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "../components/Login"
import PrivateRoute from "./PrivateRoute"
import Search from "../components/Search/index"
import WeatherDetails from "../components/WeatherDetails/index"

const CustomRoutes = () => {
  return (
    <Routes>
      <Route
        path="/weather/:city"
        element={
          <PrivateRoute>
            <Search />
            <WeatherDetails />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Login />} />
    </Routes>
  )
}

export default CustomRoutes
