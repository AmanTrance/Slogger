package schema

import "github.com/go-pg/pg/v10"

func InitializeSchema(connection *pg.DB) {
	createUserTable(connection)
	createPublicKeysTable(connection)
}
