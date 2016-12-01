import {Meteor} from 'meteor/meteor';
import {Requests} from '../../api/requests/requests.js';

Meteor.publish('userStatus', function () {
  return Meteor.users.find({ 'status.online': true },
      { fields: { 'profile.name': 1, _id: 1 } });
});
Meteor.publish('requests', function () {
  return Requests.find();
});

Meteor.methods({
  'request'(rqUser, targetUser) {
    const requestString = `${rqUser.profile.name} wants to battle! Accept their request from the list.`;
    const newRequest = { targetUser, requestString };
    Requests.remove({});
    Requests.insert(newRequest);
  },
  'acceptError'(user) {
    Requests.insert({ targetUser: user, requestString: 'No Match Request found' });
  },
  'notify'(user1, user2) {
    Requests.insert({
      targetUser: user2, requestString: `${user1.profile.name} 
    has accepted your request. Select them from the list and click accept to begin the match.` });
  },
  'cleanup'() {
    Requests.remove({});
  },
});

