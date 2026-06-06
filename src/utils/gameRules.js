import { GESTURES, COMPUTER_MOVES, RESULT_TYPES } from './constants';

export function getComputerMove() {
  return COMPUTER_MOVES[Math.floor(Math.random() * 3)];
}

export function determineWinner(userGesture, computerMove) {
  if (userGesture === computerMove) return RESULT_TYPES.DRAW;
  const winsAgainst = {
    [GESTURES.ROCK]: GESTURES.SCISSORS,
    [GESTURES.PAPER]: GESTURES.ROCK,
    [GESTURES.SCISSORS]: GESTURES.PAPER,
  };
  return winsAgainst[userGesture] === computerMove
    ? RESULT_TYPES.USER_WIN
    : RESULT_TYPES.COMPUTER_WIN;
}
