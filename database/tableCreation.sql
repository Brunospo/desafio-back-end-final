DROP DATABASE IF EXISTS pdv;

CREATE DATABASE pdv;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios(
	id SERIAL PRIMARY KEY,
  nome VARCHAR(60) NOT NULL,
  email TEXT NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

DROP TABLE IF EXISTS categorias;

CREATE TABLE categorias(
	id SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL
);

DROP TABLE IF EXISTS produtos;

CREATE TABLE produtos(
	id SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  quantidade_estoque INTEGER NOT NULL,
  valor INTEGER NOT NULL,
  categoria_id INTEGER REFERENCES categorias(id)
);

DROP TABLE IF EXISTS clientes;

CREATE TABLE clientes(
	id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  email TEXT NOT NULL UNIQUE,
  cpf CHAR(11) NOT NULL UNIQUE,
  cep CHAR(8),
  rua TEXT,
  numero SMALLINT,
  bairro TEXT,
  cidade TEXT,
  estado CHAR(2)
);

DROP TABLE IF EXISTS pedidos;

CREATE TABLE pedidos(
	id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id) NOT NULL,
  observacao TEXT,
  valor_total INTEGER
);

DROP TABLE IF EXISTS pedido_produtos;

CREATE TABLE pedido_produtos(
	id SERIAL PRIMARY KEY,
  pedido_id INTEGER REFERENCES pedidos(id) NOT NULL,
  produto_id INTEGER REFERENCES produtos(id) NOT NULL,
  quantidade_produto INTEGER NOT NULL,
  valor_produto INTEGER
);

ALTER TABLE IF EXISTS produtos ADD COLUMN IF NOT EXISTS url_produto TEXT;