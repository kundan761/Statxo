const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());

const dataFilePath = path.join(__dirname, './data.json');

// Read data from JSON file
const readDataFromFile = () => {
  const rawData = fs.readFileSync(dataFilePath);
  return JSON.parse(rawData);
};

// Write data to JSON file
const writeDataToFile = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// Fetch data
app.get("/api/data", (req, res) => {
  try {
    const data = readDataFromFile();
    res.json(data);
  } catch (error) {
    console.error('Error reading data from file:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update data
app.put("/api/data", (req, res) => {
  const updatedRows = req.body;

  if (!Array.isArray(updatedRows)) {
    return res.status(400).json({ message: 'Invalid data format' });
  }

  try {
    const data = readDataFromFile();
    updatedRows.forEach((row) => {
      const index = data.findIndex((item) => item.id === row.id);
      if (index !== -1) {
        data[index] = { ...data[index], ...row };
      }
    });
    writeDataToFile(data);
    res.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add new record
app.post("/api/data", (req, res) => {
  const newRecord = req.body;

  if (!newRecord.id || !newRecord.quantity || !newRecord.amount || !newRecord.postingYear || !newRecord.postingMonth || !newRecord.actionType || !newRecord.actionNumber || !newRecord.actionName || !newRecord.status || !newRecord.Impact) {
    return res.status(400).json({ message: 'Missing fields in the new record' });
  }

  try {
    const data = readDataFromFile();
    data.push(newRecord);
    writeDataToFile(data);
    res.json({ message: "Record added successfully" });
  } catch (error) {
    console.error('Error adding record:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
