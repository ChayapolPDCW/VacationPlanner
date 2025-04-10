import crypto from "crypto";
import jwt from "jsonwebtoken";
import prisma from "../services/dbService.js";
import sessionMiddleware from "../middlewares/session.js";

// Register Create User
export const register = async (req, res) => {
  try {
    console.log("REQ.BODY: ", req.body);

    const { username, email, password, confirmPassword, avatarUrl } = req.body;

    // #1 Validate input
    if (!username) {
      return res.status(400).json({
        status: "error",
        message: "Invalid username",
      });
    }
    if (!email) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email address",
      });
    }
    if (!password) {
      return res.status(400).json({
        status: "error",
        message: "Invalid password",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Passwords do not match",
      });
    }

    // #2 Check existing user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({
          status: "error",
          message: "Username already exists",
        });
      }
      if (existingUser.email === email) {
        return res.status(400).json({
          status: "error",
          message: "Email already exists",
        });
      }
    }

    // #3 Hash password
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    const hashedPassword = `${salt}:${hash}`;

    console.log("hashedPassword: ", hashedPassword);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        avatarUrl,
        // profilePicture is optional and can be omitted since it's not provided in the request
      },
    });

    // Send response
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        avatarUrl: newUser.avatarUrl, // Include profilePicture (will be null)
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred during registration",
      error: process.env.NODE_ENV === "development" ? error.message : undefined, // Include error message in development
    });
  }
};

// Login User
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log("REQ.BODY: ", req.body);
    

    // #1 Validate input
    if (!email) {
      return res.status(400).json({
        status: "error",
        message: "Please enter your email",
      });
    }
    if (!password) {
      return res.status(400).json({
        status: "error",
        message: "Please enter your password",
      });
    }

    // #2 Check email in database
    const checkUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!checkUser) {
      return res.status(400).json({
        status: "error",
        message: "User not found",
      });
    }

    // #3 Check password
    const [salt, storedHash] = checkUser.password.split(":");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");

    if (storedHash !== hash) {
      return res.status(401).json({
        status: "error",
        message: "Invalid password",
      });
    }

    // #4 Create payload and token ----------------------------------------------------------------------------------------
    const payload = {
      id: checkUser.id,
      avatarUrl: checkUser.avatarUrl,
      email: checkUser.email,
      username: checkUser.username,
      createdAt: checkUser.createdAt,
      updatedAt: checkUser.updatedAt,
    };

    req.session.regenerate(function (err) {
      if (err) next(err);

      req.session.user = payload;
      console.log("Session user:", req.session.user);

//_____________________________________________________________________________________________________
      res.cookie('isAuthenticated', true, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
//____________________________________________________________________________________________________-
    });

    req.session.save(function (err) {
      if (err) next(err);

      console.log("Session saved");
      // res.redirect("/");

      console.log(checkUser.username);
      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: {
          id: checkUser.id,
          username: checkUser.username,
          email: checkUser.email,
          avatarUrl: checkUser.avatarUrl,
          createdAt: checkUser.createdAt,
          updatedAt: checkUser.updatedAt,
        },
      });
    });

    // #5 Send response
    // console.log(checkUser.username);
    // res.status(200).json({
    //   status: "success",
    //   message: "Login successful",
    //   data: {
    //     id: checkUser.id,
    //     username: checkUser.username,
    //     email: checkUser.email,
    //     avatarUrl: checkUser.avatarUrl, // Include profilePicture
    //   },
    // });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred during login",
      error: process.env.NODE_ENV === "development" ? error.message : undefined, // Include error message in development
    });
  }
};

// Check if user is logged in
export const checkSession = async (req, res) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(200).json({
        status: "error",
        message: "Not authenticated",
        isAuthenticated: false
      });
    }

    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    const user = await prisma.user.findUnique({
      where: {
        id: req.session.user.id
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!user) {
      // ถ้าไม่พบผู้ใช้ในฐานข้อมูล ให้ล้าง session
      req.session.destroy();
      return res.status(200).json({
        status: "error",
        message: "User not found",
        isAuthenticated: false
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User is authenticated",
      isAuthenticated: true,
      user: user
    });
  } catch (error) {
    console.error("Error checking session:", error);
    return res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message
    });
  }
};

export const logout = async (req, res, next) => {
  try {
    req.session.user = null;
    req.session.save(function (err) {
      if (err) next(err);

      req.session.regenerate(function (err) {
        if (err) next(err);

        res.status(200).json({
          status: "success",
          message: "Logged out",
        });
      });
    });
  } catch (err) {
    console.error("Error logging out: ", err.message);

    res.status(500).json({
      status: "error",
      message: "Error logging out",
    });
  }
};
