import axios from 'axios';

export const inputonChange = (e)=>{
    return (dispatch)=>{
        axios.get('https://www.weatherapi.com/weather/search.ashx?',{
            params:{
                q: e.target.value
            }
        })
        .then((res)=>{
            dispatch( action_inputChanger(res.data) );
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

const action_inputChanger = (e)=>({
    type: 'load_list_respond',
    value: e
});

export const queryWeather = (lat,lon)=>{
    return (dispatch)=>{
        axios.get('http://api.weatherapi.com/v1/forecast.json?',{
            params:{
                key : '757a8898541844c2916101944210607',
                q : lat+','+lon,
                days : 3,
                aqi : 'no',
                alerts : 'no',
            }
        })
        .then((res)=>{
            dispatch(action_queryWeather(res.data));
        })
        .catch((err)=>{
            console.log(err);
        });
    }
}

const action_queryWeather = (e)=>({
    type:'load_forecast_info',
    value: e,
})

export const loadingWeatherResult = ()=>({
    type: 'loading_weather_result',
})

export const loadingListReult = ()=>({
    type: 'loading_list_result',
})