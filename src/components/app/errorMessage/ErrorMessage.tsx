import React, { FC } from "react";

import img from './error.gif';

const ErrorMessage: FC = () => {
    return (
        <img className="error-img" src={img} alt="error"/>
    )
}

export default ErrorMessage