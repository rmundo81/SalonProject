// import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import { NavigationBar } from './components/NavigationBar';
function App() {
  return (
  <React.Fragment>
    <Router>
      <NavigationBar />
    </Router>
    <div className="App">
      <header className="App-header">       
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>       
      </header>
    </div>
    
  </React.Fragment>  
  );
}

export default App;
