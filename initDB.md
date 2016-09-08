db.roles.insert({ "_id" : "YwvnviWLMCunBt88M", "name" : "Member.Free" });
db.roles.insert({ "_id" : "mg9qzh9Sgwy3Ldq23", "name" : "Internal.Ops" });
db.roles.insert({ "_id" : "nnjCbTcwRjKv9DGSS", "name" : "Admin" });

db.users.insert({ "_id" : "Y83sHhpLaumnNhQiG", "createdAt" : ISODate("2016-08-14T08:25:06.863Z"), "services" : { "password" : { "bcrypt" : "$2a$10$r4.zesQ19Evc4VpJIdTJZOQKOgL.zxFr0XKy/HnZZeDoj9e7C7eeK" }, "resume" : { "loginTokens" : [ { "when" : ISODate("2016-08-14T08:29:57.704Z"), "hashedToken" : "wAvoi/U9jT/7bPQ9ZiGfryLz/L/4QaBAk9XBiIusnQM=" } ] } }, "username" : "admin", "emails" : [ { "address" : "admin@admin.com", "verified" : false } ], "profile" : { "fullname" : "Admin Admin" }, "roles" : { "localhost" : [ "Member.Free", "Internal.Ops", "Admin" ], "__global_roles__" : [ "Admin" ] } });

db.member.insert({ "_id" : "Y83sHhpLaumnNhQiG", "fullname" : "Admin Admin", "nickname" : "admin", "tenants" : [ { "tenantId" : "p9hGL34Qa8scEzabc", "roles" : [ "Member.Free", "Internal.Ops", "Admin" ], "status" : "Active" } ] });


tenant
{
    "_id" : "p9hGL34Qa8scEzabc",
    "domain" : "localhost",
    "name" : "Localhost",
    "csEmail" : "admin@admin.com",
    "layout" : {
        "framework" : "Bootstrap",
        "appWidget" : "App",
        "cssUrl" : ""
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
            "name" : "listDocument",
            "roles" : [ 
                "Internal.Ops", 
                "Admin"
            ],
            "type" : "Document.Publication"
        }, 
        {
            "name" : "detailDocument",
            "roles" : [ 
                "Internal.Ops", 
                "Admin"
            ],
            "type" : "Document.Publication"
        },
        {
            "name" : "insertDocument",
            "roles" : [ 
                "Admin"
            ],
            "type" : "Document.Method"
        }, 
        {
            "name" : "updateDocument",
            "roles" : [ 
                "Admin", 
                "Internal.Ops"
            ],
            "type" : "Document.Method"
        }, 
        {
            "name" : "removeDocument",
            "roles" : [ 
                "Admin"
            ],
            "type" : "Document.Method"
        }
    ],
    "index" : {
        "title" : "Home Page of Localhost",
        "path" : "/",
        "roles" : [],
        "widgets" : [ 
            "AppNavigation", 
            "HeadlineCarousel", 
            "Welcome"
        ]
    },
    "pages" : [ 
        {
            "title" : "Login",
            "path" : "/login",
            "roles" : [],
            "widgets" : [ 
                "AppNavigation", 
                "Login"
            ]
        }, 
        {
            "title" : "Recover Password",
            "path" : "/recover-password",
            "roles" : [],
            "widgets" : [ 
                "AppNavigation", 
                "RecoverPassword"
            ]
        }, 
        {
            "title" : "Reset Password",
            "path" : "/reset-password/:token",
            "roles" : [],
            "widgets" : [ 
                "AppNavigation", 
                "ResetPassword"
            ]
        }, 
        {
            "title" : "Signup",
            "path" : "/signup",
            "roles" : [],
            "widgets" : [ 
                "AppNavigation", 
                "Signup"
            ]
        }, 
        {
            "title" : "Selamat Datang",
            "path" : "/welcome",
            "widgets" : [ 
                "AppNavigation", 
                "Welcome", 
                "Welcome"
            ],
            "menuNr" : 1
        }, 
        {
            "title" : "Halaman Kedua",
            "path" : "/kedua",
            "roles" : [ 
                "Member.Free", 
                "Internal.Ops", 
                "Admin"
            ],
            "widgets" : [ 
                "AppNavigation", 
                "Welcome", 
                "DocumentTable"
            ],
            "menuNr" : 2
        }, 
        {
            "title" : "Document Detail",
            "path" : "/document/:docId/detail",
            "roles" : [ 
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
            "title" : "Frequently Asked Questions",
            "path" : "/faq",
            "roles" : [],
            "widgets" : [ 
                "AppNavigation", 
                "Documents", 
                "Welcome"
            ],
            "menuNr" : 3
        }, 
        {
            "title" : "Ops Tools",
            "path" : "/ops",
            "roles" : [ 
                "Internal.Ops", 
                "Admin"
            ],
            "widgets" : [ 
                "AppNavigation", 
                "Documents", 
                "Documents"
            ],
            "menuNr" : 4
        }
    ],
    "isPublicMenuInAuthNav" : true,
    "owners" : [ 
        {
            "ownerId" : "Y83sHhpLaumnNhQiG",
            "ownerType" : "Member"
        }
    ],
    "currency" : "IDR",
    "type" : "maya.engine",
    "status" : "Active"
}


