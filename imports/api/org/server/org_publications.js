import { Meteor } from 'meteor/meteor';

import { Org } from '../org_collection.js';

import { Member } from '/imports/api/member/member_collection';
import { Acct } from '/imports/api/acct/acct_collection';

import { constructQuery } from '/imports/modules/utils';
import { apiName, searchFieldNames } from './org_methods';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

Meteor.publishComposite(apiName.admOrgDetail, function admOrgDetail(orgId) {
  try{
    check(orgId, Match._id);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Not enough Right');

    return {
      find() {
        const query = { _id: orgId };
        const options = { };

        const result = Org.find(query,options);
        
        if(result.count() !== 1){
          console.log('PUBLISH WARNING (414 - supplied PK is wrong) - '+apiName.admOrgDetail+' - userId: '+this.userId, query);
        }

        return result;
      },
      children: [{
        find(org) {
          return Member.find({'orgIds.orgId': org._id});
        },
      },{
        find(org) {
          return Acct.find({ownerId: org._id});
        },
      }],
    };

  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admOrgDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(apiName.admOrgList, function admOrgList(searchText, limit) {
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
          return Org.find(query,options);
        },
        children: [{
          find(org) {
            return Member.find({'orgIds.orgId': org._id});
          },
        },{
          find(org) {
            return Acct.find({ownerId: org._id});
          },
        }],
      };

  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admOrgList+' - userId: '+this.userId, exception);
    return this.ready();
  }
});
