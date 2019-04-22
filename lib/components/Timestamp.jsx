import React, { PureComponent } from 'react';
import storeProvider from './storeProvider';

class Timestamp extends PureComponent {
  static timeDisplay = timestamp =>
    timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    
  componentWillUpdate(nextProps, nextState) {
    console.log('Updating Timestamp');
    
  }
  render() {
    return (
      <div>
        {this.props.timestamp}
      </div>
    );
  }
}
function extraProps(store) {
  return {
    timestamp: Timestamp.timeDisplay(store.getState().timestamp)
  };
}
export default storeProvider(extraProps)(Timestamp);