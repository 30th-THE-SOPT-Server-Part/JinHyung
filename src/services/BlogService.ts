import { BlogCreateRequestDto } from "../interfaces/blog/BlogCreateRequestDto";
import { BlogResponseDto } from "../interfaces/blog/BlogResponseDto";
import { BlogUpdateRequestDto } from "../interfaces/blog/BlogUpdateRequestDto";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import Blog from "../models/Blog";

const createBlog = async (blogCreateDto: BlogCreateRequestDto): Promise<PostBaseResponseDto> => {
    try {
        const blog = new Blog({
            title: blogCreateDto.title,
            author: blogCreateDto.author,
            content: blogCreateDto.contents,
            tags: blogCreateDto.tags,
            reviewers: blogCreateDto.commenters,
        }); 

        await blog.save();

        return {
            _id: blog.id
        };

    } catch (error) {
        throw new Error("Error!");
    }
}

const updateBlog = async(postId: string, blogUpdateDto: BlogUpdateRequestDto) => {
    try {
        await Blog.findByIdAndUpdate(postId, blogUpdateDto);
    } catch (error){
        throw new Error("error!");
    }
}

const findBlogById = async(postId: string) => {
    try {
        const blog = await Blog.findById(postId);
        if(!blog){
            return null;
        }
        return blog;
    } catch (error){
        throw new Error("error!");
    }
}

const deleteBlog = async(postId: string): Promise<void> => {
    try {
        await Blog.findByIdAndDelete(postId);
    } catch (error){
        throw new Error("error!");
    }
}

export default {
    createBlog,
    updateBlog,
    findBlogById,
    deleteBlog
}