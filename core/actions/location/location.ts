import { LatLng } from '@/infrastructure/interfaces/lat-lng';

import * as Location from 'expo-location';

/*
* - getCurrentPositionAsync() permite obtener la ubicación actual del usuario. 
*   - Puede recibir las siguientes opciones:
*     - accuracy: Precisión de la ubicación. Puede ser baja, media o alta.
*   - Puede devolver un objeto con las siguientes propiedades:
*    - coords: Coordenadas de la ubicación actual.
* 
* - watchPositionAsync() permite observar la ubicación actual del usuario. Es decir, que cada vez que la ubicación cambie, se ejecutará
*   una función que se le pase como argumento.
*  - Puede recibir las siguientes opciones:
*   - accuracy: Precisión de la ubicación. Puede ser baja, media o alta.
*   - timeInterval: Intervalo de tiempo en milisegundos en el que se ejecutará la función.
*   - distanceInterval: Distancia en metros en la que se ejecutará la función.
* - También puede recibir una función que se ejecutará cada vez que la ubicación cambie. Esta función recibirá un objeto con las 
*   siguientes propiedades:
*   - coords: Coordenadas de la ubicación actual.
*  - Devuelve un objeto que se puede utilizar para detener la observación de la ubicación.
*/

type LocationCallback = (location: LatLng) => void;


//? Permitir obtener la ubicación actual del usuario. 
export const getCurrentLocation = async(): Promise<LatLng> => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  } catch (error) {
    throw new Error('Error getting users location');
  }
}

//? Permitir observar la ubicación actual del usuario. Es decir, que cada vez que la ubicación cambie, se ejecutará una función que 
//? se le pase como argumento.
export const watchCurrentPosition = async (locationCallback: LocationCallback) => {
  const location = await Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 10,
    },
    ({ coords }) => {
      locationCallback({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  );

  return location;
};