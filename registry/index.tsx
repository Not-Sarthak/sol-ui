import * as React from "react";

import { Registry } from "@/registry/schema";

const ui: Registry = {
  "priority-modal": {
    name: "priority-modal",
    type: "components:solui",
    files: ["registry/components/solui/priority-modal.tsx"],
  },
  "slippage-settings-modal": {
    name: "slippage-settings-modal",
    type: "components:solui",
    files: ["registry/components/solui/slippage-settings-modal.tsx"],
  },
  "nft-card": {
    name: "nft-card",
    type: "components:solui",
    files: ["registry/components/solui/nft-card.tsx"],
  },
  "wallet-connect": {
    name: "wallet-connect",
    type: "components:solui",
    files: ["registry/components/solui/wallet-connect.tsx"],
  },
  "ipfs-upload": {
    name: "ipfs-upload",
    type: "components:solui",
    files: ["registry/components/solui/ipfs-upload.tsx"],
  },
  "token-dropdown": {
    name: "token-dropdown",
    type: "components:solui",
    files: ["registry/components/solui/token-dropdown.tsx"],
  },
  "swap-ui": {
    name: "swap-ui",
    type: "components:solui",
    files: ["registry/components/solui/swap-ui.tsx"],
  },
};

const example: Registry = {
  "priority-modal-demo": {
    name: "priority-modal-demo",
    type: "components:example",
    registryDependencies: ["priority-modal"],
    files: ["registry/components/example/priority-modal-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/priority-modal-demo"),
    ),
  },
  "slippage-settings-demo": {
    name: "slippage-settings-demo",
    type: "components:example",
    registryDependencies: ["slippage-settings-demo"],
    files: ["registry/components/example/slippage-settings-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/slippage-settings-demo"),
    ),
  },
  "nft-card-demo": {
    name: "nft-card-demo",
    type: "components:example",
    registryDependencies: ["nft-card-demo"],
    files: ["registry/components/example/nft-card-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/nft-card-demo"),
    ),
  },
  "wallet-connect-demo": {
    name: "wallet-connect-demo",
    type: "components:example",
    registryDependencies: ["wallet-connect-demo"],
    files: ["registry/components/example/wallet-connect-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/wallet-connect-demo"),
    ),
  },
  "ipfs-upload-demo": {
    name: "ipfs-upload-demo",
    type: "components:example",
    registryDependencies: ["ipfs-upload-demo"],
    files: ["registry/components/example/ipfs-upload-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/ipfs-upload-demo"),
    ),
  },
  "token-dropdown-demo": {
    name: "token-dropdown-demo",
    type: "components:example",
    registryDependencies: ["token-dropdown"],
    files: ["registry/components/example/token-dropdown-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/token-dropdown-demo"),
    ),
  },
  "swap-ui-demo": {
    name: "swap-ui-demo",
    type: "components:example",
    registryDependencies: ["swap-ui"],
    files: ["registry/components/example/swap-ui-demo.tsx"],
    component: React.lazy(
      () => import("@/registry/components/example/swap-ui-demo"),
    ),
  },
};

export const registry: Registry = {
  ...ui,
  ...example,
};

const resolvedExamples = Object.entries(example).map(([key, value]) => ({
  ...value,
  component: () => void 0,
}));
const updatedExample: Registry = resolvedExamples.reduce(
  (acc, curr) => ({ ...acc, [curr.name]: curr }),
  {},
);
export const downloadRegistry: Registry = { ...ui, ...updatedExample };

export type ComponentName = keyof (typeof ui & typeof example);
