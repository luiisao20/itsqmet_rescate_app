import React from "react";
import { Redirect } from "expo-router";

const IndexScreen = () => {
  return <Redirect href={'/(slot)/(tabs)'} />
  // return <Redirect href={"/(slot)/(packs)/details/[id]"} />;
};

export default IndexScreen;
