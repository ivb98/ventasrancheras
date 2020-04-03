import React from 'react'
import './styles/Login.css'

function Login() {
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
             <button className="btn btn-primary">
         Iniciar Sesión
       </button>
        </form>
     </div>
          
        )
    
}

export default Login;