const jwt = require('jsonwebtoken');
const config = require('../config/auth.js');
const db = require('../database');
const { User } = db;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  const { userId } = req;

  User.findByPk(userId).then(user => {
    user.getRoles().then(roles => {
      roles.forEach((role) => {
        if (role.name === "admin") {
          next();
          return;
        }
      })
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

const isModerator = (req, res, next) => {
  const { userId } = req;

  User.findByPk(userId).then(user => {
    user.getRoles().then(roles => {
      roles.forEach((role) => {
        if (role.name === "moderator") {
          next();
          return;
        }
      })
      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      roles.forEach((role) => {
        if (["admin", "moderator"].includes(role.name)) {
          next();
          return;
        }
      })
      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const role = {
  isAdmin,
  isModerator,
  isModeratorOrAdmin
};

module.exports = role;