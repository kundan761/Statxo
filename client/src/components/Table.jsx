import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../Styles/Table.css';
import { toast } from 'react-toastify';
import {url} from '../url';

const Table = ({ isAdmin, data, fetchData }) => {
  const [editedData, setEditedData] = useState([]);

  useEffect(() => {
    setEditedData(data.map(item => ({
      ...item,
      quantity: Number(item.quantity),
      amount: Number(item.amount),
    })));
  }, [data]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...editedData];
    updatedData[index][name] = name === 'quantity' || name === 'amount' ? parseFloat(value) : value;
    setEditedData(updatedData);
  };

  const saveChanges = async () => {
    try {
      console.log("Sending data to backend:", editedData);
      await axios.put(`${url}/api/data`, editedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Data updated successfully");
      fetchData(); // Fetch the updated data
      toast.success('Data updated successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('Failed to update data. Please try again.');
    }
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Posting Year</th>
            <th>Posting Month</th>
            <th>Action Type</th>
            <th>Action Number</th>
            <th>Action Name</th>
            <th>Impact</th>
            {isAdmin && <th>Status</th>}
          </tr>
        </thead>
        <tbody>
          {editedData.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.quantity}</td>
              <td>
                <input
                  type="number"
                  name="amount"
                  value={item.amount}
                  onChange={(e) => handleInputChange(e, index)}
                  className="input-field"
                />
              </td>
              <td>{item.postingYear}</td>
              <td>{item.postingMonth}</td>
              <td>
                <select
                  name="actionType"
                  value={item.actionType}
                  onChange={(e) => handleInputChange(e, index)}
                  className="select-field"
                >
                  <option value="Type1">Type1</option>
                  <option value="Type2">Type2</option>
                  <option value="Type3">Type3</option>
                </select>
              </td>
              <td>{item.actionNumber}</td>
              <td>
                <select
                  name="actionName"
                  value={item.actionName}
                  onChange={(e) => handleInputChange(e, index)}
                  className="select-field"
                >
                  <option value="Action1">Action1</option>
                  <option value="Action2">Action2</option>
                  <option value="Action3">Action3</option>
                </select>
              </td>
              <td>{item.Impact}</td>
              {isAdmin && (
                <td>
                  <select
                    name="status"
                    value={item.status}
                    onChange={(e) => handleInputChange(e, index)}
                    className="select-field"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Approved">Approved</option>
                  </select>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={saveChanges} className="save-button">Save</button>
    </div>
  );
};

Table.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      postingYear: PropTypes.number.isRequired,
      postingMonth: PropTypes.string.isRequired,
      actionType: PropTypes.string.isRequired,
      actionNumber: PropTypes.string.isRequired,
      actionName: PropTypes.string.isRequired,
      status: PropTypes.string,
      Impact: PropTypes.string.isRequired,
    })
  ).isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default Table;
