import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { Loading } from '/imports/ui/components/loading.js';

import { Koleksi } from '/imports/api/koleksi/koleksi';

import { Welcome } from '/imports/ui/widgets/Welcome';

const composer = (params, onData) => { 
  console.log('params di PageContainer', params);
  // subscribe bisa ambil dari tenant
  const subscription = Meteor.subscribe('koleksi');
  
  if (subscription.ready()) {
  	// di sini bisa mapping antara parameters, ambil dari tenant
  	// console.log('Coba',Coba);

    const koleksi = Koleksi.find().fetch();

    onData(null, { koleksi });
  }
};

export default composeWithTracker(composer, Loading)(Welcome);

