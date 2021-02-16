import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { FiArrowDown } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';
import Modal from './components/Modal';

function App() {
  const [token_lists, setTokenLists] = useState([]);
  const [singleToken, setSingleToken] = useState(undefined);
  const [fetching_single, setFetchingSingleToken] = useState(true);
  const [fetching_tokens, setFetchingTokens] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(async () => {
    if (!singleToken) {
      await fetchSingleToken();
    }
  }, [singleToken])

  const fetchSingleToken = async () => {
    const response = await axios.get(`https://token-lists-api.herokuapp.com/token/list/single`);
    console.log(response.data);
    setSingleToken(response.data);
    setFetchingSingleToken(false);
  }

  const fetchTokenLists = async () => {
    const response = await axios.get(`https://token-lists-api.herokuapp.com/token/lists`);
    console.log(response.data);
    setTokenLists(response.data.tokens);
    setFetchingTokens(false);
  }

  const openModal = () => {
    setShowModal(true);
    setFetchingTokens(true);
    fetchTokenLists();
  }

  const ShowLoader = () => <div style={{ width: "100%", display: "flex", justifyContent: "center", }}>
    <div className="spinner-grow" style={{ width: '3rem', height: '3rem', }} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>

  return (
    <div className="App">
      <header className="App-header">
        {!fetching_single ? <>
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
                  <div className="form-side" onClick={openModal}>
                    {/* <div className="token_img">

                  </div> */}
                    <img src={singleToken.logoURI} />
                    <span>{singleToken.symbol}</span>
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

      <Modal show={showModal}>
        <div className="close-icon">
          <FaTimes onClick={() => setShowModal(false)} />
        </div>
        {fetching_tokens && ShowLoader()}
        {!fetching_tokens && token_lists.length > 0 && <div className="list-group">
          {token_lists.map((token, key) => {
            return (
              <div key={key}>
                <a href="#" className="list-group-item list-group-item-action">
                  <div className="list-content">
                    <img src={token.logoURI} />
                    <div>
                      <span>{token.symbol}</span>
                      <div>
                        <small>{token.name}</small>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            )
          })}
        </div>}
      </Modal>
    </div>
  );
}

export default App;
