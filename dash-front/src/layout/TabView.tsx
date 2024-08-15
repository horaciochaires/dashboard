
import React, { useState } from 'react'; 
import { TabView, TabPanel } from 'primereact/tabview';
import BarGraphComponent from './BarGraph';
import LineGraphComponent from './LineGraph';
import DoughnutGraphComponent from './DoughnutGraph';
import LineBarComponent from './LineBarGraph';

export default function TabViewComponent() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div className="card">
           <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header={<span className={activeIndex === 0 ? 'border-b-2 border-active-tab' : ''}>Rendimiento de campañas</span>}>
                    <BarGraphComponent></BarGraphComponent>
                </TabPanel>
                <TabPanel header={<span className={activeIndex === 1 ? 'border-b-2 border-active-tab' : ''}>Tendencias </span>}>
                    <LineGraphComponent></LineGraphComponent>
                </TabPanel>
                <TabPanel header={<span className={activeIndex === 2 ? 'border-b-2 border-active-tab' : ''}>Distribuciones demográficas </span>}>
                    <DoughnutGraphComponent></DoughnutGraphComponent>
                </TabPanel>
                <TabPanel header={<span className={activeIndex === 3 ? 'border-b-2 border-active-tab' : ''}>Análisis de Gasto Publicitario y Conversiones
                </span>}>
                   <LineBarComponent></LineBarComponent>
                </TabPanel>
            </TabView>
        </div>
    )
}
        