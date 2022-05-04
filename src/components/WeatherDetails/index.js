/* eslint-disable react-hooks/rules-of-hooks */
import moment from "moment"
import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { searchWeather } from "../../api/api-services"

const index = () => {
  const { city } = useParams()
  const [cityData, setCityData] = useState([])
  const [imgUrl, setImgUrl] = useState()
  const [resp, setResp] = useState()
  useEffect(() => {
    searchWeather(city).then((resp) => {
      console.log(resp)

      setResp(resp.status)
      setCityData(
        resp.status === 404
          ? []
          : [
              resp.data.weather[0].description.toUpperCase(),
              resp.data.sys.country,
              Math.floor(resp.data.main.temp),
              Math.floor(resp.data.main.temp_min),
              Math.floor(resp.data.main.temp_max),
              resp.data.main.humidity,
            ]
      )

      setImgUrl(
        "http://openweathermap.org/img/wn/" +
          resp.data.weather[0].icon +
          "@2x.png"
      )
      console.log(imgUrl)
    })
  }, [city])

  return (
    <div>
      <Container>
        <Row>
          <Col lg={7}>
            <img
              src={imgUrl}
              alt={cityData[0]}
              style={{
                width: "22rem",
                imageRendering: "pixelated",
              }}
            />
          </Col>

          <Col lg={5}>
            <div>
              {resp === 200 ? (
                <ul>
                  <li>
                    <h3>{city.toLocaleUpperCase() + ", " + cityData[1]}</h3>
                  </li>
                  <li>
                    <h4>{cityData[0]}</h4>
                  </li>
                  <li>Date: {moment().format("MMM Do YY")}</li>
                  <li>Temp: {cityData[2]}</li>
                  <li>Min-Temp: {cityData[3]}</li>
                  <li>Max-Temp: {cityData[4]}</li>
                  <li>Humidty: %{cityData[5]}</li>
                </ul>
              ) : (
                <h1>ŞEHİR BULUNAMADI</h1>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default index
