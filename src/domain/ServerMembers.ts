import { random } from "../utils/random";
import ServerMember from "./ServerMember";

export class ServerMembers {
    member: ServerMember[];

    constructor(member: ServerMember[]) {
        this.member = member;
    }

    shuffle() {
        this.member.sort(() => Math.random() - random(Math.random(), Math.random()));
        return this.member;
    }

    organize() {
        this.shuffle();
    
        const OB = Object(this.member.find(x => x.group == 'ob'));
        const YB = Object(this.member.find(x => x.group == 'yb'));
    
        const dinnerMember: string[] = [OB.name, YB.name];
        console.log(`오늘의 저녁 식사 멤버 ???? ${dinnerMember[0]}, ${dinnerMember[1]}`);
    }
}