package model

type CreateUserResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type GetPublicKeyResponse struct {
	Pubkeys [][]*PublicKeyWithChain `json:"pubkeys"`
}

type GetTokenResponse struct {
	Success bool    `json:"success"`
	Token   *string `json:"token,omitempty"`
}

type GetTransactionLogs struct {
	UserPublicKey        string  `json:"userPublicKey"`
	ReceiverPublicKey    string  `json:"receiverPublicKey"`
	SourceChain          int     `json:"sourceChain"`
	DestinationChain     int     `json:"destinationChain"`
	TypeOfTransfer       int     `json:"typeOfTransfer"`
	TransferDetails      *string `json:"transferDetails,omitempty"`
	TransactionSignature *string `json:"transactionSignature,omitempty"`
	Gas                  *string `json:"gas,omitempty"`
	Status               int     `json:"status"`
}

type Logs struct {
	UserPublicKey        string  `json:"userPublicKey"`
	ReceiverPublicKey    string  `json:"receiverPublicKey"`
	SourceChain          int     `json:"sourceChain"`
	DestinationChain     int     `json:"destinationChain"`
	TypeOfTransfer       int     `json:"typeOfTransfer"`
	TransferDetails      *string `json:"transferDetails,omitempty"`
	TransactionSignature *string `json:"transactionSignature,omitempty"`
	Gas                  *string `json:"gas,omitempty"`
	Status               int     `json:"status"`
}

type Mutation struct {
}

type PublicKeyWithChain struct {
	Chain     int    `json:"chain"`
	PublicKey string `json:"publicKey"`
}

type PublicKeyWithMetaData struct {
	Chain     int    `json:"chain"`
	PublicKey string `json:"publicKey"`
}

type Query struct {
}

type SaveLogsResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type User struct {
	ID       int     `json:"id"`
	Username string  `json:"username"`
	Email    string  `json:"email"`
	Password string  `json:"password"`
	Token    *string `json:"token,omitempty"`
}
