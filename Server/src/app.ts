import express, { Application } from 'express';
import bodyParser from "body-parser";
import { routes } from "./routes";

// Boot express
export const app: Application = express();
app.use(bodyParser.json())
// Application routing
routes(app);