import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { useLocationStore } from "@/presentation/store/useLocationStore";
import { CustomMap } from "@/presentation/components/maps/CustomMap";



const MapScreen = () => {
  const { lastKnownLocation, getLocation } = useLocationStore();
  
  useEffect(() => {
    if (!lastKnownLocation) getLocation();
  }, []);

  if (!lastKnownLocation) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
    
  }

  return (
    <View>
      <CustomMap initialLocation={lastKnownLocation} />
    </View>
  );
};

export default MapScreen;
