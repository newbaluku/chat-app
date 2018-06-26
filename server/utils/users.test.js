const expect = require('expect'),
      { Users } = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'John',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: '1',
      name: 'John',
      room: 'LOTR'
    };
    const addedUser = users.addUser(user.id, user.name, user.room);
    expect(addedUser).toEqual(user); // returned user obj shd be same as ours
    expect(users.users).toEqual([user]); // shd hv 1 element with our user
  });

  it('should return user list for Node Course', () => {
    const userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'John']);
  });

  it('should return user list for React Course', () => {
    const userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });

  it('should return empty user list', () => {
    const userList = users.getUserList('Course');
    expect(userList).toEqual([]);
  });

  it('should remove a user', () => {
    const toBeRemoved = users.users[0];
    const res = users.removeUser(toBeRemoved.id);
    expect(res).toEqual(toBeRemoved);
    expect(users.users).toEqual([{
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'John',
      room: 'Node Course'
    }]);
  });

  it('should not remove a user', () => {
    const res = users.removeUser('99');
    expect(res).toEqual(undefined);
    expect(users.users).toEqual([{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'John',
      room: 'Node Course'
    }]);
  });

  it('should find user', () => {
    const res = users.getUser('3');
    expect(res).toEqual(users.users[2]);
  });

  it('should not find a user', () => {
    const res = users.getUser('33');
    expect(res).toBe(undefined);
  });
});