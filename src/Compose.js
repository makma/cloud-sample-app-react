import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';

import CustomWidget from './Components/CustomWidget.js';

const COMPOSE = 'http://localhost:59691/';
const PROJECT_ID = '85e06f31-6a8f-405c-ba9c-dc7aed4ed373';

function registerCustomWidgets(register) {
    // Test of custom widget made in React
    register(CustomWidget, "CustomWidget");
}

window.addEventListener(
    'message',
    function (ev) {
        var data = ev.data;

        if (data.source === 'Compose') {
            if (data.action === 'registerCustomWidgets') {
                registerCustomWidgets(function(component, name) {
                    window.FX.Compose.registerCustomWidget(
                        'react-' + name.toLowerCase(), 
                        function (node, props) {
                            try {
                                ReactDOM.render(
                                    React.createElement(component, props),
                                    node
                                );
                            }
                            catch (e) {
                                alert(e);
                            }
                        }
                    );
                });
            }
        }
    },
    false
);

class EditableArea extends Component {
    static propTypes = {
        areaId: React.PropTypes.string.isRequired,
    }    

    render() {
        return (
            <div className="widgets-editable-area" data-project-id={PROJECT_ID} data-area-id={this.props.areaId} dangerouslySetInnerHTML={{ __html: '' }}></div>
        );
    }
}

export default scriptLoader(COMPOSE + 'compose.js')(EditableArea);