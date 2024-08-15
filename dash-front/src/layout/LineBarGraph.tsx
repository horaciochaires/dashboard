
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import data from "../data/dataMetaAds.json";

export default function LineBarComponent() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const anuncios = data.anuncios.map((c) => c.nombre);
    const participación = data.anuncios.map((c) => c.participación);
    const gastoPublicidad = data.anuncios.map((c) => c.gastoPublicidad);

    const conversiones = data.anuncios.map((c) => c.conversiones);

    // const tasaRebote = data.sesiones.map((c) => c.tasaRebote);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: anuncios,
            datasets: [
                {
                    type: 'line',
                    label: 'Gasto Publicitario',
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    data: gastoPublicidad
                },
                {
                    type: 'bar',
                    label: 'Participación',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    data: participación,
                    borderColor: 'white',
                    borderWidth: 2
                },
                {
                    type: 'bar',
                    label: 'Conversiones',
                    backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                    data: conversiones
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);
    
    return (
        <div className="card">
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    )
}
        