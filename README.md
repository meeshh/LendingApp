# Project Title
A Simulation for a Lending Application

## Project Description

This project conceptualizes a basic Lending Application where the user can request a short term loan for maximum of a one month period. The user has the ability to extend the loan (only once) for a period of 1 week after the initial deadline.
In order to start using this service, the user must create an account. Once they do, the app will automatically redirect the user to the "Request Loan" Portal.

The app also offers a way to sign up, sign in, sign out, reset and change password.

Please note that this application is not a real thing. It is only a simulation.

## Getting Started

First things first, make sure you have node and npm or yarn installed, clone the repo, go to its root directory in your terminal and run npm/yarn install.
Another thing to do is to go to https://firebase.google.com/ login and create a project. Once you created a project, choose to Add Firebase to your web app, copy its config and replace what you have in /src/CONFIGMASTER_TEMP.js with what you copied. Then rename CONFIGMASTER_TEMP.js to CONFIGMASTER.js.

Once you have your modules installed and firebase configured, type npm/yarn start in your terminal. The app is configured to run on port 3000 of your localhost so a new tab will fire up in your browser and the app will open.

### Prerequisites

You will be needing nodejs and npm. Get them here https://nodejs.org/en/.
If you prefer to use yarn over npm, follow the instructions on how to install it using the following link https://yarnpkg.com/lang/en/docs/install/#mac-stable

### What is used in this project?

[React](https://reactjs.org/), [Create React App](https://github.com/facebook/create-react-app), [Redux](https://redux.js.org/), [Lodash](https://lodash.com/), [Firebase](https://firebase.google.com/), [Bootstrap](https://getbootstrap.com/)

### Notes

Handling multiple users is yet to be developed.
