import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, Signer } from "@solana/web3.js";
import { Chains, Platform, TransferType } from "./constant";

export async function handleSingleChainTransaction(chain: Chains, senderPrivateSecretKey: string, senderPublicKey: string, receiverPublicKey: string, transferType: TransferType, platform: Platform, amount?: number, nftAddress?: string) {
    switch (chain) {
        case Chains.SOLANA:
            if (transferType === TransferType.TOKEN) {
                if (platform === Platform.MAINNET) {
                    const transaction: Transaction = new Transaction();
                    transaction.add(SystemProgram.transfer({
                        fromPubkey: new PublicKey(senderPublicKey),
                        toPubkey: new PublicKey(receiverPublicKey),
                        lamports: amount! * LAMPORTS_PER_SOL
                    }));
                    const signer: Signer = {
                        publicKey: new PublicKey(senderPublicKey),
                        secretKey: Buffer.from(senderPrivateSecretKey, "hex")
                    }
                    const connection: Connection = new Connection(clusterApiUrl("mainnet-beta"));
                    const status: string = await sendAndConfirmTransaction(connection, transaction, [signer]);
                    return status;
                } else {

                }
            } else {

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