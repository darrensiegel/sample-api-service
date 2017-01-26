// This is an example of a custom route being added.  It augments
// the default CRUD routes by providing a specialized GET handler

module.exports = function(context, router, customProvider) {

  const { connection } = context;

  const hasAuthorization = customProvider
    .hasAuthorization.bind(undefined, connection);

  // Allow a GET request to perform a specific authorization check
  router.get('/:actor/:action/:item',
    (req, res) => {
      hasAuthorization(req.params)
        .then(result => res.json(result));
    });
}
