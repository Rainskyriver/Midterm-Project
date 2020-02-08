DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  price INTEGER NOT NULL,
  calories INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  picture VARCHAR(2083) NOT NULL
);
