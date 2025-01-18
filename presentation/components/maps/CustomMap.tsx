import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { useLocationStore } from "@/presentation/store/useLocationStore";
import { FAB } from "../shared/FAB";

import { LatLng } from "@/infrastructure/interfaces/lat-lng";

import MapView, { Polyline } from "react-native-maps";

//* <Polyline> es un componente que permite dibujar una línea en el mapa. 'coordinates' es una lista de coordenadas que se utilizarán
//* para dibujar la línea. 'strokeWidth' es el ancho de la línea. 'strokeColor' es el color de la línea. 

interface Props extends ViewProps {
  initialLocation: LatLng;
  showUserLocation?: boolean;
}

export const CustomMap = ({
  initialLocation,
  showUserLocation = true,
  ...rest
}: Props) => {
  const mapRef = useRef<MapView>(null);
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [isShowingPolyline, setIsShowingPolyline] = useState(true);
  const {
    watchLocation,
    clearWatchLocation,
    lastKnownLocation,
    getLocation,
    userLocationList,
  } = useLocationStore();

  //* Permite que al cargar el componente, se inicie el watchLocation que escucha los cambios de ubicación del usuario, es decir, 
  //* se inicia el seguimiento de la ubicación del usuario. 
  useEffect(() => {
    watchLocation();

    //* Al desmontar el componente, se limpia el watchLocation para dejar de escuchar los cambios de ubicación del usuario.
    return () => {
      clearWatchLocation();
    };
  }, []);

  //* Mueve la cámara a la ubicación actual del usuario cada vez que se actualiza la ubicación o se activa/desactiva el seguimiento.
  useEffect(() => {
    if (lastKnownLocation && isFollowingUser) {
      moveCameraLocation(lastKnownLocation);
    }
  }, [lastKnownLocation, isFollowingUser]);

  //* Mueve la cámara a una ubicación específica en el mapa. 
  const moveCameraLocation = (latLng: LatLng) => {
    if (!mapRef.current) return;
    
    //* 'animateCamera' permite mover la cámara a una ubicación específica en el mapa. 'center' es la ubicación a la que se moverá la 
    //* cámara.
    mapRef.current.animateCamera({
      center: latLng,
    });
  }

  //* Mueve la cámara a la ubicación actual del usuario. 
  const moveToCurrentLocation = async () => {
    //* Si no se conoce la última ubicación conocida, se mueve la cámara a la ubicación inicial. Si no, se mueve la cámara a la última
    //* ubicación conocida. 
    if (!lastKnownLocation) {
      moveCameraLocation(initialLocation);
    } else {
      moveCameraLocation(lastKnownLocation);
    }

    const location = await getLocation();
    if (!location) return;

    moveCameraLocation(location);

  }

  //* El evento 'onTouchStart' permite que al tocar el mapa, se deje de seguir la ubicación del usuario. 
  return (
    <View {...rest}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onTouchStart={() => setIsFollowingUser(false)}
        showsUserLocation={showUserLocation}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {isShowingPolyline && (
          <Polyline
            coordinates={userLocationList}
            strokeColor="black"
            strokeWidth={5}
          />
        )}
      </MapView>

      <FAB
        iconName={isShowingPolyline ? "eye-outline" : "eye-off-outline"}
        onPress={() => setIsShowingPolyline(!isShowingPolyline)}
        style={{ bottom: 140, right: 20 }}
      />

      <FAB
        iconName={isFollowingUser ? "walk-outline" : "accessibility-outline"}
        onPress={() => setIsFollowingUser(!isFollowingUser)}
        style={{ bottom: 80, right: 20 }}
      />

      <FAB
        iconName="compass-outline"
        onPress={moveToCurrentLocation}
        style={{ bottom: 20, right: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
});
