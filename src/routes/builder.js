var express = require('express')

// A router builder that given a data provider and a resource
// builds a router for standard CRUD operations for that resource

var buildRouter = function(provider) {

  const router = express.Router()

  router.get('/:id', (req, res) =>
    provider.findById(req.params.id)
      .then(result => res.json(result.rows))
      .catch(err => res.status(500).send(err))
  );
  router.get('/', (req, res) =>
    provider.findAll()
      .then(result => res.json(result.rows))
      .catch(err => res.status(500).send(err))
  );
  router.delete('/:id', (req, res) =>
    provider.removeById(req.params.id)
      .then(result => res.json({success: true}))
      .catch(err => res.status(500).send(err))
  );
  router.post('/', (req, res) =>
    provider.create(req.body)
      .then(result => res.json({success: true}))
      .catch(err => res.status(500).send(err))
  );
  router.put('/:id', (req, res) =>
    provider.updateById(req.params.id, req.body)
      .then(result => res.json({success: true}))
      .catch(err => res.status(500).send(err))
  );

  return router;
}

module.exports = buildRouter;
