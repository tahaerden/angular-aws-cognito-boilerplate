# AngularAwsCognitoBoilerplate

1. Register, Login, Logout, Forgot Password logic using amazon-cognito-identity-js.
2. General layout structure with Auth Guarded pages.
3. Profile page displaying current user's details.
4. Custom 404 not found page.
5. Simple navigation including a dropdown button.
6. Basic and neat styling of responsive layout, forms, buttons, dynamic colors, typography etc.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Generating a lazy-loading feature module

Run `ng generate module pages/customers --route customers --module app.module`. This creates a customers directory having the new lazy-loadable feature module CustomersModule defined in the customers.module.ts file and the routing module CustomersRoutingModule defined in the customers-routing.module.ts file. The command automatically declares the CustomersComponent and imports CustomersRoutingModule inside the new feature module.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
