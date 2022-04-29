import mongoose from "mongoose";
import { BlogCreateRequestDto } from "./BlogCreateRequestDto"

export interface BlogResponseDto extends BlogCreateRequestDto{
    _id: mongoose.Schema.Types.ObjectId;
}