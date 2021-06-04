import React from 'react';
import $ from "jquery";

function AddExercise(){
    const [warning, setWarning] = React.useState("");
    const [alert, setAlert] = React.useState("");

    let addExercise = (e) => {
        e.preventDefault();
        const userId = e.target._id.value;
        const description = e.target.description.value;
        const duration = e.target.duration.value;
        const date = e.target.date.value;

        if(userId === ""){
            setWarning("Please enter a user id.");
            return;
        }

        const formData = new FormData();
        formData.append('description', description);
        formData.append('duration', duration);
        formData.append('date', date);

        const url = "/api/users/" +userId+ "/exercises";

        fetch(url, {
            method: 'POST',
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                setWarning(data.error);
                setAlert("");
            } else {
                setWarning("");
                console.log(data);
                setAlert("Exercise Added!");
                $("#alert").fadeOut(0);
                $("#alert").fadeIn(1000);                
            }
        })
    }

    return(
        <div className="wrapper">
            <div className="title">
                <h2>Add Exercise</h2>
            </div>
            <form className="add-exercise" onSubmit={addExercise}>
                <label htmlFor="_id">User ID:</label>
                <br></br>
                <input type="text" name="_id" id="_id"></input>
                <br></br><br></br>
                <label htmlFor="description">Description: </label>
                <br></br>
                <input type="text" name="description" id="description"></input>
                <br></br><br></br>
                <label htmlFor="duration">Duration: </label>
                <br></br>
                <input type="text" name="duration" id="duration"></input>
                <br></br><br></br>
                <label htmlFor="date">Date (YYYY-MM-DD): </label>
                <br></br>
                <input type="text" name="date" id="date"></input>
                <br></br><br></br>
                <button id="exercise-submit" type="submit">Add Exercise</button>
            </form>
            {warning !== "" ? <p className="warning">{warning}</p> : null}
            {alert !== "" ? <p className="alert" id="alert">{alert}</p> : null}
        </div>
    )
}
export default AddExercise;