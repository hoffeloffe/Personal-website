import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Welcome to my professional portfolio." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <h1>Welcome to My Portfolio</h1>
        <p>This is my professional portfolio built with Next.js.</p>
      </main>
    </>
  );
}
