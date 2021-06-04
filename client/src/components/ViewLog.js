import React from 'react';

function ViewLog() {
    const [tableData, setTableData] = React.useState([]);
    const [warning, setWarning] = React.useState("");

    const viewLog = (e) => {
        e.preventDefault();
        const userId = e.target._id.value;
        const from = e.target.from.value;
        const to = e.target.to.value;
        const limit = e.target.limit.value;

        if (userId === "") {
            setWarning("Please enter a user id.");
            return;
        }

        let url = "/api/users/" + userId + "/logs";

        if ((from !== "" && to !== "") || limit !== "") {
            url = url.concat("?")
            if (from !== "" && to !== "") {
                url = url.concat("to=" + to);
                url = url.concat("&from=" + from);
                if (limit !== "") {
                    url = url.concat("&limit=" + limit);
                }
            } else if (limit !== "") {
                url = url.concat("limit=" + limit);
            }
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    setTableData([]);
                } else {
                    console.log(data);
                    setWarning("");
                    setTableData(data.log);
                    console.log(tableData);
                }
            })
    }

    return (
        <div className="wrapper">
            <div className="title">
                <h2>View Exercise Log</h2>
            </div>
            <form className="log-form" onSubmit={viewLog}>
                <label htmlFor="_id">User ID (Required): </label>
                <br></br>
                <input type="text" name="_id" id="_id"></input>
                <br></br><br></br>
                <label htmlFor="to">Start Date(YYYY-MM-DD): </label>
                <br></br>
                <input type="text" name="to" id="to"></input>
                <br></br><br></br>
                <label htmlFor="from">End Date(YYYY-MM-DD): </label>
                <br></br>
                <input type="text" name="from" id="from"></input>
                <br></br><br></br>
                <label htmlFor="label">Max Exercises Shown: </label>
                <br></br>
                <input type="text" name="limit" id="limit"></input>
                <br></br><br></br>
                <button id="log-submit" type="submit">View Exercise Log</button>
                <br></br><br></br>
            </form>
            {warning !== "" ? <p className="warning">{warning}</p> : null}
            {tableData.length !== 0 ? <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.description}</td>
                            <td>{item.duration}</td>
                            <td>{item.date}</td>
                        </tr>
                    })}
                </tbody>
            </table> : ""}
        </div>
    )
}

export default ViewLog;