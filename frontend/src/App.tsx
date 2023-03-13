import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState("");

  // useEffect(() => {
  //   axios.get('http://localhost:3000/')
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/books')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
  <>
    <h1>Book recommendation Website</h1>
    {data}
  </>
);
}

export default App;
