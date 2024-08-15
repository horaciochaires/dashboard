import { useState, useEffect } from "react";
import PortalLayout from "../layout/PortalLayout";
import BasicDemo from "../layout/BarGraph";
import TabViewComponent from "../layout/TabView";



export default function Dashboard() {
  useEffect(() => {}, []);

  return (
    <div>
      <PortalLayout children={undefined}></PortalLayout>
      <div className="table-container">
        <TabViewComponent/>
      </div>
      
    </div>
  );
}
