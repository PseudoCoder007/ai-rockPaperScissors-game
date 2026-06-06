import { RESULT_TYPES } from './constants';

export function updateStreaks(result, streaks) {
  const {
    currentUserStreak,
    longestUserStreak,
    currentComputerStreak,
    longestComputerStreak,
  } = streaks;

  let nextUserCurrent = currentUserStreak;
  let nextUserLongest = longestUserStreak;
  let nextComputerCurrent = currentComputerStreak;
  let nextComputerLongest = longestComputerStreak;

  if (result === RESULT_TYPES.USER_WIN) {
    nextUserCurrent = currentUserStreak + 1;
    nextUserLongest = Math.max(nextUserCurrent, longestUserStreak);
    nextComputerCurrent = 0;
  } else if (result === RESULT_TYPES.COMPUTER_WIN) {
    nextComputerCurrent = currentComputerStreak + 1;
    nextComputerLongest = Math.max(nextComputerCurrent, longestComputerStreak);
    nextUserCurrent = 0;
  } else {
    nextUserCurrent = 0;
    nextComputerCurrent = 0;
  }

  return {
    currentUserStreak: nextUserCurrent,
    longestUserStreak: nextUserLongest,
    currentComputerStreak: nextComputerCurrent,
    longestComputerStreak: nextComputerLongest,
  };
}
