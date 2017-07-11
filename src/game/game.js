import React from 'react';

import { Star } from './star'
import { Button } from './button'
import { Answer } from './answer'
import { Numbers } from './numbers'
import { MsgStatus } from './msgStatus'

var _ = require('lodash');

export class Game extends React.Component {

  static GenerateRandomNumber () {
    return 1 + Math.floor(Math.random() * 9);
  }

  initiateGameState = () => {
    return { 
        chosenNumbers: [],
        usedNumbers: [],
        numberOfStars: Game.GenerateRandomNumber(),
        isWin: null,
        refreshTimes: 5,
        gameStatus: null
    };
  }

  state = this.initiateGameState();

   

  numberClick = (num) => {

    if (this.state.chosenNumbers.indexOf(num) < 0 &&
      this.state.usedNumbers.indexOf(num) < 0) {

      this.setState((prevState) => {
        return {        
          chosenNumbers: prevState.chosenNumbers.concat(num),
          isWin: null
        }
      });
    }
  }

  answerClick = (num) => {

    this.setState(prevState => ({  
          chosenNumbers: prevState.chosenNumbers.filter(number => number !== num),
          isWin: null
      }));
    
  }

  verifyClick = () => {

    this.setState(prevState => ({
      isWin: prevState.numberOfStars === prevState.chosenNumbers.reduce((a, b) => a + b , 0)
    }));
  }

  refreshClick = () => {
    console.log("in refreshClick");
    this.setState (prevState => ({
      chosenNumbers: [],
      numberOfStars: Game.GenerateRandomNumber(),
      isWin: null,
      refreshTimes: prevState.refreshTimes - 1
    }), this.decideGameStatus);

  }

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.chosenNumbers),
      isWin: null,
      chosenNumbers: [],
      numberOfStars: Game.GenerateRandomNumber(),
    }), this.decideGameStatus);
    
  }

  possibleSolutions = ({usedNumbers, numberOfStars}) => {
    const possibleNumbers = _.range(1,10).filter(number => 
      usedNumbers.indexOf(number) === -1);

    return possibleCombinationSum(possibleNumbers, numberOfStars);
  }

  decideGameStatus = () => {
    this.setState(prevState => {
        if (prevState.usedNumbers.length === 9) {
          return { gameStatus: 'You Win' };
        }
        if (prevState.refreshTimes === 0
          && !this.possibleSolutions(prevState)) {
           return { gameStatus: 'You Lost' };
        }
    });
  }

  ReplayClick = () => {
    this.setState(this.initiateGameState());
  }


  render() {
    const { 
      chosenNumbers, 
      numberOfStars,
      usedNumbers,
      isWin,
      refreshTimes,
      gameStatus } = this.state;

    return (
      <div>
        From Game
        <div className="row">
            <div className="col-md-6">
                <Star numberOfStars={numberOfStars} />
                <Button chosenNumbers={chosenNumbers} 
                  acceptAnswer={this.acceptAnswer}
                  verifyClick={this.verifyClick}
                  isWin={isWin}
                  refreshTimes={refreshTimes}
                  refreshClick={this.refreshClick}
                />
                <Answer chosenNumbers={chosenNumbers} 
                  answerClick={this.answerClick}
                />                
                <div style={{clear: "both"}}></div>
                { gameStatus ? 
                <MsgStatus gameStatus={gameStatus}
                  ReplayClick={this.ReplayClick} /> :
                <Numbers chosenNumbers={chosenNumbers} 
                  usedNumbers={usedNumbers} 
                  selectNumber={this.numberClick} />
                }
                
            </div>
        </div>
      </div>
    );
  }
}

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};