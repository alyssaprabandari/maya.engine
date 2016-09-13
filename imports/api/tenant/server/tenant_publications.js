import { Meteor } from 'meteor/meteor';

import { initAPIsToDB, isUserHasAccess, getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

import { Tenant } from '/imports/api/tenant/tenant_collection';

const apiType = 'Tenant.Publication';
const APIs = {
  getTenantInfo: {
    name          : 'getTenantInfo',
    description   : 'Get Info about Current Tenant for Client Init',
    type          : apiType,
    status        : 'Active',
  },

};

initAPIsToDB(APIs, apiType);

Meteor.publish(APIs.getTenantInfo.name, function(){
  const apiName = APIs.getTenantInfo.name;
  try{
    const query = {
      domain: getCurrentUserRootDomain(this.connection),
      status: 'Active',
    };
    const options = {
      fields: Tenant.publicFields
    };

    return Tenant.find(query,options);
  
  }catch(exception){
    console.log('EXCEPTION - '+apiName+' - '+ apiType+' - userId: '+this.userId, exception);
    throw new Meteor.Error(400,'Internal Server Exception');
  }
});

