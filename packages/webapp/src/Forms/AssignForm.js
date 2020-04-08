import React, { useContext } from "react";
import { Formik } from "formik";
import Error from "./FormsErrors";
import * as Yup from "yup";
import { Container, Form, Button } from "react-bootstrap";
import { DataContext } from "../Context/DataContext";
import { RolesConstants } from "@vranch/common";

const validationSchema = Yup.object().shape({
    employeename: Yup.string()
        .min(1, "Must have at least 1 character")
        .max(255, "Must be less than 255 characters")
        .required("Must enter an Employee"),
    assigment: Yup.string()
        .min(1, "Must have at least 1 character")
        .max(255, "Must be less than 255 characters")
        .required("Must enter an assigment"),
});

export default function AssignForm(props) {
    const [data] = useContext(DataContext);

    console.log(data);
    const rol = props.rol;

    const employeeName = props.employee.name ? props.employee.name : "";

    const initValue = { employeename: employeeName, assigment: "" };

    const freePackages = data.packages.filter(pack => pack.status === "Not Assigned");
    const freeCustomers = data.customers.filter(customer => !customer.assigned);

    const salesmanSelect = {
        prepend: "Cliente",
        textProperty: "displayName",
        valueProperty: "id",
        array: freeCustomers,
    };

    const deliverySelect = {
        prepend: "Paquete",
        textProperty: "id",
        valueProperty: "id",
        array: freePackages,
    };

    const selectData = rol === "Seller" ? salesmanSelect : deliverySelect;

    return (
        <Container fluid="sm">
            <Formik
                initialValues={initValue}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

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
                        <Form.Label>
                            Asignar {props.rol} a {props.assign}{" "}
                        </Form.Label>
                        <Form.Group>
                            <Form.Label>{props.rol} :</Form.Label>
                            {
                                <Form.Control
                                    type="text"
                                    name="employeename"
                                    id="employeename"
                                    placeholder="Enter Employee's name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.employeename}
                                    className={
                                        touched.employeename && errors.employeename
                                            ? "has-error"
                                            : null
                                    }
                                />
                            }
                            <Error touched={touched.employeename} message={errors.employeename} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{props.assign} :</Form.Label>
                            <Form.Control
                                as="select"
                                type="text"
                                name="assigment"
                                id="assigment"
                                placeholder="Enter Employee's assigment"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.assigment}
                                className={
                                    touched.assigment && errors.assigment ? "has-error" : null
                                }
                            >
                                {selectData.array.map((item, i) => {
                                    return (
                                        <option key={i} value={item[selectData.valueProperty]}>
                                            {selectData.prepend} {item[selectData.textProperty]}
                                        </option>
                                    );
                                })}
                            </Form.Control>
                            <Error touched={touched.assigment} message={errors.assigment} />
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
