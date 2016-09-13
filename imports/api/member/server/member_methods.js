import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { rateLimit } from '/imports/modules/rate-limit.js';

import { initAPIsToDB, isUserHasAccess, getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

import { Member } from '/imports/api/member/member_collection.js';
import { Tenant } from '/imports/api/tenant/tenant_collection.js';
import { Acct } from '/imports/api/acct/acct_collection.js';

const apiType = 'Member.Method';
const APIs = {
  memberSignup: {
    name: 'memberSignup',
    description: 'Initialize new Signup and all necessary steps',
    type: apiType,
    status: 'Active',
  },
  memberLogin: {
    name: 'memberLogin',
    description: 'Update existing Member with related login stuffs',
    type: apiType,
    status: 'Draft',
  },
};

initAPIsToDB(APIs, apiType);

export const memberSignup = new ValidatedMethod({
  name: APIs.memberSignup.name,
  validate: null,
  //   validate: new SimpleSchema({
  //   domain: { type: SimpleSchema.RegEx.WeakDomain }
  // }).validator(),
  run() {
    let roleInserted, memberId, acctId;  
    try{
      // now sanity check
      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      const newUser = Meteor.users.findOne(this.userId);

      if(!newUser)
        throw new Meteor.Error(404,'User not found');

      const newMember = Member.findOne(this.userId);

      if(newMember)
        throw new Meteor.Error(402,'Member already existed');

      const tenant = Tenant.findOne({domain:getCurrentUserRootDomain(this.connection)});
      if(!tenant)
        throw new Meteor.Error(445,'Tenant not found');
      
      roleInserted = false;
      Roles.addUsersToRoles(this.userId, [ tenant.standardRole ], tenant.domain);
      roleInserted = true;

      memberId = Member.insert({
        _id       : this.userId,
        fullname  : newUser.profile.fullname,
        nickname  : newUser.profile.fullname,
        tenants   : [{
          tenantId  : tenant._id,
          roles     : [ tenant.standardRole ],
          status    : 'Active',
          createdAt : new Date()
        }],
      });

      acctId = Acct.insert({
        name        : newUser.profile.fullname,
        saldo       : 0,
        currency    : tenant.currency,
        description : 'Current Account at '+tenant.name,
        type        : 'Account.Current',
        status      : 'Active',
        tenantId    : tenant._id,
        ownerId     : memberId, // FIXME ganti jadi ownerschema
        ownerType   : 'Member',
      });
      
      return memberId;

    }catch(exception){
      console.log('EXCEPTION - '+APIs.memberSignup.name+' - '+apiType+' - userId: '+this.userId, exception);
      console.log('roleInserted:', roleInserted);
      console.log('memberId:', memberId);
      console.log('acctId:', acctId);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }

});

export const memberLogin = new ValidatedMethod({
  name: APIs.memberLogin.name,
  validate: null,
  // validate: new SimpleSchema({
  //   domain: { type: SimpleSchema.RegEx.WeakDomain }
  // }).validator(),
  run() {    
    let memberUpdated, roleInserted, acctId;
    try{
      // now sanity check
      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      const user = Meteor.users.findOne(this.userId);

      if(!user)
        throw new Meteor.Error(404,'User not found');

      const member = Member.findOne(this.userId);

      if(!member)
        throw new Meteor.Error(403,'Member not found');

      const tenant = Tenant.findOne({domain:getCurrentUserRootDomain(this.connection)});
      if(!tenant)
        throw new Meteor.Error(445,'Tenant not found');

      const currentTenant = _.findWhere(member.tenants, {'tenantId': tenant._id});

      if(!currentTenant){
        // member.tenants.push({
        //   tenantId : tenant._id, 
        //   roles    : [ tenant.standardRole ],
        //   status   : "Active"
        // });
        // memberUpdated = Member.update({_id:member._id},{$set:{tenants: member.tenants}});

        memberUpdated = Member.update({_id:member._id},{$push:{tenants: {
          tenantId  : tenant._id, 
          roles     : [ tenant.standardRole ],
          status    : "Active",
          createdAt : new Date()
        }}});

        roleInserted = false;
        Roles.addUsersToRoles(this.userId, [ tenant.standardRole ], tenant.domain);
        roleInserted = true;
        
        acctId = Acct.insert({
          name        : member.fullname,
          saldo       : 0,
          currency    : tenant.currency,
          description : 'Current Account at '+tenant.name,
          type        : 'Account.Current',
          status      : 'Active',
          tenantId    : tenant._id,
          ownerId     : member._id,
          ownerType   : 'Member',
        });

        return 'Member.New';
      };

      return 'Member.Active';

    }catch(exception){
      console.log('EXCEPTION - '+APIs.memberLogin.name+' - '+apiType+' - userId: '+this.userId, exception);
      console.log('memberUpdated:', memberUpdated);
      console.log('roleInserted:', roleInserted);
      console.log('acctId:', acctId);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }

});

rateLimit({
  methods: [
    memberSignup,
    memberLogin,
  ],
  limit: 5,
  timeRange: 1000,
});

