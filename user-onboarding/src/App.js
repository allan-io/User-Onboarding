import React, { useState } from "react"
import Form from "./components/Form"
import Users from "./components/Users"
import styled from "styled-components"

const Header = styled.h2`
  text-align: center;
`

function App() {
  const [users, setUsers] = useState([])
  

  return (
    <>
      <Header>Input Field</Header>
      <Form setUsers={setUsers} users={users}/>
      <Header>Users</Header>
      <Users users={users} />
    </>
  )
}

export default App
