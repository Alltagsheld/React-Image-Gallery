import './App.css';
import LandingPage from './pages/LandingPage';
import styled from 'styled-components';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/" component={LandingPage}/>
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
