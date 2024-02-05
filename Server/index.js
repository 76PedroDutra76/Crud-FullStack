import Express from "express";
import Cors from "cors";
import bodyParser from "body-parser";
import employeesRoutes from "./Routes/employees.js";
const app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Express.json());
app.use(Cors());

app.use("/", employeesRoutes);

app.listen(8080);

