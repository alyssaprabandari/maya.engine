import { Meteor } from 'meteor/meteor';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Member } from '/imports/api/member/member_collection.js';
import { Org } from '/imports/api/org/org_collection.js';
import { Tenant } from '/imports/api/tenant/tenant_collection.js';

export const checkOwner = (doc) => {
  let owner;
  switch(doc.ownerType){
    case 'Org'  : 
      owner = Org.findOne({_id: doc.ownerId});
      break;
    case 'Member'   : 
      owner = Member.findOne({_id: doc.ownerId});
      break;
  };
  if(!owner)
    throw new Meteor.Error(449,'Owner not Found');
};

export const checkOrg = (doc) => {
  const org = Org.findOne({_id:doc.orgId});
  if(!org)
    throw new Meteor.Error(447,'Org not Found');

  const differences = _.difference(doc.roles, org.roles);

  if( differences.length > 0)
		throw new Meteor.Error(448,'Org Roles not Found: -'+differences+'- in orgId: '+doc.orgId);

  return org;
};

export const checkTenant = (doc) => {
  const tenant = Tenant.findOne({_id:doc.tenantId});
  if(!tenant)
    throw new Meteor.Error(445,'Tenant not Found');

  const differences = _.difference(doc.roles, tenant.roles);

  if( differences.length > 0)
    throw new Meteor.Error(446,'Tenant Roles not Found: -'+differences+'- in tenantId: '+doc.tenantId);

  return tenant;
};

export const getCurrentUserRootDomain = (connection) => {
  const rootDomainWithPort = connection.httpHeaders.host.substring(connection.httpHeaders.host.lastIndexOf(".", connection.httpHeaders.host.lastIndexOf(".") - 1) + 1);
  const indexPort = rootDomainWithPort.indexOf(':');
  
  if(!!Meteor.settings.public.tenant)
    return Meteor.settings.public.tenant;
  else
    return indexPort > 0?rootDomainWithPort.substring(0, indexPort):rootDomainWithPort;
};

export const isUserHasAccess = (userId, connection, apiName, apiType) => {
  const currentUserRootDomain = getCurrentUserRootDomain(connection);

  const tenant = Tenant.findOne({domain:currentUserRootDomain,status:'Active'});
  if(!tenant)
    throw new Meteor.Error(445,'Tenant not found');  
  
  const api = _.findWhere(tenant.APIs, {name:apiName, type:apiType});
  if(!api)
    throw new Meteor.Error(443, 'API not found');
  if(api.roles && api.roles.length > 0 && !Roles.userIsInRole(userId, api.roles, currentUserRootDomain))
    throw new Meteor.Error(444, 'Not enough Right');
  
  return tenant._id;
};

export const initAPIsToDB = (APIs, apiType) => {
  Meteor.startup(function() {
    import { Api } from '/imports/api/api/api_collection';
    Api.remove({type:apiType});
    Object.keys(APIs).forEach(function(apiName){
        Api.insert(APIs[apiName],{validate:false});
    });
  });
};

export const constructSearchQuery = (searchFieldNames, searchText) => {
  let query = {};
  
  if(searchText && searchFieldNames){
    let mongoDbArr = [];
    searchFieldNames.map(function(fieldName) {
      let jsonField = {};
      jsonField[fieldName] = { $regex : searchText, $options:"i" };
      mongoDbArr.push(jsonField);
    });
    query = { $or: mongoDbArr };
  };

  return query;
};

