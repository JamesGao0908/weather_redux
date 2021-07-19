import styled from 'styled-components';

export const InputWrapper = styled.div``;

export const ResultWrapper  = styled.div`
    margin-top 30px;
`;

export const ResultWeather = styled.div`
    display: flex;
    flex-direction: column;

    max-width:1024px;
    max-height:582px;

    color:white;
`;

export const BasicInfoWrapper = styled.div`
    display:flex;

    margin: 10px;
    padding: 10px;
    .locationInfo{
        display: flex;
        align-content: center;
        flex: 1;
    }
    .updatedInfo{
        display: flex;
        align-content: center;
        justify-content: flex-end;
        flex: 1;
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