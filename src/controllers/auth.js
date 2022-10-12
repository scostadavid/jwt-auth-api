const db = require("../database");
const config = require("../config/auth");
const { User, Role } = db;
const { Op } = db.Sequelize;
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcryptjs') ;

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.create({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 8)
  });

  const roles = await Role.findAll({
    where: {
      name: {
        [Op.or]: req.body.roles
      }
    }
  });

  await user.setRoles(roles ? roles : ['user']).then(() => {
    res.send({ message: "User was registered successfully!" });
  });
};

const signin = async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  });

  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  const passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!"
    });
  }

  const token = generateJWT(user, config.secret);
  const roles = await user.getRoles();

  const permissions = [];
  roles.forEach((role) => {
    permissions.push(role.name);
  });

  res.status(200).send({
    id: user.id,
    username: user.username,
    email: user.email,
    roles: permissions,
    accessToken: token
  });
};

const generateJWT = (user, secret) => jwt.sign(
  { id: user.id }, secret, {expiresIn: 86400}
);

const auth = {
  signin,
  signup
};

module.exports = auth;