export const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/JfhfXGxkFl/';

export const GESTURES = {
  ROCK: 'Rock',
  PAPER: 'Paper',
  SCISSORS: 'Scissors',
  NO_GESTURE: 'No Gesture',
};

export const COMPUTER_MOVES = [GESTURES.ROCK, GESTURES.PAPER, GESTURES.SCISSORS];

export const GAME_STATES = {
  IDLE: 'idle',
  COUNTDOWN: 'countdown',
  RESULT: 'result',
};

export const RESULT_TYPES = {
  USER_WIN: 'user_win',
  COMPUTER_WIN: 'computer_win',
  DRAW: 'draw',
};

export const PREDICTION_THRESHOLD = 0.7;
export const COUNTDOWN_START = 3;

export const GESTURE_EMOJI = {
  Rock: '✊',
  Paper: '✋',
  Scissors: '✌️',
};

export const RESULT_MESSAGES = {
  user_win: 'You Win!',
  computer_win: 'Computer Wins!',
  draw: "It's a Draw!",
};

export const TTS_MESSAGES = {
  user_win: 'You win!',
  computer_win: 'Computer wins!',
  draw: "It's a draw!",
  show_move: 'Show your move!',
  no_gesture: 'Gesture not detected. Try again!',
};
