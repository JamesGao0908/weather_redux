import React from 'react';
import store from '../store';
import 'antd/dist/antd.css';
import * as actionsCreator from '../store/actionsCreator';
import Loading from './components/Loading';
import Welcome from './components/Welcome';
import Time from './components/Time';
import dayBg from '../../statics/backgrounds/clear-day.jpeg';
import nightBg from '../../statics/backgrounds/clear-night.jpeg';
import { Input, List, } from 'antd';

import { InputWrapper, ResultWrapper, ResultWeather, 
    BasicInfoWrapper, TemperatureInfoWrapper, HourlyTempWrapper, ForecastWrapper } from './style';

import axios from 'axios';

export default class Weather extends React.Component{

    constructor(props){
        super(props);
        this.state=store.getState();
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleInputonChange = this.handleInputonChange.bind(this);
        this.handleInputonFocus = this.handleInputonFocus.bind(this);
        this.handleInputonBlur = this.handleInputonBlur.bind(this);
        this.handleQueryWeather = this.handleQueryWeather.bind(this);
        this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
        store.subscribe(this.handleStateChange);
    }

    componentDidMount(){
        axios.get('./apis/test.json').catch(err=>console.log(err)).then((res)=>{
            store.dispatch( actionsCreator.action_queryWeather(res.data) );
            store.dispatch( actionsCreator.loadingWeatherResult());
        })
    }

    handleStateChange(){
        this.setState(store.getState());
    }
    handleInputonChange(e){
        store.dispatch( actionsCreator.inputonChange(e) ); //onChange handle API call
    }
    handleInputonFocus(){
        if(this.state.list.length !== 0)
            store.dispatch( actionsCreator.action_ShowList() ); //先判别state是不是空，然后判别是不是showList
    }
    /*
        1. 延迟500毫秒，让点击li先于此事件触发。不然li点击事件会触发不了
        2. listshow->false
        3. 或许价格CSSTRANSITION
    */
    handleInputonBlur(){
        setTimeout(()=>{
            store.dispatch( actionsCreator.action_hideList() );
        },500);
    }
    handleQueryWeather(lat,lon){
        store.dispatch( actionsCreator.action_hideList() ); //listshow->false
        store.dispatch( actionsCreator.loadingListReult() ); //respondLoading->true
        store.dispatch( actionsCreator.queryWeather(lat,lon) ); //Querying weather info
    }
    handleOnMouseOver(){
        store.dispatch( actionsCreator.action_ShowList() );
    }
    render(){
        return (
            <>
            <InputWrapper>
                <Input placeholder='Enter a location'
                    onChange={this.handleInputonChange}
                    onFocus={this.handleInputonFocus}
                    onBlur={this.handleInputonBlur}/>
                {
                (this.state.listShow) ? (
                    <List bordered
                    onMouseOver = {this.handleOnMouseOver}
                    dataSource = {this.state.list}
                    renderItem = { (item)=>(<List.Item onClick={ ()=>{this.handleQueryWeather(item.lat,item.lon)} } > {item.name}</List.Item>) }/>
                ):''
                }
            </InputWrapper>
            <ResultWrapper>
            {
            (this.state.respondLoaded) ? (
                <ResultWeather style={{ backgroundImage: (this.state.current.is_day===1) ? `url(${dayBg})`:`url(${nightBg})` }}>
                    <BasicInfoWrapper>
                        <div className='locationInfo'>{this.state.location.name +' , '+this.state.location.region+' , '+this.state.location.country}</div>
                        <div className='updatedInfo'><Time />{'    Last updated '+this.state.current.last_updated}</div>
                    </BasicInfoWrapper>
                    <TemperatureInfoWrapper>
                        <div className='majorWeatherInfo'>
                            <img src={this.state.current.condition.icon} /> 
                            <p>{this.state.current.condition.text}</p>
                            <p>{this.state.current.temp_c +' °C'} </p>
                        </div>
                        <div className='mirrorWeatherInfo'>
                            <p>{'Humidity : '+this.state.current.humidity}</p>
                            <p>{'Wind : '+this.state.current.wind_mph+' mph'}</p>
                            <p>{'Feels like '+this.state.current.feelslike_c + ' °C'}</p>
                        </div>
                    </TemperatureInfoWrapper>
                    <HourlyTempWrapper />
                    <ForecastWrapper>
                    {
                        this.state.forecast.map((item,index)=>{
                            return (<div className='forecast-day'>
                                <div>{item.date}</div>
                                <div><img src={item.day.condition.icon} /></div>
                                <div>{item.day.avgtemp_c+' °C'}</div>
                                <div><i className='iconfont'>&#xe633;</i>{item.astro.sunrise}</div>
                                <div><i className='iconfont'>&#xe632;</i>{item.astro.sunset}</div>
                                
                            </div>)
                        })
                    }
                    </ForecastWrapper>
                </ResultWeather>
            ):( this.state.respondLoading ? (<Loading />):(<Welcome />))
            }
            </ResultWrapper>
            </>)
    }
}