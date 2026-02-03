export type LimitingResources = {
  limit?: number;
};

export const NO_RESOURCES_LIMIT = {
  limit: 0,
} as const satisfies LimitingResources;
