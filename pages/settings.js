import React from 'react';
import Application from '../components/application';
import settingsActions from '../actions/settings';

class SettingsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      realName: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.realName === this.props.realName) {
      this.setState({
        realName: '',
      });
    }
  }

  render() {
    return (
      <Application pageTitle="Settings">
        <h1>Settings</h1>
        <div>
          <label>
            Real name:{' '}
            <input type="text" value={this.state.realName || this.props.realName} onChange={(event) => {
              this.setState({
                realName: event.target.value,
              });
            }} onBlur={() => {
              this.props.onChangeRealName(this.state.realName);
            }} />
          </label>
        </div>
      </Application>
    );
  }
}

SettingsPage.propTypes = {
  realName: React.PropTypes.string,
  onChangeRealName: React.PropTypes.func,
};

SettingsPage.loadData = (params, query) => {
  return {
    realName: query.name,
  };
};

SettingsPage.mapStateToProps = (state) => {
  return {
    realName: state.realName,
  };
};

SettingsPage.mapDispatchToProps = (dispatch) => {
  return {
    onChangeRealName(realName) {
      return dispatch(settingsActions.setRealName(realName));
    },
  };
};

export default SettingsPage;
