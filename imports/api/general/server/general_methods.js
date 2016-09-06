import { Meteor } from 'meteor/meteor';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Tenant } from '/imports/api/tenant/tenant_collection.js';

import { getCurrentUserRootDomain } from '/imports/api/general/server/general_functions';

export const apiName = {
  sendTestEmail             : 'sendTestEmail',
  sendVerificationEmail     : 'sendVerificationEmail',
  checkResetPasswordToken   : 'checkResetPasswordToken',
};


export const sendVerificationEmail = new ValidatedMethod({
  name: apiName.sendVerificationEmail,
  validate: null,
  run() {
    this.unblock();
    try{
      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      if(Meteor.user().emails[0].verified)
        throw new Meteor.Error(405, 'user already verified');

      const tenant = Tenant.findOne({domain:getCurrentUserRootDomain(this.connection)});
      if(!tenant)
        throw new Meteor.Error(445,'Tenant not found');

      const emailTemplates = Accounts.emailTemplates;

      const siteName = tenant.name;
      const siteDomain = tenant.domain;
      const from = tenant.csEmail;

      emailTemplates.siteName = tenant.name;
      // emailTemplates.siteDomain = tenant.domain;
      emailTemplates.from = `${siteName}<${tenant.csEmail}>`;

      emailTemplates.verifyEmail = {
        subject() {
          return `Please verify your registration at ${siteName}`;
        },
        text(user, url) {
          const userEmail = user.emails[0].address;
          // const urlWithoutHash = url.replace('#/', '');
          const signupToken = url.substr( url.indexOf('verify-email/') + 13 )

          const tenantFQDN = `https://www.${siteDomain}/verify-email/${signupToken}`;

          return `We received registration with ${userEmail} at ${siteDomain} - ${siteName}. 
          \n\nPlease visit the following link:
          \n\n${tenantFQDN}\n\n
          If you did not request this reset, please ignore this email. 
          If you feel something is wrong, please contact our support team:
          ${from}.`;
        },
      };

      Accounts.sendVerificationEmail(this.userId, Meteor.user().emails[0].address);

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.sendVerificationEmail+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

export const sendTestEmail = new ValidatedMethod({
  name: apiName.sendTestEmail,
  validate: null,
  run() {
    try{
      if(!this.userId)
        throw new Meteor.Error(401, 'You must be logged in.');

      SSR.compileTemplate( 'inviteEmail', Assets.getText( 'email/templates/invitation.html' ) );

      Email.send({
        to: 'johnson.chandra@gmail.com',
        from: 'melonjaya@gmail.com',
        subject: 'You are Invited!!!',
        html: SSR.render( 'inviteEmail', {
          url: 'http://bagiilmu.org/invitation/' + 'ini_token_loh'
        })
      });

    }catch(exception){
      console.log('METHOD EXCEPTION - '+apiName.sendTestEmail+' - userId: '+this.userId, exception);
      throw new Meteor.Error(400,'Internal Server Exception');
    }
  }
});

