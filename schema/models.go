package schema

import (
	"github.com/go-pg/pg/v10"
)

const (
	SOLANA   = 0
	POLKADOT = 1
	BITCOIN  = 2
	ETHERIUM = 3
	POLYGON  = 4
)

type Chain int

type User struct {
	id       uint64
	username string
	email    string
	password string
	token    string
}

type PublicKeyWithMetaData struct {
	chain     Chain
	publicKey string
}

type UserPublicKeys []PublicKeyWithMetaData

func createUserTable(connection *pg.DB) *error {
	_, err := connection.Exec(`
		CREATE TABLE IF NOT EXISTS users (
		id SERIAL UNIQUE NOT NULL PRIMARY KEY
		username VARCHAR(50) UNIQUE NOT NULL
		email TEXT UNIQUE NOT NULL
		password TEXT NOT NULL
		token TEXT UNIQUE
	)
		`)
	if err != nil {
		return &err
	}
	return nil
}

func createPublicKeysTable(connection *pg.DB) *error {
	_, err := connection.Exec(`
		CREATE TABLE IF NOT EXITS public_keys(
		userid INT NOT NULL UNIQUE PRIMARY KEY
		pubkey jsonb[]
		FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
	)
		`)
	if err != nil {
		return &err
	}
	return nil
}
