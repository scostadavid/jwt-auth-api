import db from '../database';
const { ROLES, User } = db;

const isADuplicatedUsername = async (req, res, next) => {
  const { username, email } = req.body;

  const user = await User.findOne({
    where: {
      username: username
    }
  });

  if (user) {
    res.status(400).send({
      message: `Fail! Username is already in use!`
    });
    return;
  }

  next();
};

const isADuplicatedEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email
    }
  });

  if (user) {
    res.status(400).send({
      message: `Fail! Email is already in use!`
    });
    return;
  }

  next();
};

const checkRolesExisted = (req, res, next) => {
  const { roles } = req.body;
  if (roles) {
    roles.forEach((role) => {
      if (!ROLES.includes(role)) {
        res.status(400).send({
          message: `Fail! Role ${role} does not exist!`
        });
        return;
      }
    })
  }
  next();
};

const signUpValidator = {
  isADuplicatedUsername,
  isADuplicatedEmail,
  checkRolesExisted
};

module.exports = signUpValidator;