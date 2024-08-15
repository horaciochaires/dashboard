import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import RadioButtonComponent from "./RadioButton";
import data from "../data/dataGoogleAds.json";

export default function BarGraphComponent() {
  const typeGraph = ["impresiones", "clics", "conversiones"];
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [selectedCampaign, setSelectedCampaign] = useState<string>(
    typeGraph[0]
  );
  const labels = data.campañas.map(c => c.nombre);
  const impresiones = data.campañas.map((c) => c.impresiones);
  const clics = data.campañas.map((c) => c.clics);
  const conversiones = data.campañas.map((c) => c.conversiones);

  useEffect(() => {
    
    if (selectedCampaign === 'clics') {
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Clics',
                    data: clics,
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                      ],
                      borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                       
                      ],
                      borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
        setChartData(data);
        setChartOptions(options);
    } 
    else if(selectedCampaign === 'conversiones') {
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Conversiones',
                    data: conversiones,
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                      ],
                      borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                       
                      ],
                      borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
        setChartData(data);
        setChartOptions(options);
    }
    else  {
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Impresiones',
                    data: impresiones,
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                      ],
                      borderColor: [
                        'rgb(255, 159, 64)',
                        'rgb(75, 192, 192)',
                       
                      ],
                      borderWidth: 1
                }
            ]
        };
        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
        setChartData(data);
        setChartOptions(options);
    }

   
}, [selectedCampaign]);


  return (
    <div className="">
      <RadioButtonComponent
        typeGraph={typeGraph}
        selectedCampaign={selectedCampaign}
        setSelectedCampaign={setSelectedCampaign}
      ></RadioButtonComponent>
       <Chart type="bar" data={chartData} options={chartOptions} /> 
    </div>
  );
}
