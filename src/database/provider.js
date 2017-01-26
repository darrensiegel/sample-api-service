// A generic database provider, it can perform basic CRUD operations
// against any table 

const { findAll, findById, create, updateById, removeById } = require ('./utils')

var provider = function(connection, resource) {

  return {
    findById: findById.bind(undefined, resource, connection),
    findAll: findAll.bind(undefined, resource, connection),
    removeById: removeById.bind(undefined, resource, connection),
    create: create.bind(undefined, resource, connection),
    updateById: updateById.bind(undefined, resource, connection),
  }
}

module.exports = provider;
