import aws, { SES } from "@aws-sdk/client-ses";
import { createTransport } from "nodemailer";

const ses = new SES({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET || "",
  },
});

export const transporter = createTransport({ SES: { ses, aws } });
