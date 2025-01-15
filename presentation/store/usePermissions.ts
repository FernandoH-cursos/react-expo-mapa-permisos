import { checkLocationPermission, requestLocationPermission } from "@/core/actions/permissions/location";
import { PermissionStatus } from "@/infrastructure/interfaces/location";

import { create } from "zustand";


interface PermissionsState {
  locationStatus: PermissionStatus;
  requestLocationPermission: () => Promise<PermissionStatus>;
  checkLocationPermission: () => Promise<PermissionStatus>;
}

//* Store que permite manejar los permisos de la localización del dispositivo. 
export const usePermissionsStore = create<PermissionsState>((set) => ({
  locationStatus: PermissionStatus.CHECKING,

  requestLocationPermission: async () => {
    const status = await requestLocationPermission();

    set({ locationStatus: status });

    return status;
  },
  checkLocationPermission: async () => {
    const status = await checkLocationPermission();
    
    set({ locationStatus: status });

    return status;
  },
}));