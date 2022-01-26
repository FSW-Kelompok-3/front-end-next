/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { Fragment } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { connect } from 'react-redux';
import axios from 'axios';
import History from '../components/history';
import {
  setHistory, roundIncrement, scoreIncrement, scoreDecrement,
} from '../redux/actions/rpsActions';
import style from '../styles/game.module.css';

const result = ['VS', 'PLAYER WIN', 'COM WIN', 'DRAW'];

const defaultState = {
  playerChoice: '',
  comChoice: '',
  isChosen: false,
  result: result[0],
  numberResult: 0,
};

const mapDispatchToProps = (dispatch) => ({
  setHistory: (pChoice, cChoice, result) => dispatch(setHistory(pChoice, cChoice, result)),
  roundIncrement: () => dispatch(roundIncrement()),
  scoreIncrement: () => dispatch(scoreIncrement()),
  scoreDecrement: () => dispatch(scoreDecrement()),
});

const mapStateToProps = (state) => ({
  round: state.round,
});

class RPS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...defaultState,
      comScore: 0,
      playerScore: 0,
      isAuth: false,
      isPlayed: false,
      isLoading: false,
    };
  }

  // Cek apakah sudah login atau belum
  async componentDidMount() {
    const token = await localStorage.getItem('token');
    if (!token) {
      Router.push('/login');
      alert('Please Login');
    }
  }

  handleOnClick = async (event) => {
    await this.setState({ playerChoice: event.currentTarget.getAttribute('value'), isChosen: true });
    await this.setState({ numberResult: Math.floor(Math.random() * 5) });
    this.rng();
    this.suitCheck();
    this.toRedux();
    if (this.state.result === result[3] || this.state.result !== result[0]) {
      this.toDatabase();
    }
  };

  handleReset = () => {
    this.setState({ ...defaultState });
  };

  // Rock Paper Scissor

  // eslint-disable-next-line consistent-return
  rng() {
    const { playerChoice } = this.state;
    if (this.state.numberResult === 0) {
      return this.setState({ comChoice: 'rock' });
    }
    if (this.state.numberResult === 1) {
      return this.setState({ comChoice: 'paper' });
    }
    if (this.state.numberResult === 2) {
      return this.setState({ comChoice: 'scissor' });
    }
    if (this.state.numberResult === 3) {
      return this.setState({ comChoice: `${playerChoice === 'rock' ? 'paper' : (playerChoice === 'paper' ? 'scissor' : 'rock')}` });
    }
    if (this.state.numberResult === 4) {
      return this.setState({ comChoice: `${playerChoice === 'rock' ? 'paper' : (playerChoice === 'paper' ? 'scissor' : 'rock')}` });
    }
  }

  suitCheck() {
    const { comScore, playerScore } = this.state;
    if (this.state.comChoice === this.state.playerChoice) {
      return this.setState({ result: result[3] });
    }
    if (this.state.comChoice === 'scissor' && this.state.playerChoice === 'paper' || this.state.comChoice === 'paper' && this.state.playerChoice === 'rock' || this.state.comChoice === 'rock' && this.state.playerChoice === 'scissor') {
      this.setState({ result: result[2] });
      return this.setState({ comScore: comScore + 1 });
    }
    this.setState({ result: result[1] });
    return this.setState({ playerScore: playerScore + 1 });
  }

  // Pass state to redux
  toRedux() {
    this.props.roundIncrement();
    this.props.setHistory(this.state.playerChoice, this.state.comChoice, `${this.state.result === result[3] ? 'DRAW' : (this.state.result === result[2] ? 'LOST' : 'WON')}`);
    if (this.state.result === result[1]) {
      return this.props.scoreIncrement();
    }
    if (this.state.result === result[2]) {
      return this.props.scoreDecrement();
    }
  }

  // Pass state to database, only if win or lose
  async toDatabase() {
    this.setState({ isLoading: true });
    axios.post(
      'https://api-kel3.herokuapp.com/score/rps',
      {
        result: `${this.state.result === result[1] ? 'win' : 'lose'}`,
      },
      {
        headers: { 'content-type': 'application/json;charset=UTF-8', Authorization: localStorage.getItem('token') },
      },
    )
      .then((res) => {
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        alert(`Error: ${err}`);
      });
  }

  render() {
    return (
      <>
        <Head>
          <title>Game</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" type="text/css" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;1,400;1,800&display=swap"
            type="text/css"
          />
        </Head>
        <div className={style.container}>
          <div className={style.content}>
            <div className={style.suit}>
              <div id={style.player}>
                <h2>player 1</h2>
                <div className={`${this.state.isChosen ? null : style.hover} ${this.state.playerChoice === 'rock' ? style.chosen : null}`}>
                  <img
                    src="./batu.png"
                    alt=""
                    id={style.playerRock}
                    className={style.gambar}
                    value="rock"
                    onClick={this.state.isChosen ? null : this.handleOnClick}
                  />
                </div>
                <div className={`${this.state.isChosen ? null : style.hover} ${this.state.playerChoice === 'paper' ? style.chosen : null}`}>
                  <img
                    src="./kertas.png"
                    alt=""
                    id={style.playerPaper}
                    className={style.gambar}
                    value="paper"
                    onClick={this.state.isChosen ? null : this.handleOnClick}
                  />
                </div>
                <div className={`${this.state.isChosen ? null : style.hover} ${this.state.playerChoice === 'scissor' ? style.chosen : null}`}>
                  <img
                    src="./gunting.png"
                    alt=""
                    id={style.playerScissor}
                    className={style.gambar}
                    value="scissor"
                    onClick={this.state.isChosen ? null : this.handleOnClick}
                  />
                </div>
              </div>
              <div id={style.mid}>
                <div className={style.midbar}>
                  <div id={style.score}>
                    <h1>
                      {this.state.playerScore}
                      {' '}
                      -
                      {' '}
                      {this.state.comScore}
                    </h1>
                    <h1>
                      ROUND
                      {this.props.round}
                    </h1>
                  </div>
                  <div
                    id={this.state.result !== result[0] ? style['result-container-win'] : style['result-container']}
                    className={`
                                        ${this.state.result === result[0] ? null : (this.state.result === result[3] ? style.draw : style.win)} 
                                        ${this.state.result === result[1] || this.state.result === result[2] ? style.spacing : null}
                                                `}
                  >
                    <h1 id={this.state.result !== result[0] ? style['result-win'] : style['result-text']}>{this.state.result}</h1>
                  </div>
                </div>
                <div id={style.refresh}>
                  <div>
                    <img src="./refresh.png" alt="" onClick={this.handleReset} />
                  </div>
                </div>
              </div>
              <div id={style.com}>
                <h2>COM</h2>
                <div className={`${this.state.comChoice === 'rock' ? style.chosen : null}`}>
                  <img src="./batu.png" alt="" className={style.gambar} />
                </div>
                <div className={`${this.state.comChoice === 'paper' ? style.chosen : null}`}>
                  <img src="./kertas.png" alt="" className={style.gambar} />
                </div>
                <div className={`${this.state.comChoice === 'scissor' ? style.chosen : null}`}>
                  <img src="./gunting.png" alt="" className={style.gambar} />
                </div>
              </div>
            </div>
          </div>
          <style global jsx>
            {`
                        :root {
                            font-size: 62.5%;
                        }
                        html{
                            scroll-behavior: smooth;
                        }
                        *,
                        *:before,
                        *:after {
                            margin: 0;
                            box-sizing:content-box;
                        }
                        h1 {
                            font-size: 8rem;
                            font-family: 'Bebas Neue';
                            font-weight: bold;
                        }
                        h2 {
                            font-size: 3.6rem;
                            font-family: 'Bebas Neue';
                            font-weight: bold;
                        }
                        h3 {
                            font-size: 2.4rem;
                            font-family: 'Bebas Neue';
                            font-weight: bold;
                        }
                        nav {
                            font-size: 1.2rem;
                            font-family: 'Open Sans', sans-serif;
                            font-weight: bold;
                            text-transform: uppercase;
                        }
                        body {
                            font-size: 1.8rem;
                            margin: 0;
                            font-family: 'Open Sans', sans-serif;
                        }
                        sub {
                            font-size: 1.4rem;
                            font-family: 'Open Sans', sans-serif;
                        }
                        button {
                            font-size: 1.6rem !important;
                            font-family: 'Open Sans', sans-serif;
                            font-weight: bold;
                        }
                        header {
                            text-transform: uppercase;
                        }
                        a {
                            text-decoration: none !important;
                            color: black;
                        }
                        body {
                            height: 100%;
                            width: 100%;
                        }
                            `}
          </style>
        </div>
        <History />
      </>
    );
  }
}

const rockPaperScissor = connect(mapStateToProps, mapDispatchToProps)(RPS);

export default rockPaperScissor;
