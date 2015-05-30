Template.productsShow.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('product', Router.current().params._id);
    Session.set('counters', Router.current().params._id);
  }.bind(this));
};

Template.productsShow.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.productsShow.helpers({
  product: function () {
    return Products.findOne({_id: Router.current().params._id});
  },

  comments: function () {
    return Comments.find({productId: Router.current().params._id}, {sort: {createdAt: -1}});
  }
});
//购买数量的自加自减


  Template.productsShow.helpers({
    countersnum: function (event, template) {
      return Products.findOne({_id: Router.current().params._id}).numberOfVotes;
    }
  });

  Template.productsShow.events({
    'click [data-action="plus"]': function () {
      // increment the counter when button is clicked
      //Session.set('counters', Session.get('counters') + 1);
      Products.update(Session.get('counters'),{$inc:{numberOfVotes:1}});

    }
  });
  Template.productsShow.events({
    'click [data-action="minus"]': function () {
      // increment the counter when button is clicked
      //Session.set('counters', Session.get('counters') - 1);
      Products.update(Session.get('counters'),{$dec:{numberOfVotes:1}});
    }
  });
Template.productsShow.events({
  'click [data-action=new-comment]': function (event, template) {

      IonModal.open('signIn');

  }
});
