import { MemberCard } from "../components/memberCard";
import { Interests } from "../enums/interests";
import { findCommonElements, removeItemFromArray } from "../helpers/array";
import { Dataset } from "../interfaces/dataset";
import { Group } from "../interfaces/group";
import { Member } from "../interfaces/member";
import { Skills } from "../interfaces/skills";

export class DataParser {
  switchToGroup: boolean;

  constructor() {
    this.switchToGroup = false;
  }

  public parse(data: string) {
    const separateLines = data.split(/\r?\n|\r|\n/g);
    const dataset: Dataset = { members: [], groups: [] };

    if (!separateLines[0].includes(", skills: ")) {
      // Bad error check but still enough for most files.
      return undefined;
    }

    for (const line of separateLines) {
      if (line.includes("Groups:")) {
        this.switchToGroup = true;
      } else if (this.switchToGroup) {
        dataset.groups.push(this.parseGroup(line, dataset.members));
      } else {
        dataset.members.push(this.parseMember(line));
      }
    }

    this.switchToGroup = false;

    return dataset;
  }

  public parseMember(data: string): Member {
    const nameSplit = data.split(", skills: ");
    const interestsSplit = nameSplit[1].split(". interests: ");

    const name = nameSplit[0];
    const skills = this.parseSkills(interestsSplit[0]);
    const interests = this.parseInterests(interestsSplit[1]);

    return {
      name,
      skills,
      interests,
    };
  }

  public parseSkills(data: string): Skills {
    const skills = {
      audio: 0,
      gameDesign: 0,
      programming: 0,
      projectManagement: 0,
      writing: 0,
    };
    const skillSplit = data.split(", ");

    for (const skill of skillSplit) {
      if (skill.includes("programming ")) {
        const split = skill.split("programming ");
        skills.programming = Number.parseInt(split[1]);
      } else if (skill.includes("writing ")) {
        const split = skill.split("writing ");
        skills.writing = Number.parseInt(split[1]);
      } else if (skill.includes("game design ")) {
        const split = skill.split("game design ");
        skills.gameDesign = Number.parseInt(split[1]);
      } else if (skill.includes("audio ")) {
        const split = skill.split("audio ");
        skills.audio = Number.parseInt(split[1]);
      } else if (skill.includes("project management ")) {
        const split = skill.split("project management ");
        skills.projectManagement = Number.parseInt(split[1]);
      }
    }

    return skills;
  }
  public parseInterests(data: string): Interests[] {
    const interestsSplit = data.split(", ");
    const interests: Interests[] = [];

    for (const interest of interestsSplit) {
      interests.push((<any>Interests)[interest]);
    }

    return interests;
  }

  public parseGroup(data: string, memberList: Member[]): Group {
    const members: Member[] = [];
    const namesSplit = data.split(", ");

    for (const name of namesSplit) {
      const member = memberList.find((m) => m.name === name);

      if (member) {
        members.push(member);
      }
    }

    const groupScore = this.calculateGroupScore(members);
    const valid = this.checkGroupValidity(members);

    return { members, groupScore, valid };
  }

  public calculateGroupScore(members: Member[]): number {
    let score = 1000;
    const groupSkillScore: Skills = {
      audio: 0,
      gameDesign: 0,
      programming: 0,
      projectManagement: 0,
      writing: 0,
    };

    for (const member of members) {
      const { audio, gameDesign, programming, projectManagement, writing } =
        member.skills;

      if (audio > groupSkillScore.audio) {
        groupSkillScore.audio = audio;
      }
      if (gameDesign > groupSkillScore.gameDesign) {
        groupSkillScore.gameDesign = gameDesign;
      }
      if (programming > groupSkillScore.programming) {
        groupSkillScore.programming = programming;
      }
      if (projectManagement > groupSkillScore.projectManagement) {
        groupSkillScore.projectManagement = projectManagement;
      }
      if (writing > groupSkillScore.writing) {
        groupSkillScore.writing = writing;
      }
    }

    if (groupSkillScore.audio < score) {
      score = groupSkillScore.audio;
    }
    if (groupSkillScore.gameDesign < score) {
      score = groupSkillScore.gameDesign;
    }
    if (groupSkillScore.programming < score) {
      score = groupSkillScore.programming;
    }
    if (groupSkillScore.projectManagement < score) {
      score = groupSkillScore.projectManagement;
    }
    if (groupSkillScore.writing < score) {
      score = groupSkillScore.writing;
    }

    return score;
  }

  public checkGroupValidity(members: Member[]): boolean {
    let interests: Interests[] = [];

    for (const member of members) {
      if (!interests.length) {
        interests.push(...member.interests);
      } else {
        interests = interests.filter((value) =>
          member.interests.includes(value)
        );

        if (!interests.length) {
          return false;
        }
      }
    }

    return true;
  }

  public findBestGroup(members: Member[]): Group {
    let bestGroup: Group = { members: [], groupScore: 0, valid: false };

    const findMembersWithCommonInterest = (
      members: Member[],
      interest: Interests
    ) => {
      const memberStack = [];

      for (const findMember of members) {
        if (findMember.interests.includes(interest)) {
          memberStack.push(findMember);
        }
      }
      return memberStack;
    };

    const findBestScoringMember = (members: Member[], skill: string) => {
      let bestMember: Member = {
        interests: [],
        name: "",
        skills: {
          audio: 0,
          gameDesign: 0,
          programming: 0,
          projectManagement: 0,
          writing: 0,
        },
      };

      type SkillKey = keyof typeof bestMember.skills;

      for (const member of members) {
        if (
          member.skills[skill as SkillKey] >
          bestMember.skills[skill as SkillKey]
        ) {
          bestMember = member;
        }
      }

      return bestMember;
    };

    const filterGroup = (members: Member[]) => {
      const group: Member[] = [];

      for (const member of members) {
        if (group.length === 0) {
          group.push(member);
        } else if (!group.some((m) => m.name === member.name)) {
          group.push(member);
        }
      }

      return group;
    };

    const addMemberToGroup = (
      group: Member[],
      members: Member[],
      threshold: number
    ) => {
      for (const member of members) {
        if (!group.some((m) => m.name === member.name)) {
          group.push(member);
        }

        if (group.length === threshold) {
          return group;
        }
      }

      return null;
    };

    const removeFromGroup = (group: Member[], threshold: number) => {
      while (group.length > threshold) {
        let highestScoringMember: Member | null = null;

        for (const member of members) {
          if (highestScoringMember === null) {
            highestScoringMember = member;
          } else if (
            member.skills.audio > highestScoringMember.skills.audio ||
            member.skills.gameDesign > highestScoringMember.skills.gameDesign ||
            member.skills.programming >
              highestScoringMember.skills.programming ||
            member.skills.projectManagement >
              highestScoringMember.skills.projectManagement ||
            member.skills.writing > highestScoringMember.skills.writing
          ) {
            highestScoringMember = member;
          }
        }

        if (highestScoringMember !== null) {
          group = group.filter((m) => m.name !== highestScoringMember?.name);
        } else {
          return null;
        }
      }

      return group;
    };

    const formBestGroupBasedOnInterest = (
      interest: Interests,
      members: Member[]
    ) => {
      const membersWithInterest = findMembersWithCommonInterest(
        members,
        interest
      );

      if (membersWithInterest.length > 3) {
        const programmingMember = findBestScoringMember(
          membersWithInterest,
          "programming"
        );
        const writingMember = findBestScoringMember(
          membersWithInterest,
          "writing"
        );
        const gameDesignMember = findBestScoringMember(
          membersWithInterest,
          "gameDesign"
        );
        const audioMember = findBestScoringMember(membersWithInterest, "audio");
        const projectManagementMember = findBestScoringMember(
          membersWithInterest,
          "projectManagement"
        );

        const filteredGroup = filterGroup([
          programmingMember,
          writingMember,
          gameDesignMember,
          audioMember,
          projectManagementMember,
        ]);

        if (filterGroup.length === 4) {
          return filteredGroup;
        } else if (filterGroup.length < 4) {
          return addMemberToGroup(filteredGroup, membersWithInterest, 4);
        } else {
          return removeFromGroup(filteredGroup, 4);
        }
      } else {
        console.error(
          "Members with " + interest + " are: ",
          membersWithInterest
        );
        return null;
      }
    };

    const interests = Object.values(Interests);

    for (const interest of interests) {
      const groupMembers = formBestGroupBasedOnInterest(interest, members);
      if (
        groupMembers &&
        this.calculateGroupScore(groupMembers) > bestGroup.groupScore
      ) {
        bestGroup = {
          members: groupMembers,
          groupScore: this.calculateGroupScore(groupMembers),
          valid: true,
        };
      }
    }

    return bestGroup;
  }
}
