import './App.css';
import NavBar from './components/NavBar';
import Screens from './components/Screens';
import { BrowserRouter as Router } from 'react-router-dom'; 

function App() {
  return (
    <div className="App main">
      <Router>
        <NavBar />
        <Screens />
      </Router>      
    </div>
  );
}

export default App;
