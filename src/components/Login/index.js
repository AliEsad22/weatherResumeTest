/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Form } from "react-bootstrap"
import { StyledCard, StyledBackground } from "./index.styles"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
export default function index() {
  const navigate = useNavigate()

  const initialValues = {
    username: "",
    password: "",
  }

  const validationSchema = Yup.object({
    username: Yup.string().required("Please enter your username"),
    password: Yup.string().required("Please enter your password").min(6),
  })

  const onSubmit = (values) => {
    localStorage.setItem("token", values.username)
    localStorage.setItem("password", values.password)
    navigate("/weather/en/london")
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <StyledBackground>
      <StyledCard>
        {" "}
        <Form noValidate onSubmit={formik.handleSubmit} className="form-group">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              autoFocus="autofocus"
              placeholder="Username"
              {...formik.getFieldProps("username")}
              isInvalid={!!formik.errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-3 form-group-passwords"
            controlId="formBasicPassword"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
              isInvalid={!!formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="dark" size="lg" type="submit">
            Login
          </Button>
        </Form>
      </StyledCard>
    </StyledBackground>
  )
}
