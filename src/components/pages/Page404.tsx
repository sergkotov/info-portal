import React, { FC } from "react";
import ErrorMessage from "../app/errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404: FC = () => {
    return (
        <div>
            <ErrorMessage/>
            <p>Page doesn&prime;t exist</p>
            <Link to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;