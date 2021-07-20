import axios from 'axios';

export const inputonChange = (e)=>{
    return (dispatch)=>{
        axios.get('https://www.weatherapi.com/weather/search.ashx?',{
            params:{
                q: e.target.value
            }
        })
        .then((res)=>{
            if(res.data.length === 0){
                dispatch( action_hideList() );
            }else{
                dispatch( action_inputChanger(res.data) );
                dispatch( action_ShowList() );
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}

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
            console.log(res.data);
            dispatch(action_queryWeather(res.data));
            dispatch(loadingWeatherResult());
        })
        .catch((err)=>{
            console.log(err);
        })
        .then(()=>{
            dispatch(action_hideList());
        });
    }
}

//hide List
export const action_hideList = ()=>({
    type : 'hide_list'
})
//show List
export const action_ShowList = ()=>({
    type : 'show_list'
})
//Input change trigger
const action_inputChanger = (e)=>({
    type: 'load_list_respond',
    value: e
});

//慎用！！！【手动】修改/隐藏 respondLoaded->false
export const changeRespondLoadedToFalse=()=>({
    type:'change_respondLoaded_to_false'
})

//开始加载请求新信息，respondLoading->true && respondLoaded->false(请求新的API，不抹去老STATE的状态但是把已加载修改成false)
export const loadingListReult = ()=>({
    type: 'loading_list_result',
})
//加载完成新信息respondLoading->false && respondLoaded->true
export const loadingWeatherResult = ()=>({
    type: 'loading_weather_result',
})

//加载所有API信息
export const action_queryWeather = (e)=>({
    type:'load_forecast_info',
    value: e,
})

//切换夜间模式
export const nightMode_switch = () => ({
    type: 'switch_nightmode',
})

export const selectDay = (e)=>({
    type:'select_day',
    value:e
})