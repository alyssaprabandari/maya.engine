import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import React from 'react';

import { Loading } from '/imports/ui/widgets/Bootstrap/Loading/Loading.js';
import { Grid, Accordion, Panel, Alert } from 'react-bootstrap';

import { Info } from '/imports/api/info/info_collection';

const FAQ = ({faqs}) => (
  faqs.length > 0 
  ? <Grid>
    <Accordion>
        { faqs.map( (faq) => (
          <Panel key={ faq._id } header={ faq.title } eventKey={ faq._id }>
            { faq.description }
          </Panel>
        ))}
    </Accordion>
  </Grid>
  : <Alert bsStyle="warning">No FAQ yet.</Alert>
);

const composer = (params, onData) => {
  const subscription = Meteor.subscribe('listFaq');
  if (subscription.ready()){
    const faqs = Info.find().fetch();
    onData(null, { faqs: faqs });
  }
};

export default composeWithTracker(composer, Loading)(FAQ);
