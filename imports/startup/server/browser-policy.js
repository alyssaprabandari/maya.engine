import { BrowserPolicy } from 'meteor/browser-policy-common';

BrowserPolicy.content.allowOriginForAll('blob:');
BrowserPolicy.content.allowOriginForAll( 'https://*.amazonaws.com' );
