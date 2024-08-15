import React, { useState,useEffect } from 'react';
import { RadioButton } from 'primereact/radiobutton';

interface RadioButtonsProps {
    typeGraph: string[];
    selectedCampaign: string;
    setSelectedCampaign: React.Dispatch<React.SetStateAction<string>>;
  }
 
const RadioButtonComponent: React.FC<RadioButtonsProps> = ({ typeGraph, selectedCampaign, setSelectedCampaign }) => {

    const handleChange = (e: { value: string }) => {
        setSelectedCampaign(e.value);
      };

  return (
    <div className="card flex justify-content-center">
    <div className="flex flex-wrap gap-3">
      {typeGraph.map((campaign, index) => (
        <div key={index} className="flex align-items-center ml-2 align-items ">
          <RadioButton
            inputId={`campaign${index}`}
            name="campaign"
            value={campaign}
            onChange={handleChange}
            checked={selectedCampaign === campaign}
          />
          <label htmlFor={`campaign${index}`} className="ml-2 text-transform">{campaign}</label>
        </div>
      ))}
    </div>
    </div>
  );
};

export default RadioButtonComponent;
