# SQL-Inject-Protect [![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/Redeux/sql-inject-reject/blob/master/LICENSE) 

  Detect and reject SQL injection attempts before processing them.

## About

  Analyzes HTTP requests' URL and body as they're received and if a SQL statement is detected responds with 403 Forbidden.  Intended to be part of a layered security approach.

## Getting Started
  
  Install sql-inject-protect as an npm module and save it to your package.json file as a dependency:

  ```
npm install sql-inject-protect
  ```

Once it's installed you can reference it by calling 
```ts
import sqlProtect from "sql-inject-protect"
```

## Usage

  The middleware allows for configuration of the security level and SQL keywords to reject.

  The security levels are `paranoid` `elevated` `typical` and `silent`.  The security level is set to `typical` if no level is specified. Security levels may be specified on load:

```ts
app.use(SQLProtect.default({ level: 'elevated' }))
```

  By default any security level `typical` or above looks for the `OR` SQL keyword.  
  
  Additional keywords can be specified with or without specifying a security level.  Keywords are validated regardless of their case and their hex equivalents.
  
  Keywords must be specified as an array:

  ```ts
app.use(SQLProtect.default({ keywords: ['UNION','SELECT'] }))
  ```
  You may pass the middleware to your http server with `app.use()`:
  ```ts
import sqlProtect from "sql-inject-protect";
import express from "express";

const app = express();

app.use(SQLProtect.default());
  ```

Or you may pass the middleware to a specific route or routes:
```ts
import sqlProtect from "sql-inject-protect";
import express from "express";

const app = express();

app.post('/login', SQLProtect.default(), function(req, res) {
    // some code here
});
```

## Security Levels

By default security levels are hierarchical, which means higher security levels perform the validations of the security levels below them as well as their own.  The security level hierarchy is as follows: `paranoid` > `elevated` > `typical` > `silent`

* Paranoid: Checks for any of `'` `--` `#` and their hex equivalents. It is likely to produce a lot of false positives.
* Elevated: Checks for `=` followed by any `'` `--` `;` and their hex equivalents.
* Typical: Checks for `'OR` is any case and its hex equivalents.
* Silent: Performs no SQL checks but can still be used with specific keywords.

## Notes

  This package is not intended to be a substitute for SQL query validation.

## License
  This library is a derivative of [sql-inject-reject]("https://github.com/Redeux/sql-inject-reject") compatible with Typescript.

  All rights reserved for [Redeux]("https://github.com/Redeux/sql-inject-protect")