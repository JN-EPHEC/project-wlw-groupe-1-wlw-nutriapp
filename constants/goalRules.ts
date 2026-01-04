export type GoalId =
  | 'stabilize-glucose'
  | 'lose-weight'
  | 'maintain-weight'
  | 'gain-weight'
  | 'improve-nutrition';

export const GOAL_ID_LIST: GoalId[] = [
  'stabilize-glucose',
  'lose-weight',
  'maintain-weight',
  'gain-weight',
  'improve-nutrition',
];

const GOAL_IDS = new Set<GoalId>(GOAL_ID_LIST);

type ConflictGroup = 'weight';

const CONFLICT_GROUP_BY_GOAL: Partial<Record<GoalId, ConflictGroup>> = {
  'lose-weight': 'weight',
  'maintain-weight': 'weight',
  'gain-weight': 'weight',
};

export function toggleGoalWithConflicts(selected: GoalId[], goalId: GoalId): GoalId[] {
  if (selected.includes(goalId)) {
    return selected.filter((g) => g !== goalId);
  }

  const conflictGroup = CONFLICT_GROUP_BY_GOAL[goalId];
  const base = conflictGroup ? selected.filter((g) => CONFLICT_GROUP_BY_GOAL[g] !== conflictGroup) : selected;
  return [...base, goalId];
}

export function sanitizeGoals(input: unknown): GoalId[] {
  if (!Array.isArray(input)) return [];

  const result: GoalId[] = [];
  const pickedGroups = new Set<ConflictGroup>();

  for (const raw of input) {
    if (typeof raw !== 'string') continue;
    if (!GOAL_IDS.has(raw as GoalId)) continue;

    const goalId = raw as GoalId;
    const group = CONFLICT_GROUP_BY_GOAL[goalId];

    if (group) {
      if (pickedGroups.has(group)) continue;
      pickedGroups.add(group);
    }

    if (!result.includes(goalId)) {
      result.push(goalId);
    }
  }

  return result;
}
