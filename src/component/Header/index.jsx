

import React from 'react';
const { ipcRenderer } = window.require('electron');

class Header extends React.Component {
    state = {
        message: ''
    }
    componentDidMount() {
        // ipcRenderer.send('getMsg', '请求')
        ipcRenderer.on('ping', (event, message) => {
            console.log(message)
            this.setState({
                message
            })
        })
    }
    render() {
        const { message } = this.state;
        return (
            <div>
                {message}
            </div>
        )
    }
}

export default Header;