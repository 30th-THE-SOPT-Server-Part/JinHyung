import mongoose from "mongoose";
import { UserInfo } from "../interfaces/user/UserInfo";
import { UserSchema } from "./User";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        unique: true
    },
    tags: [String],
    commenters: [UserSchema]
});

export {UserSchema}
export default mongoose.model<UserInfo & mongoose.Document>("User", UserSchema);