import { View, StyleSheet } from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
/* 
* - <MapView> permite mostrar un mapa en la aplicación. Tiene las siguientes propiedades:
*   - showsPointsOfInterest: boolean - Muestra o no los puntos de interés en el mapa.
*   - style: ViewStyle - Estilo del mapa.
*   - initialRegion: Region - Región inicial del mapa.
*   - provider: MapProvider - Proveedor de mapas.
*   - mapType: MapType - Tipo de mapa. Puede ser "standard", "satellite", "hybrid", "terrain", etc.
* 
* - <Marker> permite agregar un marcador al mapa. Tiene las siguientes propiedades:
*  - coordinate: LatLng - Coordenadas del marcador.
*  - title: string - Título del marcador.
*  - description: string - Descripción del marcador.
*  - pinColor: string - Color del marcador.
*/
const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        // showsPointsOfInterest={false}
        style={styles.map}
        initialRegion={{
          latitude: -36.73853,
          longitude: -73.00701,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        mapType="satellite"
      >
        <Marker
          coordinate={{
            latitude: -36.738797,
            longitude: -73.005283,
          }}
          title="Aquí estoy"
          description="Esta es mi casa en muelles de penco"
        />

        <Marker
          coordinate={{
            latitude: -36.738014,
            longitude: -73.005471,
          }}
          pinColor="#1687a7"
          description="Pesaje de camiones"
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});
