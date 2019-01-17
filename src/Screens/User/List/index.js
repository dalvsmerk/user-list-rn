import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { observer } from 'mobx-react';

import { UserListStore } from '../../../Store';
// import NavigationService from '../../Services/Navigation';
import UserListItem from '../../../Components/UserList/Item';
import UserListHeader from '../../../Components/UserList/Header/index';
import Loader from '../../../Components/Common/Loader';

@observer
class UserListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Users',
    header: null,
  });

  componentDidMount() {
    UserListStore.fetchUserList();
  }

  _changeFilter(value) {
    UserListStore.setFilter(value);
  }

  _renderItem({ item }) {
    return <UserListItem key={item.id.value} user={item} />;
  }

  _handleRefresh = () => {
    UserListStore.fetchUserList();
  }

  _handlePagination() {
    if (UserListStore.users.length > 9) {
      UserListStore.fetchUserList(false);
    }
  }

  // _renderHeader = () => {
  //   return <UserListHeader onChangeText={this._changeFilter} />;
  // }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content' } />
        {/*{UserListStore.loading && <Loader />}*/}

        <UserListHeader onChangeText={this._changeFilter} />
        <FlatList
          data={UserListStore.filteredUsers}
          renderItem={this._renderItem}
          keyExtractor={item => item.id.value + Math.random().toString()}
          refreshing={UserListStore.loading}
          // onRefresh={this._handleRefresh}
          // onEndReached={this._handlePagination}
          // onEndReachedThreshold={0.1}
          // ListHeaderComponent={this._renderHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
});

export default UserListScreen;
