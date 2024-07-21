import {
    Connection,
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    Transaction,
    clusterApiUrl,
  } from "@solana/web3.js";
  import {
    getKeypairFromFile
  } from "@solana-developers/helpers"
  import {
    createMintToCheckedInstruction,
    getOrCreateAssociatedTokenAccount,
    TOKEN_2022_PROGRAM_ID,
  } from "@solana/spl-token";


// initialize connection to cluster
const connection = new Connection(clusterApiUrl('devnet'))

// initialize tx payer
const payer = await getKeypairFromFile("~/.config/solana/id.json")
console.log(`Payer address -> ${payer.publicKey.toBase58()}`)

// initialize token mint
const mint = await getKeypairFromFile("./secrets/MNTcgzJoGVcJCx4asUF2iUdNtWgdtDniEHckFHchUZX.json")
const mintPubKey = mint.publicKey.toBase58()
console.log(`Mint address -> ${mintPubKey}`)


async function mintTokens(
    connection: Connection,
    payer: Keypair,
    mint: PublicKey,
    destination: PublicKey,
    authority: Keypair,
    amount: number
  ) {
    // Get the token account of the destination address, and if it does not exist, create it
    const associatedToken = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      destination,
      undefined,
      undefined,
      undefined,
      TOKEN_2022_PROGRAM_ID
    );
  
    // Mint tokens to the destination
    const transaction = new Transaction().add(
      createMintToCheckedInstruction(
        mint,
        associatedToken.address,
        authority.publicKey,
        amount,
        2, // Number of decimals in token
        undefined,
        TOKEN_2022_PROGRAM_ID
      )
    );
  
    // Send and confirm the transaction
    await sendAndConfirmTransaction(connection, transaction, [payer, authority]);
  
    console.log(`Minted ${amount} tokens to ${destination.toBase58()}`);
  }

// Mint tokens to arbitrary address
const mintAuthority = payer; 
const destinationAddress = new PublicKey('BwBHrx4WLSd8ACrTLrtuBoQD3X4TzXHLLUzySn57c9dU');
const amountToMint = 888800; 


try {

    await mintTokens(
        connection,
        payer,
        mint.publicKey,
        destinationAddress,
        mintAuthority,
        amountToMint
      );
    console.log(`Successfully minted ${amountToMint / 100} tokens to ${destinationAddress.toBase58()}`);
} catch (error) {
    console.error("Failed to mint tokens:", error);
}
