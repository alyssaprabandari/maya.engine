if(process.env.NODE_ENV === 'development'){
	import { Meteor } from 'meteor/meteor';

	import { Roles } from 'meteor/alanning:roles';
	import { Accounts } from 'meteor/accounts-base';

	import { Tenant } from '/imports/api/tenant/tenant_collection';
	import { Member } from '/imports/api/member/member_collection';
	import { Info } from '/imports/api/info/info_collection';
	import { Product } from '/imports/api/product/product_collection';

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
		"APIs" : [{
		    "name" 	: "memberSignup",
		    "roles" : [],
		    "type" 	: "Member.Method"
		  },{
		    "name" 	: "memberLogin",
		    "roles" : [],
		    "type" 	: "Member.Method"
		  },{
		    "name" 	: "listDocument",
		    "roles" : [ 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "type" 	: "Document.Publication"
		  },{
		    "name" 	: "detailDocument",
		    "roles" : [ 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "type" 	: "Document.Publication"
		  },{
		    "name" 	: "insertDocument",
		    "roles" : [ 
		      "Admin"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "updateDocument",
		    "roles" : [ 
		      "Admin", 
		      "Internal.Ops"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "removeDocument",
		    "roles" : [ 
		      "Admin"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "listHeadline",
		    "roles" : [],
		    "type" 	: "Info.Publication"
		  },{
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
		    "Welcome",
	    	"Footer"
		  ]
		},
		"pages" : [ 
		  {
		    "title" 	: "Login",
		    "path" 		: "/login",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Login",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Recover Password",
		    "path" 		: "/recover-password",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "RecoverPassword",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Reset Password",
		    "path" 		: "/reset-password/:token",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "ResetPassword",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Signup",
		    "path" 		: "/signup",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Signup",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Selamat Datang",
		    "path" 		: "/welcome",
		    "widgets" : [ 
		      "AppNavigation", 
		      "ProductCard",
		      "Footer"
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
		      "DocumentTable",
		    	"Footer"
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
		      "DocumentDetail",
		    	"Footer"
		    ]
		  }, 
		  {
		    "title" 	: "FAQ",
		    "path" 		: "/faq",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "FAQ",
		    	"Footer"
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
		      "Documents",
		    	"Footer"
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
		"APIs" : [{
		    "name" 	: "memberSignup",
		    "roles" : [],
		    "type" 	: "Member.Method"
		  },{
		    "name" 	: "memberLogin",
		    "roles" : [],
		    "type" 	: "Member.Method"
		  },{
		    "name" 	: "listDocument",
		    "roles" : [ 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "type" 	: "Document.Publication"
		  },{
		    "name" 	: "detailDocument",
		    "roles" : [ 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "type" 	: "Document.Publication"
		  },{
		    "name" 	: "insertDocument",
		    "roles" : [ 
		      "Admin"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "updateDocument",
		    "roles" : [ 
		      "Admin", 
		      "Internal.Ops"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "removeDocument",
		    "roles" : [ 
		      "Admin"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "listHeadline",
		    "roles" : [],
		    "type" 	: "Info.Publication"
		  },{
		    "name" 	: "listFaq",
		    "roles" : [],
		    "type" 	: "Info.Publication"
		  },{
		    "name" 	: "insertProduct",
		    "roles" : ["Admin", "Internal.Ops"],
		    "type" 	: "Product.Method"
		  },{
		    "name" 	: "listActiveProduct",
		    "roles" : [],
		    "type" 	: "Product.Publication"
		  },{
		    "name" 	: "listAllProduct",
		    "roles" : ["Admin", "Internal.Ops"],
		    "type" 	: "Product.Publication"
		  },{
		    "name" 	: "detailProduct",
		    "roles" : [],
		    "type" 	: "Product.Publication"
		  }
		],
		"index" : {
		  "title" 	: "Home Page of eCommerce Example using Maya Engine",
		  "path" 		: "/",
		  "roles" 	: [],
		  "widgets" : [ 
		    "AppNavigation", 
		    "HeadlineCarousel", 
		    "Welcome",
	      	"Footer"
		  ]
		},
		"pages" : [ 
		  {
		    "title" 	: "Login",
		    "path" 		: "/login",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Login",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Recover Password",
		    "path" 		: "/recover-password",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "RecoverPassword",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Reset Password",
		    "path" 		: "/reset-password/:token",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "ResetPassword",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Signup",
		    "path" 		: "/signup",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Signup",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Products",
		    "path" 		: "/products",
		    "widgets" : [ 
		      "AppNavigation", 
		      "SearchForm",
		      "ProductCard",
		      "Footer"
		    ],
		    "menuNr" 	: 1
		  }, 
		  {
		    "title" 	: "Product Detail",
		    "path" 		: "/product/:productId/detail",
		    "widgets" : [ 
		      "AppNavigation", 
		      "ProductDetail",
		      "Footer"
		    ],
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
		      "DocumentTable",
		      "Footer"
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
		      "DocumentDetail",
		      "Footer"
		    ]
		  }, 
		  {
		    "title" 	: "FAQ",
		    "path" 		: "/faq",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "FAQ",
		      "Footer"
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
		      "Footer"
		    ],
		    "menuNr" 	: 4
		  }
		],
		"isPublicMenuInAuthNav" : true,
		"currency" 							: "IDR",
		"type" 									: "eCommerce",
		"status" 								: "Active",
	},{
		"domain" 	: "crowdfunding.maya",
		"name" 		: "Maya Crowdfunding",
		"email" 	: "info@crowdfunding.maya",
		"layout" : {
		  "framework" : "Bootstrap",
		  "appWidget" : "App",
		  "cssUrl" 		: "http://crowdfunding.maya:3000/css/crowdfunding.maya.css"
		},
		"description" : "Crowdfunding Example using Maya Engine",
		"roles" : [ 
		  "Member.Free",
		  "Member.Scholar", 
		  "Internal.Ops", 
		  "Admin"
		],
		"standardRole" : "Member.Free",
		"APIs" : [{
		    "name" 	: "memberSignup",
		    "roles" : [],
		    "type" 	: "Member.Method"
		  },{
		    "name" 	: "memberLogin",
		    "roles" : [],
		    "type" 	: "Member.Method"
		  },{
		    "name" 	: "listDocument",
		    "roles" : [ 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "type" 	: "Document.Publication"
		  },{
		    "name" 	: "detailDocument",
		    "roles" : [ 
		      "Internal.Ops", 
		      "Admin"
		    ],
		    "type" 	: "Document.Publication"
		  },{
		    "name" 	: "insertDocument",
		    "roles" : [ 
		      "Admin"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "updateDocument",
		    "roles" : [ 
		      "Admin", 
		      "Internal.Ops"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "removeDocument",
		    "roles" : [ 
		      "Admin"
		    ],
		    "type" 	: "Document.Method"
		  },{
		    "name" 	: "listHeadline",
		    "roles" : [],
		    "type" 	: "Info.Publication"
		  },{
		    "name" 	: "listFaq",
		    "roles" : [],
		    "type" 	: "Info.Publication"
		  },{
		    "name" 	: "insertProduct",
		    "roles" : ["Admin", "Internal.Ops"],
		    "type" 	: "Product.Method"
		  }
		],
		"index" : {
		  "title" 	: "Home Page of Crowdfunding Example using Maya Engine",
		  "path" 		: "/",
		  "roles" 	: [],
		  "widgets" : [ 
		    "AppNavigation", 
		    "HeadlineCarousel", 
		    "Welcome",
		    "Footer"
		  ]
		},
		"pages" : [ 
		  {
		    "title" 	: "Login",
		    "path" 		: "/login",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Login",
		    	"Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Recover Password",
		    "path" 		: "/recover-password",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "RecoverPassword",
		    	"Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Reset Password",
		    "path" 		: "/reset-password/:token",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "ResetPassword",
		    	"Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Signup",
		    "path" 		: "/signup",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "Signup",
		    	"Footer"
		    ]
		  }, 
		  {
		    "title" 	: "Selamat Datang",
		    "path" 		: "/welcome",
		    "widgets" : [ 
		      "AppNavigation", 
		      "ProductCard",
		    	"Footer"
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
		      "DocumentTable",
		    	"Footer"
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
		      "DocumentDetail",
		    	"Footer"
		    ]
		  }, 
		  {
		    "title" 	: "FAQ",
		    "path" 		: "/faq",
		    "roles" 	: [],
		    "widgets" : [ 
		      "AppNavigation", 
		      "FAQ",
		    	"Footer"
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
		    	"Footer"
		    ],
		    "menuNr" 	: 4
		  }
		],
		"isPublicMenuInAuthNav" : true,
		"currency" 							: "IDR",
		"type" 									: "Crowdfunding",
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
	  email: 'admin@crowdfunding.maya',
	  password: 'password',
	  profile: {
	    fullname: 'Admin Maya Crowdfunding',
	  },
	  roles: ['Member.Free','Internal.Ops','Admin'],
	  domain: 'crowdfunding.maya'
	},{
	  email: 'admin2@crowdfunding.maya',
	  password: 'password',
	  profile: {
	    fullname: '2nd Admin Crowdfunding',
	  },
	  roles: ['Admin'],
	  domain: 'crowdfunding.maya'
	},{
	  email: 'internal.ops@crowdfunding.maya',
	  password: 'password',
	  profile: {
	    fullname: 'Crowdfunding Internal Ops',
	  },
	  roles: ['Internal.Ops'],
	  domain: 'crowdfunding.maya'
	},{
	  email: 'first.member@crowdfunding.maya',
	  password: 'password',
	  profile: {
	    fullname: 'First Free Member Maya Crowdfunding',
	  },
	  roles: ['Member.Free'],
	  domain: 'crowdfunding.maya'
	},{
	  email: 'first.scholar@crowdfunding.maya',
	  password: 'password',
	  profile: {
	    fullname: 'First Scholar Maya Crowdfunding',
	  },
	  roles: ['Member.Scholar'],
	  domain: 'crowdfunding.maya'
	},{
	  email: 'second.scholar@crowdfunding.maya',
	  password: 'password',
	  profile: {
	    fullname: 'Second Scholar Maya Crowdfunding',
	  },
	  roles: ['Member.Scholar'],
	  domain: 'crowdfunding.maya'
	},{
	  email: 'third.scholar@crowdfunding.maya',
	  password: 'password',
	  profile: {
	    fullname: 'Third Scholar Maya Crowdfunding',
	  },
	  roles: ['Member.Scholar'],
	  domain: 'crowdfunding.maya'
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
	    fullname: '2nd Admin Maya eCommerce',
	  },
	  roles: ['Admin'],
	  domain: 'ecommerce.maya'
	},{
	  email: 'internal.ops@ecommerce.maya',
	  password: 'password',
	  profile: {
	    fullname: 'eCommerce Internal Ops',
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

	const products = [{
		name 				: "Mie Ijo",
		unitPrice 	: 123456,
		currency 		: "IDR",
		uom 				: "Porsi",
		description : "Penjelasan tentang Mie Ijo",
		type 				: "Physical",
		status 			: "Active",
		brand 			: "Deliciozo",
		images			: [{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/mie_ijo.jpg",
			imgType : "Thumbnail"
		},{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/mie_ijo.jpg",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		}],
		tags 				: [ "Bakmi", "Mi", "Mie", "Caisim" ], 
		domain 			: "ecommerce.maya",
	},{
		name 				: "Sambel Roa",
		unitPrice 	: 987654321,
		currency 		: "IDR",
		uom 				: "Botol",
		description : "Penjelasan dari Sambel Roa",
		type 				: "Physical",
		status 			: "Active",
		brand 			: "Warung Ngana",
		images			: [{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/warungngana/roa.jpg",
			imgType : "Thumbnail"
		},{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/warungngana/roa.jpg",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		}],
		tags 				: [ "Sambel", "Sambal", "Roa", "Menado", "Manado" ], 
		domain 			: "ecommerce.maya",
	},{
		name 				: "Ayam Woku",
		unitPrice 	: 987654321,
		currency 		: "IDR",
		uom 				: "Porsi",
		description : "Penjelasan dari Ayam Woku",
		type 				: "Physical",
		status 			: "Active",
		brand 			: "Warung Ngana",
		images			: [{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/warungngana/ayam_woku.jpg",
			imgType : "Thumbnail"
		},{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/warungngana/ayam_woku.jpg",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		}],
		tags 				: [ "Ayam", "Woku", "Menado", "Manado" ], 
		domain 			: "ecommerce.maya",
	},{
		name 				: "Brownies Coklat",
		unitPrice 	: 1250000,
		currency 		: "IDR",
		uom 				: "Pieces",
		description : "Penjelasan tentang Brownies rasa Coklat",
		type 				: "Physical",
		status 			: "Active",
		brand 			: "Deliciozo",
		sku 				: "Brownies-Coklat-001",
		images			: [{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/brownies.jpg",
			imgType : "Thumbnail"
		},{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/brownies.jpg",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		}],
		tags 				: [ "Brownies", "Coklat", "Kue" ],
		domain 			: "ecommerce.maya",
	},{
		name 				: "Brownies Keju",
		unitPrice 	: 1250000,
		currency 		: "IDR",
		uom 				: "Pieces",
		description : "Penjelasan tentang Brownies rasa Keju",
		type 				: "Physical",
		status 			: "Active",
		brand 			: "Deliciozo",
		sku 				: "Brownies-Keju-001",
		images			: [{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/brownies.jpg",
			imgType : "Thumbnail"
		},{
			imgUrl 	: "http://www.backtokimi.com.s3.amazonaws.com/images/deliciozo/brownies.jpg",
			imgType : "Detail"
		},{
			imgUrl 	: "http://ecommerce.maya:3000/images/750x500.png",
			imgType : "Detail"
		}],
		tags 				: [ "Brownies", "Keju", "Kue" ],
		domain 			: "ecommerce.maya",
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
		console.log('tenantUsers found in fixtures: ', tenantUsers.length);

		let tenantOwners = [];

		tenantUsers.forEach((tenantUser) => {
			console.log('now checking user with email: ', tenantUser.email);
	  	const userExists = Meteor.users.findOne({ 'emails.address': tenantUser.email });
	  	
	  	let userId;
		  if (!userExists){
		  	// console.log('user not found in DB, now processing fixtures...');
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

			// if(Roles.userIsInRole(userId, 'Admin', tenantUser.domain))
			// 	tenantOwners.push({
			// 		"partyId" 	: userId,
			// 		"partyType" : "Member"
			// 	});
		});

		Tenant._collection.update({ _id: tenantId }, { $set:{ owners:tenantOwners } });
		console.log('update Tenant with owners: ', tenantOwners);

		if(Info.find({tenantId:tenantId}).fetch().length < infos.length ){
			console.log('now injecting info collection...');
			infos.forEach((info) => {
				info.tenantId = tenantId;
				info.imgUrl 	= "http://"+tenant.domain+":3000/images/1900x1080_SlideOne.png";
				info.owners 	= tenantOwners;

				//FIXME harusnya cek type, bila Product, inject juga ke refs, tentunya kita buat data dulu di Product Collection 

				const infoId = Info.insert(info,{ validate: false});
				console.log('created infoId: ', infoId);
			});
		}else{
			console.log('skipping infos creation...');
		};

		const tenantProducts = _.where(products,{domain:tenant.domain});
		console.log('tenantProducts found in fixtures: ', tenantProducts.length);

		tenantProducts.forEach((tenantProduct) => {
			const foundProduct = Product.findOne({name:tenantProduct.name});
			if(!foundProduct){
				delete tenantProduct["domain"];
				tenantProduct.tenantId = tenantId;
				console.log('tenantProduct', tenantProduct);
				const productId = Product.insert(tenantProduct,{validate:false});
				console.log('created productId: ', productId);
			};
		});
		

	  console.log('****************** END fixtures for tenant: ', tenant.domain);
	});

};
