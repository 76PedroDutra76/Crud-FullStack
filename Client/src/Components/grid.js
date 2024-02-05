import React from "react";
import Styled from "styled-components";
import Axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const sectorMap = {
    1: "Desenvolvimento",
    2: "RH",
    3: "Infraestrutura",
    4: "Contabilidade"
};

const Table = Styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px;
    word-break: break-all;
`;

export const Thead = Styled.thead``;

export const Tbody = Styled.tbody``;

export const Tr = Styled.tr``;

export const Th = Styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none;"}
    }
`;

export const Td = Styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};

    @media (max-width: 500px) {
        ${(props) => (props.onlyWeb && "display: none")}
    }
`;

const Grid = ({ employees, setEmployees, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (employeeId) => {
        await Axios
            .delete("http://localhost:8080/" + employeeId)
            .then(({ data }) => {
                const newArray = employees.filter((employees) => employees.employeeId !== employeeId);

                setEmployees(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    };

    return (
        <Table>
            <Thead>
                <Th onlyWeb>CPF</Th>
                <Th>Nome</Th>
                <Th>Setor</Th>
                <Th></Th>
                <Th></Th>
            </Thead>
            <Tbody>
                {employees.map((item, i) => (
                    <Tr key={i}>
                        <Td width="30%">{item.employeeCpf}</Td>
                        <Td width="30%">{item.employeeName}</Td>
                        <Td width="30%" onlyWeb>{sectorMap[item.employeeSector]}</Td>
                        <Td alignCenter width="5%"><FaEdit onClick={() => handleEdit(item)} /></Td>
                        <Td alignCenter width="5%"><FaTrash onClick={() => handleDelete(item.employeeId)} /></Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;