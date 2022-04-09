import ServerMember from "./domain/ServerMember";
import { ServerMembers } from "./domain/ServerMembers";

const member: ServerMember[] = [
      {
        name: '채정아',
        group: 'ob',
      },
      {
        name: '김동재',
        group: 'yb',
      },
      {
        name: '박진형',
        group: 'yb',
      },
      {
        name: '김루희',
        group: 'ob',
      },
      {
        name: '박진수',
        group: 'ob',
      },
];

const serverMembers = new ServerMembers(member);

serverMembers.organize();