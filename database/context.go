package database

import (
	"context"
	"net/http"

	"github.com/go-pg/pg/v10"
)

type DBContext struct {
	DBState *pg.DB
}

func CreateDBContext(custom *DBContext, handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestWithCtx := r.WithContext(context.WithValue(r.Context(), "db", custom))
		handler.ServeHTTP(w, requestWithCtx)
	})
}

func GetContext(ctx context.Context) *DBContext {
	context, ok := ctx.Value("db").(*DBContext)
	if !ok {
		return nil
	}
	return context
}
