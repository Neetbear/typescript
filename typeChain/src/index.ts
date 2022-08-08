import crypto from "crypto";
import { BlockList } from "net";

interface BlockShape {
    hash: string;
    prevHash: string;
    height: number;
    data: string;
    timestamp: number;
}
class Block implements BlockShape {
    public hash: string;
    public timestamp: number;
    constructor (
        public prevHash: string,
        public height: number,
        public data: string
    ) {
        this.timestamp = Date.now();
        this.hash = Block.calculateHash(prevHash, height, data, this.timestamp);
    }
    static calculateHash(prevHash: string, height: number, data: string, timestamp: number): string {
        const toHash = `${prevHash}${height}${data}${timestamp}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

class BlockChain {
    private blocks: Block[];
    constructor () {
        this.blocks = []
    }
    private getPrevHash() {
        if(this.blocks.length === 0) return "";
        return this.blocks[this.blocks.length - 1].hash;
    }
    public addBlock(data: string) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
        this.blocks.push(newBlock);
    }
    public getBlock() {
        return [...this.blocks];
    }
}

const blockChain = new BlockChain();
blockChain.addBlock("First one");
blockChain.addBlock("Second one");
blockChain.addBlock("Third one");

console.log(blockChain.getBlock());