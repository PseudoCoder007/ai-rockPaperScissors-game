import { useReducer, useCallback } from 'react';
import { GAME_STATES, RESULT_TYPES } from '../utils/constants';
import { getComputerMove, determineWinner } from '../utils/gameRules';
import { updateStreaks } from '../utils/streakUtils';

const initialState = {
  userScore: 0,
  computerScore: 0,
  drawCount: 0,
  currentUserStreak: 0,
  longestUserStreak: 0,
  currentComputerStreak: 0,
  longestComputerStreak: 0,
  gameState: GAME_STATES.IDLE,
  userGesture: null,
  computerMove: null,
  roundResult: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        gameState: GAME_STATES.COUNTDOWN,
        userGesture: null,
        computerMove: null,
        roundResult: null,
      };

    case 'CAPTURE_GESTURE': {
      const { gesture } = action.payload;
      const computerMove = getComputerMove();
      const result = determineWinner(gesture, computerMove);

      const newStreaks = updateStreaks(result, {
        currentUserStreak: state.currentUserStreak,
        longestUserStreak: state.longestUserStreak,
        currentComputerStreak: state.currentComputerStreak,
        longestComputerStreak: state.longestComputerStreak,
      });

      return {
        ...state,
        userGesture: gesture,
        computerMove,
        roundResult: result,
        gameState: GAME_STATES.RESULT,
        userScore:
          result === RESULT_TYPES.USER_WIN ? state.userScore + 1 : state.userScore,
        computerScore:
          result === RESULT_TYPES.COMPUTER_WIN
            ? state.computerScore + 1
            : state.computerScore,
        drawCount:
          result === RESULT_TYPES.DRAW ? state.drawCount + 1 : state.drawCount,
        ...newStreaks,
      };
    }

    case 'NO_GESTURE':
      return {
        ...state,
        gameState: GAME_STATES.RESULT,
        userGesture: null,
        computerMove: null,
        roundResult: null,
      };

    case 'PLAY_AGAIN':
      return {
        ...state,
        gameState: GAME_STATES.COUNTDOWN,
        userGesture: null,
        computerMove: null,
        roundResult: null,
      };

    case 'RESET_SCORES':
      return { ...initialState };

    default:
      return state;
  }
}

export function useGameLogic() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
  const captureGesture = useCallback(
    (gesture) => dispatch({ type: 'CAPTURE_GESTURE', payload: { gesture } }),
    []
  );
  const noGesture = useCallback(() => dispatch({ type: 'NO_GESTURE' }), []);
  const playAgain = useCallback(() => dispatch({ type: 'PLAY_AGAIN' }), []);
  const resetScores = useCallback(() => dispatch({ type: 'RESET_SCORES' }), []);

  return { state, startGame, captureGesture, noGesture, playAgain, resetScores };
}
