import { BrowserPolicy } from 'meteor/browser-policy-common';

BrowserPolicy.content.allowOriginForAll('blob:');
BrowserPolicy.content.allowOriginForAll( 'http://*.amazonaws.com' );
BrowserPolicy.content.allowOriginForAll( 'https://*.amazonaws.com' );
