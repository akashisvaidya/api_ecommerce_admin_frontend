import express from "express";
import { createAdmin } from "../models/adminUser/adminUserModel.js";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../utils/bcrypt.js";
import { adminSignUpEmailVerification } from "../utils/email.js";

const router = express.Router();

//admin registration
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);

    req.body.password = hashPassword(req.body.password);
    req.body.verificationCode = uuidv4();
    const result = await createAdmin(req.body);
    // we need to create unique url and sent email to the client.
    //  process for the email.

    if (result?._id) {
      const uniqueUrl = `http://localhost:3000/verify?c=${result.verificationCode}&email=${result.email}`;

      // call email service
      adminSignUpEmailVerification(result, uniqueUrl);
      res.json({
        status: "success",
        message:
          "We have sent you the email verfication link to your email, please check your email (junk folder as well if not found in the email) and follow the instructions to activate the account.",
      });

      return;
    }

    res.json({
      status: "error",
      message: "unable to create new admin",
    });
  } catch (error) {
    error.errorCode = 500;
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.errorCode = 200;
      error.message = "Email already exists.";
    }
    next(error);
  }
});

//admin login

export default router;
