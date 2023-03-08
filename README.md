# ConsenSys zkEVM Messenger L1->L2 Example

> Send a message from L1 Goerli to L2 [ConsenSys zkEVM](https://docs.zkevm.consensys.net/) testnet.

## Example

There's two contracts; `L2Contract.sol` and `L1Contract.sol`

The L1 contract has a method `sendMessageToL2` that sends a message from L1 to L2 contract to set a greeting message on L2 contract.
It sends the encoded calldata to execute `setGreeting` on L2 which can only be called if the message was sent by the L1 contract.

### Files

- [`L2Contract.sol`](./contracts/L2Contract.sol)
- [`L1Contract.sol`](./contracts/L1Contract.sol)
- [`deployL2.js`](./script/deployL2.js)
- [`deployL1.js`](./scripts/deployL1.js)
- [`getRelayFee.js`](./scripts/getRelayFee.js)
- [`sendL1ToL2Message.js`](./scripts/sendL1ToL2Message.js)
- [`getGreetingOnL2.js`](./scripts/getGreetingOnL2.js)

## Install

```sh
git clone https://github.com/miguelmota/consensys-zkevm-messenger-l1-to-l2-example.git
cd consensys-zkevm-messenger-l1-to-l2-example
npm install
```

### Set Signer

Create `.env`

```sh
PRIVATE_KEY=123...
```

Make sure private key has funds on both Goerli and ConsenSys zkEVM testnet.

### Compile Contracts

```sh
npx hardhat compile
```

### Deploy L1 Contract

Command

```sh
npx hardhat run --network goerli scripts/deployL1.js
```

Output

```sh
L1Contract deployed to: 0x909c35f179c7cD151781f151A4d2a75528A8d2Fa
```

### Deploy L2 Contract

Command

```sh
L1_CONTRACT=0x909c35f179c7cD151781f151A4d2a75528A8d2Fa \
npx hardhat run --network consensyszk scripts/deployL2.js
```

Output

```sh
L2Contract deployed to: 0x0ef7281E3f746df91A350859271A8220F4B16519
```

### Get Relay Fee

Command

```sh
npx hardhat run --network goerli scripts/getRelayFee.js
```

Output

```sh
fee: 0.01
```

### Send L1->L2 Message

Command (replace env vars with your values)

```sh
GREETING="hello world" \
L2_CONTRACT=0x0ef7281E3f746df91A350859271A8220F4B16519 \
L1_CONTRACT=0x909c35f179c7cD151781f151A4d2a75528A8d2Fa \
npx hardhat run --network goerli scripts/sendL1ToL2Message.js
```

Output

```sh
sent tx hash 0x17d307327fea6e42837fb4e2ff0c3f6d2f6d8e95f659ac0cabd5a973c8d9a4f1
https://goerli.etherscan.io/tx/0x17d307327fea6e42837fb4e2ff0c3f6d2f6d8e95f659ac0cabd5a973c8d9a4f1
```

### Get Greeting on L2

Command

```sh
L2_CONTRACT=0x0ef7281E3f746df91A350859271A8220F4B16519 \
npx hardhat run --network consensyszk scripts/getGreetingOnL2.js
```

Output

```sh
greeting: hello world
```

### Send L2->L1 Message

See [https://github.com/miguelmota/consensys-zkevm-messenger-l1-to-l2-example](https://github.com/miguelmota/consensys-zkevm-messenger-l1-to-l2-example)

## License

[MIT](./LICENSE) @ [Miguel Mota](https://github.com/miguelmota)
