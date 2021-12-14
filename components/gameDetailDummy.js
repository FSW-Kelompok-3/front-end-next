import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setPlayedDummy } from '../redux/actions/gameListdetailActions';

import Image from 'next/image';
import Router from 'next/router';
import gambar from "../public/gambar.png";

import {WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon} from 'react-share';


const mapDispatchToProps = (dispatch) => {
  return {
    setPlayedDummy: (condition) => dispatch(setPlayedDummy(condition)),
    dispatch
  };
}

const mapStateToPros = (state) => {
  return { isGamePlayed: state.isGamePlayed,
           allGame: state.allGame,
           gameDetailPosition: state.gameDetailPosition,
           isGamePlayedDummy: state.isGamePlayedDummy,
           isLoggedIn: state.isLoggedIn };
}



class GameDetail extends Component {
  

  render() {
    return (
      <Fragment>
        <div className='container p-4'>
          <div className="text-center">
            <Image src={gambar} className="img-fluid rounded p-4" alt="tidak tersedia"/>
          </div>

          <h1 className="text-center">{this.props.gameDetailPosition.title}</h1>
          <div className="border border-dark p-3 rounded">
            <p>{this.props.gameDetailPosition.description}</p>
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <p className="pt-2">Bagikan game ini :</p>
            <WhatsappShareButton url={"https://localhost:8000/"} title={"Ayo main Game Suit"} className="px-2"> 
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
             <FacebookShareButton
                url={"https://github.com/"}
                quote={"Play Game"}
                description={"Game suit"}
                className="Demo__some-network__share-button"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>
            {this.props.isGamePlayedDummy.includes(this.props.gameDetailPosition.id) ? (<p className="lead h4 text-primary text-center fw-bolder" >Game ini sudah pernah dimainkan</p>): ''}
            <div className="d-flex justify-content-center">     
                  <button type="button" className="btn btn-primary btn-lg px-5"
                  onClick={() => {this.props.isLoggedIn ? (this.props.setPlayedDummy(this.props.gameDetailPosition.id), Router.push('#')) : (Router.push('/login')) } }>
                    <h3>Play</h3>
                  </button>
            </div>
          </div>
      </Fragment>
    );
  }
}

const GameDetailConected = connect(mapStateToPros, mapDispatchToProps)(GameDetail);

export default GameDetailConected;
