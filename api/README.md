# Product Inventory API

This project provides a simple API for managing product inventory. It allows you to fetch a list of products and update their stock levels. The API interacts with an AWS DynamoDB table named "products."

## Prerequisites

Before running the project, make sure you have the following prerequisites installed:

- Node.js and npm
- AWS account with AWS CLI configured (for AWS credentials) for more information go to [AWS official documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SettingUp.DynamoWebService.html#SettingUp.DynamoWebService.ConfigureCredentials).

## Getting Started

Follow these steps to set up and run the project:

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   cd api
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

3. Configure AWS Credentials:

   Replace AWS credentials in the `api/index.js` file with your own credentials:

   ```javascript
   const AWS = require("aws-sdk");
   AWS.config.update({
     accessKeyId: "YOUR_ACCESS_KEY",
     secretAccessKey: "YOUR_SECRET_KEY",
     region: "us-east-1", // Replace with your AWS region
   });
   ```

   > Note : If you don't know how to get your access credentials, you can check the following [AWS Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user_manage_add-key.html)

4. Configure DynamoDB Table Name:

   In the `api/index.js` file, update the `TableName` parameter with your DynamoDB table name:

   ```javascript
   const params = {
     TableName: "products", // Replace with your DynamoDB table name
   };
   ```

5. Start the API server:

   ```bash
   node index.js
   ```

   The API server will run on `http://localhost:3001`.
