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

	pg "github.com/go-pg/pg/v10"
	"golang.org/x/crypto/bcrypt"
)

// Createuser is the resolver for the createuser field.
func (r *mutationResolver) Createuser(ctx context.Context, username string, email string, password string) (*model.CreateUserResponse, error) {
	connection := database.GetContext(ctx)
	var user model.User
	_, err := connection.DBState.QueryOne(&user, `SELECT * from users WHERE username = (?) OR email = (?)`, &username, &email)
	if err != nil {
		if err == pg.ErrMultiRows {
			response := model.CreateUserResponse{
				Success: false,
				Message: "Username or email already exists!",
			}
			return &response, err
		} else if err == pg.ErrNoRows {
			hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 12)
			_, err := connection.DBState.Exec(`INSERT INTO users (username, email, password, token) VALUES(?, ?, ?, ?)`, &username, &email, string(hashedPassword), nil)
			if err != nil {
				response := model.CreateUserResponse{
					Success: false,
					Message: "Database is down right now!",
				}
				return &response, err
			} else {
				response := model.CreateUserResponse{
					Success: true,
					Message: "User created!",
				}
				return &response, nil
			}
		}
	}
	response := model.CreateUserResponse{
		Success: false,
		Message: "User already exists!",
	}
	return &response, nil
}

// Addpublickey is the resolver for the addpublickey field.
func (r *mutationResolver) Addpublickey(ctx context.Context, token *string, pubkey model.PublicKeyWithMetaData) (bool, error) {
	connection := database.GetContext(ctx)
	if token == nil {
		return false, nil
	}
	var user model.User
	_, err := connection.DBState.QueryOne(&user, `SELECT id FROM users WHERE token = (?)`, *token)
	if err != nil {
		return false, err
	} else {
		_, execError := connection.DBState.Exec(`INSERT INTO public_keys (userid) VALUES (?) ON CONFLICT (userid) DO NOTHING`, &user.ID)
		if execError != nil {
			return false, execError
		}
	}
	var keys model.GetPublicKeyResponse
	_, keyErr := connection.DBState.QueryOne(&keys, `SELECT json_array(pubkey) FROM public_keys WHERE userid = (?)`, &user.ID)
	if keyErr != nil {
		return false, keyErr
	}
	for _, i := range keys.Pubkeys {
		for _, keys := range i {
			if keys.Chain == pubkey.Chain && keys.PublicKey == pubkey.PublicKey {
				return false, errors.New("Public Key already existed!")
			} else {
				continue
			}
		}
	}
	_, execError := connection.DBState.Exec(`UPDATE public_keys SET pubkey = pubkey || (array[(?)::jsonb]) WHERE userid = (?);`, &pubkey, &user.ID)
	if execError != nil {
		return false, execError
	}
	return true, nil
}

// Savelogs is the resolver for the savelogs field.
func (r *mutationResolver) Savelogs(ctx context.Context, token *string, logs model.Logs) (*model.SaveLogsResponse, error) {
	if token == nil {
		response := model.SaveLogsResponse{
			Success: false,
			Message: "Token must not be null!",
		}
		return &response, nil
	}
	connection := database.GetContext(ctx)
	var user model.User
	_, err := connection.DBState.QueryOne(&user, `SELECT * from users WHERE token = (?)`, *token)
	if err != nil {
		return nil, err
	}
	_, logError := connection.DBState.Exec(`INSERT INTO logs(userid, userPublicKey, receiverPublicKey, sourceChain, destinationChain, 
											typeOfTransfer, transferDetails, transactionSignature, gas, status) VALUES 
											(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, &user.ID, &logs.UserPublicKey, &logs.ReceiverPublicKey,
		&logs.SourceChain, &logs.DestinationChain, &logs.TypeOfTransfer, logs.TransferDetails,
		logs.TransactionSignature, logs.Gas, 0)
	if logError != nil {
		return nil, logError
	}
	response := model.SaveLogsResponse{
		Success: true,
		Message: "logs saved and will be updated!",
	}
	return &response, nil
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
	if username == nil || email == nil {
		return nil, errors.New("Username and email should not be empty!")
	}
	connection := database.GetContext(ctx)
	var user model.User
	_, err := connection.DBState.QueryOne(&user, `SELECT * from users WHERE username = (?) AND email = (?)`, *username, *email)
	if err != nil {
		response := model.GetTokenResponse{
			Success: false,
			Token:   nil,
		}
		return &response, err
	}
	passwordError := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if passwordError != nil {
		response := model.GetTokenResponse{
			Success: false,
			Token:   nil,
		}
		return &response, passwordError
	}
	response := model.GetTokenResponse{
		Success: true,
		Token:   user.Token,
	}
	return &response, nil
}

// Getpublickey is the resolver for the getpublickey field.
func (r *queryResolver) Getpublickey(ctx context.Context, token *string) (*model.GetPublicKeyResponse, error) {
	connection := database.GetContext(ctx)
	if token == nil {
		return nil, errors.New("token should not be null!")
	}
	var user model.User
	_, err := connection.DBState.QueryOne(&user, `SELECT * from users WHERE token = (?)`, *token)
	if err != nil {
		return nil, err
	}
	var keys model.GetPublicKeyResponse
	_, keyError := connection.DBState.QueryOne(&keys, `SELECT json_array(pubkey) as pubkeys from public_keys WHERE userid = (?)`, &user.ID)
	if keyError != nil {
		return nil, keyError
	}
	return &keys, nil
}

// Gettransactionlogs is the resolver for the gettransactionlogs field.
func (r *queryResolver) Gettransactionlogs(ctx context.Context, token *string) ([]*model.GetTransactionLogs, error) {
	panic(fmt.Errorf("not implemented: Gettransactionlogs - gettransactionlogs"))
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
