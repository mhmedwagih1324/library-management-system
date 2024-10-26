import {
  PaginationLimitParameter,
  PaginationOffsetParameter,
} from "../../common/parameters.js";

export const ListBorrowersQueryParams = {
  PaginationLimitParameter,
  PaginationOffsetParameter,
};

export const UserIdParam = {
  in: "params",
  name: "id",
  schema: {
    type: "string",
    example: "a4958ec2-2c8f-4e0b-a4f4-b557e2200587",
  },
  description: "User id",
};

export const ListCallerBorrowingProcessesQueryParams = ListBorrowersQueryParams;
