# Maya Engine
Multi Tenant Application Engine

WARNING: Automated Testing is not finished

### Steps to run

1. Obviously you need to have Meteor installed.

```bash
curl https://install.meteor.com/ | sh
```

2. Edit your /etc/hosts file and include:

```bash
127.0.0.1   ecommerce.maya
127.0.0.1   crowdfunding.maya
```

Those are 2 "example-domains" that I included in fixtures.

3. Please create settings-development.json in your root project directory:
```bash
{
  "public": {},
  "private": {}
}
```

4. Install all the needed modules
```bash
meteor npm install
```

5. Start the server
```bash
meteor npm start
```

There will be 3 active Tenants for demo-purpose:
```bash
localhost:3000
ecommerce.maya:3000
crowdfunding.maya:3000
```

Boilerplate based on version 4.7.0 of [`Meteor Chef Base`](https://themeteorchef.com/base) and [`Meteor`](https://www.meteor.com) version 1.4.1.1 
