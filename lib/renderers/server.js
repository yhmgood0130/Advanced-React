import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import StateApi from 'state-api';

import App from 'components/App';
import config from 'config';

const server = async () => {
  const res = await axios.get(`http://${config.host}:${config.port}/data`);
  const store = new StateApi(res.data);

  return {
    initialMarkup: ReactDOMServer.renderToString(
      <App store={store} /> 
    ),
    initialData: res.data
  };
};

export default server;