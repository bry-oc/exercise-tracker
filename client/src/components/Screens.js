import { Route, Switch } from 'react-router-dom';
import Welcome from './Welcome';

function CreateUser(){
    return(
        <div>
            <Switch>
                <Route exact path="/">
                    < Welcome />
                </Route>
                <Route path="/createuser">
                    <h2>Create User!</h2>
                </Route>
                <Route path="/addexercise">
                    <h2>Add Exercise!</h2>
                </Route>
                <Route path="/viewlog">
                    <h2>View Log!</h2>
                </Route>
            </Switch>            
        </div>
    )
}

export default CreateUser;