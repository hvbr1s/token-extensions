import { getKeypairFromFile, getMintLen } from '@solana-developers/helpers'
import { TokenMetadata} from '@solana/spl-token-metadata'
import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js'

// initialize connection to cluster
const connection = new Connection(clusterApiUrl('devnet'))

// initialize tx payer
const payer = await getKeypairFromFile("~/.config/solana/id.json")
console.log(`Payer address -> ${payer.publicKey.toBase58()}`)

// initialize token mint
const mint = Keypair.generate()
const mintPubKey = mint.publicKey.toBase58()
console.log(`Mint address -> ${mintPubKey}`)

// prepare metadata
const metadata: TokenMetadata = {
    mint: mintPubKey,
    name: "Goodboi",
    symbol: "BOI",
    uri: "https://arweave.net/YHrD7jgvUBRCGhFEUko-SphA6EGl9ZDIMaFc-dQTMTg",
    additionalMetadata:[
        ["mood" , "sleepy"],
        ["character" , "good boi"]
    ]

}

// calculate mint space
const mintSpace =  getMintLen([
    ExtensionType.MetadataPointer
])


//// WIP
