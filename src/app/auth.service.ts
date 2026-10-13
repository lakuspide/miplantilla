import { Injectable, signal } from '@angular/core';

export type Role = 'guest' | 'user' | 'waiter' | 'kitchen' | 'admin';

export interface UserProfile {
  email: string;
  name: string;
  role: Role;
  points?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<UserProfile | null>(null);

  login(email: string, role: Role) {
    this.currentUser.set({
      email,
      name: email.split('@')[0],
      role,
      points: role === 'user' ? 1250 : undefined
    });
  }

  logout() {
    this.currentUser.set(null);
  }
}
