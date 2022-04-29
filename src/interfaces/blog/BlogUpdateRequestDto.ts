import { UserCreateDto } from "../user/UserCreateDto"

export interface BlogUpdateRequestDto {
    title?: string;
    author?: string;
    content?: string;
    tags?: string[];
    commenters?: UserCreateDto[];
}