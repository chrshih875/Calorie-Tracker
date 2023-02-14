import {useState, useEffect} from "react"
import React from 'react'

export default function AllUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch("http://localhost:8080/users");
            const data = await response.json();
            console.log("data", data)
            setUsers(data)
            console.log("users", users)
        }
        getUsers()
    }, []);
    return (
        <>
            <h2>All Users</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First</th>
                        <th>Last</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return(
                            <tr key={user.userId}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}
