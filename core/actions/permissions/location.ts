import * as Location from "expo-location";

import { PermissionStatus } from "@/infrastructure/interfaces/location";
import { Alert, Linking } from "react-native";

/* 
* - 'Linking' es un módulo que proporciona una forma de interactuar con otras aplicaciones a través de URL. Puede ser útil para abrir
*    ajustes de la aplicación, abrir enlaces, enviar correos electrónicos, entre otros. Sus metodos son:
*    - 'Linking.openSettings()' permite abrir los ajustes de la aplicación.

* - requestForegroundPermissionsAsync() permite solicitar permisos de ubicación al usuario para acceder a la ubicación del dispositivo
*   en primer plano.

* - getForegroundPermissionsAsync() permite obtener el estado de los permisos de ubicación en primer plano, donde se puede saber si
*   el usuario ha concedido o denegado los permisos.
*/

//? Permite solicitar permisos de ubicación al usuario para acceder a la ubicación del dispositivo en primer plano.
//? Retorna el estado de los permisos de ubicación, donde se puede saber si el usuario ha concedido o denegado los permisos.
export const requestLocationPermission =
  async (): Promise<PermissionStatus> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      if (status === "denied") {
        manualPermissionRequest();
      }

      return PermissionStatus.DENIED;
    }

    return PermissionStatus.GRANTED;
  };

//? Permite obtener el estado de los permisos de ubicación en primer plano, donde se puede saber si el usuario ha concedido o denegado
//? los permisos.
export const checkLocationPermission = async () => {
  const { status } = await Location.getForegroundPermissionsAsync();

  switch (status) {
    case "granted":
      return PermissionStatus.GRANTED;
    case "denied":
      return PermissionStatus.DENIED;
    default:
      return PermissionStatus.UNDETERNAMINED;
  }
};

//? Permite mostrar una alerta al usuario para que habilite los permisos de ubicación en los ajustes de la aplicación.
export const manualPermissionRequest = async () => {
  Alert.alert(
    "Permisos de ubicación necesario",
    "Para continuar debe de habilitar los permisos de ubicación en los ajustes de la app",
    [
      {
        text: "Abrir ajustes",
        onPress: () => Linking.openSettings(),
      },
      {
        text: "Cancelar",
        style: "destructive",
      },
    ]
  );
};
