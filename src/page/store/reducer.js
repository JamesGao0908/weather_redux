const defaultState = {
    inputValue: '',
    list:[],
    listShow: false,

    current:'',
    location:'',
    forecast:'',
    respondLoading: false,
    respondLoaded: false,

    daySelector: '0',
    nightmode: false,
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
        case 'loading_list_result' :{
            const newState = JSON.parse(JSON.stringify(state));
            newState.respondLoading = true;
            newState.respondLoaded = false;
            return newState;
        }
        case 'loading_weather_result' :{
            const newState = JSON.parse(JSON.stringify(state));
            newState.respondLoading = false;
            newState.respondLoaded = true;
            return newState;
        }
        case 'hide_list' :{
            const newState = JSON.parse(JSON.stringify(state));
            newState.listShow = false;
            return newState;
        }
        case 'show_list' :{
            const newState = JSON.parse(JSON.stringify(state));
            newState.listShow = true;
            return newState;
        }
        case 'switch_nightmode' :{
            const newState = JSON.parse(JSON.stringify(state));
            newState.nightmode ? (newState.nightmode=false):(newState.nightmode=true);
            return newState;
        }
        // test function for loading components
        case 'loading_function_test' :{
            const newState = JSON.parse(JSON.stringify(state));
            newState.respondLoading = true;
            newState.respondLoaded = false;
            return newState;
        }
        case 'select_day' :{
            const newState = JSON.parse(JSON.stringify(state));
            newState.daySelector = action.value;
            return newState
        }
        default :
            return state;
    }
}