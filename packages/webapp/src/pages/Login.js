import React from 'react'
import "../components/styles/Login.css"

class Login extends React.Component {
    render(){
        return(
        <div className="loginContent">
           <h1 className="pageTitle">Portal de Acceso</h1> 
           <form>
                 <div className= "form-group">
                 <label>Correo Electrónico</label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                    />
                </div>

                <div className= "form-group">
                 <label>Contraseña</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                    />
                </div>
           </form>
        </div>
        )
    }
}

export default Login;