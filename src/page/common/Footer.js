import React, { useEffect, useState } from 'react';
import { FooterWrapper } from './style';
import store from '../store';
import logo from '../../statics/svgs/logo.svg';

export default function Footer (){
    
    const [footColor,setfootColor] = useState(store.getState());

    useEffect(()=>{
        store.subscribe( ()=>{
            setfootColor(store.getState());
        } );
    })

    return (
        <FooterWrapper className={ footColor.nightmode ? 'active':''}>
            <div>Power by reactJS <img src={logo} className="App-logo" alt="logo" /></div>
            <div>Made by <a><i>James </i></a>for more projects visit <a href='https://github.com/JamesGao0908'><i className='iconfont'>&#xe600;</i></a></div>
        </FooterWrapper>)
    
}