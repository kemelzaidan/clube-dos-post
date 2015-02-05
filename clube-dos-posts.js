Feeds = new Mongo.Collection("feeds");

if (Meteor.isClient) {
  // isso roda apenas no servidor
  
  // retorna os feeds já cadastrados
  Template.body.helpers({
    
    links: function(){
      return Feeds.find({});
    }
  });
  
  Template.body.events({
  "submit .novoRss": function (event) {
    // Essa função é chamada quando uma nova url de rss é enviada

    var url = event.target.feedUrl.value;

    Feeds.insert({
      URL: url,
      createdAt: new Date(), // data atual
      owner: Meteor.userId(),// _id do usuário logado
  	  username: Meteor.user().username
    });

    // Clear form
    event.target.feedUrl.value = "";

    // Prevent default form submit
    return false;
  }
});
  
  Template.link.events({
    "click .delete": function(){
      Feeds.remove(this._id);
    }
  })
  
  Accounts.ui.config({
  passwordSignupFields: "Apenas USERNAME"
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
