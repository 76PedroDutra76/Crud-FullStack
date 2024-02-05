import { db } from "../db.js";

export const getEmployees = (_, res) => {
    const q = "SELECT * FROM employees";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addEmployee = (req, res) => {
    const q = "INSERT INTO `empresa`.`employees` (`employeeCpf`, `employeeName`, `employeeSector`) VALUES (?, ?, ?);";
    console.log("Dados recebidos no backend:", req.body);
    console.log("Entrou no controlador addEmployee");
    console.log(req.body.employeeCpf);
    
    const values = [
        req.body.employeeCpf,
        req.body.employeeName,
        req.body.employeeSector,
    ];

    db.query(q, values, (err) => {
        if (err) return res.json(err);
        console.error("Erro durante a execução da query:", err);
     
        return res.status(200).json("Funcionário cadastrado com sucesso!");
    });
    
}

export const updateEmployee = (req, res) => {
    const q = "UPDATE employees SET `employeeCpf` = ?, `employeeName` = ?, `employeeSector` = ? WHERE `employeeId` = ?";

    const values = [
        req.body.employeeCpf,
        req.body.employeeName,
        req.body.employeeSector,
    ];

    db.query(q, [...values, req.params.employeeId], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Funcionário atualizado com sucesso!");
    });
};

export const deleteEmployee = (req, res) => {
    const q = "DELETE FROM employees WHERE employeeId = ?";

    db.query(q, [req.params.employeeId], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Funcionário deletado com sucesso!");
    });
};