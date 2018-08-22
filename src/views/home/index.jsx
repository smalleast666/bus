import React from 'react';
import axios from 'axios';

import { Button, Snackbar } from '@material-ui/core';

// import css from './index.scss';

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
            this.setState({ buses: buses.reverse() })
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
            if (data.data === {}) {
                return this.setState({
                    open: true,
                    errMsg: data.errmsg
                });
            }
            const { stations, line } = data.data;
            this.setState({ stations, lineId: line.lineId })
        });
    }

    handleClose() {
        return this.setState({
            open: false,
        })
    }

    render() {
        const { stations, buses, order, open, errMsg } = this.state;
        return (
            <div>
                重庆：<input type="text" onKeyUp={(e) => this.searchClick(e)} onChange={(e) => this.setState({ lineNo: e.target.value })} />
                <Button
                    color="primary"
                    onClick={() => this.searchClick()}
                >搜索
                </Button>

                {
                    stations.map((item, index) => 
                        <li onClick={() => this.stationClick(item.order)} style={{ color: item.order === order ? 'red' : ''}} key={item.order}>{item.sn}</li>
                    )
                }
                {
                    buses.map(item => (
                        item.travels.length ?
                        (<div key={item.busId}>
                            还有{Math.ceil(item.travels[0].travelTime/60)}分钟到站
                        </div>)
                        : null
                    ))
                }
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