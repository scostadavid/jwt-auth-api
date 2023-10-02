import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import db, { Role } from './src/database';
const app = express();

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "jwt-auth-api",
      version: "0.1.0",
      description:
        "CRUD API application with JWT auth made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "David Costa",
        url: "scostadavid.github.io",
        email: "scostadavid@proton.me",
      },
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
  },
  apis: ['./src/routes/user.js'],
};

const specs = swaggerJsdoc(options);

app.use(cors({
  origin: ["http://localhost:8081", "http://localhost:3000"]
}));
app.use(bodyParser.json()); // content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // content-type - application/x-www-form-urlencoded

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

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
