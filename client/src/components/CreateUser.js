import React from 'react';

function CreateUser(){
    const [userId, setUserId] = React.useState(null);
    const [warning, setWarning] = React.useState("");

    let createUser = (e) => {
        e.preventDefault();
        const username = e.target.username.value;

        if(username === "") {
            setWarning("Please enter a username.");
            return;
        }

        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
            })
        })
            .then((res) => res.json())
            .then((data) => {
                setWarning("");
                setUserId(data._id);
            })
    }

    return(
        <div className="wrapper">
            <div className="title">
                <h2>Create User</h2>
            </div>
            <form id="createuser" onSubmit={createUser}>
                <label id="username-label" htmlFor="username">Username:</label>
                <br></br>
                <input id="username" type="text" name="username"></input>
                <br></br><br></br>
                <button id="user-submit" type="submit">Create User</button>
            </form>
            <div>
                {warning !== "" ? <p className="warning">{warning}</p> : null}
                {userId ? <p>{"user id: " +userId}</p> : null}
            </div>
        </div>

    );
}

export default CreateUser;