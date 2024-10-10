package database

import (
	"os"

	"github.com/go-pg/pg/v10"
)

func DBConnect() *pg.DB {
	var dbOptions pg.Options = pg.Options{
		Addr:     os.Getenv("DB_HOST"),
		User:     os.Getenv("DB_USERNAME"),
		Password: os.Getenv("DB_PASSWORD"),
		Database: os.Getenv("DB_DATABASE"),
	}
	return pg.Connect(&dbOptions)
}
