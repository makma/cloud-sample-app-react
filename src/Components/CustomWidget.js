import React, { Component } from 'react';

class CustomWidget extends Component {
    constructor(props) {
        super(props);

        this.state = { now: new Date().toLocaleTimeString() };
        let that = this;

        setInterval(
            function() { 
                that.setState({ now: new Date().toLocaleTimeString() }) 
            }, 
            1000
        );
    }

    render() {
        return (
        <div>
            <h2 className={this.props.cssClass}>ReactJS widget {this.state.now}</h2>
            <div onClick={(ev) => { alert('Hello world'); ev.stopPropagation(); ev.preventDefault(); }}>click me</div>
        </div>
        );
    }
}

export default CustomWidget;