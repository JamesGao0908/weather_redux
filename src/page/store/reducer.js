const defaultState = {
    inputValue: '',
    list:[],
    listloading: false,
    listloaded: false,

    current:'',
    location:'',
    forecast:'',
    respondLoading: false,
    respondLoaded: false,
}

export default (state=defaultState, action)=>{
    switch(action.type) {
        case 'load_list_respond' :{
            const newState = JSON.parse(JSON.stringify(state));
            newState.list = action.value;
            return newState;
        }
        case 'load_forecast_info' :{
            const newState = JSON.parse(JSON.stringify(state));
            newState.current = action.value.current;
            newState.location = action.value.location;
            newState.forecast = action.value.forecast.forecastday;
            return newState;
        }
        case 'loading_weather_result' :{
            const newState = JSON.parse(JSON.stringify(state));
            newState.respondLoading = true;
            return newState;
        }
        case 'loading_list_result' :{
            const newState = JSON.parse(JSON.stringify(state));
            newState.listloading = true;
            return newState; 
        }
        default :
            return state;
    }
}