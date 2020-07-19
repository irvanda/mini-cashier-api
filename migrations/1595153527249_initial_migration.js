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
      reference: 'user',
      ondelete: 'cascade'
    },
    status: { type: 'smallint', notNull: true },
    createdAt: { type: 'timestamp', notNull: true }
  });
  pgm.createTable('product', {
    id: 'id',
    name: { type: 'varchar (255)', notNull: true },
    createdAt: { type: 'timestamp', notNull: true }
  });
  pgm.createTable('productItem', {
    id: 'id',
    productId: {
      type: 'integer',
      notNull: true,
      reference: 'product',
      ondelete: 'cascade'
    },
    name: { type: 'varchar (255)', notNull: true },
    price: { type: 'integer', notNull: true },
    createdAt: { type: 'timestamp', notNull: true }
  });
  pgm.createTable('order', {
    id: 'id',
    userId: {
      type: 'integer',
      notNull: true,
      reference: 'user',
      ondelete: 'cascade'
    },
    total: { type: 'integer', notNull: true },
    createdAt: { type: 'timestamp', notNull: true }
  });
  pgm.createTable('orderItem', {
    id: 'id',
    productItemId: {
      type: 'integer',
      notNull: true,
      reference: 'productItem',
      ondelete: 'cascade'
    },
    orderId: {
      type: 'integer',
      notNull: true,
      reference: 'order',
      ondelete: 'cascade'
    },
    qty: { type: 'smallint', notNull: true },
    price: { type: 'integer', notNull: true },
    createdAt: { type: 'timestamp', notNull: true }
  });
  pgm.createIndex('log', 'userId');
  pgm.createIndex('productItem', 'productId');
  pgm.createIndex('order', 'userId');
  pgm.createIndex('orderItem', ['productItemId', 'orderId']);
};

exports.down = (pgm) => {
  pgm.dropIndex('log', 'userId');
  pgm.dropIndex('productItem', 'productId');
  pgm.dropIndex('order', 'userId');
  pgm.dropIndex('orderItem', ['productItemId', 'orderId']);
  pgm.dropTable('user');
  pgm.dropTable('log');
  pgm.dropTable('product');
  pgm.dropTable('productItem');
  pgm.dropTable('order');
  pgm.dropTable('orderItem');
};
