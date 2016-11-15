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

// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Home_Page.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown({
    action: 'select',
  });
});