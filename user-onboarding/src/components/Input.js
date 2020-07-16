import React from "react"

const Input = (props) => {
    const errorMessage = props.errors[props.name]

    return (
        <label htmlFor="name">
            {props.label}
            <input {...props}/>
            <div className="error-div">{errorMessage.length !== 0 && <p className="error">{errorMessage}</p>}</div>
        </label>
    )
}

export default Input