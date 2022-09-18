import { Interests } from "../enums/interests";
import { Skills } from "./skills";

export interface Member {
  name: string;
  skills: Skills;
  interests: Interests[];
}
