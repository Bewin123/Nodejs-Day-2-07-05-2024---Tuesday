const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const folderPath = path.join(__dirname, "public"); // Folder path where TXT files are located

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Endpoint to retrieve and display content of text files in the public folder
app.get("/displayDetails1", (req, res) => {
  // Array to store file details
  const fileDetails = [
    { fileName: "1_Creating_Room.txt", heading: "Creating a Room Details" },
    { fileName: "2_Booking_Room.txt", heading: "Booking a Room Details" },
    {
      fileName: "3_List_Rooms_Booked_Data.txt",
      heading: "List of Rooms Booked Data",
    },
    {
      fileName: "4_List_Customers_Booked_Data.txt",
      heading: "List of Customers Booked Data",
    },
    {
      fileName: "5_List_Customer_Booking_Count.txt",
      heading: "List of Customer Booking Count",
    },
  ];

  // Initialize HTML string to build the table dynamically
  let tableHTML = `
    <style>
      body {
        color: black;
      }
      h1 {
        text-align: center;
        text-transform: uppercase;
        color: blue;
      }
      table {
        width: 100%;
        margin: 0 auto;
        border-collapse: collapse;
      }
      th, td {
        padding: 10px;
        border: 1px solid #ddd;
      }
      th {
        background-color: #f2f2f2;
      }
      tr:nth-child(even) {
        background-color: #f9f9f9;
      }
    </style>
  `;
  tableHTML += "<h1>HALL BOOKING DETAILS</h1>";

  // Open the main table
  tableHTML += `<table>`;

  // Iterate over each object in the fileDetails array
  fileDetails.forEach((fileDetail) => {
    const filePath = path.join(folderPath, fileDetail.fileName);

    try {
      // Read content of the corresponding TXT file
      const fileContent = fs.readFileSync(filePath, "utf8");

      // Append file name and content to the main table
      tableHTML += `
        <tr>
          <th colspan="2">${fileDetail.heading}</th>
        </tr>
        <tr>
          <td colspan="2"><pre>${fileContent}</pre></td>
        </tr>
      `;
    } catch (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Close the main table
  tableHTML += `</table>`;

  // Send the HTML table as response
  res.status(200).send(tableHTML);
});

// Endpoint to handle other requests
app.get("/", (req, res) => {
  res.send("Server is running.");
});
