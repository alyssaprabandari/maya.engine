import { Meteor } from 'meteor/meteor';

import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

import { Tenant } from '/imports/api/tenant/tenant_collection';
import { Member } from '/imports/api/member/member_collection';

const tenants = [{
	"domain" 	: "localhost",
	"name" 		: "Localhost",
	"csEmail" : "info@localhost",
	"layout" : {
	  "framework" : "Bootstrap",
	  "appWidget" : "App",
	  "cssUrl" 		: ""
	},
	"description" : "Localhost Server",
	"roles" : [ 
	  "Member.Free", 
	  "Internal.Ops", 
	  "Admin"
	],
	"standardRole" : "Member.Free",
	"APIs" : [ 
	  {
	    "name" 	: "listDocument",
	    "roles" : [ 
	      "Internal.Ops", 
	      "Admin"
	    ],
	    "type" 	: "Document.Publication"
	  }, 
	  {
	    "name" 	: "detailDocument",
	    "roles" : [ 
	      "Internal.Ops", 
	      "Admin"
	    ],
	    "type" 	: "Document.Publication"
	  },
	  {
	    "name" 	: "insertDocument",
	    "roles" : [ 
	      "Admin"
	    ],
	    "type" 	: "Document.Method"
	  }, 
	  {
	    "name" 	: "updateDocument",
	    "roles" : [ 
	      "Admin", 
	      "Internal.Ops"
	    ],
	    "type" 	: "Document.Method"
	  }, 
	  {
	    "name" 	: "removeDocument",
	    "roles" : [ 
	      "Admin"
	    ],
	    "type" 	: "Document.Method"
	  }
	],
	"index" : {
	  "title" 	: "Home Page of Localhost",
	  "path" 		: "/",
	  "roles" 	: [],
	  "widgets" : [ 
	    "AppNavigation", 
	    "HeadlineCarousel", 
	    "Welcome"
	  ]
	},
	"pages" : [ 
	  {
	    "title" 	: "Login",
	    "path" 		: "/login",
	    "roles" 	: [],
	    "widgets" : [ 
	      "AppNavigation", 
	      "Login"
	    ]
	  }, 
	  {
	    "title" 	: "Recover Password",
	    "path" 		: "/recover-password",
	    "roles" 	: [],
	    "widgets" : [ 
	      "AppNavigation", 
	      "RecoverPassword"
	    ]
	  }, 
	  {
	    "title" 	: "Reset Password",
	    "path" 		: "/reset-password/:token",
	    "roles" 	: [],
	    "widgets" : [ 
	      "AppNavigation", 
	      "ResetPassword"
	    ]
	  }, 
	  {
	    "title" 	: "Signup",
	    "path" 		: "/signup",
	    "roles" 	: [],
	    "widgets" : [ 
	      "AppNavigation", 
	      "Signup"
	    ]
	  }, 
	  {
	    "title" 	: "Selamat Datang",
	    "path" 		: "/welcome",
	    "widgets" : [ 
	      "AppNavigation", 
	      "Welcome", 
	      "Welcome"
	    ],
	    "menuNr" 	: 1
	  }, 
	  {
	    "title" 	: "Halaman Kedua",
	    "path" 		: "/kedua",
	    "roles" 	: [ 
	      "Member.Free", 
	      "Internal.Ops", 
	      "Admin"
	    ],
	    "widgets" : [ 
	      "AppNavigation", 
	      "Welcome", 
	      "DocumentTable"
	    ],
	    "menuNr" 	: 2
	  }, 
	  {
	    "title" 	: "Document Detail",
	    "path" 		: "/document/:docId/detail",
	    "roles" 	: [ 
	      "Member.Free", 
	      "Internal.Ops", 
	      "Admin"
	    ],
	    "widgets" : [ 
	      "AppNavigation", 
	      "DocumentDetail"
	    ]
	  }, 
	  {
	    "title" 	: "Frequently Asked Questions",
	    "path" 		: "/faq",
	    "roles" 	: [],
	    "widgets" : [ 
	      "AppNavigation", 
	      "Documents", 
	      "Welcome"
	    ],
	    "menuNr" 	: 3
	  }, 
	  {
	    "title" 	: "Ops Tools",
	    "path" 		: "/ops",
	    "roles" 	: [ 
	      "Internal.Ops", 
	      "Admin"
	    ],
	    "widgets" : [ 
	      "AppNavigation", 
	      "Documents", 
	      "Documents"
	    ],
	    "menuNr" 	: 4
	  }
	],
	"isPublicMenuInAuthNav" : true,
	"currency" 							: "IDR",
	"type" 									: "maya.engine",
	"status" 								: "Active",
},{
	"domain" 	: "melonjaya.com",
	"name" 		: "Melon Jaya",
	"csEmail" : "info@melonjaya.com",
	"layout" : {
	  "framework" : "Bootstrap",
	  "appWidget" : "App",
	  "cssUrl" 		: ""
	},
	"description" : "The Sweetest Melon in the World",
	"roles" : [ 
	  "Member.Free", 
	  "Internal.Ops", 
	  "Admin"
	],
	"standardRole" : "Member.Free",
	"APIs" : [ 
	  {
	    "name" 	: "listDocument",
	    "roles" : [ 
	      "Internal.Ops", 
	      "Admin"
	    ],
	    "type" 	: "Document.Publication"
	  }, 
	  {
	    "name" 	: "detailDocument",
	    "roles" : [ 
	      "Internal.Ops", 
	      "Admin"
	    ],
	    "type" 	: "Document.Publication"
	  },
	  {
	    "name" 	: "insertDocument",
	    "roles" : [ 
	      "Admin"
	    ],
	    "type" 	: "Document.Method"
	  }, 
	  {
	    "name" 	: "updateDocument",
	    "roles" : [ 
	      "Admin", 
	      "Internal.Ops"
	    ],
	    "type" 	: "Document.Method"
	  }, 
	  {
	    "name" 	: "removeDocument",
	    "roles" : [ 
	      "Admin"
	    ],
	    "type" 	: "Document.Method"
	  }
	],
	"index" : {
	  "title" 	: "Home Page of Melon Jaya",
	  "path" 		: "/",
	  "roles" 	: [],
	  "widgets" : [ 
	    "AppNavigation", 
	    "HeadlineCarousel", 
	    "Welcome"
	  ]
	},
	"pages" : [ 
	  {
	    "title" 	: "Login",
	    "path" 		: "/login",
	    "roles" 	: [],
	    "widgets" : [ 
	      "AppNavigation", 
	      "Login"
	    ]
	  }, 
	  {
	    "title" 	: "Recover Password",
	    "path" 		: "/recover-password",
	    "roles" 	: [],
	    "widgets" : [ 
	      "AppNavigation", 
	      "RecoverPassword"
	    ]
	  }, 
	  {
	    "title" 	: "Reset Password",
	    "path" 		: "/reset-password/:token",
	    "roles" 	: [],
	    "widgets" : [ 
	      "AppNavigation", 
	      "ResetPassword"
	    ]
	  }, 
	  {
	    "title" 	: "Signup",
	    "path" 		: "/signup",
	    "roles" 	: [],
	    "widgets" : [ 
	      "AppNavigation", 
	      "Signup"
	    ]
	  }, 
	  {
	    "title" 	: "Selamat Datang",
	    "path" 		: "/welcome",
	    "widgets" : [ 
	      "AppNavigation", 
	      "Welcome", 
	      "Welcome"
	    ],
	    "menuNr" 	: 1
	  }, 
	  {
	    "title" 	: "Halaman Kedua",
	    "path" 		: "/kedua",
	    "roles" 	: [ 
	      "Member.Free", 
	      "Internal.Ops", 
	      "Admin"
	    ],
	    "widgets" : [ 
	      "AppNavigation", 
	      "Welcome", 
	      "DocumentTable"
	    ],
	    "menuNr" 	: 2
	  }, 
	  {
	    "title" 	: "Document Detail",
	    "path" 		: "/document/:docId/detail",
	    "roles" 	: [ 
	      "Member.Free", 
	      "Internal.Ops", 
	      "Admin"
	    ],
	    "widgets" : [ 
	      "AppNavigation", 
	      "DocumentDetail"
	    ]
	  }, 
	  {
	    "title" 	: "Frequently Asked Questions",
	    "path" 		: "/faq",
	    "roles" 	: [],
	    "widgets" : [ 
	      "AppNavigation", 
	      "Documents", 
	      "Welcome"
	    ],
	    "menuNr" 	: 3
	  }, 
	  {
	    "title" 	: "Ops Tools",
	    "path" 		: "/ops",
	    "roles" 	: [ 
	      "Internal.Ops", 
	      "Admin"
	    ],
	    "widgets" : [ 
	      "AppNavigation", 
	      "Documents", 
	      "Documents"
	    ],
	    "menuNr" 	: 4
	  }
	],
	"isPublicMenuInAuthNav" : true,
	"currency" 							: "IDR",
	"type" 									: "eCommerce",
	"status" 								: "Active",
}];

const users = [{
  email: 'admin@localhost',
  password: 'password',
  profile: {
    fullname: 'Admin Localhost',
  },
  roles: ['Member.Free','Internal.Ops','Admin'],
  domain: 'localhost'
},{
  email: 'admin2@localhost',
  password: 'password',
  profile: {
    fullname: '2nd Admin Localhost',
  },
  roles: ['Admin'],
  domain: 'localhost'
},{
  email: 'internal.ops@localhost',
  password: 'password',
  profile: {
    fullname: 'Localhost Internal Ops',
  },
  roles: ['Internal.Ops'],
  domain: 'localhost'
},{
  email: 'first.user@localhost',
  password: 'password',
  profile: {
    fullname: 'Free Member Localhost',
  },
  roles: ['Member.Free'],
  domain: 'localhost'
},{
  email: 'admin@melonjaya.com',
  password: 'password',
  profile: {
    fullname: 'Admin Melonjaya',
  },
  roles: ['Member.Free','Internal.Ops','Admin'],
  domain: 'melonjaya.com'
},{
  email: 'admin2@melonjaya.com',
  password: 'password',
  profile: {
    fullname: '2nd Admin Melonjaya',
  },
  roles: ['Admin'],
  domain: 'melonjaya.com'
},{
  email: 'internal.ops@melonjaya.com',
  password: 'password',
  profile: {
    fullname: 'Melonjaya Internal Ops',
  },
  roles: ['Internal.Ops'],
  domain: 'melonjaya.com'
},{
  email: 'first.user@melonjaya.com',
  password: 'password',
  profile: {
    fullname: 'Free Member Melonjaya',
  },
  roles: ['Member.Free'],
  domain: 'melonjaya.com'
}];

tenants.forEach((tenant) => {
	console.log('****************** START fixtures checking tenant: ', tenant.domain);

	let tenantId;
	const tenantFound = Tenant.findOne({domain:tenant.domain});
	if(!tenantFound){
		console.log('Not found in DB, now processing fixtures...');

		tenantId = Tenant.insert(tenant, { validate: false });
		console.log('tenantId created: ',tenantId);
	}else{
  	console.log('Found in DB, skipping...');
  	tenantId = tenantFound._id;
  };
  

	const tenantUsers = _.where(users,{domain:tenant.domain});
	console.log('tenantUsers found in fixtures: ', tenantUsers);

	let tenantOwners = [];

	tenantUsers.forEach((tenantUser) => {
		console.log('now checking user with email: ', tenantUser.email);
  	const userExists = Meteor.users.findOne({ 'emails.address': tenantUser.email });
  	
  	let userId;
	  if (!userExists){
	  	console.log('user not found in DB, now processing fixtures...');
	    userId = Accounts.createUser({ email:tenantUser.email, password:tenantUser.password, profile:tenantUser.profile });
	    console.log('userId created: ', userId);
		}else{
			console.log('user found in DB, skipping...');
			userId = userExists._id;
		};

    Roles.addUsersToRoles(userId, tenantUser.roles, tenantUser.domain);
    console.log('Roles added to user: ',tenantUser.roles);

    if(!Member.findOne(userId)){
	    const memberId= Member.insert({
	    	"_id" 			: userId, 
	    	"fullname" 	: tenantUser.profile.fullname, 
	    	"nickname" 	: tenantUser.profile.fullname, 
	    	"tenants" 	: [{ 
	    		"tenantId" 	: tenantId, 
	    		"roles" 		: tenantUser.roles, 
	    		"status" 		: "Active" 
	    	}],
	    },{ validate: false });
	    console.log('memberId created: ', memberId);	    	
    }else{
    	console.log('Found member in DB, skipping...');
    }

		if(Roles.userIsInRole(userId, 'Admin', tenantUser.domain))
			tenantOwners.push({
				"ownerId" 	: userId,
				"ownerType" : "Member"
			});
	});

	Tenant._collection.update({ _id: tenantId }, { $set:{ owners:tenantOwners } });
	console.log('update Tenant with owners: ', tenantOwners);

  console.log('****************** END fixtures checking tenant: ', tenant.domain);
});



