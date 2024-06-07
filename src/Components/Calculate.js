import React, { useState } from 'react';
import axios from 'axios';

function Calculate() {
  const [jockeyWeight, setJockeyWeight] = useState('');
  const [horseWeights, setHorseWeights] = useState('');
  const [distance, setDistance] = useState('');
  const [result, setResult] = useState('');
  const [calculation, setCalculation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://horsejockey.onrender.com/calculate', {
        jockeyWeight: parseFloat(jockeyWeight),
        horseWeights: parseFloat(horseWeights),
        distance: parseFloat(distance)
      });
      setResult(response.data.time);
      setCalculation(response.data.calculation);
      console.log(response.data.time);

      // Clear input fields
      setJockeyWeight('');
      setHorseWeights('');
      setDistance('');
    } catch (error) {
      console.error('Error calculating:', error);
    }
  };

  const styles = {
    container: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      boxSizing: 'border-box',
    },
    heading: {
      fontSize: '2.5rem',
      color: '#333',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px',
    },
    input: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '80%',
      maxWidth: '300px',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#28a745',
      color: '#fff',
      cursor: 'pointer',
      width: '80%',
      maxWidth: '300px',
    },
    result: {
      marginTop: '20px',
      fontSize: '1.2rem',
      color: '#007bff',
      fontWeight: 'bold',
    },
    '@media (max-width: 768px)': {
      heading: {
        fontSize: '2rem',
      },
      input: {
        width: '90%',
      },
      button: {
        width: '90%',
      },
    },
    '@media (max-width: 576px)': {
      heading: {
        fontSize: '1.5rem',
      },
      input: {
        width: '95%',
      },
      button: {
        width: '95%',
      },
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Calculate Time</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="jockeyWeight"
          value={jockeyWeight}
          onChange={(e) => setJockeyWeight(e.target.value)}
          placeholder="Enter jockey weight"
          style={styles.input}
          required
        />
        <input
          type="text"
          name="horseWeights"
          value={horseWeights}
          onChange={(e) => setHorseWeights(e.target.value)}
          placeholder="Enter horse weight"
          style={styles.input}
          required
        />
        <input
          type="text"
          name="distance"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Enter distance"
          style={styles.input}
          required
        />
        <button
          type="submit"
          style={styles.button}
        >
          Calculate
        </button>
      </form>

      {result && (
        <div style={styles.result}>
          <p>Time: {result}</p>
          {/* Display calculation details here if necessary */}
        </div>
      )}
    </div>
  );
}

export default Calculate;
