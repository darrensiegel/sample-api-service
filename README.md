# sample-api-service

This example is an attempt to illustrate how simple it is to build
a succinct yet fully CRUD capable REST framework in Node.js.

In addition to providing standard CRUD routes for each resource, the application
provides a simple way to add custom routes (and an example of doing so with the
authorization check on the `authorization` resource).

This is by no means a production ready framework. But even through one would need to incorporate various other features (e.g. schema validation, unified logging, a caching layer, etc.), it is interesting to see what can be done in under 300 lines of
JavaScript.

## Details

This example involves two containers:  A MySQL container that once run will self populate with a copy of the `authorization` database and a second container that runs a Node
application to provide a REST endpoint to interact with the database container.

The Node application leverages the popular Express Node framework. For more information about Express and to see simple examples of how to create REST endpoints using
Express, consult [their documentation](http://expressjs.com/).

## Running It

First start the two containers using the supplied `docker-compose.yaml` file.

```
$ docker-compose up
```

Once you see the output stop scrolling and `api service up and running` appear, it
is ready to use.

Try submitting GET, POST, PUT, and DELETE requests against `http://localhost:8888`,
for resources `actor`, `action`, `item`, and `authorization`.

For example: `curl http://localhost:8888/actor` returns JSON for all actors.
