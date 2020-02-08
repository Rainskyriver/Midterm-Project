DROP TABLE IF EXISTS order_items CASCADE;
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  item_id INTEGER REFERENCES items(id),
  order_id INTEGER REFERENCES orders(id),
  quantity INTEGER
)
