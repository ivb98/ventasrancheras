import React, { useState } from 'react';
import './styles/Login.css';

class Login extends React.Component {

  state={
    form:{
      email:'',
      password:''
    }
  }

  handleInput = event => {
    this.setState({ //seteando datos
      form: {
          ... this.state.form, //agarrando datos antiguos
          [event.target.name]: event.target.value, //agregando
      }
  })

 }


  handleSubmit = event =>{
    event.preventDefault();
    console.log(this.state.form);
    this.login();
 }

 login(){
  fetch('https://vrancheras.herokuapp.com/auth', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.state.form)}).then(response=>{
      console.log(response)
        response.json().then((result)=>{
            console.log("result", result);
            localStorage.setItem('login', JSON.stringify({
               token: 'bearer '+ result.access_token
            }) )
        })
      })
      this.props.history.push('/Seller');
  }



 
render(){
  return(
    <div className="loginContent">
    <h1 className="pageTitle">Portal de Acceso</h1> 
    <form onSubmit ={this.handleSubmit}>
          <div className= "form-group">
          <label>Correo Electrónico</label>
             <input
               className="form-control"
               type="email"
               name="email"
               onChange={this.handleInput}
             />
         </div>

         <div className= "form-group">
          <label>Contraseña</label>
             <input
               className="form-control"
               type="password"
               name="password"
               onChange={this.handleInput}
             />
         </div>
         <button className="btn btn-primary">
     Iniciar Sesión
   </button>
    </form>
 </div>
      
    )

  }
}
    

export default Login;