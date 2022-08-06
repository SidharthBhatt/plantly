import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={`min-w-screen max-w-screen min-h-screen max-h-screen bg-green-800 bg-opacity-5 bg-no-repeat ${styles['bg']} grid grid-rows-[max-content_1fr]`}>
      <Head>
        <title>Uber for Plants</title>
        <meta name="description" content="Uber for Umbrellas" />
      </Head>

      <header className="pl-10 text-white bg-red-400">
        <nav className="uppercase">
          <ul className="flex flex-wrap py-8 flex-row gap-5">
            <li className="w-max inline-block">
              <a href="/">Home</a>
            </li>
            <li className="w-max inline-block">
              <a href="/login">LOGIN</a>
            </li>
            <li className="w-max inline-block">
              <a href= "/register">REGISTER</a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex flex-col justify-center align-middle text-gray-200 pl-10 bg-green-500">
        <header className="text-6xl">Uber, but for plants</header>
        <div className="flex flex-row flex-nowrap mt-5">
          <button className="w-40 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Login
          </button>
          <button className="w-40 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Register
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
