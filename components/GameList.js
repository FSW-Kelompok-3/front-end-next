/* eslint-disable no-shadow */
import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { connect } from 'react-redux';
import { getGames, setGameDetailPosition } from '../redux/actions/gameListdetailActions';

import GameListStyle from '../styles/gamelist.module.css';

import rockpaperscissors from '../public/rock-paper-scissors.png';

const mapStateToPros = (state) => ({
  allGame: state.allGame,
  gameDetailPosition: state.gameDetailPosition,
});

const mapDispatchToProps = (dispatch) => ({
  getGames: () => dispatch(getGames()),
  setGameDetailPosition: (position) => dispatch(setGameDetailPosition(position)),
  dispatch,
});

class GameList extends Component {
  async componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.dispatch(getGames());
  }

  render() {
    const { allGame, setGameDetailPosition } = this.props;
    return (
      <div className="container p-4">
        <h1 className="text-center">Game List</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 justify-content-center p-4">
          <Link href="/gamedetailsuit">
            <div className={`col d-flex justify-content-center text-center flex-column m-3 ${GameListStyle.containerlist}`}>
              <div>
                <Image src={rockpaperscissors} className={GameListStyle.image} alt="tidak tersedia" width="100%" height="100%" layout="responsive" objectFit="contain" />
              </div>
              <div className={GameListStyle.middle}>
                <p className={GameListStyle.text}>Lihat Detail</p>
              </div>
              <p>Rock-Paper-Scissors</p>
            </div>
          </Link>

          {allGame.map((allGame) => (
            <Link href="/gamedetaildummy" key={allGame.id}>
              <div className={`col d-flex justify-content-center text-center flex-column m-3 ${GameListStyle.containerlist}`} onClick={() => setGameDetailPosition(allGame)} aria-hidden="true">
                <div>
                  <Image src={allGame.gambar} className={GameListStyle.image} alt="tidak tersedia" width="100%" height="100%" layout="responsive" objectFit="contain" />
                </div>
                <div className={GameListStyle.middle}>
                  <p className={GameListStyle.text}>Lihat Detail</p>
                </div>
                <p>{allGame.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

const GamelistConected = connect(mapStateToPros, mapDispatchToProps)(GameList);

export default GamelistConected;
