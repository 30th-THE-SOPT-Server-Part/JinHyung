import SoptMember from "./SoptMember";

export default class ServerMember implements SoptMember {
    public name: string;
    public group: string;

    constructor(name: string, group: string) {
        this.name = name;
        this.group = group;
    }
}
