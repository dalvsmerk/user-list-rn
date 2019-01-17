import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Button,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';

const IconSearch = require('../../../Icons/icon-search.ios.png');
const defaultCancelButtonMargin = -70;

class UserListHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      cancelButtonMargin: new Animated.Value(defaultCancelButtonMargin),
    };

    this.textInputRef = React.createRef();
  }

  _cancelButtonAnimation = toValue => {
    Animated.timing(
      this.state.cancelButtonMargin,
      {
        toValue,
        duration: 100,
      }
    ).start();
  };

  _handleFocus = event => {
    // show
    this._cancelButtonAnimation(0);

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  _handleBlur = event => {
    this._cancelButtonAnimation(defaultCancelButtonMargin);

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  _hideButton = () => {
    this.textInputRef.current.blur();
    this._cancelButtonAnimation(defaultCancelButtonMargin);
  }

  render() {
    const handlers = {
      onChangeText,
    } = this.props;

    return (
      <View style={styles.container}>
        <Image
          style={styles.iconSearch}
          source={IconSearch}
        />
        <TextInput
          style={styles.textInput}
          ref={this.textInputRef}
          placeholder="Search"
          clearButtonMode="always"
          onFocus={this._handleFocus}
          onBlur={this._handleBlur}
          {...handlers}
        />
        <Animated.View style={{ marginRight: this.state.cancelButtonMargin }}>
          <Button title="Cancel" onPress={this._hideButton} />
        </Animated.View>
      </View>
    );
  }
}

const paddingTop = 25;
const paddingLeft = 5;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: paddingLeft,
    paddingTop: paddingTop,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconSearch: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: paddingTop + 10,
    left: paddingLeft + 10,
    zIndex: 2,
    tintColor: '#bbb',
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    backgroundColor: '#eee',
    borderRadius: 20,
    height: 40,
    paddingLeft: 40,
    zIndex: 1,
  },
});

UserListHeader.propTypes = {
  onChange: PropTypes.func,
};

export default UserListHeader;
