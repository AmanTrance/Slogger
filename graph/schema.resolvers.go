package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.55

import (
	"context"
	"errors"
	"fmt"
	"slogger/database"
	"slogger/graph/model"
)

// Createuser is the resolver for the createuser field.
func (r *mutationResolver) Createuser(ctx context.Context, username string, email string, password string) (*model.CreateUserResponse, error) {
	panic(fmt.Errorf("not implemented: Createuser - createuser"))
}

// Getuser is the resolver for the getuser field.
func (r *queryResolver) Getuser(ctx context.Context, token *string) (*model.User, error) {
	connection := database.GetContext(ctx)
	if token == nil {
		return nil, errors.New("Token must not be null")
	}
	var user model.User
	_, err := connection.DBState.QueryOne(&user, `SELECT * from users WHERE "users"."token" = (?)`, *token)
	if err != nil {
		return nil, errors.New("Token must be valid")
	}
	return &user, nil
}

// Gettoken is the resolver for the gettoken field.
func (r *queryResolver) Gettoken(ctx context.Context, username *string, email *string, password string) (*model.GetTokenResponse, error) {
	panic(fmt.Errorf("not implemented: Gettoken - gettoken"))
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
