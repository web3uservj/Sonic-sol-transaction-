# Sonic-sol-transaction-

# Solana SOL Transfer Bot

A Node.js application for sending SOL to multiple addresses on the Solana blockchain. This bot generates random Solana addresses and sends a specified amount of SOL from a given private key to these addresses. It includes balance checks to ensure that the sender's account has sufficient funds.

## Requirements

- [Node.js](https://nodejs.org/) (v20.13.1 or compatible)
- [NPM](https://www.npmjs.com/) (Node Package Manager)
- Solana wallet with sufficient SOL for transactions

## Setup

1. **Clone the Repository**

   git clone https://github.com/web3uservj/sonic-sol-transaction-.git
   cd sonic-so-transaction-


2. **install these packages using the following commands:**

    npm install @solana/web3.js bs58 dotenv

3. **Create a .env File**

    Create a .env file in the root of your project directory and add your private key:

    PRIVATE_KEY=<your_private_key>

4. **Configure Solana Network**

   By default, the script connects to a Solana devnet (https://devnet.sonic.game/). If you need to use a different endpoint, update the DEVNET_URL variable in index.js.

5. **Run the Script**

   Execute the script to start sending SOL:

   npm run start

   This command will run the index.js file, which generates 100 random addresses and sends 0.001 SOL to each address with a delay of 5 seconds between transactions.
