const bcrypt = require("bcryptjs");
const { sign, decode } = require("jsonwebtoken");

const db = require("../config/db.config");
const {
  sendEmailVerification,
  verificationEmailPage,
} = require("../utils/email");
const User = db.user;

module.exports = {
  // Cadastrar usuário
  create: async (req, res) => {
    let user = null;
    const userParams = { ...req.body };
    userParams.isAdmin =
      userParams.isAdmin === undefined ? false : userParams.isAdmin;

    if (userParams.isVerified === undefined || userParams.isVerified)
      userParams.isVerified = false;

    try {
      user = await User.findOne({
        where: {
          email: userParams.email,
        },
      });
    } catch (err) {
      return res.json({ message: err.message });
    }

    if (user != null)
      return res.status(400).json({ message: "E-mail already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userParams.password, salt);

    const newUser = Object.assign(
      {},
      { ...userParams, password: hashedPassword }
    );

    try {
      user = await User.create(newUser);
      res.status(201).json({ message: "User created" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }

    const { TOKEN_SECRET, SENDGRID_API_KEY, HOST, PORT } = process.env;

    const token = sign({ id: user.id }, TOKEN_SECRET, {
      expiresIn: "1h",
    });

    await sendEmailVerification(
      SENDGRID_API_KEY,
      HOST,
      PORT,
      token,
      user.email,
      "ricardobrgx@gmail.com"
    );
  },

  // Return all users
  list: async (req, res) => {
    const users = await User.findAll();

    return res.status(200).json({ users });
  },

  // Return user by ID
  show: async (req, res) => {
    const { id } = req.params;

    let user = null;

    try {
      user = await User.findOne({
        where: {
          id,
        },
      });
    } catch (err) {
      return res.status(500);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const userParams = { ...req.body };

    if (userParams.password !== undefined) {
      if (!userParams.password.trim()) {
        delete userParams.password;
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userParams.password, salt);
        userParams.password = hashedPassword;
      }
    }

    try {
      await User.update(userParams, {
        where: {
          id,
        },
      });
      res.status(204).json({ message: "User updated" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Delete user by ID
  destroy: async (req, res) => {
    const { id } = req.params;

    await User.destroy({
      where: {
        id,
      },
    });

    return res.status(204).json({ message: "User deleted" });
  },

  // Verify email address
  verifyEmail: async (req, res) => {
    const { token } = req.query;
    const { id } = decode(token);

    let user = null;

    try {
      user = await User.findOne({
        where: {
          id,
        },
      });
    } catch (err) {
      return res
        .status(500)
        .send(verificationEmailPage("Internal error", "#e63946", "error"));
    }

    if (!user) {
      return res
        .status(404)
        .send(verificationEmailPage("User not found", "#e63946", "close"));
    }

    try {
      await User.update(
        { isVerified: true },
        {
          where: {
            id,
          },
        }
      );

      return res
        .status(200)
        .send(verificationEmailPage("E-mail verified", "#757bc8", "check"));
    } catch (err) {
      return res
        .status(500)
        .send(verificationEmailPage("Internal error", "#e63946", "error"));
    }
  },

  // Excluir contas com e-mail nao verificado
  deleteUnverifiedAccounts: async () => {
    const unverifiedAccounts = await User.findAll({
      where: { isVerified: false },
    });

    Promise.all(
      unverifiedAccounts.map(
        async (unverifiedAccount) =>
          await User.destroy({ where: { id: unverifiedAccount.id } })
      )
    );
  },

  // Fazer login
  login: async (req, res) => {
    let user = null;

    try {
      user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
    } catch (err) {
      return res.json({ message: err.message });
    }

    const message = "Invalid e-mail or password";

    if (user == null) return res.status(404).json({ message: message });

    if (!user.isVerified)
      return res.status(400).json({ message: "E-mail is not verified" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) return res.status(404).json({ message: message });

    const token = sign({ id: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });

    res.header("Auth-Token", token).json({ token, id: user.id });
  },
};
