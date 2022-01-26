/* eslint-disable no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Image from 'next/image';
import Router from 'next/router';
import {
  WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon,
} from 'react-share';

import { setPlayedDummy } from '../redux/actions/gameListdetailActions';

const mapDispatchToProps = (dispatch) => ({
  setPlayedDummy: (condition) => dispatch(setPlayedDummy(condition)),
  dispatch,
});

const mapStateToPros = (state) => ({
  isGamePlayed: state.isGamePlayed,
  allGame: state.allGame,
  gameDetailPosition: state.gameDetailPosition,
  isGamePlayedDummy: state.isGamePlayedDummy,
  isLoggedIn: state.isLoggedIn,
});

class GameDetail extends Component {
  render() {
    const {
      gameDetailPosition, isGamePlayedDummy, isLoggedIn, setPlayedDummy,
    } = this.props;
    return (
      <div className="container p-4">
        <div className="text-center">
          <Image src={gameDetailPosition.gambar} className="img-fluid rounded p-4" alt="tidak tersedia" width="100%" height="100%" layout="responsive" objectFit="contain" />
        </div>

        <h1 className="text-center">{gameDetailPosition.title}</h1>
        <div className="border border-dark p-3 rounded">
          <p>{gameDetailPosition.description}</p>
        </div>
        <div className="d-flex justify-content-end align-items-center">
          <p className="pt-2">Bagikan game ini :</p>
          <WhatsappShareButton url="https://localhost:8000/" title="Ayo main Game Suit" className="px-2">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <FacebookShareButton
            url="https://github.com/"
            quote="Play Game"
            description="Game suit"
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
        {isGamePlayedDummy.includes(gameDetailPosition.id) ? (<p className="lead h4 text-primary text-center fw-bolder">Game ini sudah pernah dimainkan</p>) : ''}
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary btn-lg px-5"
            // eslint-disable-next-line no-unused-expressions
            onClick={() => { isLoggedIn ? (setPlayedDummy(gameDetailPosition.id), Router.push('#')) : (Router.push('/login')); }}
          >
            <h3>Play</h3>
          </button>
        </div>
      </div>
    );
  }
}

const GameDetailConected = connect(mapStateToPros, mapDispatchToProps)(GameDetail);

export default GameDetailConected;
