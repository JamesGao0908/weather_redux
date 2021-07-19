import { Switch } from 'antd';
import 'antd/dist/antd.css';
import { HeaderWrapper } from './style';

import store from '../store';
import * as actionsCreator from '../store/actionsCreator';

export default function Header(){

    function handleOnchange(){
        store.dispatch( actionsCreator.nightMode_switch() );
        (document.body.className === '' ) ? (document.body.className = 'bk-bg'):(document.body.className = ''); //在body上面加class
    }

    return (<HeaderWrapper>
        <div className='descriptions'></div>
        <div className='toggleSwitch'><Switch checkedChildren='🌚' unCheckedChildren='🌞' onChange={handleOnchange} /></div>
    </HeaderWrapper>)
}