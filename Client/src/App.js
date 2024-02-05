import globalStyle from './Styles/global';
import styled from 'styled-components';
import Form from './Components/form';
import Grid from './Components/grid';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 585px;
`;

const Title = styled.h2`
  font-size: 45px;
`;

function App() {
  const [employees, setEmployees] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getEmployees = async () => {
    try {
      const res = await Axios.get("http://localhost:8080");
      console.log(res.data);
      setEmployees(res.data.sort((a, b) => (a.employeeName > b.employeeName ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, [setEmployees])

  console.log(getEmployees);

  return (
    <div className="App">
      <Container>
        <Title>Funcionários</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getEmployees={getEmployees}></Form>
        <Grid employees={employees} setEmployees={setEmployees} setOnEdit={setOnEdit}></Grid>
      </Container>
        
      <ToastContainer autoClose={3000} position={toast.bottom_left} />
      <globalStyle />
    </div>
  );
}

export default App;
