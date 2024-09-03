import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

interface TokenInfo {
  mintAddress: string;
  name: string;
}

const TOKENS: { [key: string]: TokenInfo } = {
  USDC: {
    mintAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    name: "USDC",
  },
  USDT: {
    mintAddress: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    name: "USDT",
  },
};

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const payload: ActionGetResponse = {
    icon: "https://i.postimg.cc/GTwZsGwQ/blink-two.jpg",
    title: "Components Required for a Blink",
    description: "Visit 'dial.to' to unfurl and visualize the components",
    label: "Donate",
    links: {
      actions: [
        {
          label: "Donate 0.1 SOL to SOL UI",
          href: `${url.origin}${url.pathname}`,
          parameters: [
            {
              name: "amount",
              label: "Input Field  ||  Your Name",
              required: true,
            },
            {
              name: "text",
              label: "Text Area  ||  Send a Message to SOL UI",
              required: true,
              //@ts-ignore
              type: "textarea",
            },
            {
              name: "token",
              label: "DropDown",
              required: true,
              //@ts-ignore
              type: "select",
              options: Object.keys(TOKENS).map((token) => ({
                label: TOKENS[token].name,
                value: token,
              })),
            },
          ],
        },
      ],
    },
  };

  return new Response(JSON.stringify(payload), {
    headers: ACTIONS_CORS_HEADERS,
  });
}

export const OPTIONS = GET;

export async function POST(request: Request): Promise<Response> {
  const body: ActionPostRequest = await request.json();
  let sender: PublicKey;

  try {
    sender = new PublicKey(body.account);
  } catch (error) {
    return Response.json(
      {
        error: {
          message: "Invalid account",
        },
      },
      {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      },
    );
  }

  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender,
      toPubkey: new PublicKey("EUZkjzrtBvAaRAS9S32VzQ4rHURTnsUNK7pApXLrMVdY"),
      lamports: 0.1 * LAMPORTS_PER_SOL,
    }),
  );

  transaction.feePayer = sender;
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.lastValidBlockHeight = lastValidBlockHeight;

  const payload: ActionPostResponse = await createPostResponse({
    fields: {
      transaction,
      message: "Transaction created to donate 0.1 SOL",
    },
  });

  return new Response(JSON.stringify(payload), {
    headers: ACTIONS_CORS_HEADERS,
  });
}
