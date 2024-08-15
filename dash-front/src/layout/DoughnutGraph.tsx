import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import RadioButtonComponent from "./RadioButton";
import data from "../data/dataGoogleAnalitics.json";

export default function DoughnutGraphComponent() {
  const typeGraph = ["edad", "género"];
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [selectedCampaign, setSelectedCampaign] = useState<string>(
    typeGraph[0]
  );

  console.log(data.demografía.edad);

  const labelsGen = data.demografía.edad.map((c) => c.rango);
  const porGen = data.demografía.edad.map((c) => c.porcentaje);

  const labelsAge = data.demografía.género.map((c) => c.tipo);
  const porAge = data.demografía.género.map((c) => c.porcentaje);

  // const impresiones = data.campañas.map((c) => c.impresiones);
  // const clics = data.campañas.map((c) => c.clics);
  // const conversiones = data.campañas.map((c) => c.conversiones);
  // console.log(labels);
  useEffect(() => {
    if (selectedCampaign === "edad") {
      const documentStyle = getComputedStyle(document.documentElement);
      const data = {
        labels: labelsGen,
        datasets: [
          {
            data: porGen,
            backgroundColor: [
              documentStyle.getPropertyValue("--blue-500"),
              documentStyle.getPropertyValue("--yellow-500"),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue("--blue-400"),
              documentStyle.getPropertyValue("--yellow-400"),
            ],
          },
        ],
      };
      const options = {
        cutout: "60%",
      };

      setChartData(data);
      setChartOptions(options);
    } else {
      const documentStyle = getComputedStyle(document.documentElement);
      const data = {
        labels: labelsAge,
        datasets: [
          {
            data: porAge,
            backgroundColor: [
              documentStyle.getPropertyValue("--blue-500"),
              documentStyle.getPropertyValue("--pink-500"),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue("--blue-400"),
              documentStyle.getPropertyValue("--pink-400"),
            ],
          },
        ],
      };
      const options = {
        cutout: "60%",
      };

      setChartData(data);
      setChartOptions(options);
    }
  }, [selectedCampaign]);

  return (
    <>
      <div className="grid">
        <div className="col-12 ">
          <div className="text-center p-3 border-round-sm font-bold">
            <RadioButtonComponent
              typeGraph={typeGraph}
              selectedCampaign={selectedCampaign}
              setSelectedCampaign={setSelectedCampaign}
            ></RadioButtonComponent>
          </div>
        </div>
      </div>
      <div className="flex justify-content-center">
    <div className="col-12 justify-content-center">
        <div className="text-center justify-content-center p-3 border-round-sm  font-bold">
        <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="w-auto md:w-30rem m-auto"
      />
        </div>
    </div>
   
</div>
      
    </>
  );
}
