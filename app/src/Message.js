'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import notify from './notify';

let lastMessage = '';

const Message = React.createClass({
  getInitialState: function() {
    return {
      message: 'Starting...'
    };
  },

  componentDidMount: function() {
    setInterval(() => {
      ipcRenderer.send('get-status', 'ping');
    }, 250);

    ipcRenderer.on('current-status', (event, data) => {
      const message = JSON.parse(data).message;
      if (message !== lastMessage) {
        if (/Start.*/.test(message)) {
          notify(message);
        }

        this.setState({message: message});

        lastMessage = message;
      }
    });
  },

  render: function() {
    console.log(this.props.message);
    return (
      <div className="message">
        {this.state.message}
      </div>
    );
  }
});

export default Message;
