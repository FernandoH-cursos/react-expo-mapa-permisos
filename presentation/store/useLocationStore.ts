import {
  getCurrentLocation,
  watchCurrentPosition,
} from "@/core/actions/location/location";
import { LatLng } from "@/infrastructure/interfaces/lat-lng";
import { LocationSubscription } from "expo-location";
import { create } from "zustand";

/* 
* - watchSuscriptionID: Identificador de la suscripción a la ubicación del usuario.
* - lastKnownLocation: Última ubicación conocida del usuario.
* - userLocationList: Lista de ubicaciones del usuario.
* - getLocation: Función que obtiene la ubicación actual del usuario.
* - watchLocation: Función que inicia la suscripción a la ubicación del usuario.
* - clearWatchLocation: Función que cancela la suscripción a la ubicación del usuario.


* 'watchSuscription.remove()' cancela la suscripción a la ubicación del usuario. Es decir, deja de seguir la ubicación del usuario.
*/

interface LocationState {
  lastKnownLocation: LatLng | null;
  userLocationList: LatLng[];
  watchSuscriptionID: LocationSubscription | null;

  getLocation: () => Promise<LatLng>;
  watchLocation: () => void;
  clearWatchLocation: () => void;
}


//* Store que permite manejar la localización del dispositivo, como la ubicación actual y la lista de 
//* ubicaciones del usuario.
export const useLocationStore = create<LocationState>((set, get) => ({
  lastKnownLocation: null,
  userLocationList: [],
  watchSuscriptionID: null,

  getLocation: async () => {
    const location = await getCurrentLocation();

    set({ lastKnownLocation: location });

    return location;
  },

  watchLocation: async () => {
    //* Cancelar la suscripción anterior si existe.
    const oldSusbcription = get().watchSuscriptionID;
    if (oldSusbcription) get().clearWatchLocation();

    //* Iniciar la suscripción a la ubicación del usuario.
    const watchSuscription = await watchCurrentPosition((latLnmg) => {
      set({
        lastKnownLocation: latLnmg,
        userLocationList: [...get().userLocationList, latLnmg],
      });
    });
    // console.log(JSON.stringify(get().userLocationList, null, 2));
    
    set({ watchSuscriptionID: watchSuscription });
  },

  clearWatchLocation: () => {
    const watchSuscription = get().watchSuscriptionID;

    //* Cancelar la suscripción a la ubicación del usuario. 
    if (watchSuscription) {
      watchSuscription.remove();
      set({ watchSuscriptionID: null });
    }
  },
}));
