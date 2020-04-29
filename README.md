# Ventas Rancheras

Full Stack Application built using Node.js, React, React Native and PostgreSQL

## Set Up

-   Have [yarn](https://classic.yarnpkg.com/lang/en/) version 1.x installed.

After the project has been downloaded run

```
yarn install
```

## Motivation

A company distribuites its product to multiple small to medium sized businesses. To achieve this first a salesman visits the business to take the order, check which previously requested items had been sold and in general to see how the items are doing there. Then, after the order has been taken the company checks if the requested items are still in stock and in case they are, emit a receipt.

After the receipt is emitted the items are delivered to the business that requested them and the process is repeated each month.

As this process is very manual and hard to follow the company has decided to create an application to digitalize it.

The application should be able to connect to the ERP used by the company to manage their inventory, which is Quickbooks, but also should be able to switch to another ERP quickly in case it is needed.

## Use Cases

- An administrator should be able to assign clients to a salesman to visit.
- An administrator should be able to assign packages to a delivery.
- The salesman should be able to visit a client and take his order.
- The salesman should be able to register which products were sold from the last visit. This information does not needs to be synced.
- The salesman should be able to get an optimized route to visit his assigned clients.
- The salesman should be able to visit clients even if he is offline, everything that was done while offline must be synced to the server once back online.
- The delivery should be able to receive a package. When the package is received the delivery should know what is inside.
- The delivery should sign when he receives a package. This signature should be synced to Quickbooks.
- The delivery should be able to record the client's signature when he receives a package.
- The delivery should get an optimized route to deliver his assigned packages.
- The delivery should be able to delivery orders even if he is offline, everything that was done while offline must be synced to the server once back online.

## Constraints

- The mobile app should be done using either React Native, Flutter or Native iOS/Android.
