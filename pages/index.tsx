import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div
      className={`min-w-screen max-w-screen min-h-screen max-h-screen ${styles["bg"]} grid grid-rows-[max-content_1fr]`}
    >
      <img
        src="https://media.istockphoto.com/photos/green-plants-wall-picture-id175450225?b=1&k=20&m=175450225&s=170667a&w=0&h=M9uSLWjlaLd96HJA-LZRVvkACrnMi7y9WQygiSdfoVU="
        className="-z-20 top-0 left-0 opacity-75 fixed h-screen w-screen"
      />
      <Head>
        <title>Uber for Plants</title>
        <meta name="description" content="Uber For Plants!!" />
      </Head>

      <header className="pl-10 text-white bg-[#3D7921]">
        <nav className="uppercase">
          <ul className="flex flex-wrap py-6 flex-row gap-5">
            <li className="w-max inline-block">
              <a href="/">Home</a>
            </li>
            <li className="w-max inline-block">
              <a href="/login">LOGIN</a>
            </li>
            <li className="w-max inline-block">
              <a href="/register">REGISTER</a>
            </li>
            <li className="w-max inline-block">
              <a href="/dashboard">DASHBOARD</a>
            </li>
          </ul>
        </nav>
      </header>
    

      <main className="flex flex-col justify-center align-middle text-gray-200 pl-10 mb-[25%] ">
        <h1 className="text-6xl"> Plantify</h1>
        <p className="text-2xl text-white mt-5">
          Sign in or register to rent out plants!
        </p>
        <div className="flex flex-row flex-nowrap mt-5">
          <button
            onClick={() => {
              location.pathname = "/login";
            }}
            className="w-40 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            <a href="/login">LOGIN</a>
          </button>
           <button
          onClick={() => {
            location.pathname = "/register";
          }}
          className="w-40 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <a href="/register">REGISTER</a>
          </button>
        </div>
        {/* <ul>
          <li>Is this usefu</li>
          <li></li>
          <li></li>
        </ul> */}
      </main>
    </div>
  );
};

export default Home;
