import { Meteor } from 'meteor/meteor';

import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

import { Tenant } from '/imports/api/tenant/tenant_collection';
import { Member } from '/imports/api/member/member_collection';
import { Info } from '/imports/api/info/info_collection';

const tenants = [{
	"domain" 	: "localhost",
	"name" 		: "Localhost",
	"email" 	: "info@localhost",
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
	  }, 
	  {
	    "name" 	: "listHeadline",
	    "roles" : [],
	    "type" 	: "Info.Publication"
	  }, 
	  {
	    "name" 	: "listFaq",
	    "roles" : [],
	    "type" 	: "Info.Publication"
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
	      "ProductCard"
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
	    "title" 	: "FAQ",
	    "path" 		: "/faq",
	    "roles" 	: [],
	    "widgets" : [ 
	      "AppNavigation", 
	      "FAQ"
	    ],
	    "menuNr" 	: 3
	  }, 
	  {
	    "title" 	: "Ops",
	    "path" 		: "/ops",
	    "roles" 	: [ 
	      "Internal.Ops"
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
	"domain" 	: "ecommerce.maya",
	"name" 		: "Maya eCommerce",
	"email" 	: "info@ecommerce.maya",
	"layout" : {
	  "framework" : "Bootstrap",
	  "appWidget" : "App",
	  "cssUrl" 		: "http://ecommerce.maya:3000/css/ecommerce.maya.css"
	},
	"description" : "eCommerce Example using Maya Engine",
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
	  }, 
	  {
	    "name" 	: "listHeadline",
	    "roles" : [],
	    "type" 	: "Info.Publication"
	  }, 
	  {
	    "name" 	: "listFaq",
	    "roles" : [],
	    "type" 	: "Info.Publication"
	  }
	],
	"index" : {
	  "title" 	: "Home Page of  eCommerce Example using Maya Engine",
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
	      "ProductCard"
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
	    "title" 	: "FAQ",
	    "path" 		: "/faq",
	    "roles" 	: [],
	    "widgets" : [ 
	      "AppNavigation", 
	      "FAQ"
	    ],
	    "menuNr" 	: 3
	  }, 
	  {
	    "title" 	: "Ops",
	    "path" 		: "/ops",
	    "roles" 	: [ 
	      "Internal.Ops"
	    ],
	    "widgets" : [ 
	      "AppNavigation", 
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
  email: 'first.member@localhost',
  password: 'password',
  profile: {
    fullname: 'First Free Member Localhost',
  },
  roles: ['Member.Free'],
  domain: 'localhost'
},{
  email: 'admin@ecommerce.maya',
  password: 'password',
  profile: {
    fullname: 'Admin Maya eCommerce',
  },
  roles: ['Member.Free','Internal.Ops','Admin'],
  domain: 'ecommerce.maya'
},{
  email: 'admin2@ecommerce.maya',
  password: 'password',
  profile: {
    fullname: '2nd Admin Melonjaya',
  },
  roles: ['Admin'],
  domain: 'ecommerce.maya'
},{
  email: 'internal.ops@ecommerce.maya',
  password: 'password',
  profile: {
    fullname: 'Melonjaya Internal Ops',
  },
  roles: ['Internal.Ops'],
  domain: 'ecommerce.maya'
},{
  email: 'first.member@ecommerce.maya',
  password: 'password',
  profile: {
    fullname: 'First Free Member Maya eCommerce',
  },
  roles: ['Member.Free'],
  domain: 'ecommerce.maya'
}];

const infos = [{
	"title" 				: "Announcement Headline", 
	"description" 	: "We are currently under Alpha-Phase", 
	"type" 					: "Headline.Announcement",
	"status" 				: "Active",
},{
	"title" 				: "Product Headline", 
	"description" 	: "Please view the detail of the Product", 
	"type" 					: "Headline.Product",
	"status" 				: "Active",
},{
	"title" 				: "First FAQ", 
	"description" 	: "This is the answer of the first FAQ", 
	"type" 					: "FAQ",
	"status" 				: "Active",
},{
	"title" 				: "Second FAQ", 
	"description" 	: "Hier ist die Antwort von dem zweiten FAQ", 
	"type" 					: "FAQ",
	"status" 				: "Active",
}];

tenants.forEach((tenant) => {
	console.log('****************** START fixtures for tenant: ', tenant.domain);

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
  
      Roles.addUsersToRoles(userId, tenantUser.roles, tenantUser.domain);
	    console.log('Roles added to user: ',tenantUser.roles);
   	
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

	if(Info.find().fetch().length < infos.length ){
		console.log('now injecting info collection...');
		infos.forEach((info) => {
			info.tenantId = tenantId;
			info.imgUrl 	= "http://"+tenant.domain+":3000/images/carousel.png";
			info.owners 	= tenantOwners;

			//FIXME harusnya cek type, bila Product, inject juga ke refs, tentunya kita buat data dulu di Product Collection 

			const infoId = Info.insert(info,{ validate: false});
			console.log('created infoId: ', infoId);
		});
	}else{
		console.log('skipping infos creation...');
	};
	

  console.log('****************** END fixtures for tenant: ', tenant.domain);
});
