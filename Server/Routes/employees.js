import Express from "express";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "../Controllers/employee.js";

const router = Express.Router();

router.get("/", getEmployees);

router.post("/", addEmployee);

router.put("/:employeeId", updateEmployee);

router.delete("/:employeeId", deleteEmployee); 

export default router;
