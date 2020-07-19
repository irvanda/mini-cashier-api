/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('books', {
    id: 'id',
    author: { type: 'varchar(255)', notNull: true, default: '' },
    title: { type: 'varchar(255)', notNull: true, default: '' },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.addColumn('books', {
    test: { type: 'varchar(255)', notNull: true, default: '' },
  })
};

exports.down = pgm => {
  pgm.dropColumn('books', 'test')
  pgm.dropTable('books')
};
