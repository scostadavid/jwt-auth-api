import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import db, { Role } from './src/database';
const app = express();

app.use(cors({
  origin: "http://localhost:8081"
}));
app.use(bodyParser.json()); // content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // content-type - application/x-www-form-urlencoded

// DB
// db.sequelize.sync(); // Prod environment
db.sequelize.sync({ force: true })
  .then(() => {
    Role.create({ id: 1, name: "user" }),
    Role.create({ id: 2, name: "moderator" }),
    Role.create({ id: 3, name: "admin" })
  });

// Routes
app.get("/", (req, res) => res.json({ message: "JWT Auth API" }));
require('./src/routes/auth')(app);
require('./src/routes/user')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
