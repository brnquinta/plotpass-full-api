const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  validateSignup,
  validateLogin,
  validateUserId,
  validateUpdateUser,
} = require("../middlewares/validator");

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateCurrentUser,
  createUser,
  login,
} = require("../controllers/users");

router.post("/signup", validateSignup, createUser);
router.post("/signin", validateLogin, login);

router.get("/me", auth, getCurrentUser);
router.get("/", auth, getUsers);
router.get("/:id", auth, validateUserId, getUserById);

router.patch("/me", auth, validateUpdateUser, updateCurrentUser);

module.exports = router;