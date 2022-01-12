const {Connection, PublicKey, clusterApiUrl, Keypair, LAMPORTS_PER_SOL, Transaction, Account} = require("@solana/web3.js");

//Keypair class allows us to create a new wallet object of type Keypair
const mykeypair = new Keypair();

//Extracting public and secret key from our wallet
const publicKey = new PublicKey(mykeypair._keypair.publicKey).toString();
const secretKey = mykeypair._keypair.secretKey;

const getWalletBalance = async() => {
    try{
        console.log("OI");
        // conn object to get balance -> clusterApiUrl provides URL for devnet
        const conn = new Connection(clusterApiUrl("devnet"),"confirmed");
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const walletBalance = await conn.getBalance(new PublicKey(myWallet.publicKey));
        console.log(`   Test address generated -> ${publicKey}`);
        console.log(`   Current Wallet Balance : ${parseInt(walletBalance)/LAMPORTS_PER_SOL} SOL`);
    }
    catch(error){
        console.log("Following error has occured: ");
        console.log(error);
    }
};

const airDropSol = async() => {
    try{
        const conn = new Connection(clusterApiUrl("devnet"),"confirmed");
        const walletkeypair = await Keypair.fromSecretKey(secretKey);
        console.log(`-- Airdropping 2 SOL --`);
        const fromAirDropSignature = await conn.requestAirdrop(new PublicKey(walletkeypair.publicKey),2*LAMPORTS_PER_SOL);
        await conn.confirmTransaction(fromAirDropSignature);
    }
    catch(error){
        console.log("Following error has occured: ");
        console.log(error);
    }
};

const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}
driverFunction();

