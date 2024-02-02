// api/index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "YOUR_ACCESS_KEY",
  secretAccessKey: "YOUR_SECRET_KEY",
  region: "us-east-1", // Replace with your AWS region
});

const app = express();
const port = 3001; // Adjust the port as needed
const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" }); // Replace with your AWS region

app.use(cors());
app.use(bodyParser.json());

app.get("/api/products", (req, res) => {
  const params = {
    TableName: "products", // Replace with your DynamoDB table name
  };

  dynamoDB.scan(params, (error, data) => {
    if (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(data.Items);
    }
  });
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  const params = {
    TableName: "products", // Replace with your DynamoDB table name
    Key: {
      id,
    },
    UpdateExpression: "SET Stock = :stock",
    ExpressionAttributeValues: {
      ":stock": stock,
    },
  };

  dynamoDB.update(params, (error, data) => {
    if (error) {
      console.error("Error updating product stock:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ message: "Stock updated successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
