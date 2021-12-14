import React, { Component, Fragment} from "react";
import Link from 'next/link';
import Image from 'next/image';
import { connect } from 'react-redux';
import { getGames, setGameDetailPosition } from '../redux/actions/gameListdetailActions';

import GameListStyle from '../styles/gamelist.module.css'

import gambar from "../public/gambar.png";
import rockpaperscissors from "../public/rock-paper-scissors.png";

const mapStateToPros = (state) => {
  return { allGame: state.allGame,
           gameDetailPosition: state.gameDetailPosition };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGames: () => dispatch(getGames()),
    setGameDetailPosition: (position) => dispatch(setGameDetailPosition(position)),
    dispatch
  };
}

class GameList extends Component {

  async componentDidMount() {
    this.props.dispatch(getGames());
  }

  render() {
    return (
      <Fragment>
        <div className="container p-4">
          <h1 className="text-center">Game List</h1> 
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 justify-content-center p-4">
            <Link href="/gamedetailsuit">
            <div className={`col d-flex justify-content-center text-center flex-column m-3 ${GameListStyle.containerlist}`}>
                <Image src={rockpaperscissors} className={GameListStyle.image} alt="tidak tersedia" />
                <div className={GameListStyle.middle}>
                  <p className={GameListStyle.text}>Lihat Detail</p>
                </div>
                <p>Rock-Paper-Scissors</p>
            </div>
            </Link>

            {this.props.allGame.map( (allGame) => (
                  <Link href="/gamedetaildummy" key={allGame.id}>
                    <div className={`col d-flex justify-content-center text-center flex-column m-3 ${GameListStyle.containerlist}`} onClick={() => this.props.setGameDetailPosition(allGame)}>
                        <Image src={gambar} className={GameListStyle.image} alt="tidak tersedia" />
                        <div className={GameListStyle.middle}>
                          <p className={GameListStyle.text}>Lihat Detail</p>
                        </div>
                        <a>{allGame.title}</a>
                    </div>
                  </Link>          
                      )
                      )}
          </div>
        </div>
      </Fragment>
    );
  }
}

const GamelistConected = connect(mapStateToPros, mapDispatchToProps)(GameList);

export default GamelistConected;