import { Member } from "./member";

export interface Group {
  members: Member[];
  groupScore: number;
  valid: boolean;
}
