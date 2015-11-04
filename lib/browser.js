import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import Mounter from './mounter';

const {APPLICATION_ROUTE, APPLICATION_STATE, APPLICATION_CONTAINER} = window;

const {component, reducer} = routes[APPLICATION_ROUTE];

ReactDOM.render(<Mounter component={component} reducer={reducer} state={APPLICATION_STATE} />, APPLICATION_CONTAINER);
