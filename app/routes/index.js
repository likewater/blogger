import Ember from 'ember';

export default Ember.Route.extend({
    model() {
      return Ember.RSVP.hash({
      articles: this.store.findAll('article'),
      // reviews: this.store.findAll('reviews')
    });
  },
  actions: {
  saveArticle3(params) {
    var newArticle = this.store.createRecord('article', params);
    newArticle.save();
    this.transitionTo('index');
  }
}
});
