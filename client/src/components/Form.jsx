import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../Styles/Form.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';
import  {url}  from '../url';

const Form = ({ fetchData, dataLength }) => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: dataLength + 1,
    quantity: '',
    amount: '',
    postingYear: new Date().getFullYear(),
    postingMonth: new Date().toLocaleString('default', { month: 'long' }),
    actionType: 'Type1',
    actionNumber: '001',
    actionName: 'Action1',
    status: 'Pending',
    Impact: 'Low'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'quantity' || name === 'amount' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecord = { ...formData, id: dataLength + 1 };
    try {
      await axios.post(`${url}/api/data`, newRecord,{
        headers: {
            'Content-Type': 'application/json'
          }
      });
      fetchData();
      toast.success('Record added successfully!');
      setTimeout(() =>
      navigate('/table'),1000); 
    } catch (error) {
      console.error('Error adding record:', error);
      toast.error('Failed to add record. Please try again.'); 
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Enter quantity"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="postingYear">Posting Year</label>
          <input
            type="text"
            id="postingYear"
            name="postingYear"
            value={formData.postingYear}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="postingMonth">Posting Month</label>
          <input
            type="text"
            id="postingMonth"
            name="postingMonth"
            value={formData.postingMonth}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="actionType">Action Type</label>
          <select
            id="actionType"
            name="actionType"
            value={formData.actionType}
            onChange={handleInputChange}
          >
            <option value="Type1">Type1</option>
            <option value="Type2">Type2</option>
            <option value="Type3">Type3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="actionNumber">Action Number</label>
          <input
            type="text"
            id="actionNumber"
            name="actionNumber"
            value={formData.actionNumber}
            onChange={handleInputChange}
            placeholder="Enter action number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="actionName">Action Name</label>
          <select
            id="actionName"
            name="actionName"
            value={formData.actionName}
            onChange={handleInputChange}
          >
            <option value="Action1">Action1</option>
            <option value="Action2">Action2</option>
            <option value="Action3">Action3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Impact">Impact</label>
          <select
            id="Impact"
            name="Impact"
            value={formData.Impact}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Mid">Mid</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Add Record</button>
      </form>
      <ToastContainer />
    </>
  );
};

Form.propTypes = {
  fetchData: PropTypes.func.isRequired,
  dataLength: PropTypes.number.isRequired,
};

export default Form;
