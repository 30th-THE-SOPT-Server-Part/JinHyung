import express, { Request, Response } from "express";
import message from "../../modules/responseMessage";
import statusCode from "../../modules/statusCode";
import util from "../../modules/util";

export const to = (promise: any, res: Response) => {
  if (!promise) {
    return new Promise((resolve, reject) => {
      reject(new Error("requires promises as the param"));
    }).catch((err: Error) => {
      return [err, null];
    });
  }
  return promise
    .then(function () {
      const arr = Array.from(arguments);
      return [null, ...arr];
    })
    .catch((err: Error) => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR)
          .send(
            util.fail(
              statusCode.INTERNAL_SERVER_ERROR,
              message.INTERNAL_SERVER_ERROR
            )
          );
      }
    )
};

export default to;