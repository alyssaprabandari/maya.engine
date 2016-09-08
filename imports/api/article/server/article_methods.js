import { Meteor } from 'meteor/meteor';

import { Article } from '/imports/api/article/article_collection.js';

import { Member } from '/imports/api/member/member_collection.js';
import { Org } from '/imports/api/org/org_collection.js';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { constructQuery } from '/imports/modules/utils';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

export const apiName = {
  myArticleList         : 'my.article.list',
  myArticleDetail       : 'my.article.detail',
  admArticleList        : 'adm.article.list',
  admArticleListCount   : 'adm.article.list.count',
  admArticleDetail      : 'adm.article.detail',
  admArticleFormInsert  : 'adm.article.form.insert',
  admArticleFormUpdate  : 'adm.article.form.update',
};

export const searchFieldNames = ['title','ownerId','ownerType','type','status'];

export const admArticleListCount = new ValidatedMethod({
  name: apiName.admArticleListCount,
  validate: new SimpleSchema({
    searchText: { type: String, optional: true }
  }).validator(),

  run({searchText}) {
    try{
      check(searchText, Match.Maybe(Match.textOnly));

      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      const query = constructQuery(searchFieldNames,searchText);
      return Article.find(query).count();

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admArticleListCount+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const admArticleFormInsert = new ValidatedMethod({
  name: apiName.admArticleFormInsert,
  validate: Article.schema.pick(['title','content','ownerId','ownerType','fromDate','thruDate','type','status']).validator(),

  run(article) {
    try{
      // now sanity check
      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      let owner;
      switch(article.ownerType){
        case 'Org'  : 
          owner = Org.findOne({_id: article.ownerId});
          break;
        case 'Member'   : 
          owner = Member.findOne({_id: article.ownerId});
          break;
      };

      if(!owner)
        throw new Meteor.Error(449,'Owner not Found');

      return Article.insert(article);

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admArticleFormInsert+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const admArticleFormUpdate = new ValidatedMethod({
  name: apiName.admArticleFormUpdate,

  validate: new SimpleSchema([
    Article.schema.pick(['title','content','ownerId','ownerType','fromDate','thruDate','type','status']),
    {
      _id: { 
        type: SimpleSchema.RegEx.Id,
      },
    }
  ]).validator(),

  run( article ) {
    try{

      if( !this.userId )
        throw new Meteor.Error(401, 'You must be logged in.');
      
      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      let owner;
      switch(article.ownerType){
        case 'Org'  : 
          owner = Org.findOne({_id: article.ownerId});
          break;
        case 'Member'   : 
          owner = Member.findOne({_id: article.ownerId});
          break;
      };

      if(!owner)
        throw new Meteor.Error(449,'Owner not Found');

      Article.update(article._id, { $set: article });

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admArticleFormUpdate+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  },
});

