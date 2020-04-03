import React from "react";

const Error = ({ touched, message}) => {
    if (!touched){
        return <div className="form-message invalid">{" "}</div>;
    }
    if(message) {
    return <div className="form-message invalid">{message}</div>;
    }
    return <div className="form-message valid">all good</div>;
    
}

export default Error;