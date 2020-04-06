import React, { useState } from 'react';
import './styles/Login.css';
import { Redirect } from 'react-router-dom';
import { UserProvider } from '../Context/UserContext.js'

class Login extends React.Component {
constructor(){
  super();
  this.state={
    form:{
      email:'',
      password:''
    },
    name: '',
    role: '',
    login:false,
    store:null
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
               token: result.access_token
            }))
              this.setState({name:result.name, role: result.role})
              this.storeCollector();
           
        })
      })
      
  }

  storeCollector(){
    let store = JSON.parse(localStorage.getItem('login'));
    if(store && store.login){
      this.setState({login:true, store:store})
    }
  } 



 
render(){

 

  return(
    this.state.login?
    <UserProvider value={this.state}>
     <Redirect to='/Seller' />
     </UserProvider>
    :
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