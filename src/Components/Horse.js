import axios from "axios";
import React, { useEffect, useState } from "react";

function Horse() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ horseName: "" });
  const [editTask, setEditTask] = useState({ horseName: "" });
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://horsejockey.onrender.com/fetchedHorse");
      if (response.data && Array.isArray(response.data.getData)) {
        setTasks(response.data.getData);
        setFilteredTasks(response.data.getData);
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching Data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /^[A-Za-z0-9 ]+$/;

    if (!regex.test(newTask.horseName)) {
      setErrorMessage("Only alphabetic letters are allowed.");
      return;
    }
    setErrorMessage("");
    try {
      await axios.post("https://horsejockey.onrender.com/createHorse", newTask);
      setNewTask({ horseName: "" });
      fetchTasks();
    } catch (error) {
      console.error("Error adding Data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://horsejockey.onrender.com/deleteHorse/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting Data:", error);
    }
  };

  const handleUpdate = async (id) => {
    const regex = /^[A-Za-z0-9 ]+$/;

    if (!regex.test(editTask.horseName)) {
      setErrorMessage("Only alphabetic letters are allowed.");
      return;
    }
    setErrorMessage("");
    try {
      await axios.put(`https://horsejockey.onrender.com/updateHorse/${id}`, editTask);
      setEditingTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating Data:", error);
    }
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task._id);
    setEditTask({ horseName: task.horseName });
  };

  const styles = {
    container: {
      textAlign: "center",
      margin: "20px auto",
      width: "80%",
      maxWidth: "600px",
      padding: "0 20px",
    },
    formInput: {
      padding: "8px",
      marginRight: "4px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      width: "60%",
    },
    button: {
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    tableHeader: {
      backgroundColor: "#f2f2f2",
      textAlign: "center",
      border: "1px solid #ddd",
      padding: "8px",
    },
    tableCell: {
      border: "1px solid #ddd",
      padding: "8px",
    },
    editInput: {
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      width: "80%",
    },
    actionButton: {
      backgroundColor: "#008cba",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "4px",
    },
    deleteButton: {
      backgroundColor: "#f44336",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    errorMessage: {
      color: "red",
      marginTop: "10px",
    },
    // Media Queries
    "@media (max-width: 768px)": {
      container: {
        width: "90%",
      },
      formInput: {
        width: "70%",
      },
    },
    "@media (max-width: 576px)": {
      formInput: {
        width: "80%",
      },
      editInput: {
        width: "70%",
      },
    },
  };

  return (
    <div style={styles.container}>
      <h1>Add Horse</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="horseName"
          placeholder="Enter Name"
          value={newTask.horseName}
          onChange={(e) =>
            setNewTask({ ...newTask, horseName: e.target.value })
          }
          required
          style={styles.formInput}
        />
        <button type="submit" style={styles.button}>
          Add Horse
        </button>
      </form>
      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task._id}>
              <td style={styles.tableCell}>
                {editingTaskId === task._id ? (
                  <input
                    type="text"
                    name="horseName"
                    value={editTask.horseName}
                    onChange={handleChange}
                    style={styles.editInput}
                  />
                ) : (
                  task.horseName
                )}
              </td>
              <td style={styles.tableCell}>
                {editingTaskId === task._id ? (
                  <button
                    style={styles.actionButton}
                    onClick={() => handleUpdate(task._id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    style={styles.actionButton}
                    onClick={() => handleEditClick(task)}
                  >
                    Edit
                  </button>
                )}
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Horse;
