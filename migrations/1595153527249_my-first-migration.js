/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('user', {
    id: 'id',
    username: { type: 'varchar(255)', notNull: true },
    password: { type: 'varchar(255)', notNull: true },
    createdAt: { type: 'timestamp', notNull: true },
    lastLogin: { type: 'timestamp', notNull: true }
  });
  pgm.createTable('log', {
    id: 'id',
    userId: {
      type: 'integer',
      notNull: true,
      references: '"user"',
      onDelete: 'RESTRICT'
    },
    status: { type: 'smallint', notNull: true },
    createdAt: { type: 'timestamp', notNull: true }
  });
  pgm.createTable('product', {
    id: 'id',
    name: { type: 'varchar (255)', notNull: true },
    createdAt: { type: 'timestamp', notNull: true },
    createdById: {
      type: 'integer',
      notNull: true,
      references: '"user"',
      onDelete: 'RESTRICT'
    },
    isDeleted: { type: 'boolean', notNull: true },
    deletedAt: { type: 'timestamp', notNull: true },
    deletedById: {
      type: 'integer',
      notNull: true,
      references: '"user"',
      onDelete: 'RESTRICT'
    },
    updatedAt: { type: 'timestamp', notNull: true },
    updatedById: {
      type: 'integer',
      notNull: true,
      references: '"user"',
      onDelete: 'RESTRICT'
    }
  });
  pgm.createTable('productItem', {
    id: 'id',
    productId: {
      type: 'integer',
      notNull: true,
      references: '"product"',
      onDelete: 'RESTRICT'
    },
    name: { type: 'varchar (255)', notNull: true },
    price: { type: 'integer', notNull: true },
    createdAt: { type: 'timestamp', notNull: true },
    createdById: {
      type: 'integer',
      notNull: true,
      references: '"user"',
      onDelete: 'RESTRICT'
    },
    isDeleted: { type: 'boolean', notNull: true },
    deletedAt: { type: 'timestamp', notNull: true },
    deletedById: {
      type: 'integer',
      notNull: true,
      references: '"user"',
      onDelete: 'RESTRICT'
    },
    updatedAt: { type: 'timestamp', notNull: true },
    updatedById: {
      type: 'integer',
      notNull: true,
      references: '"user"',
      onDelete: 'RESTRICT'
    }
  });
  pgm.createTable('order', {
    id: 'id',
    userId: {
      type: 'integer',
      notNull: true,
      references: '"user"',
      onDelete: 'RESTRICT'
    },
    total: { type: 'integer', notNull: true },
    createdAt: { type: 'timestamp', notNull: true },
    createdById: {
      type: 'integer',
      notNull: true,
      references: '"user"',
      onDelete: 'RESTRICT'
    },
    isDeleted: { type: 'boolean', notNull: true },
    deletedAt: { type: 'timestamp', notNull: true },
    deletedById: {
      type: 'integer',
      notNull: true,
      references: '"user"',
      onDelete: 'RESTRICT'
    },
    updatedAt: { type: 'timestamp', notNull: true },
    updatedById: {
      type: 'integer',
      notNull: true,
      references: '"user"',
      onDelete: 'RESTRICT'
    }
  });
  pgm.createTable('orderItem', {
    id: 'id',
    productItemId: {
      type: 'integer',
      notNull: true,
      references: '"productItem"',
      onDelete: 'RESTRICT'
    },
    orderId: {
      type: 'integer',
      notNull: true,
      references: '"order"',
      onDelete: 'RESTRICT'
    },
    qty: { type: 'smallint', notNull: true },
    price: { type: 'integer', notNull: true },
    createdAt: { type: 'timestamp', notNull: true },
    createdById: {
      type: 'integer',
      notNull: true,
      references: '"user"',
      onDelete: 'RESTRICT'
    },
    isDeleted: { type: 'boolean', notNull: true },
    deletedAt: { type: 'timestamp', notNull: true },
    deletedById: {
      type: 'integer',
      notNull: true,
      references: '"user"',
      onDelete: 'RESTRICT'
    },
    updatedAt: { type: 'timestamp', notNull: true },
    updatedById: {
      type: 'integer',
      notNull: true,
      references: '"user"',
      onDelete: 'RESTRICT'
    }
  });
  pgm.createIndex('log', 'userId');
  pgm.createIndex('product', ['createdById', 'deletedById', 'updatedById']);
  pgm.createIndex('productItem', ['productId', 'createdById', 'deletedById', 'updatedById']);
  pgm.createIndex('order', ['userId', 'createdById', 'deletedById', 'updatedById']);
  pgm.createIndex('orderItem', ['productItemId', 'orderId', 'createdById', 'deletedById', 'updatedById']);
};

exports.down = (pgm) => {
  pgm.dropIndex('log', 'userId');
  pgm.dropIndex('product', ['createdById', 'deletedById', 'updatedById']);
  pgm.dropIndex('productItem', ['productId', 'createdById', 'deletedById', 'updatedById']);
  pgm.dropIndex('order', ['userId', 'createdById', 'deletedById', 'updatedById']);
  pgm.dropIndex('orderItem', ['productItemId', 'orderId', 'createdById', 'deletedById', 'updatedById']);
  pgm.dropTable('orderItem');
  pgm.dropTable('order');
  pgm.dropTable('productItem');
  pgm.dropTable('product');
  pgm.dropTable('log');
  pgm.dropTable('user');
};
