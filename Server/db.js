import MySql from "mysql2";

export const db = MySql.createConnection({
    host: "localhost",
    user: "root",
    password: "2005",
    database: "empresa",
});
