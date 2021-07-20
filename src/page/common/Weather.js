import React from 'react';

import store from '../store';
import * as actionsCreator from '../store/actionsCreator';

import Loading from './components/Loading';
import Welcome from './components/Welcome';
import Time from './components/Time';
import dayBg from '../../statics/backgrounds/clear-day.jpeg';
import nightBg from '../../statics/backgrounds/clear-night.jpeg';

import 'antd/dist/antd.css';
import { Input, List, Carousel,} from 'antd';
import { InputWrapper, ResultWrapper, ResultWeather, 
    BasicInfoWrapper, TemperatureInfoWrapper, 
    HourlyTempWrapper, ForecastWrapper, SixHourChunk } from './style';

import { AimOutlined } from '@ant-design/icons';


const { Search } = Input;

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
        this.handleSelectDay = this.handleSelectDay.bind(this);
        this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
        this.handleGPSQuery = this.handleGPSQuery.bind(this);
        store.subscribe(this.handleStateChange);
    }

    // Test Method / delete | change after complete!!!
    // componentDidMount(){
    //     console.log('Helloworld');
    //     axios.get('./apis/test.json').catch(err=>console.log(err)).then((res)=>{
    //         store.dispatch( actionsCreator.action_queryWeather(res.data) );
    //         store.dispatch( actionsCreator.loadingWeatherResult());
    //     })
        
    //     setTimeout(() => {
    //         store.dispatch(({type:'loading_function_test'}))
    //     }, 3000);
    // }

    /*
        每小时展示时间的小物件
        考虑手机版屏幕适配调整
    */

    handleGPSQuery(){
        store.dispatch( actionsCreator.loadingListReult());
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((res)=>{ 
                store.dispatch( actionsCreator.queryWeather(res.coords.latitude,res.coords.longitude))
            })
        }else{
           alert('您的浏览器不支持地理定位');
        }
    }
    handleChopHourlyInfo(){
        let i,j, temporary, chunk = 6;
        let hourArray = [];
        const hourList = this.state.forecast[this.state.daySelector].hour;

        for (i = 0,j = hourList.length; i < j; i += chunk) {
            temporary = hourList.slice(i, i + chunk);
            hourArray = [...hourArray,temporary];
        }
        // console.log(hourList);
        return (<Carousel autoplay>
            {
                hourArray.map( (item,index)=>{
                    return (
                        <SixHourChunk key={index}>
                        <div className='6trunk' key={index} style={{'display':'flex', 'justifyContent': 'center','alignItems': 'center','columnGap': '100px'}}>
                        {
                            item.map((tmpItem,tmpIndex)=>{
                                return (
                                        <div key={tmpIndex} style={{'display':'flex', 'justifyContent': 'center','alignItems': 'center','flexDirection': 'column'}}>
                                            <div>{tmpItem.time.substring(11)}</div>
                                            <div><img src={tmpItem.condition.icon} /></div>
                                            <div>{tmpItem.temp_c+' °C'}</div>
                                        </div>)
                            })
                        }
                        </div>
                        </SixHourChunk>
                    )
                })
            }
        </Carousel>)
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
        3. list触发时,添加CSStransition动画
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
    handleOnMouseLeave(){
        store.dispatch( actionsCreator.action_hideList() );
    }
    handleSelectDay(e){
        store.dispatch( actionsCreator.selectDay(e));
    }
    render(){
        return (
            <>
            <InputWrapper>
                <Search placeholder='Enter a location'
                    onChange={this.handleInputonChange}
                    onFocus={this.handleInputonFocus}
                    onBlur={this.handleInputonBlur}
                    onSearch={this.handleGPSQuery}
                    enterButton= {<AimOutlined />}
                    />
                {
                (this.state.listShow) ? (
                    <List bordered
                    style = {{ 'background': 'white', 'position':'absolute','width':'50%','zIndex':10}}
                    onMouseOver = {this.handleOnMouseOver}
                    onMouseLeave = {this.handleOnMouseLeave}
                    dataSource = {this.state.list}
                    renderItem = { (item)=>(<List.Item onClick={ ()=>{this.handleQueryWeather(item.lat,item.lon)} } > {item.name}</List.Item>) }/>
                ):''
                }
            </InputWrapper>
            <ResultWrapper>
            {
            (this.state.respondLoaded) ? (
                <ResultWeather style={{ backgroundImage: (this.state.current.is_day === 1) ? `url(${dayBg})`:`url(${nightBg})` }}>
                    <BasicInfoWrapper>
                        <div className='locationInfo'>{this.state.location.name +' , '+this.state.location.region+' , '+this.state.location.country}</div>
                        <div className='currentTime'><Time /></div>
                        <div className='updatedInfo'>{'Last updated '+this.state.current.last_updated}</div>
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
                    <HourlyTempWrapper>
                    {
                        this.handleChopHourlyInfo()
                    }
                    </HourlyTempWrapper>
                    <ForecastWrapper>
                    {
                        this.state.forecast.map((item,index)=>{
                            return (<div className={ (this.state.daySelector == index) ? 'forecast-day active' : 'forecast-day'} key={index} onClick={()=>this.handleSelectDay(index)} >
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