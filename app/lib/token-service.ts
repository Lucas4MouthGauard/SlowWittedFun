import { 
  Connection, 
  PublicKey, 
  Keypair
} from '@solana/web3.js';
import { 
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';

export interface TokenCreationParams {
  name: string;
  symbol: string;
  description?: string;
  website?: string;
  x?: string;
  telegram?: string;
  initialSupply: number;
  decimals: number;
}

export interface TokenCreationResult {
  mint: string;
  tokenAccount: string;
  transactionSignature: string;
}

export class TokenService {
  private connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async createToken(
    payer: Keypair,
    params: TokenCreationParams
  ): Promise<TokenCreationResult> {
    try {
      // 1. 创建代币铸造账户
      const mint = await createMint(
        this.connection,
        payer,
        payer.publicKey,
        payer.publicKey,
        params.decimals,
        undefined,
        undefined,
        TOKEN_PROGRAM_ID
      );

      // 2. 创建关联代币账户
      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        this.connection,
        payer,
        mint,
        payer.publicKey
      );

      // 3. 铸造初始供应量
      const mintTx = await mintTo(
        this.connection,
        payer,
        mint,
        tokenAccount.address,
        payer,
        params.initialSupply * Math.pow(10, params.decimals)
      );

      console.log('Token created successfully:', {
        mint: mint.toString(),
        tokenAccount: tokenAccount.address.toString(),
        mintTx: mintTx
      });

      return {
        mint: mint.toString(),
        tokenAccount: tokenAccount.address.toString(),
        transactionSignature: mintTx
      };

    } catch (error) {
      console.error('Token creation failed:', error);
      throw new Error(`Failed to create token: ${error}`);
    }
  }

  async getTokenInfo(mintAddress: string) {
    try {
      const mint = new PublicKey(mintAddress);
      const mintInfo = await this.connection.getAccountInfo(mint);
      
      if (!mintInfo) {
        throw new Error('Token not found');
      }

      return {
        mint: mintAddress,
        supply: mintInfo.data.readBigUInt64LE(36),
        decimals: mintInfo.data.readUInt8(44),
        isInitialized: mintInfo.data.readUInt8(45) === 1,
        freezeAuthority: mintInfo.data.readUInt8(46) === 1
      };
    } catch (error) {
      console.error('Failed to get token info:', error);
      throw error;
    }
  }
} 