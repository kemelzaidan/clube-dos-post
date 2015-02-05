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
      createdAt: new Date() // current time
    });

    // Clear form
    event.target.feedUrl.value = "";

    // Prevent default form submit
    return false;
  }
});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
