Testing token extensions 2022 - Useful commands and links

solana-keygen grind --starts-with ToK:1
solana transfer ToKH49QL3zz5kzofDuwgdiMzzUZM3R9WvYp5QJA5vdy 1 --allow-unfunded-recipient
`solana config set --url https://api.devnet.solana.com`

#### CONFIDENTIAL TRANSFERS

`spl-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb create-token --enable-confidential-transfers auto`
https://github.com/solana-labs/solana-program-library/tree/master/token/program-2022/src/extension
https://spl.solana.com/token-2022/extensions

solana-keygen grind --starts-with ToK:1
solana transfer ToKH49QL3zz5kzofDuwgdiMzzUZM3R9WvYp5QJA5vdy 1 --allow-unfunded-recipient

spl-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb create-token --enable-confidential-transfers auto
spl-token mint DnpgXJQ4mpfGsKRwSs2Dhe177GndNVbWNXR2NJyBbgjo 100
spl-token deposit-confidential-tokens DnpgXJQ4mpfGsKRwSs2Dhe177GndNVbWNXR2NJyBbgjo 1 --address AuqnFXyvQpAhk1AFPdsE5TWGGgPaZC4vLEdpet335YK3
spl-token account-info DnpgXJQ4mpfGsKRwSs2Dhe177GndNVbWNXR2NJyBbgjo --url https://api.devnet.solana.com

Mint: DnpgXJQ4mpfGsKRwSs2Dhe177GndNVbWNXR2NJyBbgjo
Account: AuqnFXyvQpAhk1AFPdsE5TWGGgPaZC4vLEdpet335YK3
User: 7CTJ6QEiuZMJmiPYQJYPboiuiNsdmEtFPN4Zy3VGkjQ8


#### METADATA

spl-token create-token --program-id  TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb --enable-metadata ./ToKkcerTwG2Km1DPdaP2bKjggZQ8U3jctQNPR6Kyths.json

spl-token initialize-metadata 5DUbpe4oZfiGBeiYRU9fDfcLc9CT5yNogYY87GNDXz9X <YOUR_TOKEN_NAME> <YOUR_TOKEN_SYMBOL> <YOUR_TOKEN_URI>
spl-token initialize-metadata 5DUbpe4oZfiGBeiYRU9fDfcLc9CT5yNogYY87GNDXz9X Hubris HUB https://arweave.net/1FqdFEIoJEnggXeLnDeYjOVGQ1ZyWqyTPZlQh_s_SFg

Create associated token account:
spl-token create-account 5DUbpe4oZfiGBeiYRU9fDfcLc9CT5yNogYY87GNDXz9X

Create second associated token account:
spl-token create-account 5DUbpe4oZfiGBeiYRU9fDfcLc9CT5yNogYY87GNDXz9X --owner ToKH49QL3zz5kzofDuwgdiMzzUZM3R9WvYp5QJA5vdy --fee-payer ./ToKH49QL3zz5kzofDuwgdiMzzUZM3R9WvYp5QJA5vdy.json

spl-token mint <TOKEN_ADDRESS> <AMOUNT> [OPTIONAL_RECIPIENT_ADDRESS]
spl-token mint 5DUbpe4oZfiGBeiYRU9fDfcLc9CT5yNogYY87GNDXz9X 8888 AjC4WLv3BdxGAVJiNWGfAXmwTBRB3ie7c8dCnKvmrbKs


spl-token mint 5DUbpe4oZfiGBeiYRU9fDfcLc9CT5yNogYY87GNDXz9X 8888
