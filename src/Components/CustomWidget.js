import React, { Component } from 'react';

class CustomWidget extends Component {
    constructor(props) {
        super(props);

        this.state = { now: new Date().toLocaleTimeString() };
        let that = this;

        setInterval(function() { that.setState({ now: new Date().toLocaleTimeString() }) }, 1000);
    }

    render() {
        return (
            <h2 className={this.props.cssClass}>Custom widget {this.state.now}</h2>
        );
    }
}

export default CustomWidget;