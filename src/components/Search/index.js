/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"

export default function index() {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const onSubmit = (e) => {
    e.preventDefault()

    if (searchTerm) {
      navigate(`/weather/${searchTerm}`)
      setSearchTerm("")
    }
  }
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <form onSubmit={onSubmit} className="d-flex">
      <Form.Control
        type="text"
        autoFocus="autoFocus"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleOnChange}
      />
      <button type="submit">
        <AiOutlineSearch />
      </button>
    </form>
  )
}
