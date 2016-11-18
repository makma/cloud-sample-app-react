import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';

const COMPOSE = 'http://localhost:59691/';

window.FX = window.FX || {
    appPath: COMPOSE
};

class Compose extends Component {

    initDesign() {
        cmsrequire(['FX/WidgetManager']); // eslint-disable-line no-undef
    }

    componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded && isScriptLoadSucceed) { 
            this.initDesign()
        }
    }
 
    componentDidMount () {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props
        if (isScriptLoaded && isScriptLoadSucceed) {
            this.initDesign()
        }
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }

        let error = "HTTP error " + response.status + ": " + response.statusText;
        console.log(error); // eslint-disable-line no-console
        throw error;
    }

    loadZoneContent(zoneId) {
        let url = COMPOSE + 'WidgetManager/Zone?location=data:' + zoneId;
        let that = this;

        fetch(url)
            .then(that.checkStatus)
            .then((response) => response.text())
            .then(
                function (html) { 
                    that.setState({ zoneHtml: html })
                }
            );
    }

    constructor(props) {
        super(props);

        this.state = { zoneHtml: 'Loading zone content ...' };
        this.loadZoneContent(props.zoneId);
    }

    render() {
        return (
            <div className="compose" dangerouslySetInnerHTML={{ __html: this.state.zoneHtml }}></div>
        );
    }
}

export default scriptLoader(COMPOSE + 'js/FX/RequireJS/require.js', COMPOSE + 'js/FX/RequireJS/config.js')(Compose);