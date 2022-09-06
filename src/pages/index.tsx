import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <h1 className="text-2xl text-indigo-500 text-center">Hello World</h1>
      </main>
    </div>
  );
};

export default Home;
