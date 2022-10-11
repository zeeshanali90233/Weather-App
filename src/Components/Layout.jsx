import React,{useState} from 'react'
import './Layout.css';


const api={
  key:'aef5055c55788d5c602ee149b5d29854',
  base:'http://api.openweathermap.org/data/2.5/',
}


export const Layout = () => {
  const [query,setQuery]=useState('');
  const [weather,setWeather]=useState([]);

  const dateBuilder=(d)=>{
    let months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    let days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const search=(ev)=>{
    if(ev.key==='Enter'){
      fetch(
        `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                    .then((res) => res.json())
                    .then((json) => {
                        setWeather(json);
                        setQuery('');
                    })
    }
  }

  

  return (
    <div className={`weather-container ${(weather.cod!=='404' && weather.length!==0)?(weather.main.temp>35)?"hot":(weather.main.temp>25)?'warm':(weather.main.temp>15)?'cold':'very-cold':''}`}  >
        <main>
            <div className="search-box">
                <input type="text"
                placeholder='search...'
                className='search-bar'
                value={query}
                id ="placeSearch"
                onChange={(e)=>{setQuery(e.target.value)}}
                onKeyPress={search}
                 />

              
            </div>
            {(weather.cod!=='404' && weather.length!==0)?<><div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{parseInt(weather.main.temp)}°C </div>
              <div className="weather">{weather.weather[0].description}</div>
            </div></>:''}
        </main>
    </div>
  )
}
