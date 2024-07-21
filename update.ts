import {
    Connection,
    Transaction,
    clusterApiUrl,
    sendAndConfirmTransaction,
  } from "@solana/web3.js";
  import {
    TOKEN_2022_PROGRAM_ID,
    getTokenMetadata,
  } from "@solana/spl-token";
  import {
    createUpdateFieldInstruction,
    TokenMetadata,
  } from "@solana/spl-token-metadata";
  import {
    getKeypairFromFile
  } from "@solana-developers/helpers"

// initialize connection to cluster
const connection = new Connection(clusterApiUrl('devnet'))

// initialize tx payer
const payer = await getKeypairFromFile("~/.config/solana/id.json")
console.log(`Payer address -> ${payer.publicKey.toBase58()}`)

// initialize token mint
const mint = await getKeypairFromFile("./secrets/MNTcgzJoGVcJCx4asUF2iUdNtWgdtDniEHckFHchUZX.json")
const mintPubKey = mint.publicKey.toBase58()
console.log(`Mint address -> ${mintPubKey}`)



// structure metadata
const metadata: TokenMetadata = {
    mint: mint.publicKey,
    name: "Goodboi",
    symbol: "BOI",
    uri: "https://arweave.net/YHrD7jgvUBRCGhFEUko-SphA6EGl9ZDIMaFc-dQTMTg",
    additionalMetadata:[
        ["breed", "dawg"],
        ["mood" , "sleepy"],
        ["character" , "good boi"],
        ["level", "28"]
    ]

}

// prepare the update to the fourth metadata field
const updateMetadataFieldFourthIx = createUpdateFieldInstruction({
    metadata: mint.publicKey,
    programId: TOKEN_2022_PROGRAM_ID,
    updateAuthority: payer.publicKey, // this must be the same authority as the metadata pointer
    field: metadata.additionalMetadata[3][0],
    value: metadata.additionalMetadata[3][1],
})

// prepare transaction
const transaction = new Transaction().add(
    updateMetadataFieldFourthIx
)

// sign and print transaction
const sig = await sendAndConfirmTransaction(
    connection, 
    transaction,
    [payer]
)
console.log(`Signature -> ${sig}`)

// display updated metadata

const chainMetadata =  await getTokenMetadata(
    connection,
    mint.publicKey
)
console.log(`Metadata -> ${chainMetadata?.additionalMetadata}`)
