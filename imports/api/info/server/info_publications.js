import { Meteor } from 'meteor/meteor';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

import { Info } from '/imports/api/info/info_collection';

const apiType = 'Info.Publication';
const APIs = {
  listHeadline: {
    name          : 'listHeadline',
    description   : 'List all Info with Headline as type',
    type          : apiType,
    status        : 'Active',
  },
  listFaq: {
    name          : 'listFaq',
    description   : 'List all Info with FAQ as type',
    type          : apiType,
    status        : 'Active',
  },
};

initAPIsToDB(APIs, apiType);

Meteor.publishComposite(APIs.listHeadline.name, function() {
  const apiName = APIs.listHeadline.name;
  try{
    const tenantId = isUserHasAccess(this.userId, this.connection, apiName, apiType);
        
    return {
      find() {
        const query = {
          type      : { $regex : 'Headline', $options:"i" },
          status    : 'Active',
          tenantId  : tenantId,
        };
        const options = {
          fields: Info.publicFields,
          sort: {
            sequenceNr  : 1,
            timestamp   : 1
          }
        };
        return Info.find(query,options);
      },
    };
  }catch(exception){
    console.log('EXCEPTION - '+APIs.listHeadline.name+' - '+apiType+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(APIs.listFaq.name, function() {
  const apiName = APIs.listFaq.name;
  try{
    const tenantId = isUserHasAccess(this.userId, this.connection, apiName, apiType);
        
    return {
      find() {
        const query = {
          type      : { $regex : 'FAQ', $options:"i" },
          status    : 'Active',
          tenantId  : tenantId,
        };
        const options = {
          fields: Info.publicFields,
          sort: {
            sequenceNr  : 1,
            timestamp   : 1
          }
        };
        return Info.find(query,options);
      },
    };
  }catch(exception){
    console.log('EXCEPTION - '+APIs.listFaq.name+' - '+apiType+' - userId: '+this.userId, exception);
    return this.ready();
  }
});
