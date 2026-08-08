import { StreakState } from '@/types';

export function transitionStateTable(
  currentState: StreakState,
  event: 'SUBMIT' | 'DAY_MISSED' | 'WINDOW_WARNING' | 'RECOVERY_SUBMIT',
  hasFreeze: boolean
): StreakState {
  switch (currentState) {
    case 'ACTIVE':
      if (event === 'WINDOW_WARNING') return 'AT_RISK';
      if (event === 'DAY_MISSED') return hasFreeze ? 'FROZEN' : 'BROKEN';
      return 'ACTIVE';

    case 'AT_RISK':
      if (event === 'SUBMIT') return 'ACTIVE';
      if (event === 'DAY_MISSED') return hasFreeze ? 'FROZEN' : 'BROKEN';
      return 'AT_RISK';

    case 'FROZEN':
      if (event === 'SUBMIT') return 'ACTIVE';
      if (event === 'DAY_MISSED') return 'BROKEN';
      return 'FROZEN';

    case 'BROKEN':
      if (event === 'RECOVERY_SUBMIT' || event === 'SUBMIT') return 'RECOVERED';
      return 'BROKEN';

    case 'RECOVERED':
      if (event === 'SUBMIT') return 'ACTIVE';
      return 'RECOVERED';

    default:
      return 'ACTIVE';
  }
}

export function FSMReasonExplainer(state: StreakState): string {
  switch (state) {
    case 'ACTIVE':
      return 'Daily code proof was successfully submitted and verified. Your streak is active and incrementing.';
    case 'AT_RISK':
      return 'Daily submission window is closing within 2 hours of midnight. Submit your code proof to avoid losing momentum.';
    case 'FROZEN':
      return 'Daily challenge deadline was missed, but 1 Tactical Freeze shield automatically protected your streak from being reset.';
    case 'BROKEN':
      return 'Daily challenge deadline was missed and no streak freeze shields were available. Non-punitive Recovery Mode activated.';
    case 'RECOVERED':
      return 'Recovery challenge was verified. Your active streak has been restored to 1 day as you rebuild momentum toward your personal best of 18 days.';
  }
}
