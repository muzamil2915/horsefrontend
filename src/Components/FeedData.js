import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const FeedData = () => {
  const initialState = {
    date: '',
    jockeyWeight: '',
    horseWeights: '',
    distance: '',
    time: '',
    className: '',
    jockeyName: '',
    horseName: ''
  };

  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [classOptions, setClassOptions] = useState([]);
  const [horseOptions, setHorseOptions] = useState([]);
  const [jockeyOptions, setJockeyOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classResponse = await axios.get('https://horsejockey.onrender.com/fetchedClass');
        if (classResponse.data && Array.isArray(classResponse.data.getData)) {
          setClassOptions(classResponse.data.getData);
        } else {
          console.error("Invalid response format:", classResponse.data);
        }

        const horseResponse = await axios.get('https://horsejockey.onrender.com/fetchedHorse');
        if (horseResponse.data && Array.isArray(horseResponse.data.getData)) {
          setHorseOptions(horseResponse.data.getData);
        } else {
          console.error("Invalid response format:", horseResponse.data);
        }

        const jockeyResponse = await axios.get('https://horsejockey.onrender.com/fetchedJockey');
        if (jockeyResponse.data && Array.isArray(jockeyResponse.data.getData)) {
          setJockeyOptions(jockeyResponse.data.getData);
        } else {
          console.error("Invalid response format:", jockeyResponse.data);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleCancel = () => {
    setFormState(initialState); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://horsejockey.onrender.com/create', formState);
      console.log(response.data); 
      navigate('/detail'); // navigate to detail page on successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px',
    },
    formContainer: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '500px',
      padding: '20px',
      boxSizing: 'border-box',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '1.5rem',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    select: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '10px',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
    },
    cancelButton: {
      backgroundColor: '#6c757d',
      color: '#fff',
    },
    submitButton: {
      backgroundColor: '#28a745',
      color: '#fff',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
    // Responsive media queries
    '@media (max-width: 768px)': {
      formContainer: {
        padding: '15px',
      },
      heading: {
        fontSize: '1.25rem',
      },
      button: {
        padding: '8px 16px',
        fontSize: '0.9rem',
      },
    },
    '@media (max-width: 576px)': {
      formContainer: {
        padding: '10px',
      },
      heading: {
        fontSize: '1rem',
      },
      button: {
        padding: '6px 12px',
        fontSize: '0.8rem',
      },
    },
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-5">
      <div className="bg-white rounded-lg shadow-lg w-100" style={{ maxWidth: '500px' }}>
        <h2 className="text-center mb-4">Admin Panel</h2>

        <form className="p-4" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={formState.date}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="jockeyWeight">Jockey Weight</label>
            <input
              type="number"
              className="form-control"
              id="jockeyWeight"
              name="jockeyWeight"
              value={formState.jockeyWeight}
              onChange={handleChange}
              placeholder="Enter Jockey Weight"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="horseWeights">Horse Weight</label>
            <input
              type="number"
              className="form-control"
              id="horseWeights"
              name="horseWeights"
              value={formState.horseWeights}
              onChange={handleChange}
              placeholder="Enter Horse Weight"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="distance">Distance</label>
            <input
              type="number"
              className="form-control"
              id="distance"
              name="distance"
              value={formState.distance}
              onChange={handleChange}
              placeholder="Enter Distance"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="time">Time</label>
            <input
              type="text"
              className="form-control"
              id="time"
              name="time"
              value={formState.time}
              onChange={handleChange}
              placeholder="Enter Time"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="className">Class Name</label>
            <select
              className="form-select"
              id="className"
              name="className"
              value={formState.className}
              onChange={handleChange}
            >
              <option value="">Select Class Name</option>
              {classOptions.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.className}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="jockeyName">Jockey Name</label>
            <select
              className="form-select"
              id="jockeyName"
              name="jockeyName"
              value={formState.jockeyName}
              onChange={handleChange}
            >
              <option value="">Select Jockey Name</option>
              {jockeyOptions.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.jockeyName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="horseName">Horse Name</label>
            <select
              className="form-select"
              id="horseName"
              name="horseName"
              value={formState.horseName}
              onChange={handleChange}
            >
              <option value="">Select Horse Name</option>
              {horseOptions.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.horseName}
                </option>
              ))}
            </select>
          </div>

          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        {error && <div className="alert alert-danger mt-3">{error.message}</div>}
      </div>
    </div>
  );
};

export default FeedData;
