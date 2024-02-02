// client/src/components/FilesList.js
import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import { Card, CardContent, Typography } from "@mui/material";

// Configure AWS SDK and S3 Client
AWS.config.update({
  accessKeyId: "YOUR_ACCESS_KEY",
  secretAccessKey: "YOUR_SECRET_KEY",
  region: "us-east-1", // Replace with your AWS region
});

const s3 = new AWS.S3();

function FilesList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function fetchFilesFromS3() {
      try {
        const params = {
          Bucket: "your-bucket-name", // Replace with your bucket name
        };

        s3.listObjectsV2(params, function (err, data) {
          if (err) {
            console.error("Error fetching from S3:", err);
          } else {
            setFiles(data.Contents); // Assuming file details are equivalent to products
          }
        });
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    }

    fetchFilesFromS3();
  }, []);

  function generateDownloadLink(Key) {
    const params = {
      Bucket: "your-bucket-name",
      Key,
      Expires: 60, // URL expiry time in seconds
    };

    return s3.getSignedUrl("getObject", params);
  }

  return (
    <div>
      <h1>Files List</h1>
      {files.map((file) => (
        <Card key={file.Key} style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {file.Key} {/* Using Key as file name */}
            </Typography>
            <a href={generateDownloadLink(file.Key)} download>
              Download
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default FilesList;
