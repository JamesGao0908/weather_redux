import styled from 'styled-components';


// Weather part components
export const InputWrapper = styled.div`
    Input{
        border-radius:10px;
    }
`;

export const ResultWrapper  = styled.div`
    margin-top 30px;

    display: flex;
    align-content: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

export const ResultWeather = styled.div`
    display: flex;
    flex-direction: column;
    max-width:1024px;
    max-height:582px;
    padding: 20px;
    border-radius: 30px;
    color:white;
`;

export const BasicInfoWrapper = styled.div`
    display:flex;
    margin: 10px;
    padding: 10px;

    .locationInfo{
        flex: 1;
        display: flex;
        align-content: center;
    }

    .currentTime{
        flex:1;
        align-content: center;
        justify-content: center;
    }

    .updatedInfo{
        flex: 1;
        display: flex;
        align-content: center;
        justify-content: flex-end;
    }
`;

export const TemperatureInfoWrapper = styled.div`

    display: flex;

    div > p {
        display: block;
    }

    .majorWeatherInfo{
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        > img {
            width:64px;
            height:64px;
        }
    }
    .mirrorWeatherInfo{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

export const HourlyTempWrapper = styled.div``;

export const ForecastWrapper = styled.div`
    display:flex;

    .forecast-day{
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
`;

// Header part components
export const HeaderWrapper = styled.div`
    display: flex;
    height : 10%;
    max-height: 64px;

    > div {
        flex : 1;
    }

    .descriptions{
        padding: 5px;
    }
    .toggleSwitch{
        display: flex;
        justify-content: flex-end;
        padding: 5px;
        margin:20px;
    }
`;

export const SixHourChunk = styled.div`

`
