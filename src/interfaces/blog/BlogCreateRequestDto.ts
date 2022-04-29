import { UserCreateDto } from "../user/UserCreateDto"

export interface BlogCreateRequestDto {
    title: string;
    author: string;
    contents: string;
    tags?: string[];
    commenters?: UserCreateDto[];
}