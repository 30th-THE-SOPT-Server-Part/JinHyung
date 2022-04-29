import mongoose from "mongoose";
import { BlogCreateRequestDto } from "./BlogCreateRequestDto"

export interface BlogCreateResponseDto extends BlogCreateRequestDto{
    _id: mongoose.Schema.Types.ObjectId;
}