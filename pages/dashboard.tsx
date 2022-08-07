import { getCookie } from "cookies-next";
import { GetServerSideProps, type NextPage } from "next";
import { ReactNode, useCallback, useEffect, useState } from "react";

const getLocation = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (geoloc) => {
        resolve(`${geoloc.coords.latitude},${geoloc.coords.longitude}`);
      },
      (err) => {
        reject(err.code);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};

interface Plant {
  image: string;
  name: string;
  description: string;
  owner: string;
  geo: string;
}

const Dashboard: NextPage = function () {
  const [username, setUsername] = useState("");
  const [plants, setPlants] = useState<Plant[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [created, setCreated] = useState<Plant[]>([]);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const jsonFound = useCallback(
    (json: boolean) => {
      if (json) {
        setCreated((currentCreated) => {
          alert(
            `Your plant ${currentCreated[0].name} was accepted. Someone will be your way to pickup their order.`
          );
          return [];
        });
      }
    },
    [created]
  );

  useEffect(function () {
    fetch("/api/plants")
      .then((response) => response.json())
      .then((json) => {
        setPlants(json);
      });
  }, []);

  useEffect(function () {
    fetch("/api/username")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          window.location.pathname = "/login";
          return new Promise((resolve) => resolve(true));
        }
      })
      .then((json) => {
        if (json === false) {
          return;
        }
        setUsername(json);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/accepted-queue")
        .then((response) => response.json())
        .then(jsonFound);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function clickHandler(geo: string) {
    const post: Plant = {
      name,
      description,
      image: imageURL,
      owner: username,
      geo,
    };
    fetch("/api/postplant", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setCreated([...created, post]);
    });
  }

  return (
    <div className="flex flex-col gap-x-10 p-10 font-bold min-h-screen text-white border border-white bg-black/40">
      <h1 className="text-5xl text-white">Welcome, {username}!</h1>
      <img
        src="/backround.png"
        className="-z-20 top-0 left-0 opacity-75 fixed h-screen w-screen"
      />
      {modalContent ? (
        <div className="w-[50vw] h-[50vh] p-3 absolute left-1/4 top-1/4 flex flex-col justify-center items-center border border-gray-500 bg-white text-blue-500 gap-3">
          <span
            className="absolute top-0 right-1 cursor-pointer text-black"
            onClick={() => {
              setModalContent(null);
            }}
          >
            X
          </span>
          {modalContent}
        </div>
      ) : null}
      <main className="flex flex-col text-left text-5xl font-bold gap-y-7 pl-0 p-5 h-max">
        <span
          className="absolute top-3 text-xl right-3 cursor-pointer select-none"
          onClick={() => {
            fetch("/api/logout");
          }}
        >
          Logout
        </span>
        <section className="p-5 h-max">
          <div>
            <h1 className="font-semibold text-2xl">
              To post, enter the name, description, and the image url of the
              plant
            </h1>
          </div>
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
            onClick={async () => {
              //0.014
              let geo = "37.773583691821976,-122.42181836872359";
              getLocation()
                .then((loc) => {
                  geo = loc;
                  clickHandler(geo);
                })
                .catch(() => {
                  clickHandler(geo);
                });
              setPlants([
                ...plants,
                {
                  name,
                  description,
                  image: imageURL,
                  owner: username,
                  geo,
                },
              ]);
            }}
            className="text-center mt-3 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-white"
          >
            Create Plant
          </button>
        </section>
        <h2 className="font-bold text text-white">Posts</h2>
        <div className="justify-start grid grid-flow-col gap-x-10 mt-5">
          {plants.length > 0 ? (
            plants.map((plant, index) => {
              return (
                <div
                  key={index}
                  className="text-black relative block p-6 pb-16 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <img className="w-[130px] h-[130px] mt-2" src={plant.image} />
                  <h2 className="text-2xl">{plant.name}</h2>
                  <p className="text-lg mt-2">{plant.description}</p>
                  <button
                    onClick={() => {
                      fetch("/api/select", {
                        method: "POST",
                        body: JSON.stringify(plant),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }).then(() => {
                        setPlants(
                          plants.filter((plantFiltering) => {
                            return (
                              plantFiltering.owner !== plant.owner &&
                              plantFiltering.name !== plant.name
                            );
                          })
                        );
                      });
                      setModalContent(
                        <>
                          <a href={`mailto:${plant.owner}`}>Email</a>
                          <iframe
                            width={425}
                            height={350}
                            frameBorder={0}
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${[
                              plant.geo.split(",").reverse().join("%2C"),
                              plant.geo.split(",").reverse().join("%2C"),
                            ].join("%2C")}&amp;layer=mapnik`}
                            className="border border-black"
                          ></iframe>
                          <small>
                            <a href="https://www.openstreetmap.org/#map=19/37.73600/-122.47793">
                              View Larger Map
                            </a>
                          </small>
                        </>
                      );
                    }}
                    className="absolute bottom-0 text-center mt-3 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-white w-[calc(100%-3rem)]"
                  >
                    Select
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-2xl -mt-8 font-medium">No posts found</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
