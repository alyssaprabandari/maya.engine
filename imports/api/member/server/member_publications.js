import { Meteor } from 'meteor/meteor';

import { Member } from '/imports/api/member/member_collection';

import { Tenant } from '/imports/api/tenant/tenant_collection';
import { Org } from '/imports/api/org/org_collection';
import { Acct } from '/imports/api/acct/acct_collection';

import { constructQuery } from '/imports/modules/utils';
import { apiName, searchFieldNames } from './member_methods';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

//all publications for own account
Meteor.publishComposite(apiName.myDetail, function myDetail(){
  try{

    // purposely not check because if user logout in myPage, it throws exception.
    // if(!this.userId) throw new Meteor.Error(401, 'You must be logged in.');

    return {
      find() {
        const query = {
          _id: this.userId,
        };
        const options = {
          fields: Member.publicFields,
        };
        
        return Member.find(query, options);
      },

      children: [{
        find(member) {
          return Org.find({ _id: member.orgId }, { fields: Org.publicFields });
        },
      },{
      	find(member) {
          return Acct.find({ ownerId: member._id }, { fields: Acct.publicFields });
        },
      }],
    };
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.myDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});


//all publications for other public
Meteor.publishComposite(apiName.memberDetail, function memberDetail(memberId) {
  try{
    check(memberId, Match._id);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    return {
      find() {
        const query = {
          _id: memberId,
          status: 'Active',
        };
        const options = {
          fields: Member.publicFields,
        };

        const result = Member.find(query, options);

        if(result.count() !== 1){
          console.log('PUBLISH WARNING (424 - supplied PK/status is wrong) - '+apiName.memberDetail+' - userId: '+this.userId, query);
        }

        return result;
      },
      children: [{
        find(member) {
          return Org.find({ _id: member.orgId }, { fields: Org.publicFields });
        },
      }],
    };
  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.memberDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

// now all publications for admistrators
Meteor.publishComposite(apiName.admMemberDetail, function admMemberDetail(memberId) {
  try{
    check(memberId, Match._id);

    if(!this.userId)
      throw new Meteor.Error(401, 'You must be logged in.');

    if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
      throw new Meteor.Error(444, 'Not enough Right');

    return {
      find() {
        const query = {
          _id: memberId,
        };
        const options = { };

        const result = Member.find(query,options);
        
        if(result.count() !== 1){
          console.log('PUBLISH WARNING (414 - supplied PK is wrong) - '+apiName.admMemberDetail+' - userId: '+this.userId, query);
        }

        return result;
      },

      children: [{
        find(member) {
          let tenantIds = [];
          if(member.tenants)
            tenantIds = _.uniq(_.pluck(member.tenants, 'tenantId'));
          return Tenant.find({_id: {$in: tenantIds}});
        },
      },{
        find(member) {
          let orgIds = [];
          if(member.orgs)
            orgIds = _.uniq(_.pluck(member.orgs, 'orgId'));
          return Org.find({_id: {$in: orgIds}});
        },
      },{
        find(member) {
          let orgIds = [];
          if(member.orgs)
            orgIds = _.uniq(_.pluck(member.orgs, 'orgId'));
          return Acct.find({
            $or:[
              {ownerId: member._id},
              {ownerId: {$in: orgIds}},
            ]
          });
        },
      }],
    };

  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admMemberDetail+' - userId: '+this.userId, exception);
    return this.ready();
  }
});

Meteor.publishComposite(apiName.admMemberList, function admMemberList(searchText, limit) {
  try{
    check(searchText, Match.Maybe(String));
    check(limit, Number);

    if(searchText)
      check(searchText, Match.textOnly);

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
        return Member.find(query,options);
      },
    };

  }catch(exception){
    console.log('PUBLISH EXCEPTION - '+apiName.admMemberList+' - userId: '+this.userId, exception);
    return this.ready();
  }
});
