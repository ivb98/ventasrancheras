import React from 'react';
import { Formik } from 'formik';
import Error from './FormsErrors';
import * as Yup from "yup";
import { Form, Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, "Must have at least 1 character")
        .max(255,"Must be less than 255 characters")
        .required("Must enter a name"),
    lastname: Yup.string()
        .min(1, "Must have at least 1 character")
        .max(255,"Must be less than 255 characters")
        .required("Must enter a Lastname"),
    username: Yup.string()
        .min(1, "Must have at least 1 character")
        .max(255,"Must be less than 255 characters")
        .required("Must enter a Username"),
    password: Yup.string()
        .min(6, "Must have at least 6 character")
        .max(255,"Must be less than 255 characters")
        .required("Must enter a password")
        
})


export default function EmployeeForm() {
    return(
        <Container>
        <Formik 
            initialValues={{ name: "", lastname: "", username: "", password: ""}}
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
                    <Form.Label>Crear un nuevo Empleado </Form.Label>
                    <Form.Group controlId="formName">
                        <Form.Label>Name :</Form.Label>
                       <Form.Control  
                           type= "text" 
                           name= "name" 
                           id= "name" 
                           placeholder= "Enter Employee's name" 
                           onChange= {handleChange}
                           onBlur={handleBlur}
                           value={values.name}
                           className={touched.name && errors.name ? "has-error" : null}
                       />
                       <Error touched={touched.name} message={errors.name} /> 
                   </Form.Group>

                   <Form.Group controlId="formLastname">
                    <Form.Label>Lastname :</Form.Label>
                       <Form.Control  
                           type= "text" 
                           name= "lastname" 
                           id= "lastname" 
                           placeholder= "Enter Employee's Lastname" 
                           onChange= {handleChange}
                           onBlur={handleBlur}
                           value={values.lastname}
                           className={touched.lastname && errors.lastname ? "has-error" : null}
                       />
                       <Error touched={touched.lastname} message={errors.lastname} />
                   </Form.Group>

                   <Form.Group controlId="formUsername">
                    <Form.Label>Username :</Form.Label>
                       <Form.Control  
                           type= "text" 
                           name= "username" 
                           id= "username" 
                           placeholder= "Enter Employee's Username" 
                           onChange= {handleChange}
                           onBlur={handleBlur}
                           value={values.username}
                           className={touched.username && errors.username ? "has-error" : null}
                       />
                       <Error touched={touched.username} message={errors.username} />
                   </Form.Group>

                   <Form.Group controlId="formPassword">
                   <Form.Label>Password :</Form.Label>
                       <Form.Control  
                           type= "text" 
                           name= "password" 
                           id= "password" 
                           placeholder= "Enter Employee's Password" 
                           onChange= {handleChange}
                           onBlur={handleBlur}
                           value={values.password}
                           className={touched.username && errors.username ? "has-error" : null}
                       />
                       <Error touched={touched.password} message={errors.password} />
                   </Form.Group>
                    <Button variant ="primary" type="submit" disabled={isSubmitting}>Submit</Button>
             
               </Form>

            )}
        </Formik>
        </Container>
    );
}

