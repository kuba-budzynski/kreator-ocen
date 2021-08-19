import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import NavBar from "../components/NavBar";
import UserData from "../components/UserData";
import _ from "lodash";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import Installation from "../components/Installation";
import store from "../store/index";
import { clean } from "../store/actions/index";
import { saveDocument } from "../utils/saveDocuemnt";
import moment from "moment";

export default function Home(props) {
  const [reset, setReset] = useState(false);
  const [value, setValue] = useState(0);
  const [dane, setDane] = useState({});
  const [installations, setInstallations] = useState(1);
  const [comp, SetComp] = useState([]);

  useEffect(() => {
    SetComp((curr) => [
      ...curr,
      <Installation
        data={props}
        userData={dane}
        reset={reset}
        id={installations}
      ></Installation>,
    ]);
  }, [installations]);

  return (
    <div className="w-screen max-w-full min-h-screen bg-warmGray-100 pb-20">
      <Head>
        <title>Kalkulator Pomp Ciepła</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-screen">
        <NavBar
          onClick={(e) => {
            setReset(!reset);
            setInstallations(1);
            SetComp([
              <Installation
                data={props}
                userData={dane}
                reset={reset}
                id={1}
              ></Installation>,
            ]);
            store.dispatch(clean({}));
          }}
        />
        <section className="max-w-10xl mx-auto ">
          <div className="w-full mx-auto pt-6 px-4">
            <div className="w-full mx-auto flex justify-center">
              <button
                className="px-12 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-lg lg:text-2xl uppercase font-bold mx-auto my-3"
                onClick={() => {
                  const state = store.getState();
                  const list = state.offers.map((l) => l.list);
                  list.sort((a, b) => (a.id > b.id ? 1 : -1));
                  console.log("Dane: ", dane);
                  const final = {
                    ...dane,
                    list: list,
                    date1: moment().format("DD/MM/YYYY"),
                    date2: moment().add(2, "months").format("DD/MM/YYYY"),
                  };
                  saveDocument(final);
                }}
              >
                Generuj dokument
              </button>
            </div>
            <UserData passData={setDane} reset={reset} />

            <div className="w-full mt-20">
              <Dots
                value={value}
                onChange={setValue}
                number={installations}
                thumbnails={Array.from(Array(installations).keys()).map(
                  (val, i) => (
                    <p className="text-base lg:text-xl text-gray-500">{`Instalacja ${
                      i + 1
                    }`}</p>
                  )
                )}
              />
              <div className="w-full my-1 flex justify-center mb-8 space-x-4">
                <button
                  className="px-5 py-2 text-base lg:text-lg text-white bg-green-500 rounded-lg font-bold uppercase hover:bg-green-600"
                  onClick={() => setInstallations((c) => c + 1)}
                >
                  Nowa instalacja
                </button>
              </div>
              <Carousel
                value={value}
                onChange={(v) => setValue(v)}
                slidesPerPage={1}
                slidesPerScroll={1}
                keepDirectionWhenDragging
                animationSpeed={2000}
                draggable={false}
                styles={{ position: "fixed" }}
              >
                {comp}
              </Carousel>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const { client } = require("../graphql/utils");

  const { heatPumps } = await client.request(`
    query MyQuery {
      heatPumps {
        header {
          nazwa
          id
        }
        pumpModels {
          name
          price
          promotion
          id
        }
        id
      }
    }
  `);

  const { headers } = await client.request(`
    query MyQuery {
      headers {
        nazwa,
        id
      }
    }  
  `);

  const { buffors } = await client.request(`
    query MyQuery {
      buffors {
        name
        price
        promotion
        id
      }
    }
  `);

  const { hydraulicElements } = await client.request(`
    query MyQuery {
      hydraulicElements {
        id
        name
        promotion
        description
      }
    }
  `);

  const { tanks } = await client.request(`
    query MyQuery {
      tanks {
        capacity
        id
        name
        price
        promotion
      }
    }  
  `);

  const { montages } = await client.request(`
    query MyQuery {
      montages {
        id
        name
        price
      }
    }  
  `);

  const { boards } = await client.request(`
    query MyQuery {
      boards {
        id
        name
        price
        promotion
      }
    }
  `);

  return {
    props: {
      headers,
      heatPumps: Object.entries(_.groupBy(heatPumps, "header.id")).map((h) => ({
        id: h[0],
        models: h[1].map((m) => m.pumpModels).flat(),
      })),
      buffors,
      hydraulicElements,
      tanks,
      montages,
      boards,
    },
    revalidate: 300,
  };
}
