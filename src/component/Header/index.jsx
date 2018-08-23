

import React from 'react';

import './index.scss'

class Header extends React.Component {
    state = {
        message: '公交查询 - smalleast'
    }
    componentDidMount() {
    }
    render() {
        const { message } = this.state;
        return (
            <div className="header">
                {message}
            </div>
        )
    }
}

export default Header;