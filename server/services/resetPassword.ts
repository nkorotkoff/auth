import { default as bcrypt } from "bcryptjs";
import crypto from "crypto";
import Token from "../models/Token.model";
import User, { IUser } from "../models/userModel";
import sendEmail from "../utils/email/sendEmail";

export const requestPasswordReset = async (email: string) => {
  const clientUrl = process.env.CLIENT_URL;
  const salt = await bcrypt.genSalt(10);
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email not exist");

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();

  let resetToken = await crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(salt));

  await Token.create({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  });
  const link = `${clientUrl}/passwordReset?token=${resetToken}&id=${user._id}`;
  const atributes = {
    email: user.email,
    subject: "Password Reset Request",
    payload: {
      name: user.login,
      link: link,
    },
    template: "./template/requestResetPassword.handlebars",
  };
  sendEmail(atributes);
  return link;
};

export const resetPassword = async (
  userId: string,
  token: string,
  password: string
) => {
  const salt = await bcrypt.genSalt(10);
  const passwordResetToken = await Token.findOne({ userId });

  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }
  //@ts-ignore
  const isValid = await bcrypt.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }

  const hash = await bcrypt.hash(password, Number(salt));

  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );

  const user = await User.findById({ _id: userId });
  if (user) {
    const atributes = {
      email: user.email,
      subject: "Password Reset Successfully",
      payload: {
        name: user.login,
      },
      template: "./template/resetPassword.handlebars",
    };

    sendEmail(atributes);
  } else throw new Error("User not exist");

  await passwordResetToken.deleteOne();

  return true;
};
