import logo from './logo.svg';
import { BiUser } from 'react-icons/bi';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <header>
            <nav id="loginbutton"><ul>
                <li><BiUser /></li>
                <li><div>LOGIN</div></li></ul></nav></header>
                <section className="section1">
        <div id="name_search">
            <div id="webname"><a href=“teamc_mainpage.html” target="_self">
                SEARCH.<span>IT</span></a></div>

    </div>
  );
}

export default App;
