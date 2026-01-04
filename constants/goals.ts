import { Colors } from './colors';

export type { GoalId } from './goalRules';
export { sanitizeGoals, toggleGoalWithConflicts } from './goalRules';

import type { GoalId } from './goalRules';

export type GoalDefinition = {
  id: GoalId;
  label: string;
  icon: string;
  iconColor: string;
  iconBg: string;
};

export const GOALS: GoalDefinition[] = [
  {
    id: 'stabilize-glucose',
    label: 'Stabiliser ma glycémie',
    icon: 'water',
    iconColor: Colors.secondary.orangeText,
    iconBg: Colors.secondary.orangePastel,
  },
  {
    id: 'lose-weight',
    label: 'Perdre du poids',
    icon: 'remove',
    iconColor: Colors.neutral.gray900,
    iconBg: Colors.neutral.gray100,
  },
  {
    id: 'maintain-weight',
    label: 'Maintenir mon poids',
    icon: 'scale',
    iconColor: Colors.secondary.orangeText,
    iconBg: Colors.secondary.orangePastel,
  },
  {
    id: 'gain-weight',
    label: 'Prendre du poids',
    icon: 'add',
    iconColor: Colors.neutral.gray900,
    iconBg: Colors.neutral.gray100,
  },
  {
    id: 'improve-nutrition',
    label: 'Améliorer mon alimentation',
    icon: 'restaurant',
    iconColor: Colors.neutral.gray900,
    iconBg: Colors.neutral.gray100,
  },
];
