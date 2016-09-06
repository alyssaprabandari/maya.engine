import { Meteor } from 'meteor/meteor';

import { Article } from '/imports/api/article/article_collection.js';
import { Member } from '/imports/api/member/member_collection.js';
import { Org } from '/imports/api/org/org_collection.js';

import { constructQuery } from '/imports/modules/utils';
import { apiName, searchFieldNames } from './article_methods';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_functions';

//all publications for own account
Meteor.publish(apiName.myArticleList, function myArticleList(){
  try{
    
    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');
    
    return Article.find({ ownerId: this.userId, ownerType: 'Member' }, { fields: Article.publicFields });
  
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.myArticleList+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publish(apiName.myArticleDetail, function myArticleDetail(articleId){
  try{
    check(articleId, Match._id);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    const query = { _id: articleId, ownerId: this.userId, ownerType: 'Member' };
    const options = { fields: Article.publicFields };

    const result = Article.find(query,options);
    
    if(result.count() !== 1)
      console.log('PUBLISH WARNING (424 - supplied PK combined with other field is wrong) - '+apiName.myArticleDetail+' - userId: '+this.userId, query);

    return result;
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.myArticleDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});


// now all publications for admistrators
Meteor.publishComposite(apiName.admArticleDetail, function admArticleDetail(articleId) {
  try{
    check(articleId, Match._id);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Not enough Right');

    return {
      find() {
        
        const query = {
          _id: articleId,
        };
        const options = { };

        const result = Article.find(query,options);

        if(result.count() !== 1)
          console.log('PUBLISH WARNING (424 - supplied PK combined with other field is wrong) - '+apiName.myArticleDetail+' - userId: '+this.userId, query);
        
        return result;
      },

      children: [{
        find(article) {
          if(article.ownerType === "Member")
            return Member.find({ _id: article.ownerId });
          if(article.ownerType === "Org")
            return Org.find({ _id: article.ownerId });
        },
      }],
    };

  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admArticleDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(apiName.admArticleList, function admArticleList(searchText, limit) {
  try{
    check(searchText, Match.Maybe(Match.textOnly));
    check(limit, Number);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Not enough Right');

    return {
      find() {
        const query = constructQuery(searchFieldNames,searchText);
        const options = {
          limit: limit
        };
        return Article.find(query,options);
      },

      children: [{
        find(article) {
          if(article.ownerType === "Member")
            return Member.find({ _id: article.ownerId });
          if(article.ownerType === "Org")
            return Org.find({ _id: article.ownerId });
        },
      }],
    };
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admArticleList+' - userId: '+this.userId, exception);
    return this.ready();
  }  
});
