package schema

import (
	"github.com/go-pg/pg/v10"
)

const (
	SOLANA   = 0
	POLKADOT = 1
	BITCOIN  = 2
	ARBITRUM = 3
	POLYGON  = 4
)

const (
	TOKEN   = 0
	NFT     = 1
	MESSAGE = 2
)

const (
	PENDING = 0
	FAILED  = 1
	SUCCESS = 2
)

func createUserTable(connection *pg.DB) error {
	_, err := connection.Exec(`
		CREATE TABLE IF NOT EXISTS users (
		id SERIAL UNIQUE NOT NULL PRIMARY KEY,
		username VARCHAR(50) UNIQUE NOT NULL,
		email TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL,
		token TEXT UNIQUE
	)`)
	if err != nil {
		panic(err.Error())
	}
	return nil
}

func createPublicKeysTable(connection *pg.DB) error {
	_, err := connection.Exec(`
		CREATE TABLE IF NOT EXISTS public_keys(
		userid INT NOT NULL UNIQUE PRIMARY KEY,
		pubkey jsonb[],
		FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
	)`)
	if err != nil {
		panic(err.Error())
	}
	return nil
}

func createLogsSchema(connection *pg.DB) error {
	_, err := connection.Exec(`
		CREATE TABLE IF NOT EXISTS logs(
		userid INT NOT NULL, 
		userPublicKey TEXT NOT NULL,
		receiverPublicKey TEXT NOT NULL,
		sourceChain INT NOT NULL,
		destinationChain INT NOT NULL,
		typeOfTransfer INT NOT NULL,
		transferDetails TEXT,
		transactionSignature TEXT,
		gas TEXT,
		status INT NOT NULL 
		)`)
	if err != nil {
		panic(err.Error())
	}
	return nil
}
