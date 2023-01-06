import React, { useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState('');
  const [results, setResult] = useState([]);

  function getJokes() {
    let limit = 15
    fetch(`https://icanhazdadjoke.com/search?term=${searchText}&limit=${limit}`,{
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
    }).then(response => response.json())
      .then(json => {
        const jokes = json.results;
        setResult(jokes)
      });
  };
  const throttling = (func, limit) => {
    let last = new Date().getTime();
    return function(...args){
        let curr = new Date().getTime();
        if(curr - last < limit){
            return
        }
        last = curr;
        return func(args); 
    }
  }
   // eslint-disable-next-line
  const throttlingFun = useCallback(throttling(getJokes, 5000))
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Throttling <code>React.js</code> and Hooks.
        </p>
        <input
          className="App-link"
          type="text"
          value={searchText}
          placeholder="Enter somthing"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className='button' type={'button'} onClick={throttlingFun}>Fetch</button>

        <div>
          <ul className='list-ul'>
            {results && results.map((item, index) => (
              <li key={index}>{item.joke}</li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
