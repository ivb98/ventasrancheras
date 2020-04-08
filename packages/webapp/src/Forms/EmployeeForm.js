import React from "react";
import { Formik } from "formik";
import Error from "./FormsErrors";
import * as Yup from "yup";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, "Must have at least 1 character")
        .max(255, "Must be less than 255 characters")
        .required("Must enter a name"),
    lastname: Yup.string()
        .min(1, "Must have at least 1 character")
        .max(255, "Must be less than 255 characters")
        .required("Must enter a Lastname"),
    email: Yup.string()
        .email("Invalid e-mail address")
        .required("Must enter an E-mail"),
    password: Yup.string()
        .min(6, "Must have at least 6 character")
        .max(255, "Must be less than 255 characters")
        .required("Must enter a password"),
});



export default function EmployeeForm(props) {
    const rol = props.rol;
    const url = (props.rol === "Salesman")? "salesman":"/delivery/create";
    return (
        <Container fluid="sm">
            <Formik
                initialValues={{ name: "", lastname: "", email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);


                    const fullname = values.name + " " + values.lastname;
                    axios
                        .post(url, {
                            name: fullname,
                            email: values.email,
                            password: values.password,
                        },{
                            headers: {
                                'Content-Type': 'application/json',
                                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Ik1hbmFnZXIiLCJpYXQiOjE1ODYxODgwOTAsImV4cCI6MTY0OTMwMzI5MH0.mksu2bwOSI4bboXog_ObQVr0_jKZt6904M3eHi_8cFc" 
                            }})
                        .then(res => console.log(res))
                        .catch(e => console.log(e));

                        
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        resetForm();
                        setSubmitting(false);
                    }, 500);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Label>Crear un nuevo {props.rol}</Form.Label>
                        <Form.Group>
                            <Form.Label>Name :</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter Employee's name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className={touched.name && errors.name ? "has-error" : null}
                            />
                            <Error touched={touched.name} message={errors.name} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Lastname :</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastname"
                                id="lastname"
                                placeholder="Enter Employee's Lastname"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastname}
                                className={touched.lastname && errors.lastname ? "has-error" : null}
                            />
                            <Error touched={touched.lastname} message={errors.lastname} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>E-mail :</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Employee's E-mail"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className={touched.email && errors.email ? "has-error" : null}
                            />
                            <Error touched={touched.email} message={errors.email} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password :</Form.Label>
                            <Form.Control
                                type="text"
                                name="password"
                                id="password"
                                placeholder="Enter Employee's Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className={touched.password && errors.password ? "has-error" : null}
                            />
                            <Error touched={touched.password} message={errors.password} />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
