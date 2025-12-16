// app/quartzSignal.ts
import React, { useMemo, useState } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { Wallet } from "@coinbase/onchainkit/wallet";
import { Connected } from "@coinbase/onchainkit/connected";
import { createPublicClient, http, formatEther, type Address } from "viem";
import { base, baseSepolia } from "viem/chains";

type Network = "base" | "baseSepolia";

const RPC = {
  base: "https://mainnet.base.org",
  baseSepolia: "https://sepolia.base.org",
};

const EXPLORER = {
  base: "https://basescan.org",
  baseSepolia: "https://sepolia.basescan.org",
};

const CHAIN_ID = {
  base: 8453,
  baseSepolia: 84532,
};

function isAddress(v: string): v is Address {
  return /^0x[a-fA-F0-9]{40}$/.test(v.trim());
}

export default function QuartzSignal() {
  const [network, setNetwork] = useState<Network>("baseSepolia");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Idle");
  const [rpcChainId, setRpcChainId] = useState<number | null>(null);
  const [block, setBlock] = useState<bigint | null>(null);
  const [balance, setBalance] = useState<bigint | null>(null);

  const chain = network === "base" ? base : baseSepolia;

  const client = useMemo(
    () =>
      createPublicClient({
        chain,
        transport: http(RPC[network]),
      }),
    [chain, network]
  );

  async function inspect() {
    setStatus("Inspecting Base RPC…");

    const [cid, blockNumber] = await Promise.all([
      client.getChainId(),
      client.getBlockNumber(),
    ]);

    setRpcChainId(cid);
    setBlock(blockNumber);

    if (isAddress(address)) {
      const bal = await client.getBalance({ address });
      setBalance(bal);
    } else {
      setBalance(null);
    }

    setStatus("Finished");
  }

  return (
    <OnchainKitProvider chain={chain}>
      <div style={{ maxWidth: 900, margin: "44px auto", fontFamily: "system-ui", lineHeight: 1.4 }}>
        <h1 style={{ marginBottom: 6 }}>QuartzSignal — Built for Base</h1>
        <div style={{ opacity: 0.8, marginBottom: 16 }}>
          Wallet onboarding via OnchainKit, plus Base RPC reads (chainId, block height, balance) using Viem.
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <label>
            Network:&nbsp;
            <select value={network} onChange={(e) => setNetwork(e.target.value as Network)}>
              <option value="baseSepolia">Base Sepolia (84532)</option>
              <option value="base">Base Mainnet (8453)</option>
            </select>
          </label>

          <button onClick={inspect} style={{ padding: "6px 12px" }}>
            Run Probe
          </button>

          <div>
            Status:&nbsp;<strong>{status}</strong>
          </div>
        </div>

        <div style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
          <OnchainKitProvider chain={chain}>
            <Wallet />
            <Connected>
              <div style={{ marginTop: 12 }}>
                <div style={{ marginBottom: 8 }}>Address to read balance from:</div>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="0x…"
                  style={{ width: "100%", padding: 8 }}
                />
              </div>
            </Connected>
          </OnchainKitProvider>
        </div>

        <div style={{ marginTop: 14, border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
          <h2 style={{ marginTop: 0 }}>Base Read Results</h2>
          <div>Expected chainId: {CHAIN_ID[network]}</div>
          <div>RPC chainId: {rpcChainId ?? "—"}</div>
          <div>Latest block: {block !== null ? block.toString() : "—"}</div>
          <div>Native balance: {balance !== null ? `${formatEther(balance)} ETH` : "—"}</div>
          <div style={{ marginTop: 10 }}>
            Explorer: {EXPLORER[network]}
          </div>
        </div>
      </div>
    </OnchainKitProvider>
  );
}
