import { LocationSaved } from "@/infraestructure/interfaces/locartionSaved";

const locations: LocationSaved[] = [
  {
    alias: "Casa",
    address: "Quevedo, El Guayacan",
    location: {
      latitude: -1.0449948961021986,
      longitude: -79.48117705062032,
    },
  },
  {
    alias: "Novia",
    address: "Via a valencia",
    location: {
      latitude: -0.9991215263231875,
      longitude: -79.4283152371645,
    },
  },
];

export const getLocations = () => {
  return locations;
};

export const getSomeLocation = (alias: string | string[]) => {
  const index = locations.findIndex(l => l.alias === alias);
  return locations[index];
}
