const {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  Keypair,
} = require('@solana/web3.js');
const bs58 = require('bs58');
require('dotenv').config();

const DEVNET_URL = 'https://devnet.sonic.game/';
const connection = new Connection(DEVNET_URL, 'confirmed');

async function sendSol(fromKeypair, toPublicKey, amount) {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: toPublicKey,
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  const signature = await sendAndConfirmTransaction(connection, transaction, [fromKeypair]);

  console.log('Transaction confirmed with signature:', signature);
}

function generateRandomAddresses(count) {
  const addresses = [];
  for (let i = 0; i < count; i++) {
    const keypair = Keypair.generate();
    addresses.push(keypair.publicKey.toString());
  }
  return addresses;
}

function getKeypairFromPrivateKey(privateKey) {
  let keyBuffer;

  try {
    keyBuffer = bs58.decode(privateKey);
  } catch (error) {
    throw new Error('Failed to decode the private key. Ensure it is Base58 encoded.');
  }

  if (keyBuffer.length !== 64) {
    throw new Error('Invalid private key length after decoding. Expected 64 bytes.');
  }

  return Keypair.fromSecretKey(keyBuffer);
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getBalance(publicKey) {
  const balance = await connection.getBalance(publicKey);
  return balance / LAMPORTS_PER_SOL;
}

(async () => {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('PRIVATE_KEY is not set in the .env file');
  }
  const fromKeypair = getKeypairFromPrivateKey(privateKey);

  const randomAddresses = generateRandomAddresses(100);
  console.log('Generated 100 random addresses:', randomAddresses);

  const amountToSend = 0.001;
  const delayBetweenRequests = 5000;

  const senderBalance = await getBalance(fromKeypair.publicKey);
  const totalAmountToSend = amountToSend * randomAddresses.length;

  if (senderBalance < totalAmountToSend) {
    console.error(`Insufficient funds. Available: ${senderBalance} SOL, Required: ${totalAmountToSend} SOL`);
    return;
  }

  for (const address of randomAddresses) {
    const toPublicKey = new PublicKey(address);
    try {
      await sendSol(fromKeypair, toPublicKey, amountToSend);
      console.log(`Successfully sent ${amountToSend} SOL to ${address}`);
    } catch (error) {
      console.error(`Failed to send SOL to ${address}:`, error);
    }
    await delay(delayBetweenRequests);
  }
})();
