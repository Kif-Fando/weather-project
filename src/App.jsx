import axios from 'axios';
import parse from 'html-react-parser';
import React, { useState, useEffect } from 'react';

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState('');
  const [inputValue, setInputValue] = useState('');

  const onCityInput = (e) => {
    setInputValue(e.target.value);
  }

  const onChangeLocationCLick = () => {
    setLocation(inputValue);
  }

  const getWeatherInfo = (city) => {
    return axios(`https://wttr.in/${city}`)
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      axios(
        `http://api.positionstack.com/v1/reverse?access_key=bece4e8a23fccaef24ce214b0f9e0e58&query=${position.coords.latitude},${position.coords.longitude}`
      ).then(({ data }) => {
        setLocation(data.data[0].administrative_area);
        setInputValue(data.data[0].administrative_area);
      })
    });
    console.log(location);
  }, []);

  useEffect(() => {
    getWeatherInfo(location).then(({ data }) => {
      setWeather(data);
    })

  }, [location])


  return (
    <div className='flex m-auto px-8 bg-gray-300 h-full min-h-screen'>
      <div className='mx-auto max-w-max w-full mt-4'>
        {/* Current location: {location} */}
        <div>
          <input type='text' className='border-solid mt-4 border-black border-2 w-1/2' onChange={onCityInput} value={inputValue}/>
          <button type='button' className='border-2 border-black ml-4 rounded shadow-lg' onClick={onChangeLocationCLick}>change location</button>
        </div>
        <div>
          {parse(weather)}
        </div>
      </div>
    </div>
  );
}

export default App;
