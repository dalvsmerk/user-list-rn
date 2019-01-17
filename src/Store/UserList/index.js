import {
  observable,
  computed,
  action,
  toJS
} from 'mobx';
// import sortBy from 'lodash/sortBy';
import update from 'lodash/update';
import capitalize from 'lodash/capitalize';

import Api from '../../Api';

export default class UserListStore {
  @observable users = [];
  @observable page = 1;
  @observable filter = '';
  @observable error = null;
  @observable loading = false;

  @computed get filteredUsers() {
    const filter = this.filter.toLowerCase();

    const query = user => {
      const { email, name: { first, last } } = user;

      return email.toLowerCase().includes(filter)
        || first.toLowerCase().includes(filter)
        || last.toLowerCase().includes(filter);
    };

    return toJS(this.users.filter(query));
  }

  @action setFilter(filter) {
    if (typeof filter !== 'string') {
      throw new Error('Filter value must be "string"');
    }

    this.filter = filter;
  }

  @action async fetchUserList(refresh = true, page = 1) {
    const params = {
      url: '/',
      query: {
        results: 10,
        page,
      },
    };

    try {
      this.loading = true;
      const users = await Api.get(params);

      if (refresh) {
        this.users = users
          .map(user => update(user, 'name', name => ({
            ...name,
            first: capitalize(name.first),
            last: capitalize(name.last),
          })));
      } else {
        this.users = this.users
          .concat(users)
          .map(user => update(user, 'name', name => ({
            ...name,
            first: capitalize(name.first),
            last: capitalize(name.last),
          })));
      }

      this.loading = false;
    } catch (error) {
      this.error = error.message;
      this.loading = false;
    }
  }
}
