import User from "../models/UserModel.js";

// GET
async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: "Success",
      message: "Users Retrieved",
      data: users,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET BY ID
async function getUserById(req, res) {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      status: "Success",
      message: "User Retrieved",
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// CREATE
async function createUser(req, res) {
  try {
    const { name, email, gender } = req.body;
    if (!name || !email || !gender) {
      const msg = `${
        !name ? "Name" : !email ? "Email" : "Gender"
      } field cannot be empty 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }
    await User.create(req.body);
    res.status(201).json({
      status: "Success",
      message: "User Created",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    const { name, email, gender } = req.body;
    const ifUserExist = await User.findOne({ where: { id: req.params.id } });

    if (!name || !email || !gender) {
      const msg = `${
        !name ? "Name" : !email ? "Email" : "Gender"
      } field cannot be empty 😠`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    if (!ifUserExist) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    await User.update(req.body, {
      where: { id: req.params.id },
    });

    res.status(200).json({
      status: "Success",
      message: "User Updated",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

async function deleteUser(req, res) {
  try {
    const ifUserExist = await User.findOne({ where: { id: req.params.id } });
    if (!ifUserExist) {
      const error = new Error("User tidak ditemukan 😮");
      error.statusCode = 400;
      throw error;
    }

    await User.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      status: "Success",
      message: "User Deleted",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

export { getUsers, getUserById, createUser, updateUser, deleteUser };
