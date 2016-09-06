import { Meteor } from 'meteor/meteor';

import { composeWithTracker } from 'react-komposer';
import { Member } from '/imports/api/member/member_collection.js';
import { FormGenerator } from '/imports/ui/components/FormGenerator';
import { Loading } from '/imports/ui/components/loading.js';

import { browserHistory } from 'react-router';

const formAttributes = {
  method: 'adm.member.form',
  cancel: {
    path: '/page/AdmMemberList',
  },
  next: {
    path: '/page/AdmMemberDetail/detail/',
    param: '_id',
  },
  fields: [{
      name          : 'fullname',
      label         : 'Full Name',
      componentClass: 'input',
      type          : 'text',
      placeholder   : 'e.g. John Doe',
      rules: {
        required: true,
      },
      messages: {
        required: 'Need fullname here...',
      },
    },{
      name          : 'nickname',
      label         : 'Nick Name',
      componentClass: 'input',
      type          : 'text',
      rules: {
        required: true,
      },
      messages: {
        required: 'Need nickname here...',
      },
    },{
      name          : 'dob',
      label         : 'Date of Birth',
      componentClass: 'input',
      type          : 'date',
    },{
      name          : 'description',
      label         : 'Description',
      componentClass: 'input',
      type          : 'textarea',
    },{
      name          : 'images',
      label         : 'Images',
      componentClass: 'input',
      type          : 'array',
    },{
      name          : 'tenants',
      label         : 'Tenants',
      componentClass: 'input',
      type          : 'array',
      rules: {
        required: true,
      },
      messages: {
        required: 'Need tenants here...',
      },
    },{
      name          : 'orgs',
      label         : 'Organizations',
      componentClass: 'input',
      type          : 'array',
    },{
      name          : 'refs',
      label         : 'Refs',
      componentClass: 'input',
      type          : 'array',
    }
  ],
};

const composer = (params, onData) => {	
	if(params.docId){
		const subscription = Meteor.subscribe('adm.member.detail', params.docId);
		if (subscription.ready()) {
			const doc = Member.findOne();
			if(doc)
				onData(null,  { doc, formAttributes });
			else
				browserHistory.push('/error');
		}
	}else{
		// onData(null, { formAttributes });
    browserHistory.push('/error'); //because make new member manually is not allowed
	}
};

export default composeWithTracker(composer, Loading)(FormGenerator);
