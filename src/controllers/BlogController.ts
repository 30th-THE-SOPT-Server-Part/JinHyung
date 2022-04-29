import express, { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util"


import { BlogCreateRequestDto } from "../interfaces/blog/BlogCreateRequestDto";
// import { BlogService } from "../services";
import { BlogUpdateRequestDto } from "../interfaces/blog/BlogUpdateRequestDto";

const createBlog = async(request: Request, response: Response) => {
    const blogCreateRequestDto: BlogCreateRequestDto = request.body;
    
    try {
        const data = await BlogService.createBlog(blogCreateRequestDto);
        response.status(statusCode.CREATED).send(
            util.success(
                statusCode.CREATED,
                message.CREATED_ARTICLE_SUCCESS,
                data
            )
        )
    } catch (error) {
        response.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR
            )
        )
    }
}

const updateBlog = async(request: Request, response: Response) => {
    const blogUpdateDto: BlogUpdateRequestDto = request.body;
    const { postId } = request.params;

    try {
        await BlogService.updateBlog(postId, blogUpdateDto);

        response.status(statusCode.NO_CONTENT).send();
    } catch (error) {
        response.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR, 
                message.INTERNAL_SERVER_ERROR
        ));
    }
}

const findBlogById = async(request: Request, response: Response) => {
    const { postId } = request.params;

    try {
        const data = await BlogService.findBlogById(postId); 

        if (!data) {
            return response.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        response.status(statusCode.OK).send(
            util.success(
                statusCode.OK, 
                message.READ_ARTICLE_SUCCESS, 
                data
        ));

    } catch (error) {
        response.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR, 
                message.INTERNAL_SERVER_ERROR
        ));
    }
}

const deleteBlog = async(request: Request, response: Response) => {
    const { postId } = request.params;

    try {
        await BlogService.deleteBlog(postId);

        response.status(statusCode.NO_CONTENT).send();
    } catch (error) {
        response.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR
        ));
    }
}

export default {
    createBlog,
    updateBlog,
    findBlogById,
    deleteBlog
}