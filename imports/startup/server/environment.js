if ( Meteor.settings.private && Meteor.settings.private.AWS_SES_ACCESS && Meteor.settings.private.AWS_SES_SECRET ) {
  process.env.MAIL_URL = 'smtp://' +
  encodeURIComponent(Meteor.settings.private.AWS_SES_ACCESS) + ':' +
  encodeURIComponent(Meteor.settings.private.AWS_SES_SECRET) + '@' +
  encodeURIComponent('email-smtp.us-east-1.amazonaws.com') + ':' + 465;
};

Match._id = Match.Where(id => {
  check(id, String);
  return /^[a-zA-Z0-9]{17,17}/.test(id); 
});

Match.textOnly = Match.Where(text => {
  check(text, String);
  return /^[a-zA-Z0-9]/.test(text); 
});

