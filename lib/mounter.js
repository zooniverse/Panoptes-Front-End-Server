import React from 'react';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {connect, Provider} from 'react-redux';

export default function Mounter(props) {
  const {reducer, state, component} = props;

  let store;
  let ComponentToMount;
  if (reducer) {
    const logger = createLogger();
    store = applyMiddleware(thunk, logger)(createStore)(reducer, state);
    const {mapStateToProps, mapDispatchToProps} = component;
    ComponentToMount = connect(mapStateToProps, mapDispatchToProps)(component);
  } else {
    ComponentToMount = component;
  }

  let output;
  if (store) {
    output = (
      <Provider store={store}>
        <ComponentToMount />
      </Provider>
    );
  } else {
    output = <ComponentToMount {...state} />;
  }

  return output;
}
