import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import Routes from '../../../routes';
import NavigationService from '../../../Services/Navigation';

function UserListItem(props) {
  const {
    name,
    picture,
    email,
  } = props.user;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => NavigationService.navigate(Routes.USER_DETAILS, { user: props.user })}
    >
      <Image style={styles.image} source={{ uri: picture.thumbnail }} />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{`${name.first} ${name.last}`}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  nameContainer: {
    marginLeft: 15,
  },
  name: {
    fontSize: 15,
  },
  email: {
    marginTop: 5,
    fontSize: 15,
    color: '#aaa',
  },
});

UserListItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.shape({
      first: PropTypes.string,
      last: PropTypes.string,
    }),
    email: PropTypes.string,
    picture: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
  }),
};

export default UserListItem;