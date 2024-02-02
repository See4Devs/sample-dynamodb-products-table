# S3 Files listing application

This project is simple application that lists the files that are store in a S3 Bucket on Amazon Web Services (AWS).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Configure AWS Credentials

Replace AWS credentials in the `src/FilesList.js` file with your own credentials:

```javascript
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId: "YOUR_ACCESS_KEY",
  secretAccessKey: "YOUR_SECRET_KEY",
  region: "us-east-1", // Replace with your AWS region
});
```

> Note : If you don't know how to get your access credentials, you can check the following [AWS Documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user_manage_add-key.html)

Next you need to replace the `your-bucket-name` in the `src/FilesList.js` file with your own bucket name.

```javascript
...code omitted...
const params = {
  Bucket: "your-bucket-name", // Replace with your bucket name
};
...code omitted...
  function generateDownloadLink(Key) {
    const params = {
      Bucket: "your-bucket-name",
      Key,
      Expires: 60, // URL expiry time in seconds
    };

    return s3.getSignedUrl("getObject", params);
  }
...code omitted...
```

## Run the project

First you need to install the javascript dependencies by running `npm install`. Then you can start the application by running `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
