export default {
  '/': {
    component: require('../pages/home').default,
  },
  '/projects': {
    component: require('../pages/projects').default,
  },
  '/settings': {
    component: require('../pages/settings').default,
    reducer: require('../reducers/settings').default,
  },
};
