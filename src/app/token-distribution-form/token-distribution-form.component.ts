import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { getOrCreateAssociatedTokenAccount, createTransferInstruction } from "@solana/spl-token";
import { Connection, Keypair, ParsedAccountData, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";
import secret from '../../assets/guideSecret.json';

@Component({
  selector: 'app-token-distribution-form',
  templateUrl: './token-distribution-form.component.html',
  styleUrls: ['./token-distribution-form.component.scss']
})
export class TokenDistributionFormComponent implements OnInit {
  walletAddress: string = '';
  amount: number = 0;
  isSubmitting: boolean = false;
  endpoint = 'https://api.devnet.solana.com/';
  SOLANA_CONNECTION: any;
  FROM_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(secret));
  MINT_ADDRESS = 'BQi3xCLLJferBFX9vr1g68cV8nKpBGLJ6825izTkNUF2';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.SOLANA_CONNECTION = new Connection(this.endpoint);
  }

  async onSubmit() {
    // Do something with walletAddress and amount
    this.isSubmitting = true;
    console.log('Wallet Address:', this.walletAddress);
    console.log('Amount:', this.amount);
    try{
    await this.sendTokens();
    } catch(error) {
      console.error('Error occurred:', error);
      this.isSubmitting = false;
    }
    
  }

  async sendTokens() {

    console.log(`Sending ${this.amount} ${(this.MINT_ADDRESS)} from ${(this.FROM_KEYPAIR.publicKey.toString())} to ${(this.walletAddress)}.`)
    //Step 1
    console.log(`1 - Getting Source Token Account`);
    let sourceAccount = await getOrCreateAssociatedTokenAccount(
        this.SOLANA_CONNECTION, 
        this.FROM_KEYPAIR,
        new PublicKey(this.MINT_ADDRESS),
        this.FROM_KEYPAIR.publicKey
    );
    console.log(`    Source Account: ${sourceAccount.address.toString()}`);

        //Step 2
        console.log(`2 - Getting Destination Token Account`);
        let destinationAccount = await getOrCreateAssociatedTokenAccount(
            this.SOLANA_CONNECTION, 
            this.FROM_KEYPAIR,
            new PublicKey(this.MINT_ADDRESS),
            new PublicKey(this.walletAddress)
        );
        console.log(`    Destination Account: ${destinationAccount.address.toString()}`);

            //Step 3
    console.log(`3 - Fetching Number of Decimals for Mint: ${this.MINT_ADDRESS}`);
    const numberDecimals = await this.getNumberDecimals(this.MINT_ADDRESS);
    console.log(`    Number of Decimals: ${numberDecimals}`);

        //Step 4
        console.log(`4 - Creating and Sending Transaction`);
        const tx = new Transaction();
        tx.add(createTransferInstruction(
            sourceAccount.address,
            destinationAccount.address,
            this.FROM_KEYPAIR.publicKey,
            this.amount * Math.pow(10, numberDecimals)
        ))

        const latestBlockHash = await this.SOLANA_CONNECTION.getLatestBlockhash('confirmed');
        tx.recentBlockhash = await latestBlockHash.blockhash;    
        const signature = await sendAndConfirmTransaction(this.SOLANA_CONNECTION,tx,[this.FROM_KEYPAIR]);
        console.log(
            '\x1b[32m', //Green Text
            `   Transaction Success!🎉`,
            `\n    https://explorer.solana.com/tx/${signature}?cluster=devnet`
        );

}

async  getNumberDecimals(mintAddress: string):Promise<number> {
  const info = await this.SOLANA_CONNECTION.getParsedAccountInfo(new PublicKey(this.MINT_ADDRESS));
  const result = (info.value?.data as ParsedAccountData).parsed.info.decimals as number;
  return result;
}

  
  
}
