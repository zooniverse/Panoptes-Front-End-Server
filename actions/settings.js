export default {
  setRealName(realName) {
    return (dispatch) => {
      return dispatch({
        type: 'SET_REAL_NAME',
        realName,
      });
    };
  },
};
