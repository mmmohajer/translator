import cx from "classnames";

import Div from "@/baseComponents/reusableComponents/Div";

import Picker from "../Picker";
import { SERVICE_TYPES } from "./constants";

const Services = ({ selectedProject, selectedService, setSelectedService }) => {
  return (
    <>
      <Div type="flex" className="flex--wrap">
        {SERVICE_TYPES?.[selectedProject]?.map((service) => (
          <Div key={service.value}>
            <Picker
              isActive={selectedService === service.value}
              onClick={() => setSelectedService(service.value)}
            >
              {service.title}
            </Picker>
          </Div>
        ))}
      </Div>
    </>
  );
};

export default Services;
