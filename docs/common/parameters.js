export const PaginationLimitParameter = {
  in: "query",
  name: "limit",
  schema: {
    type: "Number",
    default: 25,
    min: 5,
    max: 100,
    allowed: -1,
  },
  description: "limit of returned values count",
};

export const PaginationOffsetParameter = {
  in: "query",
  name: "offset",
  schema: {
    type: "Number",
    default: 0,
  },
  description: "the offset to start returning after",
};
