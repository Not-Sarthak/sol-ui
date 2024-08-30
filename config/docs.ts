import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Components",
      href: "/components",
    },
    // {
    //   title: "Hooks",
    //   href: "/hooks",
    // },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [
            // {
            //   title: "React.js",
            //   href: `/docs/installation/react`,
            //   items: [],
            // },
          ],
        },
        {
          title: "CLI",
          href: "/docs/cli",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Wallet",
          href: `/docs/components/wallet-connect-demo`,
          items: [],
          label: "",
        },
        {
          title: "NFT Card",
          href: `/docs/components/nft-card-demo`,
          items: [],
          label: "",
        },
        {
          title: "Token Dropdown",
          href: `/docs/components/token-dropdown-demo`,
          items: [],
          label: "",
        },
        {
          title: "IPFS Upload",
          href: `/docs/components/ipfs-upload-demo`,
          items: [],
          label: "",
        },
        {
          title: "Swap",
          href: `/docs/components/swap-ui-demo`,
          items: [],
          label: "New",
        },
        {
          title: "Priority Modal",
          href: `/docs/components/priority-modal`,
          items: [],
          label: "",
        },
        {
          title: "Slippage Settings Modal",
          href: `/docs/components/slippage-settings-modal`,
          items: [],
          label: "",
        },
      ],
    },
  ],
};
