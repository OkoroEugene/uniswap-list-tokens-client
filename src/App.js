import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { FiArrowDown } from 'react-icons/fi';

function App() {
  const [token_lists, setTokenLists] = useState(undefined);
  const [fetching_tokens, setFetchingTokens] = useState(true);

  useEffect(async () => {
    if (!token_lists) {
      await listTokens();
    }
  }, [token_lists])

  const listTokens = async () => {
    const response = await axios.get(`http://localhost:5002/list_tokens`);
    console.log(response.data);
    setTokenLists(response.data.tokens);
    setFetchingTokens(false);
  }

  const ShowLoader = () => <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
    <span className="sr-only">Loading...</span>
  </div>

  return (
    <div className="App">
      <header className="App-header">
        {!fetching_tokens ? <>
          <img src={"https://app.uniswap.org/static/media/logo_white.bc1aa183.svg"} className="App-logo" alt="logo" />
          <div style={{ height: 2 }} />

          <p>
            Uniswap default token lists
        </p>

          <div style={{ height: 10 }} />
          {/* <div className="shadow p-3 mb-5 bg-white rounded">Regular shadow</div> */}
          <div className="card">
            <div className="card-body">
              <div className="form-content">
                <span className="title_one">From</span>
                <div className="form-inner">
                  <div className="form-side">
                    {/* <div className="token_img">

                  </div> */}
                    <img src={token_lists[0].logoURI} />
                    <span>{token_lists[0].symbol}</span>
                    <FiArrowDown />

                  </div>

                  <div className="form-main">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="0.0000"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </> : ShowLoader()}
      </header>
    </div>
  );
}

export default App;
