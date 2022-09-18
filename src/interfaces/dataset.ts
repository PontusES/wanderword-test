import { Group } from "./group";
import { Member } from "./member";

export interface Dataset {
  members: Member[];
  groups: Group[];
}
