import React from 'react';
const { ipcRenderer } = window.require('electron')

class Home extends React.Component {
    state = {
        data: ''
    }
    componentDidMount() {
        const formData = {
            name: 'getBusMsg',
            url: 'http://223.6.254.105/bus/line!lineDetail.action?lineName=852&lineNo=852&cityId=003&sign=signkey11&s=IOS&stats_referer=searchHistory&v=5.34.0'
        }
        ipcRenderer.send('getBusMsg', formData)
        ipcRenderer.on(formData.name, (event, data) => {
            var data = this.ab2str(data)
            console.log(data)
            data = data.slice(6, -6);
            console.log(JSON.parse(data))
            this.setState({
                data
            })
        })
    }
    ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }
    render() {
        const { data } = this.state;
        return (
            <div>

                {data}
            </div>
        )
    }
}

export default Home;