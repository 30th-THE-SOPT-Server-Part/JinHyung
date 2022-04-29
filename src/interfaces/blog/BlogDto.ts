import { UserInfo } from "../user/UserInfo";

export interface BlogDto{
    title: string;
    author: string;
    contents: string;
    tags: string[];
    commenters: UserInfo[];
}