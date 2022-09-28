import nodemailer from "nodemailer";
import handlebars, { template } from "handlebars";
import fs from "fs";
import path from "path";
import { sendEmail } from "../../types/types";

const sendEmail = async (atributes: sendEmail) => {
  const testEmail = await nodemailer.createTestAccount();
  try {
    const transporter = nodemailer.createTransport({
      host: testEmail.smtp.host,
      port: testEmail.smtp.port,
      secure: testEmail.smtp.secure,
      auth: {
        user: testEmail.user,
        pass: testEmail.pass,
      },
    });

    const source = fs.readFileSync(
      path.join(__dirname, atributes.template),
      "utf8"
    );
    const compiledTemplate = handlebars.compile(source);

    const options = () => {
      return {
        from: testEmail.user,
        to: atributes.email,
        subject: atributes.subject,
        html: compiledTemplate(atributes.payload),
      };
    };
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        console.log("email sended");
      }
    });
  } catch (err) {
    console.log(err);
  }
};
export default sendEmail;
