import { Meteor } from 'meteor/meteor';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { Article } from '/imports/api/article/article_collection';

const apiType = 'Article.Publication';
const APIs = {
  getArticle: {
    name          : 'getArticle',
    description   : 'Get Article  with specific Id with status Active and respective tenantId',
    type          : apiType,
    status        : 'Active',
  },
};

initAPIsToDB(APIs, apiType);

Meteor.publishComposite(APIs.getArticle.name, function(articleId) {
  const apiName = APIs.getArticle.name;
  try{
    const tenantId = isUserHasAccess(this.userId, this.connection, apiName, apiType);
        
    return {
      find() {
        const query = {
          _id       : articleId,
          status    : 'Active',
          tenantId  : tenantId,
        };
        const options = {
          fields: Article.publicFields,
          sort: {
            sequenceNr  : 1,
            timestamp   : 1
          }
        };
        return Article.find(query,options);
      },
    };
  }catch(exception){
    console.log('EXCEPTION - '+APIs.getArticle.name+' - '+apiType+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

