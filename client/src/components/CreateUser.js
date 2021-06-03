import React from 'react';

function CreateUser(){
    const [userId, setUserId] = React.useState(null);

    let createUser = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
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
                setUserId(data._id);
            })
    }

    return(
        <div className="wrapper">
            <div className="title">
                <h2>Create User!</h2>
            </div>
            <form id="createuser" onSubmit={createUser}>
                <label id="username-label" htmlFor="username">username</label>
                <br></br>
                <input id="username" type="text" name="username"></input>
                <br></br>
                <button id="user-submit" type="submit">Create User</button>
            </form>
            <div>
                <p>{userId ? "user id: " +userId : ""}</p>
            </div>
        </div>

    );
}

export default CreateUser;