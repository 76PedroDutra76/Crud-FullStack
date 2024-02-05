import Axios from "axios";
import React, { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Styled from 'styled-components';
import Cors from "cors";

const FormContainer = Styled.form`
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px; 
    width: 1100px;
    justify-content: center;
`;

const InputArea = Styled.div`
    display: flex;
    flex-direction: column;
    width: 290px;
`;

const Input = Styled.input`
    width: 230px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Select = Styled.select`
    width: 230px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = Styled.label`
    font-size: 18px;
`;

const Button = Styled.button`
    width: 130px;
    padding: 10px;
    cursor: pointer;
    border-radius: 7px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;

const Form = ({ getEmployees, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {

            const employees = ref.current;

            employees.employeeCpf.value = onEdit.employeeCpf;
            employees.employeeName.value = onEdit.employeeName;
            employees.employeeSector.value = onEdit.employeeSector;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const employees = ref.current;

        console.log("Valores do estado do formulário:", {
            cpf: employees.employeeCpf.value,
            name: employees.employeeName.value,
            sector: employees.employeeSector.value,
        });

        if (
            !employees.employeeCpf.value ||
            !employees.employeeName.value ||
            !employees.employeeSector.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        // if (onEdit) {
        //     await Axios
        //         .put(`http://localhost:8080/${onEdit.employeeId}`, {
        //             cpf: employees.employeeCpf.value,
        //             name: employees.employeeName.value,
        //             sector: employees.employeeSector.value,
        //         })
        //         .then(({ data }) => toast.success(data))
        //         .catch(({ data }) => toast.error(data));

        // } else {
        //     await Axios
        //         .post("http://localhost:8080/", {
        //             cpf: employees.employeeCpf.value,
        //             name: employees.employeeName.value,
        //             sector: employees.employeeSector.value,
        //         })
        //         .then(({ data }) => toast.success(data))
        //         .catch(({ data }) => toast.error(data));
        // }

        if (onEdit) {

            console.log("Dados a serem enviados para o servidor:", {
                employeeCpf: employees.employeeCpf.value,
                employeeName: employees.employeeName.value,
                employeeSector: employees.employeeSector.value,
            });
            

            await Axios.put(`http://localhost:8080/${onEdit.employeeId}`, {
                employeeCpf: employees.employeeCpf.value,
                employeeName: employees.employeeName.value,
                employeeSector: employees.employeeSector.value,
            })
                .then(({ data }) => {
                    console.log("Resposta da requisição (sucesso):", data);
                    toast.success(data);
                })
                .catch(({ response }) => {
                    console.error("Erro na requisição (falha):", response.data);
                    toast.error(response.data);
                });

        } else {
            await Axios.post("http://localhost:8080/", {
                employeeCpf: employees.employeeCpf.value,
                employeeName: employees.employeeName.value,
                employeeSector: employees.employeeSector.value,
            })
                .then(({ data }) => {
                    console.log("Resposta da requisição (sucesso):", data);
                    toast.success(data);
                })
                .catch(({ response }) => {
                    console.error("Erro na requisição (falha):", response.data);
                    toast.error(response.data);
                });
        }

        employees.employeeCpf.value = "";
        employees.employeeName.value = "";
        employees.employeeSector.value = "";

        setOnEdit(null);
        getEmployees();
    };

    return (
        <FormContainer autoComplete="off" ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>CPF do Funcionário</Label>
                <Input name='employeeCpf' type='text' placeholder='000.000.000-00' />
            </InputArea>
            <InputArea>
                <Label>Nome do funcionário</Label>
                <Input name='employeeName' type='text' />
            </InputArea>
            <InputArea>
                <Label>Setor do Funcionário</Label>
                <Select name="employeeSector">
                    <option value="">Selecione o Setor</option>
                    <option value="1">Desenvolvimento</option>
                    <option value="2">RH</option>
                    <option value="3">Infraestrutura</option>
                    <option value="4">Contabilidade</option>
                </Select>
            </InputArea>
            <Button type="submit">Cadastrar</Button>
        </FormContainer>
    );
};

export default Form;