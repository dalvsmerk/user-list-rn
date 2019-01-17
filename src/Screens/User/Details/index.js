import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import capitalize from 'lodash/capitalize';

import Routes from '../../../routes';
import NavigationService from '../../../Services/Navigation';
import KeyValueGroup from '../../../Components/Common/KeyValue/Group';
import KeyValueItem from '../../../Components/Common/KeyValue/Item';

export default class UserDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
  });

  componentDidMount() {
    this.props.navigation.setParams({
      title: this._getScreenTitle(),
    });
  }

  _getScreenTitle = () => {
    const { user } = this.props.navigation.state.params;
    return user
      ? `${user.name.first} ${user.name.last}`
      : 'Loading..';
  };

  _openEmail = email => () => {
    Linking
      .openURL(`mailto:${email}`)
      .then(() => console.log('success'))
      .catch(error => console.error(error));
  };

  render() {
    const { user } = this.props.navigation.state.params;

    const name = `${user.name.first} ${user.name.last}`;
    const birthday = new Date(user.dob.date)
      .toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

    return (
      <ScrollView style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: user.picture.large }} />
        </View>

        {/*<TouchableOpacity onPress={this._openEmail(user.email)} activeOpacity={0.6}>*/}
          <KeyValueItem title="Email" value={user.email} />
        {/*</TouchableOpacity>*/}

        <KeyValueGroup title="Personal">
          <KeyValueItem title="Name" value={name} />
          <KeyValueItem title="Birth Date" value={birthday} />
        </KeyValueGroup>

        <KeyValueGroup title="Location">
          <KeyValueItem title="City" value={capitalize(user.location.city)} />
          <KeyValueItem title="State" value={capitalize(user.location.state)} />
          <KeyValueItem title="Street" value={capitalize(user.location.street)} />
        </KeyValueGroup>

        <KeyValueItem
          title="Location"
          value={`${user.location.coordinates.latitude}, ${user.location.coordinates.longitude}`}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fefefe',
  },
  avatarContainer: {
    alignItems: 'center',
    padding: 20,
    // flex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
