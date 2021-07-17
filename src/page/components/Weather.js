import React from 'react';
import store from '../store';
import 'antd/dist/antd.css';
import * as actionsCreator from '../store/actionsCreator';

import { InputWrapper } from './style';
import { Input, List, } from 'antd';


export default class Weather extends React.Component{

    constructor(props){
        super(props);
        this.state=store.getState();
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleInputonChange = this.handleInputonChange.bind(this);
        this.handleInputonFocus = this.handleInputonFocus.bind(this);
        this.handleInputonBlur = this.handleInputonBlur.bind(this);
        this.handleQueryWeather = this.handleQueryWeather.bind(this);
        store.subscribe(this.handleStateChange);
    }

    handleStateChange(){
        this.setState(store.getState());
    }

    handleInputonChange(e){
    
        store.dispatch( actionsCreator.inputonChange(e) );
    }
    handleInputonFocus(){

    }
    handleInputonBlur(){

    }
    handleQueryWeather(lat,lon){
        store.dispatch( actionsCreator.loadingWeatherResult() );
        store.dispatch( actionsCreator.queryWeather(lat,lon) );
    }
    render(){
        return (
            <>
            <InputWrapper>
                <Input placeholder='Enter a location'
                    onChange={this.handleInputonChange}
                    onFocus={this.handleInputonFocus}
                    onBlur={this.handleInputonBlur}/>
                <List bordered
                    dataSource = {this.state.list}
                    renderItem = { (item)=>(<List.Item onClick={ ()=>this.handleQueryWeather(item.lat,item.lon) } > {item.name}</List.Item>) }/>
            </InputWrapper>
            <div className='resultWrapper'>
                <div>

                </div>
            </div>
            </>)
    }
}