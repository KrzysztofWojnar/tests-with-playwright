const universalPassword = 'secret_sauce';
export const users = {
  standard: {
    username: 'standard_user',
    password: universalPassword,
  },
  problem: {
    username: 'problem_user',
    password: universalPassword,
  },
  locked: {
    username: 'locked_out_user',
    password: universalPassword,
  },
} as const satisfies Record<
  string,
  {
    username: string;
    password: string;
  }
>;
