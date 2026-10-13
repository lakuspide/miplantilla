import { Injectable } from '@angular/core';

export interface Reservation {
  name: string;
  email: string;
  location: string;
  guests: string;
  date?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  
  // Método preparado para integrarse con InsForge (MCP)
  async createReservation(reservation: Reservation): Promise<boolean> {
    console.log('[InsForge] Procesando reserva en la base de datos...', reservation);
    
    // Simulamos la latencia de la red hacia InsForge
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('[InsForge] Reserva confirmada y guardada.');
        resolve(true);
      }, 1500);
    });
  }
}
