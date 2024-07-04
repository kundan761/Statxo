import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Table from './components/Table';
import Form from './components/Form';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import {url}  from './url';

const App = () => {
  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(`${url}/api/data`);
    const fetchedData = response.data.map(item => ({
      ...item,
      quantity: Number(item.quantity),
      amount: Number(item.amount),
    }));
    setData(fetchedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login setIsAdmin={setIsAdmin} />}/>
        <Route path='/table' element={<Table isAdmin={isAdmin} data={data} fetchData={fetchData} />} />
        <Route path='/form' element={<Form fetchData={fetchData} dataLength={data.length} />} />
      </Routes>
    </div>
  );
};

export default App;
