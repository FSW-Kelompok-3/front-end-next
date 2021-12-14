import GameDetail from '../components/gameDetailDummy';
import LeaderBoard from '../components/LeaderBoard';
import React, { Component, Fragment } from "react";


export default function gamedetailpage() {
    return (
    <Fragment>   
        <GameDetail />
        <LeaderBoard /> 
    </Fragment>
        )
   
}