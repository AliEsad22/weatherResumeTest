import axios from "axios"
const searchWeather = (query, lang) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=3b74232e7dd3c2951795e2a8574017d7&units=metric&lang=${lang}`
  )
}
export { searchWeather }
