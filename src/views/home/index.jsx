import React from 'react';
import axios from 'axios';

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            data: '',
            cityId: '003',
            lineNo: '',
            lineId: '',
            stations: [],
            buses: [],
        }
        this.stationClick = this.stationClick.bind(this);
        this.search = this.search.bind(this);
    }

    stationClick(order) {
        const { lineNo, lineId, cityId } = this.state;
        this.setState({order})
        const url = `http://223.6.254.105/bus/line!lineDetail.action?lineName=${lineNo}&lineNo=${lineNo}&cityId=${cityId}&sign=signkey11&s=IOS&stats_referer=searchHistory&v=5.34.0${order ? '&targetOrder=' + order : ''}${lineId ? '&lineId=' + lineId : ''}`;
        axios.get(url).then(res => {
            const data = res.data.slice(6, -6);
            console.log(JSON.parse(data).jsonr.data);
            const { buses } = JSON.parse(data).jsonr.data;
            this.setState({ buses })
        });
    }

    search() {
        const { lineNo, lineId, cityId } = this.state;
        const url = `http://223.6.254.105/bus/line!lineDetail.action?lineName=${lineNo}&lineNo=${lineNo}&cityId=${cityId}&sign=signkey11&s=IOS&stats_referer=searchHistory&v=5.34.0${lineId ? '&lineId=' + lineId : ''}`;
        axios.get(url).then(res => {
            const data = res.data.slice(6, -6);
            const { stations, line } = JSON.parse(data).jsonr.data;
            this.setState({ stations, lineId: line.lineId })
        });
    }

    render() {
        const { data, stations, buses, order } = this.state;
        return (
            <div>
                重庆：<input type="text" onBlur={(e) => this.setState({ lineNo: e.target.value })}/> <button onClick={() => this.search()}>搜索</button>

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

            </div>
        )
    }
}

export default Home;