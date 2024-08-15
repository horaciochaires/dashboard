import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import RadioButtonComponent from "./RadioButton";
import data from "../data/dataGoogleAnalitics.json";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

export default function LineGraphComponent() {
  const typeGraph = ["vistas diarias de página", "sesiones"];
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [selectedCampaign, setSelectedCampaign] = useState<string>(
    typeGraph[0]
  );
  const labelsViews = data.vistasPagina.map((c) => c.fecha);
  const views = data.vistasPagina.map((c) => c.vistas);
  //   const labelSess = data.sesiones.map((c) => c.fecha);
  const sessions = data.sesiones.map((c) => c.sesiones);
  const tasaRebote = data.sesiones.map((c) => c.tasaRebote);
  const months: string[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const [startMonth, setStartMonth] = useState<string>("Enero");
  const [endMonth, setEndMonth] = useState<string>("Diciembre");
  const [rangeFilter, setRangeFilter] = useState<any>(null);

  const handleFilter = () => {
    const startIndex: number = months.indexOf(startMonth);
    const endIndex: number = months.indexOf(endMonth) + 1; // +1 para incluir el mes final
    const filteredMonths: string[] = months.slice(startIndex, endIndex);
    console.log(filteredMonths);
    setRangeFilter(filteredMonths);
    // Aquí puedes manejar lo que quieras hacer con el resultado filtrado.
  };

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: rangeFilter !== null ? rangeFilter : months,
      datasets: [
        {
          label: "Vistas diarias de página",
          data: views,
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
        },
        {
          label: "sesiones",
          data: sessions,
          fill: false,
          borderColor: documentStyle.getPropertyValue("--pink-500"),
          tension: 0.4,
        },
        {
          label: "Tasa rebote",
          data: tasaRebote,
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue("--teal-500"),
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [rangeFilter]);

  return (
    <div className="card">
      <div className="formgrid grid">
        <div className="field col">
          <label className="font-semibold text-l">Mes de inicio:</label>
          <Dropdown
            value={startMonth}
            onChange={(e) => setStartMonth(e.target.value)}
            options={months}
            optionLabel="name"
            placeholder="Mes de inicio"
            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
        </div>
        <div className="field col">
          <label className="font-semibold text-l">Mes de fin:</label>
          <Dropdown
            value={endMonth}
            onChange={(e) => setEndMonth(e.target.value)}
            options={months}
            optionLabel="name"
            placeholder="Mes de fin"
            className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
        </div>
        <div className="field col">
            <div className=" border-round  font-bold p-3 m-3 flex ">
              <Button
                className="w-full  align-items-center justify-content-center"
                label="Filtrar"
                onClick={handleFilter}
              />
          </div>
        </div>
      </div>

      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
}
