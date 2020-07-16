import React, { useState, useEffect } from "react"
import Input from "./Input"
import * as yup from "yup"
import axios from "axios"
import styled from "styled-components"

const FormField = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Button = styled.button`
    width: 130px;
    height: 30px;
    margin-bottom: 20px;
    cursor: pointer;
`

const Form = ({ setUsers, users }) => {
    // this react state will be used to set the default state of the form
    const defaultState = {
        name: "",
        email: "",
        password: "",
        terms: false
    }

    const [formState, setFormState] = useState(defaultState)
    const [errors, setErrors] = useState({...defaultState, terms: ""})
    const [buttonDisabled, setButtonDisabled] = useState(true)

    // formState Schema
    const formSchema = yup.object().shape({
        name: yup.string().required("Please provide name."),
        email: yup
        .string()
        .required("Please provide a email.")
        .email("This is not a valid email."),
        password: yup
        .string()
        .required("Please provide a password.")
        .min(8, "Password must be at least 8 characters long."),
        terms: yup.boolean().oneOf([true], "Please agree to terms and conditions.")
    })

    useEffect(() => {
        formSchema.isValid(formState)
        .then(valid => setButtonDisabled(!valid))
    }, [formState, formSchema])

    const formSubmit =  e => {
        e.preventDefault()
        axios.post("https://reqres.in/api/users", formState)
            .then((res) => {
                setUsers([...users, res.data])
                setFormState(defaultState)
            })
            .catch((err) => console.log(err))
    }

    const validateChange = e => {
        // method that allows react to keep the event object to work nicely with async operation
        e.persist()

        // reach allows us to check a specific value of the schema
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => setErrors({
                    ...errors,
                    [e.target.name]: ""
                })
            )
            .catch(error => setErrors({
                    ...errors,
                    [e.target.name]: error.errors[0]
                })
            )
        // if (e.target.value.length === 0) {
        //     setErrors({
        //         ...errors,
        //         [e.target.name]: `${e.target.name} field is required`
        //     });
        // }
    }

    const inputChange = e => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value

        setFormState({
            ...formState,
            [e.target.name]: value
        })
        validateChange(e)
    }

    return (
        <FormField onSubmit={formSubmit}>
            <Input
                type="text"
                name="name"
                onChange={inputChange}
                value={formState.name}
                label="Name"
                errors={errors}
            />
            <Input
                type="email"
                name="email"
                onChange={inputChange}
                value={formState.email}
                label="Email"
                errors={errors}
            />
            <Input
                type="password"
                name="password"
                onChange={inputChange}
                value={formState.password}
                label="Password"
                errors={errors}
            />
            <label htmlFor="terms" className="terms">
                <input name="terms" type="checkbox" onChange={inputChange} />
                <p>Terms and Conditions</p>
            </label>
            <Button disabled={buttonDisabled}>Submit</Button>
        </FormField>
    )
}

export default Form