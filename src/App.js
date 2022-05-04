import { useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import CustomRoutes from "./router/CustomRoutes"

function App() {
  useEffect(() => {
    return () => {
      localStorage.removeItem("token")
      localStorage.removeItem("password")
    }
  }, [])

  return (
    <BrowserRouter>
      <CustomRoutes />
    </BrowserRouter>
  )
}

export default App
