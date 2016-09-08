import { Meteor } from 'meteor/meteor';

import { Member } from '../member_collection.js';

import { Tenant } from '/imports/api/tenant/tenant_collection.js';
import { Acct } from '/imports/api/acct/acct_collection.js';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { constructQuery } from '/imports/modules/utils';

import { checkTenant, checkOrg, getCurrentUserRootDomain } from '/imports/api/general/server/general_server_functions';

export const apiName = {
  memberSignup         : 'member.signup',
  memberLogin          : 'member.login',
  myDetail             : 'my.detail',
  memberDetail         : 'member.detail',
  admMemberList        : 'adm.member.list',
  admMemberListCount   : 'adm.member.list.count',
  admMemberDetail      : 'adm.member.detail',
  // admMemberFormInsert  : 'adm.member.form.insert',
  admMemberFormUpdate  : 'adm.member.form.update',
};

export const searchFieldNames = ['fullname','nickname','dob','description','tenants.tenantId','tenants.roles','tenants.status','orgs.orgId','orgs.positions','orgs.roles','refs.refId'];

export const memberSignup = new ValidatedMethod({
  name: apiName.memberSignup,
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

      //FIXME tulis 1 signal yg menandakan kapan user ini mulai jadi member di tenant ini      
      memberId = Member.insert({
        _id       : this.userId,
        fullname  : newUser.profile.fullname,
        nickname  : newUser.profile.fullname,
        tenants   : [{
          tenantId: tenant._id,
          roles   : [ tenant.standardRole ],
          status  : 'Active',
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
        ownerId     : memberId,
        ownerType   : 'Member',
      });
      
      return memberId;

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.memberSignup+' - userId: '+this.userId, exception);
      console.log('roleInserted:', roleInserted);
      console.log('memberId:', memberId);
      console.log('acctId:', acctId);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }

});

export const memberLogin = new ValidatedMethod({
  name: apiName.memberLogin,
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

      //FIXME tulis 1 signal yg menandakan kapan user ini mulai jadi member di tenant ini
      if(!currentTenant){
        member.tenants.push({
          tenantId : tenant._id, 
          roles    : [ tenant.standardRole ],
          status   : "Active"
        });

        memberUpdated = Member.update({_id:member._id},{$set:{tenants: member.tenants}});

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
      console.log('METHOD EXCEPTION - '+apiName.memberLogin+' - userId: '+this.userId, exception);
      console.log('memberUpdated:', memberUpdated);
      console.log('roleInserted:', roleInserted);
      console.log('acctId:', acctId);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }

});

export const admMemberListCount = new ValidatedMethod({
  name: apiName.admMemberListCount,
  validate: new SimpleSchema({
    searchText: { type: String, optional: true }
  }).validator(),

  run({searchText}) {
    try{
      // now sanity check
      if(searchText)
        check(searchText, Match.textOnly);

      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      const query = constructQuery(searchFieldNames, searchText);
      return Member.find(query).count();

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admMemberListCount+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

// export const admMemberFormInsert = new ValidatedMethod({
//   name: apiName.admMemberFormInsert,
//   validate: Member.schema.pick(['fullname','nickname','dob','bio','type','status']).validator(),

//   run(member) {
//     try{
//       // now sanity check
//       if(!this.userId)
//         throw new Meteor.Error(401, 'You must be logged in.');

//       if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
//         throw new Meteor.Error(444, 'Not enough Right');

//       //FIXME harusnya buat meteor user dulu di sini yang gak pake password
//       console.log('FIX ME!!!! harusnya buat meteor user dulu di sini yang gak pake password');

//       // Accounts.createUser();
//       // Accounts.sendEnrollmentEmail(userId, [email])

//       return Member.insert(member);

//     }catch(exception){
//       console.log('METHOD EXCEPTION - '+apiName.admMemberFormInsert+' - userId: '+this.userId, exception);
//       throw new Meteor.Error(400,'Internal Server Exception');
//     }
//   }
// });

export const admMemberFormUpdate = new ValidatedMethod({
  name: apiName.admMemberFormUpdate,

  validate: new SimpleSchema([
    Member.schema.pick([
      'fullname','nickname','dob','description',
      'images','images.$','images.$.imgUrl','images.$.imgType',
      'tenants','tenants.$','tenants.$.tenantId','tenants.$.roles','tenants.$.roles.$','tenants.$.status',
      'orgs','orgs.$','orgs.$.orgId','orgs.$.positions','orgs.$.positions.$','orgs.$.roles','orgs.$.roles.$',
      'refs','refs.$','refs.$.refId','refs.$.refType','refs.$.description',
    ]),{
      _id: { 
        type: SimpleSchema.RegEx.Id,
      },
    }
  ]).validator(),

  run( member ) {
    let rolesUpdated, memberUpdated;

    try{

      if( !this.userId )
        throw new Meteor.Error(401, 'You must be logged in.');
      
      if( !Roles.userIsInRole(this.userId,'Admin',getCurrentUserRootDomain(this.connection)) )
        throw new Meteor.Error(444, 'Not enough Right');

      rolesUpdated = false;
      
      let tenantRoles = [];
      if(member.tenants)
        member.tenants.forEach((tenant) => {
          const checkedTenant = checkTenant(tenant);
          tenantRoles.push({
            domain : checkedTenant.domain,
            roles  : tenant.roles,
          });
        });

      if(member.orgs)
        member.orgs.forEach((org) => {
          const checkedOrg = checkOrg(org);
          tenantRoles.push({
            domain  : checkedOrg.name+'#'+checkedOrg.getTenant().domain,
            roles   : org.roles,
          });
        });

      tenantRoles.forEach((doc) => {
        Roles.setUserRoles(member._id, doc.roles, doc.domain);
      });

      rolesUpdated = true;
      
      memberUpdated = Member.update(member._id, { $set: member });
      return memberUpdated;

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.admMemberFormUpdate+' - userId: '+this.userId, exception);
      console.log('rolesUpdated:', rolesUpdated);
      console.log('memberUpdated:', memberUpdated);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  },
});

