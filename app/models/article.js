import DS from 'ember-data';

export default DS.Model.extend({

  title: DS.attr(),
  body: DS.attr(),
  date: DS.attr(),
  image: DS.attr(),
  article_id: DS.attr()
});
