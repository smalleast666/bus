import React from 'react';
import axios from 'axios';

import { Button, Snackbar, TextField  } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

import './index.scss';

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            open: false,
            errMsg: '',
            cityId: '003',
            lineNo: '',
            lineId: '',
            stations: [],
            buses: [],
            line: {},
        }
        this.stationClick = this.stationClick.bind(this);
        this.searchClick = this.searchClick.bind(this);
        this.searchFun = this.searchFun.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    stationClick(order) {
        const { lineNo, lineId, cityId } = this.state;
        this.setState({order})
        const url = `http://223.6.254.105/bus/line!lineDetail.action?lineName=${lineNo}&lineNo=${lineNo}&cityId=${cityId}&sign=signkey11&s=IOS&stats_referer=searchHistory&v=5.34.0${order ? '&targetOrder=' + order : ''}${lineId ? '&lineId=' + lineId : ''}`;
        axios.get(url).then(res => {
            const data = res.data.slice(6, -6);
            const { buses } = JSON.parse(data).jsonr.data;
            this.setState({ buses })
        });
    }

    searchClick(e) {
        if (e && e.keyCode) {
            if (e.keyCode !== 13) return;
        }
        this.setState({
            lineId: '',
        }, () => this.searchFun());
    }
    searchFun() {
        const { lineNo, lineId, cityId } = this.state;
        if (!lineNo) {
            return this.setState({
                open: true,
            });
        }
        const url = `http://223.6.254.105/bus/line!lineDetail.action?lineName=${lineNo}&lineNo=${lineNo}&cityId=${cityId}&sign=signkey11&s=IOS&stats_referer=searchHistory&v=5.34.0${lineId ? '&lineId=' + lineId : ''}`;
        axios.get(url).then(res => {
            const data = JSON.parse(res.data.slice(6, -6)).jsonr;
            const { stations, line } = data.data;
            console.log(data.data)
            if (!stations || !line || !line.lineId) {
                return this.setState({
                    open: true,
                    errMsg: data.errmsg
                });
            }    
            this.setState({ stations, lineId: line.lineId, line })
        });
    }

    handleClose() {
        return this.setState({
            open: false,
        })
    }
    selectFun = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const { stations, buses, order, open, errMsg, location, line } = this.state;
        return (
            <div>
                <div className="home-top">
                    <FormControl className="home-top-location">
                        <NativeSelect
                            value={location}
                            onChange={this.selectFun('location')}
                            input={<Input />}
                        >
                            <option value="003">重庆</option>
                            {/* <option value="001">北京</option> */}
                        </NativeSelect>
                    </FormControl>

                    <TextField
                        label="查询线路"
                        margin="normal"
                        onKeyUp={(e) => this.searchClick(e)} 
                        onChange={(e) => this.setState({ lineNo: e.target.value })} 
                    />
                    <Button
                        color="primary"
                        onClick={() => this.searchClick()}
                    >搜索
                    </Button>
                </div>
                <div className="bus-content">
                    {
                        line.lineNo ?
                        (
                            <div className="bus-info">
                                <span className="lineNo">{line.lineNo}</span>
                                <div className="bus-info-content">
                                    <p>{line.startSn}<i className="iconfont icon-long-arrow-rt"></i>{line.endSn}</p>
                                    <p>首车：{line.firstTime} 末车：{line.lastTime} 全程票价：{line.price}</p>
                                </div>
                                <Button color="primary" className="transfrom"><i className="iconfont icon-huanxiang"></i>换向</Button>
                            </div>
                        ) : null
                    }
                    
                    <ul className="bus-site">
                        {
                            stations.length ?
                            stations.map((item, index) => 
                                <li onClick={() => this.stationClick(item.order)} className={item.order === order ? 'active' : ''} key={item.order}>
                                    <span>{index + 1}</span>
                                    <p className ="iconfont icon-long-arrow-rt"></p>
                                    {item.sn}
                                </li>
                            )
                            : <div className="no-bus">请输入公交线路查询！</div>
                            
                        }
                    </ul>
                </div>
                <ul className="reach-info">
                    {   
                        buses.map((item, index) => (
                            item.travels.length ?
                            (<div key={item.busId}>
                                还有{Math.ceil(item.travels[0].travelTime/60)}分钟到站
                            </div>)
                            : buses.length - 1 === index ? <div key={index}>暂无车辆在赶来的路上</div> : null
                        ))
                    }
                </ul>

                {/* 提示框 */}
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={open}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span>{errMsg}</span>}
                />

            </div>
        )
    }
}

export default Home;