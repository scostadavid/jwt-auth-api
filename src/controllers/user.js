import { User } from '../database';

const index = async (req, res) => {
  const users = await User.findAll({
    attributes: ['username', 'email']
  });
  res.json({ message: users });
};

// const _delete = async (req, res) => {
//   const user = await User.findOne({
//     where: {
//       email:
//     }
//   })
// }

const allAccess = (req, res) => {
  res.json({ message: "Public content!" });
};

const userContent = (req, res) => {
  res.json({ message: "User Content" });
};

const adminContent = (req, res) => {
  res.json({ message: "Admin Content" });
};

const moderatorContent = (req, res) => {
  res.json({ message: "Moderator Content" });
};

const user = {
  index,
  allAccess,
  userContent,
  adminContent,
  moderatorContent
}

module.exports = user;