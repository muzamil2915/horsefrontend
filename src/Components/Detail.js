import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const Detail = () => {
  const [transformedData, setTransformedData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);

    fetch(`https://horsejockey.onrender.com/fetched`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        if (data && Array.isArray(data.getData) && data.getData.length > 0) {
          const transformedData = data.getData.map(
            ({
              _id,
              distance,
              jockeyWeight,
              horseWeights,
              className,
              jockeyName,
              horseName,
              time,
            }) => ({
              _id,
              distance,
              jockeyWeight,
              horseWeights,
              className: className?.className || "N/A",
              jockeyName: jockeyName?.jockeyName || "N/A",
              horseName: horseName?.horseName || "N/A",
              time,
            })
          );
          setTransformedData(transformedData);
          setTotalPages(Math.ceil(transformedData.length / 10));
          setErrorMessage("");
        } else {
          setTransformedData([]);
          setTotalPages(0);
          setErrorMessage("No data available.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
        setTransformedData([]);
        setTotalPages(0);
        setErrorMessage("Failed to fetch data. Please try again later.");
      });
  };

  const handleDelete = (id) => {
    fetch(`https://horsejockey.onrender.com/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        setTransformedData((prevData) =>
          prevData.filter((item) => item._id !== id)
        );
        setTotalPages((prevTotalPages) =>
          Math.ceil((transformedData.length - 1) / 10)
        );
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setErrorMessage("Failed to delete data. Please try again later.");
      });
  };

  const renderCell = (value) => {
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return value;
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div
      style={{
        textAlign: "left",
        margin: "20px auto",
        width: "100%",
        maxWidth: "1200px",
      }}
    >
      <h1 className="text-3xl mb-6 text-black font-bold text-center">
        Race Results
      </h1>
      {loading && <p className="mt-4 text-gray-700">Loading...</p>}
      {errorMessage && <div className="text-red-600 mt-4">{errorMessage}</div>}
      {transformedData.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <style>
            {`
              table {
                border-collapse: collapse;
                width: 100%;
                max-width: 70%;
                margin: 0 auto;
                table-layout: auto; /* Adjust based on content */
              }
              th, td {
                border: 1px solid gray;
                padding: 12px;
                text-align: center; /* Center-align text */
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
              td {
                word-wrap: break-word;
              }

              @media screen and (max-width: 768px) {
                table {
                  width: 100%;
                }
                thead {
                  display: none;
                }
                tr {
                  display: block;
                  margin-bottom: 10px;
                  border: 1px solid #ccc;
                }
                td {
                  display: block;
                  text-align: right;
                  padding: 10px;
                  border: none;
                  border-bottom: 1px solid #ccc;
                  position: relative;
                  padding-left: 50%;
                }
                td::before {
                  content: attr(data-label);
                  position: absolute;
                  left: 6px;
                  font-weight: bold;
                  text-align: left;
                  width: 45%;
                  padding-right: 10px;
                }
              }

              @media screen and (max-width: 480px) {
                td::before {
                  font-size: 0.85em;
                }
              }

              .delete-button {
                background-color: red;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
              }

              .pagination {
                display: flex;
                justify-content: center;
                margin-top: 10px;
              }
              .pagination button {
                padding: 8px 12px;
                margin: 0 5px;
                border: 1px solid #ccc;
                background-color: #f8f9fa;
                cursor: pointer;
              }
              .pagination button:disabled {
                background-color: #ddd;
                cursor: not-allowed;
              }
            `}
          </style>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th data-label="Horse Weight">Horse Weight</th>
                <th data-label="Jockey Weight">Jockey Weight</th>
                <th data-label="Distance">Distance</th>
                <th data-label="Class Name">Class Name</th>
                <th data-label="Horse Name">Horse Name</th>
                <th data-label="Jockey Name">Jockey Name</th>
                <th data-label="Time">Time</th>
                <th data-label="Actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transformedData
                .slice((currentPage - 1) * 10, currentPage * 10)
                .map(
                  (
                    {
                      _id,
                      horseWeights,
                      jockeyWeight,
                      distance,
                      className,
                      jockeyName,
                      horseName,
                      time,
                    },
                    index
                  ) => (
                    <tr key={index}>
                      <td data-label="Horse Weight">
                        {renderCell(horseWeights)}
                      </td>
                      <td data-label="Jockey Weight">
                        {renderCell(jockeyWeight)}
                      </td>
                      <td data-label="Distance">{renderCell(distance)}</td>
                      <td data-label="Class Name">{renderCell(className)}</td>
                      <td data-label="Horse Name">{renderCell(horseName)}</td>
                      <td data-label="Jockey Name">{renderCell(jockeyName)}</td>
                      <td data-label="Time" className="whitespace-nowrap">
                        {renderCell(time)}
                      </td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              {currentPage} of {totalPages}
            </span>
            <button onClick={nextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;  