import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.Home_Page.events({
  /**
   * Handle the click on the login link.
   * @param event The click event.
   * @returns {boolean} False.
   */
  'click .cas-login': function casLogin(event, instance) {
    event.preventDefault();
    const callback = function loginCallback(error) {
      if (error) {
        console.log(error);
      }
    };
    Meteor.loginWithCas(callback);
    return false;
  },
});

var hours = new Date();
time = hours.getHours();
if (time > 19 || time < 6) {

  Template.Home_Page.onRendered(function () {
    $('body').addClass('nightbg');
  });
}

Template.Home_Page.onDestroyed(function () {
  $('body').removeClass('nightbg');
});