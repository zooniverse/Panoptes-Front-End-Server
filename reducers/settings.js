export default function(state = {}, action) {
  switch (action.type) {
  case 'SET_REAL_NAME':
    return {
      ...state, // TODO
      realName: action.realName,
    };
  default:
    return state;
  }
}
