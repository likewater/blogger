import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.findRecord('article', params.article_id);
  },
  actions: {
    update(article, params) {
      Object.keys(params).forEach(function(key) {
        if(params[key]!==undefined) {
          article.set(key,params[key]);
        }
      });
      article.save();
      this.transitionTo('index');
    },
    destroyArticle(article) {
      var comment_deletions = article.get('reviews').map(function(review) {
        return review.destroyRecord();
      });
      Ember.RSVP.all(review_deletions).then(function() {
        return article.destroyRecord();
      });
      this.transitionTo('index');
    },
    saveComment(params) {
      var newComment = this.store.createRecord('comment', params);
      var article = params.article;
      article.get('comments').addObject(newComment);
      newComment.save().then(function() {
        return article.save();
      });
      this.transitionTo('article', article);
    },
    destroyComment(comment) {
      comment.destroyRecord();
      this.transitionTo('index');
    }
  }
});
