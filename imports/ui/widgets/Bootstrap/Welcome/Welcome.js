import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { Loading } from '/imports/ui/widgets/Bootstrap/Loading/Loading.js';
import { Jumbotron } from 'react-bootstrap';

import { Tenant } from '/imports/api/tenant/tenant_collection';

const Welcome = ({tenant}) => {
	return <div>
		<Jumbotron className="text-center">
			<h2>{ tenant.name }</h2>
			<p>{ tenant.description }</p>
		</Jumbotron>
	</div>;
};

const composer = (params, onData) => {  
	const tenant = Tenant.findOne();
	onData(null, { tenant });
};

export default composeWithTracker(composer, Loading)(Welcome);
