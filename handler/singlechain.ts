import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, Signer } from "@solana/web3.js";
import { Chains, Platform, TransferType } from "./constant";
import bs58 from "bs58";
import { createTransferCheckedInstruction, getAssociatedTokenAddress } from "@solana/spl-token";

export async function handleSingleChainTransaction(chain: Chains, senderPrivateSecretKey: string, senderPublicKey: string, receiverPublicKey: string, transferType: TransferType, platform: Platform, amount?: number, nftMintAddress?: string, nftTokenAccount?: string): Promise<[string, number | null] | undefined> {
    switch (chain) {
        case Chains.SOLANA:
            if (transferType === TransferType.TOKEN) {
                if (platform === Platform.MAINNET) {
                    const SolanaTransaction: Transaction = new Transaction();
                    SolanaTransaction.add(SystemProgram.transfer({
                        fromPubkey: new PublicKey(senderPublicKey),
                        toPubkey: new PublicKey(receiverPublicKey),
                        lamports: amount! * LAMPORTS_PER_SOL
                    }));
                    const SolanaSigner: Signer = {
                        publicKey: new PublicKey(senderPublicKey),
                        secretKey: bs58.decode(senderPrivateSecretKey)
                    };
                    const SolanaConnection: Connection = new Connection(clusterApiUrl("mainnet-beta"));
                    const SolanaGasFee: number | null = await SolanaTransaction.getEstimatedFee(SolanaConnection);
                    const SolanaStatus: string = await sendAndConfirmTransaction(SolanaConnection, SolanaTransaction, [SolanaSigner]);
                    return [SolanaStatus, SolanaGasFee];
                } else {
                    const SolanaTransaction: Transaction = new Transaction();
                    SolanaTransaction.add(SystemProgram.transfer({
                        fromPubkey: new PublicKey(senderPublicKey),
                        toPubkey: new PublicKey(receiverPublicKey),
                        lamports: amount! * LAMPORTS_PER_SOL
                    }));
                    const SolanaSigner: Signer = {
                        publicKey: new PublicKey(senderPublicKey),
                        secretKey: bs58.decode(senderPrivateSecretKey)
                    };
                    const SolanaConnection: Connection = new Connection(clusterApiUrl("devnet"));
                    const SolanaGasFee: number | null = await SolanaTransaction.getEstimatedFee(SolanaConnection);
                    const SolanaStatus: string = await sendAndConfirmTransaction(SolanaConnection, SolanaTransaction, [SolanaSigner]);
                    return [SolanaStatus, SolanaGasFee];      
                }
            } else {
                if (platform === Platform.MAINNET) {
                    let SolanaNftStatus: string | null = null;
                    if (nftMintAddress === null || nftTokenAccount === null) {
                        SolanaNftStatus = "failed";
                        return [SolanaNftStatus, null];
                    }
                    const SolanaNftTransaction: Transaction = new Transaction();
                    const receiverTokenAccount: PublicKey = await getAssociatedTokenAddress(new PublicKey(nftMintAddress!), new PublicKey(receiverPublicKey)); 
                    SolanaNftTransaction.add(
                        createTransferCheckedInstruction(new PublicKey(nftTokenAccount!), new PublicKey(nftMintAddress!), receiverTokenAccount, new PublicKey(senderPublicKey), 1, 0)
                    )
                    const SolanaNftSigner: Signer = {
                        publicKey: new PublicKey(senderPublicKey),
                        secretKey: bs58.decode(senderPrivateSecretKey)
                    }
                    const SolanaNftConnection: Connection = new Connection(clusterApiUrl("mainnet-beta"));
                    const SolanaGasFee: number | null = await SolanaNftTransaction.getEstimatedFee(SolanaNftConnection);
                    SolanaNftStatus = await sendAndConfirmTransaction(SolanaNftConnection, SolanaNftTransaction, [SolanaNftSigner]);
                    return [SolanaNftStatus, SolanaGasFee];
                } else {
                    let SolanaNftStatus: string | null = null;
                    if (nftMintAddress === null || nftTokenAccount === null) {
                        SolanaNftStatus = "failed";
                        return [SolanaNftStatus, null];
                    }
                    const SolanaNftTransaction: Transaction = new Transaction();
                    const receiverTokenAccount: PublicKey = await getAssociatedTokenAddress(new PublicKey(nftMintAddress!), new PublicKey(receiverPublicKey)); 
                    SolanaNftTransaction.add(
                        createTransferCheckedInstruction(new PublicKey(nftTokenAccount!), new PublicKey(nftMintAddress!), receiverTokenAccount, new PublicKey(senderPublicKey), 1, 0)
                    )
                    const SolanaNftSigner: Signer = {
                        publicKey: new PublicKey(senderPublicKey),
                        secretKey: bs58.decode(senderPrivateSecretKey)
                    }
                    const SolanaNftConnection: Connection = new Connection(clusterApiUrl("devnet"));
                    const SolanaGasFee: number | null = await SolanaNftTransaction.getEstimatedFee(SolanaNftConnection);
                    SolanaNftStatus = await sendAndConfirmTransaction(SolanaNftConnection, SolanaNftTransaction, [SolanaNftSigner]);
                    return [SolanaNftStatus, SolanaGasFee];
                }
            }
        case Chains.POLKADOT:
            if (transferType === TransferType.TOKEN) {

            } else {

            }
        case Chains.ETHERIUM:
            if (transferType === TransferType.TOKEN) {

            } else {

            }
        case Chains.ARBITRUM:
            if (transferType === TransferType.TOKEN) {

            } else {

            }
        case Chains.POLYGON:
            if (transferType === TransferType.TOKEN) {

            } else {

            }
    }
}