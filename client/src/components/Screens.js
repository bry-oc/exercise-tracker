import { Route, Switch } from 'react-router-dom';
import Welcome from './Welcome';
import CreateUser from './CreateUser';
import AddExercise from './AddExercise';
import ViewLog from './ViewLog';

function Screens(){
    return(
        <div>
            <Switch>
                <Route exact path="/">
                    <Welcome />
                </Route>
                <Route path="/createuser">
                    <CreateUser />
                </Route>
                <Route path="/addexercise">
                    <AddExercise />
                </Route>
                <Route path="/viewlog">
                    <ViewLog />
                </Route>
            </Switch>            
        </div>
    )
}

export default Screens;