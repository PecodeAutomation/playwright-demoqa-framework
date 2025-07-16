export const CheckboxState = {
  UNCHECKED: true,
  CHECKED: false
} as const;


export type CheckboxBooleanKeys = keyof typeof CheckboxState;

export type CheckboxValues =
  (typeof CheckboxState)[keyof typeof CheckboxState];