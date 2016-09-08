import { Meteor } from 'meteor/meteor';

import { Lead } from '/imports/api/lead/lead_collection';
import { Org } from '/imports/api/org/org_collection';

import { constructQuery } from '/imports/modules/utils';
import { apiName, searchFieldNames } from './lead_methods';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';


// now all publications for admistrators
Meteor.publishComposite(apiName.admLeadDetail, function admLeadDetail(leadId) {
  try{
    check(leadId, Match._id);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Not enough Right');

    return {
      find() {
        const query = {
          _id: leadId,
        };
        const options = { };

        const result = Lead.find(query,options);
        
        if(result.count() !== 1){
          console.log('PUBLISH WARNING (414 - supplied PK is wrong) - '+apiName.admLeadDetail+' - userId: '+this.userId, query);
        }

        return result;
      },

      children: [{
        find(lead) {
          return Org.find({ _id: lead.orgId });
        },
      }],
    };

  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admLeadDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(apiName.admLeadList, function admLeadList(searchText, limit) {
  try{
    check(searchText, Match.Maybe(Match.textOnly));
    check(limit, Number);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Not enough Right');

    return {
      find() {
        // Meteor._sleepForMs(1000);
        const query = constructQuery(searchFieldNames, searchText);
        const options = {
          limit: limit
        };
        return Lead.find(query,options);
      },

      children: [{
        find(lead) {
          let orgIds = [];
          if(lead.orgIds)
            orgIds = _.uniq(_.pluck(lead.orgIds, 'orgId'));
          return Org.find({_id: {$in: orgIds}});
        },
      }],
    };

  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admLeadList+' - userId: '+this.userId, exception);
    return this.ready();
  }
});
