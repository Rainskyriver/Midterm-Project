DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  order_time timestamptz DEFAULT current_timestamp,
  start_time timestamptz,
  end_time timestamptz,
  user_id INTEGER REFERENCES users(id)
);
