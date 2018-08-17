

import React from 'react';

class Header extends React.Component {
    state = {
        message: '车来了电脑版'
    }
    componentDidMount() {
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