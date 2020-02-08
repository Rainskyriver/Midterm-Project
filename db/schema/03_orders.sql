DROP TABLE IF EXISTS CASCADE
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  order_time DATE NOT NULL,
  start_time DATE,
  end_time DATE,
  user_id INTEGER REFERENCES users(id)
);