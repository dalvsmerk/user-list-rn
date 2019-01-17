import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';

const IconSearch = require('../../../Icons/icon-search.android.png');
const IconCross = require('../../../Icons/icon-cross.android.png');
const IconArrowLeft = require('../../../Icons/icon-arrow-left.android.png');

class UserListHeader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      value: '',
    };

    this.textInputRef = React.createRef();
  }

  _toggleFocus = () => {
    this.setState(state => ({
      focused: !state.focused,
    }), () => {
      if (!this.state.focused) {
        this.textInputRef.current.blur();
      }
    });
  };

  _blur = () => {
    this.textInputRef.current.blur();
  };

  _createFocusHandler = type => event => {
    this._toggleFocus();

    if (this.props[`on${type}`]) {
      this.props[`on${type}`](event);
    }
  };

  _handleClearTextInput = () => {
    this.textInputRef.current.clear();

    if (this.props.onChangeText) {
      this.props.onChangeText('');
    }
  };

  _handleChangeTextInput = (value) => {
    this.setState({ value }, () => {
      if (this.props.onChangeText) {
        this.props.onChangeText(value);
      }
    });
  };

  render() {
    const { focused, value } = this.state;

    return (
      <View style={styles.container}>
        {!focused && <Image
          style={styles.icon}
          source={IconSearch}
        />}
        {focused && (
          <TouchableWithoutFeedback onPress={this._blur}>
            <Image
              style={styles.icon}
              source={IconArrowLeft}
            />
          </TouchableWithoutFeedback>
        )}
        <TextInput
          placeholder="Search"
          style={styles.textInput}
          underlineColorAndroid="transparent"
          ref={this.textInputRef}
          onChangeText={this._handleChangeTextInput}
          onFocus={this._createFocusHandler('Focus')}
          onBlur={this._createFocusHandler('Blur')}
          blurOnSubmit
        />
        {value.length > 0 && (
          <TouchableWithoutFeedback onPress={this._handleClearTextInput}>
            <Image
              style={styles.icon}
              source={IconCross}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
  },
  icon: {
    width: 20,
    height: 20,
    margin: 15,
    tintColor: '#bbb',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    height: 50,
    // marginLeft: 24,
  },
});

UserListHeader.propTypes = {
  onChangeText: PropTypes.func,
};

export default UserListHeader;
