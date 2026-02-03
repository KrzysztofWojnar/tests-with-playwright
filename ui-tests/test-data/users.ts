const UNIVERSAL_PASSWORD = 'secret_sauce';
export const USERS = {
  standard: {
    username: 'standard_user',
    password: UNIVERSAL_PASSWORD,
  },
  problem: {
    username: 'problem_user',
    password: UNIVERSAL_PASSWORD,
  },
  locked: {
    username: 'locked_out_user',
    password: UNIVERSAL_PASSWORD,
  },
} as const satisfies Record<
  string,
  {
    username: string;
    password: string;
  }
>;
