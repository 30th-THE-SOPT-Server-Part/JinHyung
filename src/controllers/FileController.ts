import express, { Request, Response } from "express";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import FileService from "../services/FileService";
import to from "../interfaces/common/to";

async function promHandler<T>(prom: Promise<T>): Promise<[T | null, any]> {
  try {
    return [await prom, null];
  } catch (error) {
    return [null, error];
  }
}

const uploadFileToS3 = async (req: Request, res: Response) => {
  if (!req.file)
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));

  const image: Express.MulterS3.File = req.file as Express.MulterS3.File;
  const { location, originalname } = image;

  const [updated, err] = await promHandler(
    FileService.createFile(location, originalname)
  );

  if (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(
        util.fail(
          statusCode.INTERNAL_SERVER_ERROR,
          message.INTERNAL_SERVER_ERROR
        )
      );
  }

  if (updated) {
    res
      .status(statusCode.CREATED)
      .send(
        util.success(statusCode.CREATED, message.CREATE_FILE_SUCCESS, updated)
      );
  }
};

const uploadFilesToS3 = async (req: Request, res: Response) => {
  if (!req.files)
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));

  const images: Express.MulterS3.File[] = req.files as Express.MulterS3.File[];

  const [imageList]: [
    {
      location: string;
      originalname: string;
    }[]
  ] = await to(
    Promise.all(
      images.map((image: Express.MulterS3.File) => {
        return {
          location: image.location,
          originalname: image.originalname,
        };
      })
    ),
    res
  );

  const data = await FileService.createFiles(imageList);

  res
    .status(statusCode.CREATED)
    .send(util.success(statusCode.CREATED, message.CREATE_FILE_SUCCESS, data));
};

export default {
  uploadFileToS3,
  uploadFilesToS3,
};
