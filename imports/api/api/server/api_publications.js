import { Meteor } from 'meteor/meteor';

import { Api } from '/imports/api/api/api_collection';

import { initAPIsToDB, isUserHasAccess } from '/imports/api/general/server/general_server_functions';

const apiType = 'Api.Publication';
const APIs = {
  listApi: {
    name          : 'listApi',
    description   : 'List all APIs',
    type          : apiType,
    status        : 'Active',
  },
};

initAPIsToDB(APIs, apiType);

Meteor.publishComposite(APIs.listApi.name, function(){
  const apiName = APIs.listApi.name;
  try{
    isUserHasAccess(this.userId, this.connection, apiName, apiType);
    
    return {
      find(){
        const query = {
        };
        
        const options = {
          fields: Api.publicFields,
        };

        return Api.find(query, options);
      },
    };

  }catch(exception){
    console.log('EXCEPTION - '+apiName+' - '+ apiType+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

