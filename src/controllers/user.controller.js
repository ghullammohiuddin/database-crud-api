import User from "../models/user.model.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateUserbyId = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const UpdatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true },
    );

    if (!UpdatedUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Updated Successfully!",
      UpdatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteUserbyId = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully!",
      deletedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { createUser, getAllUsers, getUserById, updateUserbyId, deleteUserbyId };
