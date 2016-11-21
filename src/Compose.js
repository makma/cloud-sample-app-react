import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

import CustomWidget from './Components/CustomWidget.js';

const COMPOSE = 'http://localhost:59691/';

class WidgetZone extends Component {

    registerComponents(register) {
        // Test of custom widget made in React
        register(CustomWidget, "customwidget");
    }

    initComponents() {
        let that = this;
        cmsrequire(['jQuery', 'FX/Activator'], function($, activator) { // eslint-disable-line no-undef
            that.registerComponents(function (component, name) { 
                activator.registerActivation(
                    'react-component-' + name.toLowerCase(),
                    function (node) {
                        var $component = $(node);

                        try {
                            ReactDOM.render(
                                React.createElement(component, $.parseJSON($component.attr('data-props'))),
                                $component[0]
                            );
                        }
                        catch (e) {
                            alert(e);
                        }
                    },
                    true
                );          
            });
        });
    }

    initDesign() {
        if (!window.FX.loaded) {
            window.FX.loaded = true;

            cmsrequire(['FX/WidgetManager']); // eslint-disable-line no-undef
            
            this.initComponents();
        }
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
        let url = COMPOSE + 'WidgetManager/Zone?design=1&location=data:' + zoneId;
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

window.FX = window.FX || {
    appPath: COMPOSE
};

export default scriptLoader(COMPOSE + 'js/FX/RequireJS/require.js', COMPOSE + 'js/FX/RequireJS/config.js')(WidgetZone);