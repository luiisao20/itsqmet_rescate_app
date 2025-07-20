import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileHome from "./home/index";
import InfoProfile from "./info/index";
import SecurityProfile from "./security/index";

export type ProfileTabParamList = {
  Inicio: undefined;
  Información: undefined;
  Seguridad: undefined;
};

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#e3f6f5",
          elevation: 4,
          shadowOpacity: 0.1,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 14,
          textTransform: "none",
          color: "#043927",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#058e3f",
          height: 4,
          borderRadius: 2,
        },
        tabBarActiveTintColor: "#058e3f",
        tabBarInactiveTintColor: "#555",
      }}
    >
      <Tab.Screen name="Inicio" component={ProfileHome} />
      <Tab.Screen name="Información" component={InfoProfile} />
      <Tab.Screen name="Seguridad" component={SecurityProfile} />
    </Tab.Navigator>
  );
}
