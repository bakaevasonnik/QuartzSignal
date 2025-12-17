# QuartzSignal

Built for Base

QuartzSignal is a Base-oriented starter repository that focuses on two core signals:
- user onboarding and wallet connection UX using OnchainKit
- deterministic Base network reads through a Viem public client (JSON-RPC)

The goal is not to ship a complex dapp, but to provide a clean, repeatable probe for Base readiness.

## Project File

Primary file: app/quartzSignal.ts

This app:
- initializes an OnchainKit provider scoped to the selected Base network
- renders the OnchainKit Wallet UI for connection flows
- queries the Base RPC for:
  - chainId
  - latest block number
  - native ETH balance for a provided address
- exposes Basescan explorers for transparent inspection

## Base Networks

Base Mainnet
- chainId (decimal): 8453  
- Explorer: https://basescan.org  
- RPC: https://mainnet.base.org  

Base Sepolia (testnet)
- chainId (decimal): 84532  
- Explorer: https://sepolia.basescan.org  
- RPC: https://sepolia.base.org  

## Repository Layout

- app/
  - quartzSignal.ts
    React entry point with OnchainKit wallet UX + Base RPC reads (Viem).

Recommended supporting files:
- package.json
- tsconfig.json
- index.html / main.tsx
- .env (optional)

## Dependencies

OnchainKit
- Wallet UX primitives and Base-first components
- Repository: https://github.com/coinbase/onchainkit

Viem
- EVM client used for Base JSON-RPC reads

## Installation

Requirements:
- Node.js 18+
- Browser environment (wallet UI + provider flows)

Install dependencies in the repo root using your preferred package manager and run via a standard React/Vite or Next.js dev server.

Optional environment variables:
- VITE_BASE_RPC_URL
- VITE_BASE_SEPOLIA_RPC_URL

## Running & Expected Output

Run in a browser and:
- select Base Sepolia (84532) for testing or Base Mainnet (8453) for production reads
- connect a wallet using OnchainKit
- paste an address to read balance
- run the probe

Expected output:
- RPC chainId and selected chain expectations
- latest block number
- ETH balance for the given address
- Basescan explorer reference for the chosen network

## Author

GitHub: https://github.com/bakaevasonnik

Public contact (email): oeuvre.furry-04@icloud.com 

Public contact (X): https://x.com/maiorovanasta1

## License

MIT License

## Testnet Deployment (Base Sepolia)

A Base Sepolia deployment is maintained as a practical checkpoint for testing the repository against a live Base test network.

**Network:** Base Sepolia  
**chainId (decimal):** 84532  
**Explorer:** https://sepolia.basescan.org  

**Contract #1 address:**  
0x93e52b1c6cd3b1312b973da59b968cabaa57df68 

Deployment and verification:
- https://sepolia.basescan.org/address/0x93e52b1c6cd3b1312b973da59b968cabaa57df68
- https://sepolia.basescan.org/0x93e52b1c6cd3b1312b973da59b968cabaa57df68/0#code  

**Contract #2 address:**  
0x4760605a20fadd6bfe15351b7c47b405e9dd4708

Deployment and verification:
- https://sepolia.basescan.org/address/0x4760605a20fadd6bfe15351b7c47b405e9dd4708  
- https://sepolia.basescan.org/0x4760605a20fadd6bfe15351b7c47b405e9dd4708/0#code  

This testnet setup is used to validate Base-compatible tooling, account abstraction-adjacent workflows, and read-only onchain operations before any Base Mainnet usage.
