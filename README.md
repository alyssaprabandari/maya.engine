# Maya Engine
Multi Tenant Application Engine

Automated Testing is not finished

Steps to run:
1. Obviously you need to have Meteor installed.
curl https://install.meteor.com/ | sh

2. Edit your /etc/hosts file and include:
127.0.0.1   ecommerce.maya
127.0.0.1   crowdfunding.maya

Those are 2 "example-domains" that I included in fixtures.

3. Please create settings-development.json in your root project directory:
{
  "public": {},
  "private": {}
}

3. meteor npm install

4. meteor npm start

There will be 3 active Tenants for demo-purpose:
localhost:3000
ecommerce.maya:3000
crowdfunding.maya:3000

<table>
  <tbody>
    <tr>
      <th><a href="https://themeteorchef.com/base">Inspired by The Meteor Chef Base</a></th>
      <td>v4.7.0</td>
    </tr>
    <tr>
      <th><a href="https://www.meteor.com">Meteor</a></th>
      <td>v1.4.1.1</td>
    </tr>
  </tbody>
</table>
