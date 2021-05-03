import * as aws from "@aws-sdk/client-ses";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const ses = new aws.SES({
  region: "sa-east-1",
  apiVersion: "2021-05-03",
  credentials: {
    accessKeyId: process.env.AWS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET || "",
  },
});

export const transporter = createTransport({ SES: { ses, aws } });
