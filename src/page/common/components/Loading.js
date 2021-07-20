/*
    加载框，加载东西的时候专用
*/

import 'antd/dist/antd.css';
import { Spin, Space } from 'antd';

function Loading(){
    return (<Space>
        <Spin size="large" />
    </Space>)
}

export default Loading;