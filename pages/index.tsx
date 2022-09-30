import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const GameComponent = dynamic(() => import("../components/GameComponent"), {
  ssr: false,
});

const GlobalState = { bridge: [] };

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Fight Game</title>
        <meta
          name="description"
          content="Gamifying social networking platforms"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameComponent GlobalState={GlobalState} />
    </div>
  );
};

export default Home;
