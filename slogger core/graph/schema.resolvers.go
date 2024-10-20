package graph

import (
	"context"
	"errors"
	"slogger/database"
	"slogger/graph/model"

	pg "github.com/go-pg/pg/v10"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

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
	_, execError := connection.DBState.Exec(`UPDATE public_keys SET pubkey = pubkey || (?)::jsonb WHERE userid = (?)`, &pubkey, &user.ID)
	if execError != nil {
		return false, execError
	}
	return true, nil
}

func (r *mutationResolver) Deletepublickey(ctx context.Context, token *string, pubkey model.PublicKeyWithMetaData) (bool, error) {
	if token == nil {
		return false, nil
	}
	connection := database.GetContext(ctx)
	var user model.User
	_, err := connection.DBState.QueryOne(&user, `SELECT * FROM users WHERE token = (?)`, *token)
	if err != nil {
		return false, err
	}
	var pubKeys model.GetPublicKeyResponse
	_, keyQuerErr := connection.DBState.QueryOne(&pubKeys, `SELECT json_array(pubkey) as pubkeys from public_keys WHERE userid = (?)`, &user.ID)
	if keyQuerErr != nil {
		return false, keyQuerErr
	}
	var modifiedPubKeys []model.PublicKeyWithChain = []model.PublicKeyWithChain{}
	for _, i := range pubKeys.Pubkeys {
		for _, key := range i {
			if key.PublicKey == pubkey.PublicKey {
				continue
			} else {
				modifiedPubKeys = append(modifiedPubKeys, *key)
			}
		}
	}
	_, keyErr := connection.DBState.Exec(`UPDATE public_keys SET pubkey = NULL WHERE userid = (?)`, &user.ID)
	if keyErr != nil {
		return false, nil
	}
	for _, i := range modifiedPubKeys {
		_, keyUpdateErr := connection.DBState.Exec(`UPDATE public_keys SET pubkey = pubkey || (?)::jsonb WHERE userid = (?)`, &i, &user.ID)
		if keyUpdateErr != nil {
			continue
		}
	}
	return true, nil
}

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

func (r *queryResolver) Gettoken(ctx context.Context, username *string, email *string, password string) (*model.GetTokenResponse, error) {
	if username == nil && email == nil {
		return nil, errors.New("Both username and email should not be empty!")
	}
	connection := database.GetContext(ctx)
	var user model.User
	if username != nil && email != nil {
		_, err := connection.DBState.QueryOne(&user, `SELECT * from users WHERE username = (?) AND email = (?)`, *username, *email)
		if err != nil {
			response := model.GetTokenResponse{
				Success: false,
				Token:   nil,
			}
			return &response, err
		}
	} else if username != nil && email == nil {
		_, err := connection.DBState.QueryOne(&user, `SELECT * from users WHERE username = (?)`, *username)
		if err != nil {
			response := model.GetTokenResponse{
				Success: false,
				Token:   nil,
			}
			return &response, err
		}
	} else {
		_, err := connection.DBState.QueryOne(&user, `SELECT * from users WHERE email = (?)`, *email)
		if err != nil {
			response := model.GetTokenResponse{
				Success: false,
				Token:   nil,
			}
			return &response, err
		}
	}
	passwordError := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if passwordError != nil {
		response := model.GetTokenResponse{
			Success: false,
			Token:   nil,
		}
		return &response, passwordError
	}
	token := uuid.New().String()
	_, tokenErr := connection.DBState.Exec(`UPDATE users SET token = (?) WHERE id = (?)`, &token, &user.ID)
	if tokenErr != nil {
		return nil, tokenErr
	}
	response := model.GetTokenResponse{
		Success: true,
		Token:   &token,
	}
	return &response, nil
}

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

func (r *queryResolver) Gettransactionlogs(ctx context.Context, token *string) ([]*model.GetTransactionLogs, error) {
	if token == nil {
		return nil, errors.New("Token must not be null!")
	}
	connection := database.GetContext(ctx)
	var user model.User
	_, err := connection.DBState.QueryOne(&user, `SELECT * FROM users WHERE token = (?)`, *token)
	if err != nil {
		return nil, err
	}
	var logs []*model.GetTransactionLogs
	_, logsErr := connection.DBState.Query(&logs, `SELECT userPublicKey, receiverPublicKey, sourceChain, destinationChain, 
											typeOfTransfer, transferDetails, transactionSignature, gas, status FROM logs 
											WHERE userid = (?)`, &user.ID)
	if logsErr != nil {
		return nil, logsErr
	}
	return logs, nil
}

func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
