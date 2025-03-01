"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { flowMainnet } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";
import { injected, walletConnect } from "@wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const config = createConfig(
    getDefaultConfig({
        connectors: [
            injected(),
            walletConnect({
                showQrModal: false,
                projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
            }),
        ],

        transports: {
            [flowMainnet.id]: http(
                "https://testnet.evm.nodes.onflow.org"
            ),
            //   [flowMainnet.id]: http("https://mainnet.evm.nodes.onflow.org"),
        },
        // Your dApps chains
        chains: [flowMainnet],

        // Required API Keys
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

        // Required App Info
        appName: "PumpFlow",

        // Optional App Info
        appDescription: "Your gateway to generate secure meme coins",
    })
);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient();

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ConnectKitProvider
                    theme="auto"
                    mode="dark"
                    customTheme={{
                        "--ck-connectbutton-font-size": "8px",
                    }}
                >
                    {children}
                </ConnectKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
