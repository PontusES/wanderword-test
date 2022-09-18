import { Interests } from "../enums/interests";
import { Dataset } from "../interfaces/dataset";
import { Member } from "../interfaces/member";
import { DataParser } from "./dataParser";

const testData1 =
  "QW50b24sIHNraWxsczogcHJvZ3JhbW1pbmcgODcsIHdyaXRpbmcgMjMsIGdhbWUgZGVzaWduIDM4LCBhdWRpbyAxMywgcHJvamVjdCBtYW5hZ2VtZW50IDY4LiBpbnRlcmVzdHM6IHF1aXosIG9ubGluZQpGaWxpcCwgc2tpbGxzOiBwcm9ncmFtbWluZyA5OSwgd3JpdGluZyAxMiwgZ2FtZSBkZXNpZ24gMjksIGF1ZGlvIDUwLCBwcm9qZWN0IG1hbmFnZW1lbnQgNy4gaW50ZXJlc3RzOiBkZXRlY3RpdmUsIHF1aXosIHRlY2gKR3JvdXBzOgpBbnRvbiwgRmlsaXA=";
const testObject1: Dataset = {
  members: [
    {
      name: "Anton",
      skills: {
        audio: 13,
        gameDesign: 38,
        programming: 87,
        projectManagement: 68,
        writing: 23,
      },
      interests: [Interests.quiz, Interests.online],
    },
    {
      name: "Filip",
      skills: {
        audio: 50,
        gameDesign: 29,
        programming: 99,
        projectManagement: 7,
        writing: 12,
      },
      interests: [Interests.detective, Interests.quiz, Interests.tech],
    },
  ],
  groups: [
    {
      members: [
        {
          name: "Anton",
          skills: {
            audio: 13,
            gameDesign: 38,
            programming: 87,
            projectManagement: 68,
            writing: 23,
          },
          interests: [Interests.quiz, Interests.online],
        },
        {
          name: "Filip",
          skills: {
            audio: 50,
            gameDesign: 29,
            programming: 99,
            projectManagement: 7,
            writing: 12,
          },
          interests: [Interests.detective, Interests.quiz, Interests.tech],
        },
      ],
      groupScore: 23,
      valid: true,
    },
  ],
};

const testData2 =
  "Anton, skills: programming 87, writing 23, game design 38, audio 13, project management 68. interests: quiz, online";
const testObject2 = {
  name: "Anton",
  skills: {
    audio: 13,
    gameDesign: 38,
    programming: 87,
    projectManagement: 68,
    writing: 23,
  },
  interests: [Interests.quiz, Interests.online],
};

const testData3 =
  "programming 87, writing 23, game design 38, audio 13, project management 68";
const testObject3 = {
  audio: 13,
  gameDesign: 38,
  programming: 87,
  projectManagement: 68,
  writing: 23,
};

const testData4 = "quiz, online";
const testObject4 = [Interests.quiz, Interests.online];

const testData5 = "Anton, Filip";
const testMembers5 = [
  {
    name: "Anton",
    skills: {
      audio: 13,
      gameDesign: 38,
      programming: 87,
      projectManagement: 68,
      writing: 23,
    },
    interests: [Interests.quiz, Interests.online],
  },
  {
    name: "Filip",
    skills: {
      audio: 50,
      gameDesign: 29,
      programming: 99,
      projectManagement: 7,
      writing: 12,
    },
    interests: [Interests.detective, Interests.quiz, Interests.tech],
  },
];
const testObject5 = {
  members: [
    {
      name: "Anton",
      skills: {
        audio: 13,
        gameDesign: 38,
        programming: 87,
        projectManagement: 68,
        writing: 23,
      },
      interests: [Interests.quiz, Interests.online],
    },
    {
      name: "Filip",
      skills: {
        audio: 50,
        gameDesign: 29,
        programming: 99,
        projectManagement: 7,
        writing: 12,
      },
      interests: [Interests.detective, Interests.quiz, Interests.tech],
    },
  ],
  groupScore: 23,
  valid: true,
};

const testMembers6 = [
  {
    name: "Anton",
    skills: {
      audio: 13,
      gameDesign: 38,
      programming: 87,
      projectManagement: 68,
      writing: 23,
    },
    interests: [Interests.quiz, Interests.online],
  },
  {
    name: "Filip",
    skills: {
      audio: 50,
      gameDesign: 29,
      programming: 99,
      projectManagement: 7,
      writing: 12,
    },
    interests: [Interests.detective, Interests.quiz, Interests.tech],
  },
];
const testResult6 = 23;

const testMembers7 = [
  {
    name: "Anton",
    skills: {
      audio: 13,
      gameDesign: 38,
      programming: 87,
      projectManagement: 68,
      writing: 23,
    },
    interests: [Interests.quiz, Interests.online],
  },
  {
    name: "Filip",
    skills: {
      audio: 50,
      gameDesign: 29,
      programming: 99,
      projectManagement: 7,
      writing: 12,
    },
    interests: [Interests.detective, Interests.quiz, Interests.tech],
  },
];

const testMembers8: Member[] = [
  {
    name: "Elisabet",
    skills: {
      audio: 672,
      gameDesign: 796,
      programming: 833,
      projectManagement: 461,
      writing: 681,
    },
    interests: [
      Interests.tech,
      Interests.horror,
      Interests.music,
      Interests.quiz,
      Interests.cooking,
    ],
  },
  {
    name: "Anna",
    skills: {
      audio: 274,
      gameDesign: 978,
      programming: 643,
      projectManagement: 505,
      writing: 306,
    },
    interests: [
      Interests.western,
      Interests.tech,
      Interests.detective,
      Interests.rpg,
    ],
  },
  {
    name: "Maria",
    skills: {
      audio: 631,
      gameDesign: 625,
      programming: 765,
      projectManagement: 706,
      writing: 231,
    },
    interests: [Interests.horror, Interests.music, Interests.rpg],
  },
  {
    name: "Bengt",
    skills: {
      audio: 72,
      gameDesign: 702,
      programming: 755,
      projectManagement: 278,
      writing: 637,
    },
    interests: [
      Interests.cooking,
      Interests.detective,
      Interests.quiz,
      Interests.rpg,
    ],
  },
  {
    name: "Nils",
    skills: {
      audio: 227,
      gameDesign: 998,
      programming: 220,
      projectManagement: 697,
      writing: 376,
    },
    interests: [
      Interests.cooking,
      Interests.western,
      Interests.quiz,
      Interests.music,
      Interests.horror,
    ],
  },
  {
    name: "Marianne",
    skills: {
      audio: 589,
      gameDesign: 578,
      programming: 2,
      projectManagement: 401,
      writing: 115,
    },
    interests: [
      Interests.music,
      Interests.horror,
      Interests.quiz,
      Interests.cooking,
      Interests.rpg,
    ],
  },
  {
    name: "Peter",
    skills: {
      audio: 313,
      gameDesign: 650,
      programming: 319,
      projectManagement: 533,
      writing: 396,
    },
    interests: [Interests.rpg, Interests.detective, Interests.music],
  },
  {
    name: "Fredrik",
    skills: {
      audio: 946,
      gameDesign: 976,
      programming: 79,
      projectManagement: 896,
      writing: 300,
    },
    interests: [
      Interests.western,
      Interests.detective,
      Interests.horror,
      Interests.music,
    ],
  },
  {
    name: "Karin",
    skills: {
      audio: 328,
      gameDesign: 248,
      programming: 134,
      projectManagement: 81,
      writing: 301,
    },
    interests: [
      Interests.cooking,
      Interests.detective,
      Interests.rpg,
      Interests.quiz,
      Interests.horror,
    ],
  },
  {
    name: "Lennart",
    skills: {
      audio: 384,
      gameDesign: 593,
      programming: 397,
      projectManagement: 298,
      writing: 529,
    },
    interests: [
      Interests.rpg,
      Interests.music,
      Interests.tech,
      Interests.quiz,
      Interests.western,
    ],
  },
  {
    name: "Lena",
    skills: {
      audio: 471,
      gameDesign: 766,
      programming: 939,
      projectManagement: 931,
      writing: 692,
    },
    interests: [
      Interests.cooking,
      Interests.western,
      Interests.detective,
      Interests.music,
    ],
  },
  {
    name: "Ingrid",
    skills: {
      audio: 210,
      gameDesign: 532,
      programming: 511,
      projectManagement: 91,
      writing: 343,
    },
    interests: [
      Interests.rpg,
      Interests.quiz,
      Interests.cooking,
      Interests.detective,
      Interests.music,
    ],
  },
  {
    name: "Per",
    skills: {
      audio: 558,
      gameDesign: 398,
      programming: 793,
      projectManagement: 445,
      writing: 801,
    },
    interests: [Interests.rpg, Interests.detective, Interests.quiz],
  },
  {
    name: "Linnéa",
    skills: {
      audio: 295,
      gameDesign: 37,
      programming: 280,
      projectManagement: 762,
      writing: 560,
    },
    interests: [
      Interests.western,
      Interests.music,
      Interests.horror,
      Interests.detective,
      Interests.quiz,
    ],
  },
  {
    name: "Johan",
    skills: {
      audio: 952,
      gameDesign: 294,
      programming: 251,
      projectManagement: 867,
      writing: 576,
    },
    interests: [Interests.music, Interests.western, Interests.rpg],
  },
  {
    name: "Anders",
    skills: {
      audio: 473,
      gameDesign: 193,
      programming: 909,
      projectManagement: 130,
      writing: 296,
    },
    interests: [
      Interests.detective,
      Interests.cooking,
      Interests.rpg,
      Interests.quiz,
      Interests.western,
    ],
  },
];
const testGroup8 = {
  members: [
    {
      name: "Lena",
      skills: {
        audio: 471,
        gameDesign: 766,
        programming: 939,
        projectManagement: 931,
        writing: 692,
      },
      interests: ["cooking", "western", "detective", "music"],
    },
    {
      name: "Per",
      skills: {
        audio: 558,
        gameDesign: 398,
        programming: 793,
        projectManagement: 445,
        writing: 801,
      },
      interests: ["rpg", "detective", "quiz"],
    },
    {
      name: "Anna",
      skills: {
        audio: 274,
        gameDesign: 978,
        programming: 643,
        projectManagement: 505,
        writing: 306,
      },
      interests: ["western", "tech", "detective", "rpg"],
    },
    {
      name: "Fredrik",
      skills: {
        audio: 946,
        gameDesign: 976,
        programming: 79,
        projectManagement: 896,
        writing: 300,
      },
      interests: ["western", "detective", "horror", "music"],
    },
  ],
  groupScore: 801,
  valid: true,
};

const base64Decode = (encodedString: string) => {
  return atob(encodedString);
};

test("test parse function", () => {
  const dataParser = new DataParser();

  expect(dataParser.parse(base64Decode(testData1))).toEqual(testObject1);
});

test("test parseMember function", () => {
  const dataParser = new DataParser();

  expect(dataParser.parseMember(testData2)).toEqual(testObject2);
});

test("test parseSkills function", () => {
  const dataParser = new DataParser();

  expect(dataParser.parseSkills(testData3)).toEqual(testObject3);
});

test("test parseInterests function", () => {
  const dataParser = new DataParser();

  expect(dataParser.parseInterests(testData4)).toEqual(testObject4);
});

test("test parseGroup function", () => {
  const dataParser = new DataParser();

  expect(dataParser.parseGroup(testData5, testMembers5)).toEqual(testObject5);
});

test("test calculateGroupScore function", () => {
  const dataParser = new DataParser();

  expect(dataParser.calculateGroupScore(testMembers6)).toEqual(testResult6);
});

test("test checkGroupValidity function", () => {
  const dataParser = new DataParser();

  expect(dataParser.checkGroupValidity(testMembers7)).toEqual(true);
});

test("test", () => {
  const dataParser = new DataParser();

  expect(dataParser.findBestGroup(testMembers8)).toEqual(testGroup8);
});
