import React from "react"
import styled from "styled-components"

const UserWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const User = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    margin: 10px 0;
    padding: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
`

const P = styled.p`
    margin-left: 40px;
    font-size: 1.6em;
    font-weight: 600;
    color: grey;
    line-height: .5;
`

const Users = ({ users }) => {
    return (
        <>
            {users.map((user, i) => (
                <UserWrapper key={i}>
                    <User>
                        <P><span>NAME:</span> {user.name}</P>
                        <P><span>EMAIL:</span> {user.email}</P>
                    </User>
                </UserWrapper>
            ))}
        </>
    )

    
}

export default Users