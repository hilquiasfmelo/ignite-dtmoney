import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';

import { App } from './App';

createServer({
  // Criação da tabela/model transaction no Banco do MirageJS
  models: {
    transaction: Model,
  },
  // Criação de transações direta usando o seeds do MirageJS
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de WebSite',
          value: 6000,
          type: 'deposit',
          category: 'Desenvolvedor',
          createdAt: new Date('2022-01-19 10:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          value: 1100,
          type: 'withdraw',
          category: 'Casa',
          createdAt: new Date('2022-01-19 11:00:00'),
        },
      ],
    });
  },
  routes() {
    // Inicia as chamadas apartir do caminho /api
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
