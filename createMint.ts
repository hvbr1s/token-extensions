import {
    Connection,
    Keypair,
    SystemProgram,
    Transaction,
    clusterApiUrl,
    sendAndConfirmTransaction,
  } from "@solana/web3.js";
  import {
    ExtensionType,
    TOKEN_2022_PROGRAM_ID,
    createInitializeMintInstruction,
    getMintLen,
    createInitializeMetadataPointerInstruction,
    getTokenMetadata,
    TYPE_SIZE,
    LENGTH_SIZE,
  } from "@solana/spl-token";
  import {
    createInitializeInstruction,
    createUpdateFieldInstruction,
    pack,
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
        ["level", "1"]
    ]

}

// calculate required mint space
const mintSpace =  getMintLen([
    ExtensionType.MetadataPointer
])
const metadataSpace = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length // 2 bytes + 2 bytes + size of metadata object

// ask the blockchain how many lamports arer equired to allocate to our mint and metadata
const lamports =  await connection.getMinimumBalanceForRentExemption(
    mintSpace + metadataSpace
)

// initialize account onchain
const createAccountIx =  SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: mint.publicKey,
    space: mintSpace, // with token extensions allocating mintspace is required before we initialize the metadata
    lamports,
    programId: TOKEN_2022_PROGRAM_ID
})

// initialize the metadata pointer
const initializeMetadataPointerIx =  createInitializeMetadataPointerInstruction(
    mint.publicKey,
    payer.publicKey,
    mint.publicKey,
    TOKEN_2022_PROGRAM_ID
)

// initialize the mint
const initializeMintIx = createInitializeMintInstruction(
    mint.publicKey,
    2,
    payer.publicKey,
    null,
    TOKEN_2022_PROGRAM_ID
)

// initialize metadata account
const initializeMetadataIx = createInitializeInstruction({
    mint: mint.publicKey,
    metadata: mint.publicKey,
    mintAuthority: payer.publicKey,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
    programId: TOKEN_2022_PROGRAM_ID,
    updateAuthority: payer.publicKey
    // we don't add the additional metadata yet, this need to be added in a separate instructions
})

// prepare the update to the first metadata field
const updateMetadataFieldOneIx = createUpdateFieldInstruction({
    metadata: mint.publicKey,
    programId: TOKEN_2022_PROGRAM_ID,
    updateAuthority: payer.publicKey, // this must be the same authority as the metadata pointer
    field: metadata.additionalMetadata[0][0],
    value: metadata.additionalMetadata[0][1],
})

// prepare the update to the second metadata field

const updateMetadataFieldTwoIx = createUpdateFieldInstruction({
    metadata: mint.publicKey,
    programId: TOKEN_2022_PROGRAM_ID,
    updateAuthority: payer.publicKey, // this must be the same authority as the metadata pointer
    field: metadata.additionalMetadata[1][0],
    value: metadata.additionalMetadata[1][1],
})

// prepare the update to the third metadata field
const updateMetadataFieldThreeIx = createUpdateFieldInstruction({
    metadata: mint.publicKey,
    programId: TOKEN_2022_PROGRAM_ID,
    updateAuthority: payer.publicKey, // this must be the same authority as the metadata pointer
    field: metadata.additionalMetadata[2][0],
    value: metadata.additionalMetadata[2][1],
})

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
    createAccountIx,
    initializeMetadataPointerIx, // NOTE: the pointer must always be ordered before the MintIx because the pointer must be initialized first
    initializeMintIx,
    initializeMetadataIx,
    // once our account and metadata is initialize, only then we update the metadata fields
    updateMetadataFieldOneIx,
    updateMetadataFieldTwoIx,
    updateMetadataFieldThreeIx,
    updateMetadataFieldFourthIx
)

// sign and print transaction
const sig = await sendAndConfirmTransaction(
    connection, 
    transaction,
    [payer, mint]
)
console.log(`Signature -> ${sig}`)

// display updated metadata

const chainMetadata =  await getTokenMetadata(
    connection,
    mint.publicKey
)
console.log(`Metadata -> ${chainMetadata?.additionalMetadata}`)

// mint address: https://solana.fm/address/MNTcgzJoGVcJCx4asUF2iUdNtWgdtDniEHckFHchUZX/transactions
// doc: https://solana.com/developers/guides/token-extensions/metadata-pointer
