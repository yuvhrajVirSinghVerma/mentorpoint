import mongoose from "mongoose";
import opportunitiesSchema from "../../models/opportunities.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";
import admin from 'firebase-admin'
import {google} from 'googleapis'

export const addOpportunities = async (req, res) => {
  try {
    let data = req?.body;
 
    let result = await opportunitiesSchema.create(data);

    sendSuccessResponse({
      res,
      data: result,
    });
  } catch (err) {
    sendFailResponse({
      res,
      err: err,
      statusCode: 500,
    });
  }
};
