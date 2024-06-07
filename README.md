# react-toggle-sidebar

How to toggle the sidebar with an icon in React

## Documentation

[https://www.cluemediator.com/how-to-toggle-the-sidebar-with-an-icon-in-react](https://www.cluemediator.com/how-to-toggle-the-sidebar-with-an-icon-in-react)

## Quick Start

Follow the below steps to run the project.

1. Clone repository
2. Run `npm i` command to install dependencies
3. Execute `npm start` command to run the project

## Output

[![React Example](https://www.cluemediator.com/wp-content/uploads/2022/12/output-how-to-toggle-the-sidebar-with-an-icon-in-react-clue-mediator.gif)](https://www.cluemediator.com/how-to-toggle-the-sidebar-with-an-icon-in-react)

**Follow us on [GitHub](https://github.com/cluemediator) for more update.**

## Connect with us

Website: [Clue Mediator](https://www.cluemediator.com)  
Like us on [Facebook](https://www.facebook.com/thecluemediator)  
Follow us on [Twitter](https://twitter.com/cluemediator)  
Join us on [Telegram](https://t.me/cluemediator)  
Subscribe us on [YouTube](https://www.youtube.com/ClueMediator)  
Follow us on [Instagram](https://www.instagram.com/clue_mediator)



//






import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Detail = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transformedData, setTransformedData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    if (!selectedDate) {
      setErrorMessage("Please select a date.");
      return;
    }

    setLoading(true);
    const formattedDate = formatDate(selectedDate);
   
    fetch(`http://localhost:4000/search?createdAt=${formattedDate}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data && data.getData && data.getData.length > 0) {
          setTransformedData(data.getData);
          setErrorMessage("");
        } else {
          setTransformedData([]);
          setErrorMessage("No data available for selected date.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        setTransformedData([]);
        setErrorMessage("Failed to fetch data. Please try again later.");
      });
  };

  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const renderCell = (value) => {
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return value;
  };

  return (
    <div
      style={{
        textAlign: "left",
        margin: "20px auto",
        width: "80%",
        maxWidth: "900px",
      }}
    >
      <h1 className="text-3xl mb-6 text-black font-bold text-center">
        Race Results
      </h1>
      <div className="flex flex-col sm:flex-row gap-5 items-center justify-center mb-4">
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2">
          <DatePicker
            placeholderText="Select Date"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date || new Date())}
            className="custom-input-date w-full sm:w-48 rounded border border-gray-300 bg-white py-2 px-4 font-medium outline-none transition focus:border-primary"
            required
          />
          <button
            type="button"
            onClick={fetchData}
            className="flex font-medium w-full sm:w-auto justify-center rounded-full bg-green-500 text-white px-5 py-2 mt-2 sm:mt-0"
          >
            Fetch Data
          </button>
        </div>
      </div>
      {loading && <p className="mt-4 text-gray-700">Loading...</p>}
      {errorMessage && <div className="text-red-600 mt-4">{errorMessage}</div>}
      {transformedData.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <style>
            {`
              table {
                border-collapse: collapse;
                width: 100%;
                border: 1px solid #ddd;
              }
              th, td {
                border: 1px solid #ddd;
                text-align: left;
                padding: 12px;
              }
              th {
                background-color: #4CAF50;
                color: white;
                text-transform: uppercase;
              }
              tr:nth-child(even) {
                background-color: #f2f2f2;
              }
              tr:hover {
                background-color: #ddd;
              }
            `}
          </style>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th>Horse Weight</th>
                <th>Jockey Weight</th>
                <th>Distance</th>
                <th>Class Name</th>
                <th>Horse Name</th>
                <th>Jockey Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {transformedData.map(
                (
                  {
                    horseWeights,
                    jockeyWeight,
                    distance,
                    className,
                    horseName,
                    jockeyName,
                    time,
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td>{renderCell(horseWeights)}</td>
                    <td>{renderCell(jockeyWeight)}</td>
                    <td>{renderCell(distance)}</td>
                    <td>{renderCell(className)}</td>
                    <td>{renderCell(horseName)}</td>
                    <td>{renderCell(jockeyName)}</td>
                    <td className="whitespace-nowrap">{renderCell(time)}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Detail;



//fetched without data=======


import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Detail = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transformedData, setTransformedData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    if (!selectedDate) {
      setErrorMessage("Please select a date.");
      return;
    }

    setLoading(true);
    const formattedDate = formatDate(selectedDate);
    fetch(`http://localhost:4000/fetched?createdAt=${formattedDate}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data && data.getData && data.getData.length > 0) {
          setTransformedData(data.getData);
          setErrorMessage("");
        } else {
          setTransformedData([]);
          setErrorMessage("No data available for selected date.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        setTransformedData([]);
        setErrorMessage("Failed to fetch data. Please try again later.");
      });
  };

  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const renderCell = (value) => {
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return value;
  };

  return (
    <div
      style={{
        textAlign: "left",
        margin: "20px auto",
        width: "80%",
        maxWidth: "900px",
      }}
    >
      <h1 className="text-3xl mb-6 text-black font-bold text-center">
        Race Results
      </h1>
      <div className="flex flex-col sm:flex-row gap-5 items-center justify-center mb-4">
        <div className="w-full sm:w-auto">
          <DatePicker
            placeholderText="Select Date"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date || new Date())}
            className="custom-input-date w-full sm:w-48 rounded border border-gray-300 bg-white py-2 px-4 font-medium outline-none transition focus:border-primary"
            required
          />
          <button
            type="button"
            onClick={fetchData}
            className="flex font-medium w-full sm:w-auto justify-center rounded-full bg-primary text-white px-5 py-2 mt-2 sm:mt-0"
          >
            Fetch Data
          </button>
        </div>
      </div>
      {loading && <p className="mt-4 text-gray-700">Loading...</p>}
      {errorMessage && <div className="text-red-600 mt-4">{errorMessage}</div>}
      {transformedData.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <style>
            {`
              table {
                border-collapse: collapse;
                width: 100%;
                border: 1px solid #ddd;
              }
              th, td {
                border: 1px solid #ddd;
                text-align: left;
                padding: 12px;
              }
              th {
                background-color: #4CAF50;
                color: white;
                text-transform: uppercase;
              }
              tr:nth-child(even) {
                background-color: #f2f2f2;
              }
              tr:hover {
                background-color: #ddd;
              }
            `}
          </style>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th>Horse Weight</th>
                <th>Jockey Weight</th>
                <th>Distance</th>
                <th>Class Name</th>
                <th>Horse Name</th>
                <th>Jockey Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {transformedData.map(
                (
                  {
                    horseWeights,
                    jockeyWeight,
                    distance,
                    className,
                    horseName,
                    jockeyName
,
                    time,
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td>{renderCell(horseWeights)}</td>
                    <td>{renderCell(jockeyWeight)}</td>
                    <td>{renderCell(distance)}</td>
                    <td>{renderCell(className)}</td>
                    <td>{renderCell(horseName)}</td>
                    <td>{renderCell(jockeyName)}</td>
                    <td className="whitespace-nowrap">{renderCell(time)}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Detail;


//==============working=================


import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Detail = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transformedData, setTransformedData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = () => {
    if (!selectedDate) {
      setErrorMessage("Please select a date.");
      return;
    }

    setLoading(true);
    const formattedDate = formatDate(selectedDate);
    fetch(`http://localhost:4000/fetched?createdAt=${formattedDate}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        if (data && data.getData && data.getData.length > 0) {
          const transformedData = data.getData.map(({ distance, jockeyWeight, horseWeights, className, jockeyName, horseName, time }) => ({
            distance,
            jockeyWeight,
            horseWeights,
            className: className.className,
            jockeyName: jockeyName.jockeyName,
            horseName: horseName.horseName,
            time
          }));
          setTransformedData(transformedData);
          setTotalPages(Math.ceil(transformedData.length / 3));
          setErrorMessage("");
        } else {
          setTransformedData([]);
          setTotalPages(0);
          setErrorMessage("No data available for selected date.");
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
        setTransformedData([]);
        setTotalPages(0);
        setErrorMessage("Failed to fetch data. Please try again later.");
      });
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const renderCell = (value) => {
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return value;
  };

  const nextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div style={{ textAlign: "left", margin: "20px auto", width: "80%", maxWidth: "900px" }}>
      <h1 className="text-3xl mb-6 text-black font-bold text-center">Race Results</h1>
      <div className="flex flex-col sm:flex-row gap-5 items-center justify-center mb-4">
        <div className="w-full sm:w-auto">
          <DatePicker
            placeholderText='Select Date'
            selected={selectedDate}
            onChange={date => setSelectedDate(date || new Date())}
            className="custom-input-date w-full sm:w-48 rounded border border-gray-300 bg-white py-2 px-4 font-medium outline-none transition focus:border-primary"
            required
          />
          <button type="button" onClick={fetchData} className="flex font-medium w-full sm:w-auto justify-center rounded-full bg-primary text-white px-5 py-2 mt-2 sm:mt-0">Fetch Data</button>
        </div>
      </div>
      {loading && <p className="mt-4 text-gray-700">Loading...</p>}
      {errorMessage && <div className="text-red-600 mt-4">{errorMessage}</div>}
      {transformedData.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <style>
            {`
              table {
                border-collapse: collapse;
                width: 100%;
              }
              th, td {
                border: 1px solid gray;
                padding: 8px;
              }
              th {
                background-color: #333;
                color: white;
              }
              tr:nth-child(even) {
                background-color: #f2f2f2;
              }
              tr:nth-child(odd) {
                background-color: #ffffff;
              }

              @media screen and (max-width: 600px) {
                table {
                  overflow-x: auto;
                  display: block;
                }
                th, td {
                  white-space: nowrap;
                }
              }
            `}
          </style>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th>Horse Weight</th>
                <th>Jockey Weight</th>
                <th>Distance</th>
                <th>Class Name</th>
                <th>Horse Name</th>
                <th>Jockey Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {transformedData.slice((currentPage - 1) * 3, currentPage * 3).map(({
                horseWeights,
                jockeyWeight,
                distance,
                className,
                jockeyName,
                horseName,
                time
              }, index) => (
                <tr key={index}>
                  <td>{renderCell(horseWeights)}</td>
                  <td>{renderCell(jockeyWeight)}</td>
                  <td>{renderCell(distance)}</td>
                  <td>{renderCell(className)}</td>
                  <td>{renderCell(horseName)}</td>
                  <td>{renderCell(jockeyName)}</td>
                  <td className="whitespace-nowrap">{renderCell(time)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <span style={{ margin: '0 10px' }}>{currentPage} of {totalPages}</span>
            <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
