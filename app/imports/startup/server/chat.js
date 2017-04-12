/**
 * Created by irene on 11/14/16.
 */
import { Meteor } from 'meteor/meteor';
import { Messages } from '../../api/msgs/msgs.js';
import { Dmsgs } from '../../api/duelmsgs/duelmsgs.js';

Meteor.publish('messages', function (identifier) {
  return Messages.find({ chat: identifier }, { sort: { createdAt: -1 }, limit: 50 });
});

Meteor.publish('duelmsg', function (identifier, name1, name2) {
  if (Dmsgs.find({ chat: identifier }).count() === 0) {
    let rnd = Math.floor(Math.random() * 2);
    if (rnd) rnd = name2;
    if (!rnd) rnd = name1;
    Dmsgs.insert(
      {
        messageText: `Welcome! ${rnd} will go first.`,
        createdAt: new Date(),
        username: 'MTG',
        chat: identifier,
      });
    // Dmsgs.insert(
    //   {
    //     player: name1,
    //     life: '20',
    //     createdAt: new Date(),
    //     chat: identifier,
    //   });
    // Dmsgs.insert(
    //   {
    //     player: name2,
    //     life: '20',
    //     createdAt: new Date(),
    //     chat: identifier,
    //   });
      // {
      //   player: name1,
      //   life: '20',
      //   createdAt: new Date(),
      //   chat: identifier,
      // },
      // {
      //   player: name2,
      //   life: '20',
      //   createdAt: new Date(),
      //   chat: identifier,
      // },
  }
  return Dmsgs.find({ chat: identifier }, { sort: { createdAt: -1 } });
});

Meteor.methods({
  'sendMessage'(content, identifier) {
    /* add authentication here */
    Messages.insert({
      messageText: content,
      createdAt: new Date(),
      username: Meteor.user(),
      chat: identifier,
    });
  },
  'sendDmsg'(content, identifier) {
    Dmsgs.insert({
      messageText: content,
      createdAt: new Date(),
      username: Meteor.user(),
      chat: identifier,
    });
  },
  'deleteAll'() {
    Messages.remove({});
  },
  'life'(id, num, identifier) {
    Dmsgs.insert({
      _id: id._id,
      player: id.profile.name,
      createdAt: new Date(),
      chat: identifier,
      life: num,
    });
  },
  'add'(id) {
    const z = Dmsgs.findOne({ _id: id }).life;
    Dmsgs.update({ _id: id }, { $set: { life: z + 1 } });
  },
  'min'(id) {
    const z = Dmsgs.findOne({ _id: id }).life;
    Dmsgs.update({ _id: id }, { $set: { life: z - 1 } });
  },
});
