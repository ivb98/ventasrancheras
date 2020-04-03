import React from 'react';
import { Formik } from 'formik';
import Error from './FormsErrors';
import * as Yup from "yup";
import { Form, Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

const validationSchema = Yup.object().shape({
    employeename: Yup.string()
        .min(1, "Must have at least 1 character")
        .max(255,"Must be less than 255 characters")
        .required("Must enter an Employee"),
    assigment: Yup.string()
        .min(1, "Must have at least 1 character")
        .max(255,"Must be less than 255 characters")
        .required("Must enter an assigment")
        
})


export default function AssignForm() {
    return(
        <Container>
        <Formik 
            initialValues={{ employeename: "", assigment: ""}}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                setSubmitting(true);

                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    resetForm();
                    setSubmitting(false);
                }, 500);
            }}    
        >
            {({ values, 
                errors, 
                touched, 
                handleChange, 
                handleBlur, 
                handleSubmit, 
                isSubmitting 
            }) => (
                <Form  onSubmit={handleSubmit}>
                    <Form.Label>Asignar trabajo a empleado </Form.Label>
                    <Form.Group className="input-row">
                    <Form.Label>Empleado :</Form.Label>
                       <Form.Control  
                           type= "text" 
                           name= "employeename" 
                           id= "employeename" 
                           placeholder= "Enter Employee's name" 
                           onChange= {handleChange}
                           onBlur={handleBlur}
                           value={values.name}
                           className={touched.employeename && errors.employeename ? "has-error" : null}
                       />
                       <Error touched={touched.employeename} message={errors.employeename} /> 
                   </Form.Group>

                   <Form.Group className="input-row">
                       <Form.Label>Asignacion :</Form.Label>
                       <Form.Control  
                           type= "text" 
                           name= "assigment" 
                           id= "assigment" 
                           placeholder= "Enter Employee's assigment" 
                           onChange= {handleChange}
                           onBlur={handleBlur}
                           value={values.assigment}
                           className={touched.assigment && errors.assigment ? "has-error" : null}
                       />
                       <Error touched={touched.assigment} message={errors.assigment} />
                   </Form.Group>
                     <Button variant="primary" type="submit" disabled={isSubmitting}>Submit</Button>
               </Form>

            )}
        </Formik>
        </Container>
    );
}

