import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import { setPlayed } from '../redux/actions/gameListdetailActions';
import Image from 'next/image';
import rockpaperscissors from "../public/rock-paper-scissors.png";

import {WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon} from 'react-share';


const mapDispatchToProps = (dispatch) => {
  return {
    setPlayed: (condition) => dispatch(setPlayed(condition))
  };
}

const mapStateToPros = (state) => {
  return { isGamePlayed: state.isGamePlayed,
           isLoggedIn: state.isLoggedIn };
}

class GameDetail extends Component {
  
  render() {
    return (
        <div className='container p-4'>
          <div className="text-center">
            <Image src={rockpaperscissors} className="img-fluid rounded p-4" alt="tidak tersedia"/>
          </div>
          
          <h1 className="text-center">Rock-Paper-Scissors</h1>
          <div className="border border-dark p-3 rounded">
            <p>Batu-Gunting-Kertas adalah sebuah permainan tangan dua orang. Permainan ini sering digunakan untuk pemilihan acak, seperti halnya pelemparan koin, dadu, dan lain-lain. Terdapat tiga isyarat tangan dalam permainan ini. Batu digambarkan oleh tangan mengepal, 
               gunting digambarkan oleh jari telunjuk dan tengah, kertas digambarkan oleh tangan terbuka. Tujuan dari permainan adalah mengalahkan lawan bermain. Aturan standar adalah batu mengalahkan gunting, gunting mengalahkan kertas, dan kertas mengalahkan batu.
               Jika kedua pemain mengeluarkan isyarat yang sama, maka permainan diulang. Kadang kala pemain menggunakan sistem berulang-ulang artinya sekali kemenangan tidak cukup untuk menghentikan permainan. Misalnya pemain yang menang 5 kali terlebih dahulu menjadi pemenang.
            </p>
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
            {this.props.isGamePlayed ? (<p className="lead h4 text-primary text-center fw-bolder" >Game ini sudah pernah dimainkan</p>): ''}
            <div className="d-flex justify-content-center">
              <button type="button" className="btn btn-primary btn-lg px-5" 
              onClick={() => {this.props.isLoggedIn ? (this.props.setPlayed(true), Router.push('/rps')) : (Router.push('/login')) } }>
                <h3>Play</h3> 
              </button>
            </div>
          </div>
    );
  }
}

const GameDetailConected = connect(mapStateToPros, mapDispatchToProps)(GameDetail);

export default GameDetailConected;
