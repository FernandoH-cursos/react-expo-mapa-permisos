import { PropsWithChildren, useEffect } from "react";

import { usePermissionsStore } from "../store/usePermissions";
import { PermissionStatus } from "@/infrastructure/interfaces/location";
import { router } from "expo-router";
import { AppState } from "react-native";

//* 'AppState' es un módulo que proporciona información sobre el estado de la aplicación. Puede ser útil para determinar si la
//* aplicación está en primer plano, en segundo plano o si el dispositivo está bloqueado.

//* 'AppState.addEventListener()' es un método que permite agregar un evento para escuchar cambios en el estado de la aplicación.
//* El evento 'change' se dispara cuando el estado de la aplicación cambia, que puede ser 'active', 'background' o 'inactive'.
//* 'active' indica que la aplicación está en primer plano, 'background' indica que la aplicación está en segundo plano y 'inactive'
//* indica que la aplicación está en segundo plano y no puede responder a eventos.

//* 'suscription.remove()' es un método que permite eliminar un evento de escucha de un evento. En este caso, se elimina el evento
//* 'change' de 'AppState' para evitar fugas de memoria.




export const PermissionsCheckerProvider = ({ children }: PropsWithChildren) => {
  const { locationStatus, checkLocationPermission } = usePermissionsStore();

  //* Redireccionar a la pantalla correspondiente según el estado de los permisos de ubicación, en este caso, si los permisos están 
  //* otorgados, redireccionar a la pantalla de mapa, de lo contrario, redireccionar a la pantalla de permisos.
  useEffect(() => {
    if (locationStatus === PermissionStatus.GRANTED) {
      router.replace("/map");
    }else if(locationStatus !== PermissionStatus.CHECKING){
      router.replace("/permissions");
    }
  }, [locationStatus]);
  
  //* Verificar estado de permisos de ubicación 
  useEffect(() => {
    checkLocationPermission();
  }, []);


  //* Escuchar cambios en el estado de la aplicación y verificar los permisos de ubicación cuando la aplicación pasa a primer plano.
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      // console.log({nextAppState});
      
      if (nextAppState === "active") {
        checkLocationPermission();
      }
    });

    return () => {
      subscription.remove();
    };
  });

  return children;
}