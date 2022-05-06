/* eslint-disable react-hooks/rules-of-hooks */
import moment from "moment"
import { FaTemperatureHigh } from "react-icons/fa"
import { BiDownvote, BiUpvote } from "react-icons/bi"
import { BsFillCalendarDateFill } from "react-icons/bs"
import { IoMdWater } from "react-icons/io"
import { AiOutlineSearch } from "react-icons/ai"
import React, { useEffect, useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { searchWeather } from "../../api/api-services"
import { StyledBackground, StyledCard } from "./index.styles"
import { Button } from "react-bootstrap"

const index = () => {
  let { city, lang } = useParams()
  const [cityData, setCityData] = useState([])
  const [resp, setResp] = useState()
  const [basamak, setBasamak] = useState()
  const [refreshKey, setRefreshKey] = useState(0)
  const [lg, setLg] = useState(lang)
  moment.locale(lg)
  const [now, setNow] = useState(new moment())
  useEffect(() => {
    searchWeather(city, lg).then((resp) => {
      console.log(resp)
      document.title =
        lg === "en"
          ? `${resp.data.name.toUpperCase()} WEATHER FORECAST `
          : `${resp.data.name.toUpperCase()} HAVA DURUMU`
      setNow(new moment())
      setResp(resp.status)
      setCityData([
        resp.data.weather[0].description.toUpperCase(),
        resp.data.sys.country,
        Math.floor(resp.data.main.temp),
        Math.floor(resp.data.main.temp_min),
        Math.floor(resp.data.main.temp_max),
        resp.data.main.humidity,
        resp.data.weather[0].id,
        resp.data.name.toUpperCase(),
      ])

      setBasamak(Math.floor(resp.data.weather[0].id / 100))
      console.log(basamak)
    })
    return () => {
      setCityData([])
      setResp(0)
      setNow()
    }
  }, [refreshKey, lg])
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const onSubmit = (e) => {
    e.preventDefault()
    if (searchTerm) {
      navigate(`/weather/${lg}/${searchTerm}`)
      setSearchTerm("")

      setRefreshKey(refreshKey + 1)
    }
  }
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <>
      <form onSubmit={onSubmit} className="d-flex">
        <Form.Control
          type="text"
          autoFocus="autoFocus"
          placeholder={lg === "en" ? "Search..." : "Şehir Giriniz..."}
          value={searchTerm}
          onChange={handleOnChange}
          style={{ border: "1px solid #5e43c4", borderRadius: "0px" }}
        />

        <Button
          type="submit"
          variant="dark"
          className="text-center"
          style={{ borderRadius: "0px", height: "6vh" }}
        >
          <AiOutlineSearch />
        </Button>
      </form>
      <StyledBackground>
        <StyledCard>
          {resp === 200 ? (
            <>
              <h1 className="text-center">
                {cityData[7] + ", " + cityData[1]}
              </h1>
              <Form.Check
                type="switch"
                id="custom-switch"
                className="d-flex switch"
                label={`${lang === "tr" ? "TR-EN" : "EN-TR"}`}
                checked={lg !== lang}
                onChange={() => {
                  setLg(lg === "en" ? "tr" : "en")
                }}
              />
            </>
          ) : (
            <h1 className="text-center">
              {lg === "tr" ? "ŞEHİR BULUNAMADI" : "CITY UNDEFINED"}
            </h1>
          )}

          <Row>
            <Col lg={7}>
              {resp === 200 ? (
                <img
                  src={
                    resp === 404
                      ? ""
                      : basamak === 2
                      ? "https://media.giphy.com/media/VJq6ahBLV6O3lR8SB5/giphy.gif"
                      : basamak === 3
                      ? "https://media.giphy.com/media/iib1hS2h5d968jKEJ5/giphy.gif"
                      : basamak === 5
                      ? "https://media.giphy.com/media/EEFEyXLO9E0YE/giphy.gif"
                      : basamak === 6
                      ? "https://media.giphy.com/media/PtgBUWepLWMHqGsApe/giphy.gif"
                      : basamak === 7
                      ? "https://media.giphy.com/media/cPSj5rgV2M9yDKHzCj/giphy.gif"
                      : cityData[6] === 800
                      ? "https://media.giphy.com/media/fwR54Wq7dYu9VXKiAF/giphy.gif"
                      : Math.floor(cityData[6] / 10) === 80
                      ? "https://media.giphy.com/media/2AMBtjL26O65qciYjR/giphy.gif"
                      : ""
                  }
                  alt={cityData[0]}
                  style={{
                    width: "22rem",
                    imageRendering: "pixelated",
                  }}
                />
              ) : (
                <></>
              )}
            </Col>

            <Col lg={5}>
              <div>
                {resp === 200 ? (
                  <ul style={{ listStyle: "none" }}>
                    <li>
                      <h2>{cityData[0]}</h2>
                    </li>
                    <li>
                      <h3 style={{ color: "gray" }}>
                        <BsFillCalendarDateFill color="blue" />{" "}
                        {lg === "en" ? "Date :" : "Tarih :"}
                        {now.format("MMM Do YY")}
                      </h3>
                    </li>
                    <li>
                      <h3 style={{ color: "gray" }}>
                        <FaTemperatureHigh color="red" />{" "}
                        {lg === "en" ? "Temp :" : "Sıcaklık :"} {cityData[2]}
                      </h3>
                    </li>
                    <li>
                      <h3 style={{ color: "gray" }}>
                        <BiUpvote color="green" />
                        {lg === "en" ? "Max-Temp :" : "Max-Derece :"}{" "}
                        {cityData[4]}
                      </h3>
                    </li>
                    <li>
                      <h3 style={{ color: "gray" }}>
                        <BiDownvote color="red" />{" "}
                        {lg === "en" ? "Min-Temp :" : "Min-Derece :"}{" "}
                        {cityData[3]}
                      </h3>
                    </li>
                    <li>
                      <h3 style={{ color: "gray" }}>
                        <IoMdWater color="blue" />{" "}
                        {lg === "en" ? "Humidity :" : "Nem :"} %{cityData[5]}
                      </h3>
                    </li>
                  </ul>
                ) : (
                  <></>
                )}
              </div>
            </Col>
          </Row>
        </StyledCard>
      </StyledBackground>
    </>
  )
}

export default index
