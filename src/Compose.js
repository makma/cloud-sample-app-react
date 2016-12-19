import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

import CustomWidget from './Components/CustomWidget.js';

const COMPOSE = 'http://localhost:59691/';
const PROJECT_ID = '85e06f31-6a8f-405c-ba9c-dc7aed4ed373';

class EditableArea extends Component {
    static propTypes = {
        areaId: React.PropTypes.string.required,
    }

    registerComponents(register) {
        // Test of custom widget made in React
        register(CustomWidget, "CustomWidget");
    }

    initComponents() {
        let that = this;
        cmsrequire(['jQuery', 'Activator'], function($, activator) { // eslint-disable-line no-undef
            that.registerComponents(function (component, name) { 
                activator.registerActivation(
                    'react-component-' + name.toLowerCase(),
                    function (node) {
                        var $component = $(node),
                            props = $.parseJSON($component.attr('data-props'));

                        try {
                            ReactDOM.render(
                                React.createElement(component, props),
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

            cmsrequire(['WidgetManager']); // eslint-disable-line no-undef
            
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

    loadEditableArea(areaId) {
        let url = COMPOSE + 'widgets/editablearea?location=' + PROJECT_ID + ':' + areaId;
        let that = this;

        fetch(url)
            .then(that.checkStatus)
            .then((response) => response.text())
            .then(
                function (html) { 
                    that.setState({ html: html })
                }
            );
    }

    constructor(props) {
        super(props);

        this.state = { html: 'Loading zone content ...' };
        this.loadEditableArea(props.areaId);
    }

    render() {
        return (
            <div className="compose" dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
        );
    }
}

window.FX = window.FX || {
    appPath: COMPOSE
};

export default scriptLoader(COMPOSE + 'js/RequireJS/require.js', COMPOSE + 'js/RequireJS/config.js')(EditableArea);