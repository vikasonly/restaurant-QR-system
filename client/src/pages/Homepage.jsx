import React, { useEffect } from 'react';
import axios from 'axios';
const Homepage = () => {
  console.log(localStorage.getItem('accessToken'));
  useEffect(() => {
    axios.get('http://localhost:3000/menu', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  }, []);
  return <div>HOMEPAGE</div>;
};

export default Homepage;