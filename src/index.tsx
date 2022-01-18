import React from 'react';
import ReactDOM from 'react-dom';
import { createServer } from 'miragejs';

import { App } from './App';

createServer({
  routes() {
    // Inicia as chamadas apartir do caminho /api
    this.namespace = 'api';

    this.get('/transactions', () => {
      return [
        {
          id: 1,
          title: 'Transcation 1',
          amount: 400,
          type: 'deposit',
          category: 'Food',
          createdAt: new Date(),
        },
      ];
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
