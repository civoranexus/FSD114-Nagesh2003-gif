import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/sendMail.js";
import ErrorHandler from "../middlewares/ErrorHandler.js";
import { Progress } from "../models/Progress.js";
import { Lecture } from "../models/Lecture.js";


export const register = ErrorHandler(async (req, res) => {
  const { email, name, password } = req.body;

  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      message: "User Already exists",
    });

  const hashPassword = await bcrypt.hash(password, 10);

  user = {
    name,
    email,
    password: hashPassword,
  };

  const otp = Math.floor(Math.random() * 1000000);

  const activationToken = jwt.sign(
    {
      user,
      otp,
    },
    process.env.Activation_Secret,
    {
      expiresIn: "5m",
    }
  );

  const data = {
    name,
    otp,
  };

  await sendMail(email, "E learning", data);

  res.status(200).json({
    message: "Otp send to your mail",
    activationToken,
  });
});

export const verifyUser = ErrorHandler(async (req, res) => {
  const { otp, activationToken } = req.body;

  const verify = jwt.verify(activationToken, process.env.Activation_Secret);

  if (!verify)
    return res.status(400).json({
      message: "Otp Expired",
    });

  if (verify.otp !== otp)
    return res.status(400).json({
      message: "Wrong Otp",
    });

  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  });

  res.json({
    message: "User Registered",
  });
});

export const loginUser = ErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: "No User with this email",
    });

  const mathPassword = await bcrypt.compare(password, user.password);

  if (!mathPassword)
    return res.status(400).json({
      message: "wrong Password",
    });

  const token = jwt.sign({ _id: user._id }, process.env.Jwt_Sec, {
    expiresIn: "15d",
  });

  res.json({
    message: `Welcome back ${user.name}`,
    token,
    user,
  });
});

export const myProfile = ErrorHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({ user });
});

export const addProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { course, lectureId } = req.query;

    if (!course || !lectureId) {
      return res.status(400).json({
        message: "Course ID and Lecture ID are required",
      });
    }

    // Find progress document
    let progress = await Progress.findOne({
      user: userId,
      course,
    });

    // If not exists → create new
    if (!progress) {
      progress = await Progress.create({
        user: userId,
        course,
        completedLectures: [lectureId],
      });
    } else {
      // Avoid duplicate lecture entry
      if (!progress.completedLectures.includes(lectureId)) {
        progress.completedLectures.push(lectureId);
        await progress.save();
      }
    }

    res.status(200).json({
      message: "Lecture marked as completed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update progress",
    });
  }
};

export const getYourProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { course } = req.query;

    if (!course) {
      return res.status(400).json({
        message: "Course ID is required",
      });
    }

    // Total lectures in course
    const totalLectures = await Lecture.countDocuments({
      course,
    });

    // User progress
    const progress = await Progress.findOne({
      user: userId,
      course,
    });

    const completedLecturesCount =
      progress?.completedLectures.length || 0;

    const progressPercentage =
      totalLectures === 0
        ? 0
        : Math.round(
            (completedLecturesCount / totalLectures) * 100
          );

    res.status(200).json({
      completedLectures: completedLecturesCount,
      allLectures: totalLectures,
      courseProgressPercentage: progressPercentage,
      progress: progress ? [progress] : [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch progress",
    });
  }
};
