import { type NextPage } from "next";
import { useEffect, useState } from "react";

const Dashboard: NextPage = function () {
  const [username, setUsername] = useState("");
  const [plants, setPlants] = useState<
    { image: string; name: string; description: string; owner: string }[]
  >([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(function () {
    fetch("/api/username")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setUsername(json);
      });
  }, []);

  return (
    <div className="flex flex-row items-center p-10 font-bold">
      <main className="w-1/4 text-left text-5xl font-bold">
        <h1>Welcome {username}!</h1>
        <div className="justify-center items-center flex mt-5">
          {plants.map((plant) => {
            return (
              <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <img src={plant.image} />
                <h2>{plant.name}</h2>
                <p>{plant.description}</p>
              </div>
            );
          })}
        </div>
      </main>
      <section className="ml-[25%] w-[25%] p-5 border-2 border-black">
        <input
          type="text"
          placeholder="Name"
          className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Description"
          className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={imageURL}
          onChange={(event) => {
            setImageURL(event.target.value);
          }}
        />
        <button
          onChange={() => {
            fetch("/api/postplant", {
              method: "POST",
              body: JSON.stringify({
                name,
                description,
                image: imageURL,
              }),
            });
          }}
          className="text-center mt-3 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-white"
        >
          Create Plant
        </button>
      </section>
    </div>
  );
};

export default Dashboard;
