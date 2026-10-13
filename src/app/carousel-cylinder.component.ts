import { Component, signal, computed, inject, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { animate } from 'motion';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CartService, MenuItem, CartItem } from './services/cart.service';
import { MenuService, Category } from './services/menu.service';
import { ReservationService, Reservation } from './services/reservation.service';
import { AiAssistantService } from './services/ai-assistant.service';
import { AuthService, Role } from './auth.service';

interface DisplayCard {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  image?: string;
  price?: string;
  originalData: Category | MenuItem;
}

@Component({
  selector: 'app-carousel-cylinder',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="w-full min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden relative">
      
      <!-- Fixed Background Video (Grill) -->
      <div class="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <video #bgVideo autoplay loop muted playsinline class="w-full h-full object-cover opacity-40">
          <source src="https://cdn.pixabay.com/video/2019/11/08/28874-372000062_large.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-[#050505]/90"></div>
      </div>

      <!-- HERO SECTION -->
      <section class="absolute inset-0 w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden z-[50] transition-opacity duration-1000"
               [class.opacity-0]="appMode() === 'catalog'"
               [class.pointer-events-none]="appMode() === 'catalog'">
        <!-- Match Video -->
        <video autoplay muted playsinline class="absolute inset-0 w-full h-full object-cover opacity-60">
          <source src="https://cdn.pixabay.com/video/2020/05/11/38747-418658010_large.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]"></div>

        <!-- Content -->
        <div class="relative z-10 flex flex-col items-center text-center px-6 mt-12">
          <mat-icon class="text-[#7dd3fc] text-4xl mb-6 animate-pulse-slow drop-shadow-[0_0_15px_rgba(125,211,252,0.8)]">local_fire_department</mat-icon>
          <p class="text-white/60 font-montserrat tracking-[0.4em] text-[10px] uppercase mb-4">El Ritual del Fuego</p>
          <h1 class="font-montserrat font-black text-6xl md:text-8xl leading-none tracking-tighter text-white drop-shadow-2xl mb-2">
            ASADO<br>CENTRAL
          </h1>
          <p class="text-[#7dd3fc] font-serif italic text-lg md:text-xl tracking-wide">Est. 1984</p>
        </div>

        <!-- Enter Button -->
        <div class="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-8">
          <button (click)="enterCatalog()" 
                  class="group relative flex items-center justify-center w-20 h-20 bg-transparent border border-white/20 rounded-full transition-all duration-700 hover:border-[#7dd3fc]/50 hover:scale-105 active:scale-95">
            <div class="absolute inset-0 rounded-full bg-[#7dd3fc]/10 scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></div>
            <mat-icon class="text-white/80 text-3xl group-hover:text-[#7dd3fc] transition-colors duration-500">keyboard_arrow_down</mat-icon>
            
            <!-- Rotating Text Ring -->
            <div class="absolute inset-[-20px] rounded-full animate-spin-slow pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500">
              <svg viewBox="0 0 100 100" class="w-full h-full overflow-visible">
                <path id="textPath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
                <text class="text-[8px] font-montserrat font-bold tracking-[0.3em] uppercase fill-white">
                  <textPath href="#textPath" startOffset="0%">• ENTRAR AL RITUAL • EXPLORAR EL MENÚ</textPath>
                </text>
              </svg>
            </div>
          </button>
        </div>
      </section>

      <!-- CATALOG SECTION (Compact Layout) -->
      <section class="absolute inset-0 w-full h-[100dvh] overflow-y-auto overflow-x-hidden z-[40] transition-opacity duration-1000"
               [class.opacity-0]="appMode() === 'intro'"
               [class.pointer-events-none]="appMode() === 'intro'">
        
        <div class="min-h-full w-full flex flex-col items-center pt-24 pb-12 px-4 relative">
          
          <!-- Top Header -->
          <header class="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-[200] pointer-events-none">
            <div class="flex items-center gap-2">
              <mat-icon class="text-[#7dd3fc] text-xl">local_fire_department</mat-icon>
              <span class="font-montserrat font-black tracking-widest text-white text-sm">ASADO CENTRAL</span>
            </div>
            <button class="pointer-events-auto flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full transition-colors">
              <div class="flex flex-col gap-[3px]">
                <div class="w-4 h-[2px] bg-[#7dd3fc]"></div>
                <div class="w-4 h-[2px] bg-white"></div>
                <div class="w-4 h-[2px] bg-[#7dd3fc]"></div>
              </div>
              <span class="text-white text-[10px] font-bold tracking-widest uppercase">ESP</span>
            </button>
          </header>

          <!-- Hamburger Menu Button -->
          <div class="fixed top-12 left-8 z-[200] pointer-events-auto">
            <button (click)="showSidebar.set(true)"
                    class="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors shadow-xl">
              <mat-icon>menu</mat-icon>
            </button>
          </div>

          <!-- Nuestra Historia Box -->
          <button (click)="openModal('historia')" class="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md hover:bg-white/10 transition-colors mb-6 flex flex-col items-center justify-center pointer-events-auto shadow-lg group">
            <span class="text-[#7dd3fc] text-[10px] font-bold tracking-[0.3em] uppercase mb-1 group-hover:scale-105 transition-transform">Destacado</span>
            <span class="text-white font-montserrat font-black text-lg tracking-widest uppercase group-hover:scale-105 transition-transform">Nuestra Historia</span>
          </button>

          <!-- CAROUSEL SECTION -->
          <div id="ritual-section" class="relative w-full flex-1 min-h-[450px] max-h-[600px] flex flex-col items-center justify-center perspective-[1200px] transform-style-3d touch-none pointer-events-auto mb-6"
               (pointerdown)="onPointerDown($event)"
               (pointermove)="onPointerMove($event)"
               (pointerup)="onPointerUp($event)"
               (pointercancel)="onPointerUp($event)"
               (pointerleave)="onPointerUp($event)">

      <!-- Category Title (when in items view) -->
      <div class="absolute top-24 left-0 w-full flex flex-col items-center z-[200] pointer-events-none transition-all duration-500"
           [ngClass]="{'opacity-0 -translate-y-4': viewState() === 'categories'}">
        <mat-icon class="text-[#7dd3fc] text-3xl mb-2 drop-shadow-[0_0_10px_rgba(125,211,252,0.8)]">{{ activeCategory()?.icon }}</mat-icon>
        <h1 class="font-montserrat font-black text-3xl text-white tracking-[0.2em] uppercase text-center leading-none drop-shadow-2xl">
          {{ activeCategory()?.name }}
        </h1>
        <div class="mt-4 w-12 h-px bg-gradient-to-r from-transparent via-[#7dd3fc] to-transparent"></div>
      </div>

      <!-- Static Background Image removed as we use video -->

      <!-- Cards Container -->
      <div class="relative w-full h-full transform-style-3d z-10 transition-opacity duration-300"
           [class.opacity-0]="isTransitioning()">
        @for (card of displayCards(); track card.id; let i = $index) {
          <div class="absolute top-1/2 left-1/2 w-72 h-[420px] -ml-36 -mt-[210px] origin-center will-change-transform"
               [style.transform]="cardStyles()[i]?.transform"
               [style.z-index]="cardStyles()[i]?.zIndex"
               [style.opacity]="cardStyles()[i]?.opacity"
               [style.filter]="cardStyles()[i]?.filter">
            
            <!-- Card -->
            <div class="w-full h-full relative rounded-[24px] bg-[#111] border border-white/10 flex flex-col items-center justify-end p-6 cursor-pointer overflow-hidden transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#7dd3fc]/50 shadow-2xl"
                 role="button"
                 tabindex="0"
                 [attr.aria-label]="'Seleccionar ' + card.title"
                 [ngClass]="{
                   'border-[#7dd3fc]/50 shadow-[0_0_40px_rgba(125,211,252,0.2)]': cardStyles()[i]?.isFront,
                   'animate-vibrate-expand': selectedItemId() === card.id
                 }"
                 (click)="selectCard(card, i)"
                 (keydown.enter)="selectCard(card, i)"
                 (keydown.space)="selectCard(card, i)">
              
              <!-- Background Image -->
              @if (card.image) {
                <img [src]="card.image" alt="" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                     [ngClass]="{'scale-110': cardStyles()[i]?.isFront, 'scale-100 opacity-50': !cardStyles()[i]?.isFront}"
                     referrerpolicy="no-referrer" />
                <!-- Dark Gradient Overlay for text readability -->
                <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/20 transition-opacity duration-500"
                     [ngClass]="{'opacity-90': !cardStyles()[i]?.isFront, 'opacity-100': cardStyles()[i]?.isFront}"></div>
              }

              <!-- Sparkles / Fire effect container -->
              <div class="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500"
                   [class.opacity-100]="selectedItemId() === card.id">
                <div class="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#7dd3fc]/40 to-transparent"></div>
                <!-- Simulated sparks -->
                <div class="absolute bottom-4 left-1/4 w-1 h-1 bg-[#7dd3fc] rounded-full shadow-[0_0_5px_#7dd3fc] animate-ping"></div>
                <div class="absolute bottom-8 right-1/4 w-1.5 h-1.5 bg-[#7dd3fc] rounded-full shadow-[0_0_8px_#7dd3fc] animate-pulse" style="animation-delay: 100ms;"></div>
                <div class="absolute bottom-12 left-1/2 w-1 h-1 bg-[#7dd3fc] rounded-full shadow-[0_0_5px_#7dd3fc] animate-ping" style="animation-delay: 300ms;"></div>
                <div class="absolute bottom-16 left-1/3 w-2 h-2 bg-[#7dd3fc] rounded-full shadow-[0_0_10px_#7dd3fc] animate-bounce" style="animation-delay: 200ms;"></div>
              </div>

              <!-- Content -->
              <div class="relative z-10 flex flex-col items-center text-center gap-2 transform transition-all duration-700 w-full"
                   [ngClass]="{'translate-y-0 scale-100': cardStyles()[i]?.isFront, 'translate-y-4 scale-90 opacity-60': !cardStyles()[i]?.isFront}">
                
                @if (card.icon && viewState() === 'categories') {
                  <mat-icon class="text-white/80 text-4xl !w-10 !h-10 transition-colors duration-500 mb-2" 
                            [ngClass]="{'text-[#7dd3fc] drop-shadow-[0_0_15px_rgba(125,211,252,0.8)]': cardStyles()[i]?.isFront}">
                    {{ card.icon }}
                  </mat-icon>
                }
                
                <h2 class="font-montserrat font-black text-2xl tracking-wide text-white/90 transition-all duration-500"
                    [ngClass]="{'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] scale-105': cardStyles()[i]?.isFront}">
                  {{ card.title }}
                </h2>

                @if (card.price) {
                  <span class="text-[#7dd3fc] font-mono text-xl font-bold mt-1 transition-all duration-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                        [ngClass]="{'scale-110': cardStyles()[i]?.isFront}">{{ card.price }}</span>
                }

                @if (card.subtitle) {
                  <p class="text-white/70 text-sm mt-2 leading-relaxed px-2 transition-all duration-500 line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                     [ngClass]="{'opacity-100': cardStyles()[i]?.isFront, 'opacity-0': !cardStyles()[i]?.isFront}">{{ card.subtitle }}</p>
                }
              </div>

              <!-- Minimalist flicker indicator -->
              <div class="absolute bottom-4 w-8 h-0.5 rounded-full bg-white/20 transition-all duration-500 z-10"
                   [ngClass]="{'bg-[#7dd3fc] w-12 shadow-[0_0_15px_rgba(125,211,252,0.8)]': cardStyles()[i]?.isFront}"></div>
            </div>
          </div>
        }
      </div>

      <!-- Footer Hint -->
      <div class="absolute bottom-8 left-0 w-full flex flex-col items-center z-[200] pointer-events-none transition-opacity duration-500"
           [class.opacity-0]="selectedItemId() !== null || isProductModalOpen()">
        <p class="text-white/40 text-[9px] tracking-[0.4em] uppercase font-montserrat flex items-center gap-3 mb-2 drop-shadow-md">
          <mat-icon class="text-[14px] !w-3.5 !h-3.5 animate-bounce">
            {{ viewState() === 'categories' ? 'touch_app' : 'restaurant_menu' }}
          </mat-icon>
          {{ viewState() === 'categories' ? 'Toca para ver platos' : 'Desliza para explorar' }}
        </p>
        <div class="w-px h-8 bg-gradient-to-b from-[#7dd3fc]/60 to-transparent"></div>
      </div>
      </div>

      <!-- Product Detail Modal -->
      @if (isProductModalOpen() && selectedProduct()) {
        <div class="absolute inset-0 z-[1000] flex flex-col animate-fade-in pointer-events-auto"
             (pointerdown)="$event.stopPropagation()"
             (pointermove)="$event.stopPropagation()"
             (pointerup)="$event.stopPropagation()">
          
          <!-- Full Screen Background Image -->
          <div class="absolute inset-0 w-full h-full bg-black">
             <img [src]="selectedProduct()?.image" alt="" class="absolute inset-0 w-full h-full object-cover opacity-80" referrerpolicy="no-referrer" />
             <!-- Gradient Overlay to make text readable -->
             <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          </div>
          
          <!-- Details Area (Pushed to bottom) -->
          <div class="flex-1 flex flex-col justify-end p-6 relative z-20 animate-slide-up pb-8">
            <div class="bg-black/30 backdrop-blur-md rounded-[32px] p-6 border border-white/10 shadow-2xl">
              <div class="flex justify-between items-start mb-2 gap-4">
                <h2 class="font-montserrat font-black text-3xl text-white leading-tight drop-shadow-lg">{{ selectedProduct()?.name }}</h2>
                <span class="text-[#7dd3fc] font-mono text-2xl font-bold whitespace-nowrap drop-shadow-lg">{{ selectedProduct()?.price }}</span>
              </div>
              
              <div class="w-12 h-1 bg-[#7dd3fc] rounded-full mb-4 shadow-[0_0_10px_rgba(125,211,252,0.5)]"></div>
              
              <p class="text-white/90 text-lg leading-relaxed mb-6 font-light drop-shadow-md">
                {{ selectedProduct()?.description }}
              </p>
              
              <!-- Order Controls -->
              <div class="mt-auto flex flex-col gap-4">
                <div class="flex items-center justify-between bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-md">
                  <span class="text-white font-medium tracking-wide drop-shadow-md">CANTIDAD</span>
                  <div class="flex items-center gap-5">
                    <button (click)="decreaseQuantity()" 
                            class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors active:scale-95 border border-white/10 backdrop-blur-sm"
                            [class.opacity-50]="orderQuantity() <= 1"
                            [disabled]="orderQuantity() <= 1">
                      <mat-icon>remove</mat-icon>
                    </button>
                    <span class="text-white font-mono text-2xl w-8 text-center font-bold drop-shadow-md">{{ orderQuantity() }}</span>
                    <button (click)="increaseQuantity()" 
                            class="w-12 h-12 rounded-full bg-[#7dd3fc]/20 text-[#7dd3fc] flex items-center justify-center hover:bg-[#7dd3fc]/30 transition-colors active:scale-95 border border-[#7dd3fc]/30 backdrop-blur-sm">
                      <mat-icon>add</mat-icon>
                    </button>
                  </div>
                </div>
                
                <button (click)="addToOrder($event)" 
                        class="w-full py-5 rounded-2xl bg-[#7dd3fc] text-black font-black text-lg tracking-[0.1em] hover:bg-white transition-all shadow-[0_0_30px_rgba(125,211,252,0.3)] hover:shadow-[0_0_40px_rgba(125,211,252,0.5)] flex items-center justify-center gap-3 active:scale-[0.98]">
                  <mat-icon>shopping_cart_checkout</mat-icon>
                  AGREGAR AL PEDIDO
                </button>

                <button (click)="closeProductModal()"
                        class="w-full py-3 text-white/70 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors drop-shadow-md mt-2">
                  Volver a la carta
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Toast Notification -->
      @if (showToast()) {
        <div class="absolute top-12 left-1/2 -translate-x-1/2 z-[2000] bg-[#4caf50] text-white px-6 py-3 rounded-full font-medium shadow-[0_10px_30px_rgba(76,175,80,0.3)] flex items-center gap-3 animate-fade-in pointer-events-none">
          <mat-icon>check_circle</mat-icon>
          <span>¡Agregado al pedido!</span>
        </div>
      }

      <!-- Floating Action Buttons -->
      <div class="absolute bottom-8 right-8 z-[500] flex flex-col gap-4">
        <!-- Cart Indicator -->
        @if (cartService.totalItems() > 0) {
          <button (click)="showCheckout.set(true)"
                  class="relative w-14 h-14 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all shadow-xl hover:shadow-[0_0_20px_rgba(125,211,252,0.3)] pointer-events-auto group">
            <mat-icon class="text-[#7dd3fc] group-hover:scale-110 transition-transform">shopping_cart</mat-icon>
            <span class="absolute -top-2 -right-2 bg-[#ff5a00] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-[#050505]">
              {{ cartService.totalItems() }}
            </span>
          </button>
        }
      </div>

      <!-- AI Assistant Button -->
      <div class="absolute bottom-8 left-8 z-[500]">
        <button (click)="openAiAssistant()"
                class="relative w-14 h-14 rounded-full bg-[#0a0a0a] border border-[#7dd3fc]/30 flex items-center justify-center text-white hover:bg-[#7dd3fc]/10 transition-all shadow-[0_0_15px_rgba(125,211,252,0.2)] hover:shadow-[0_0_25px_rgba(125,211,252,0.5)] pointer-events-auto group overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-tr from-[#7dd3fc]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <mat-icon class="text-[#7dd3fc] group-hover:scale-110 transition-transform relative z-10 animate-pulse-slow">auto_awesome</mat-icon>
        </button>
      </div>

      <!-- AI Assistant Overlay -->
      @if (showAiAssistant()) {
        <div class="absolute inset-0 z-[3000] flex flex-col bg-[#050505]/95 backdrop-blur-2xl animate-fade-in pointer-events-auto"
             (pointerdown)="$event.stopPropagation()"
             (pointermove)="$event.stopPropagation()"
             (pointerup)="$event.stopPropagation()">
          
          <div class="flex-1 w-full max-w-3xl mx-auto p-8 flex flex-col h-full relative">
            
            <div class="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-[#0a0a0a] border border-[#7dd3fc]/30 flex items-center justify-center shadow-[0_0_15px_rgba(125,211,252,0.2)]">
                  <mat-icon class="text-[#7dd3fc]">auto_awesome</mat-icon>
                </div>
                <div>
                  <h2 class="font-montserrat font-black text-2xl text-white tracking-widest uppercase">Maestro Asador</h2>
                  <p class="text-[#7dd3fc] text-sm font-mono">Asistente de IA (Preparado para Gemini)</p>
                </div>
              </div>
              <button (click)="closeAiAssistant()" class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <!-- Chat History Area -->
            <div class="flex-1 overflow-y-auto touch-pan-y custom-scrollbar pr-4 space-y-6 mb-6">
              @for (msg of aiAssistantService.messages(); track $index) {
                @if (msg.role === 'assistant') {
                  <div class="flex gap-4">
                    <div class="w-10 h-10 rounded-full bg-[#0a0a0a] border border-[#7dd3fc]/30 flex-shrink-0 flex items-center justify-center">
                      <mat-icon class="text-[#7dd3fc] text-sm">auto_awesome</mat-icon>
                    </div>
                    <div class="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                      <p class="text-white/80 font-light leading-relaxed">
                        {{ msg.content }}
                      </p>
                    </div>
                  </div>
                } @else {
                  <div class="flex gap-4 justify-end">
                    <div class="bg-[#7dd3fc]/10 border border-[#7dd3fc]/30 rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                      <p class="text-white/90 font-light leading-relaxed">
                        {{ msg.content }}
                      </p>
                    </div>
                    <div class="w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/10 flex-shrink-0 flex items-center justify-center">
                      <mat-icon class="text-white/50 text-sm">person</mat-icon>
                    </div>
                  </div>
                }
              }
            </div>

            <!-- Input Area -->
            <div class="relative">
              <input type="text" 
                     #chatInput
                     (keydown.enter)="sendMessage(chatInput.value); chatInput.value = ''"
                     placeholder="Pregúntale al Maestro Asador..." 
                     class="w-full bg-[#0a0a0a] border border-white/10 rounded-full py-4 pl-6 pr-16 text-white placeholder:text-white/30 focus:outline-none focus:border-[#7dd3fc]/50 focus:ring-1 focus:ring-[#7dd3fc]/50 transition-all shadow-inner">
              <button (click)="sendMessage(chatInput.value); chatInput.value = ''" class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#7dd3fc] text-black flex items-center justify-center hover:bg-white transition-colors shadow-[0_0_15px_rgba(125,211,252,0.3)]">
                <mat-icon class="text-sm">send</mat-icon>
              </button>
            </div>
            
          </div>
        </div>
      }

      <!-- Checkout Overlay (Resumen del Ritual) -->
      @if (showCheckout()) {
        <div class="absolute inset-0 z-[2000] flex flex-col bg-[#050505]/90 backdrop-blur-xl animate-fade-in pointer-events-auto"
             (pointerdown)="$event.stopPropagation()"
             (pointermove)="$event.stopPropagation()"
             (pointerup)="$event.stopPropagation()">
          
          <div class="flex-1 w-full max-w-2xl mx-auto p-8 flex flex-col h-full relative">
            
            @if (!orderSuccess()) {
              <div class="flex justify-between items-center mb-8">
                <h2 class="font-montserrat font-black text-3xl text-white tracking-widest uppercase">Resumen del Ritual</h2>
                <button (click)="closeCheckout()" class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/20 transition-colors" [disabled]="isConfirming()">
                  <mat-icon>close</mat-icon>
                </button>
              </div>

              <div class="flex-1 overflow-y-auto touch-pan-y custom-scrollbar pr-4 space-y-6 transition-opacity duration-300" [class.opacity-30]="isConfirming()">
                @if (cartService.items().length === 0) {
                  <div class="h-full flex flex-col items-center justify-center text-white/40">
                    <mat-icon class="text-6xl mb-4 opacity-50">remove_shopping_cart</mat-icon>
                    <p class="font-montserrat text-lg">Tu mesa está vacía.</p>
                  </div>
                } @else {
                  @for (item of cartService.items(); track item.id) {
                    <div class="relative flex items-center p-4 rounded-2xl border border-white/10 overflow-hidden min-h-[120px]">
                      <!-- Background Image with Gradient Overlay -->
                      <div class="absolute inset-0 w-full h-full bg-black">
                        <img [src]="item.image" class="absolute inset-0 w-full h-full object-cover opacity-50" alt="" referrerpolicy="no-referrer">
                        <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/90"></div>
                      </div>
                      
                      <!-- Content -->
                      <div class="relative z-10 flex-1 flex flex-col justify-center pr-4">
                        <h4 class="text-white font-bold text-lg leading-tight mb-1 drop-shadow-md">{{ item.name }}</h4>
                        <p class="text-white/70 text-sm line-clamp-2 drop-shadow-md">{{ item.description }}</p>
                      </div>
                      
                      <!-- Counter -->
                      <div class="relative z-10 flex flex-col items-center gap-2 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 min-w-[80px]">
                        <div class="flex items-center gap-2">
                          <button (click)="cartService.updateQuantity(item.id, 1)" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" [disabled]="isConfirming()">
                            <mat-icon class="text-sm">add</mat-icon>
                          </button>
                          <button (click)="decreaseCartQuantity(item)" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors" [disabled]="isConfirming()">
                            <mat-icon class="text-sm">remove</mat-icon>
                          </button>
                        </div>
                        <span class="text-white font-bold text-xl">{{ item.quantity }}</span>
                      </div>
                    </div>
                  }
                }
              </div>

              <!-- Remove Confirmation Modal -->
              @if (itemToRemove()) {
                <div class="absolute inset-0 z-[3000] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in pointer-events-auto">
                  <div class="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-sm w-[90%] mx-auto flex flex-col items-center text-center shadow-2xl animate-scale-in">
                    <div class="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
                      <mat-icon class="text-red-400 text-3xl !w-8 !h-8">delete_outline</mat-icon>
                    </div>
                    <h3 class="text-white font-montserrat font-bold text-xl mb-2">¿Eliminar plato?</h3>
                    <p class="text-white/60 text-sm mb-8">¿Estás seguro de que deseas eliminar "{{ itemToRemove()?.name }}" de tu selección?</p>
                    
                    <div class="flex gap-4 w-full">
                      <button (click)="cancelRemove()" class="flex-1 py-3 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors">
                        Mantener
                      </button>
                      <button (click)="confirmRemove()" class="flex-1 py-3 rounded-xl bg-red-500/80 text-white font-bold hover:bg-red-500 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              }

              <div class="mt-8 pt-8 border-t border-white/10 transition-opacity duration-300" [class.opacity-30]="isConfirming()">
                <div class="flex justify-between items-end mb-6">
                  <span class="text-white/60 font-montserrat tracking-widest text-sm">TOTAL ESTIMADO</span>
                  <span class="text-white font-mono text-4xl font-bold">{{ cartService.totalPrice() | number:'1.2-2' }} €</span>
                </div>
                
                <div class="flex flex-col gap-4">
                  <button (click)="confirmOrder($event)"
                          class="relative w-full py-5 rounded-2xl bg-[#7dd3fc] text-black font-black text-lg tracking-[0.2em] uppercase hover:bg-white transition-all shadow-[0_0_30px_rgba(125,211,252,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                          [disabled]="cartService.items().length === 0 || isConfirming()">
                    @if (isConfirming()) {
                      <mat-icon class="animate-spin">sync</mat-icon>
                      Preparando Fuego...
                    } @else {
                      <mat-icon>local_fire_department</mat-icon>
                      A la brasa
                    }
                  </button>

                  <button (click)="closeCheckout()"
                          [disabled]="isConfirming()"
                          class="w-full py-4 rounded-2xl border border-white/10 text-white/60 font-bold uppercase tracking-widest hover:text-white hover:bg-white/5 transition-all text-sm">
                    Seguir pidiendo
                  </button>
                </div>
              </div>
            } @else {
              <!-- Success State / Ritual Tracker -->
              <div class="absolute inset-0 flex flex-col animate-fade-in z-10 bg-[#050505] overflow-y-auto touch-pan-y custom-scrollbar p-8">
                <!-- Header -->
                <div class="flex flex-col items-center mb-10">
                  <div class="w-20 h-20 rounded-full bg-[#7dd3fc]/20 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(125,211,252,0.2)]">
                    <mat-icon class="text-[#7dd3fc] text-4xl">local_fire_department</mat-icon>
                  </div>
                  <h2 class="font-montserrat font-black text-3xl text-white tracking-widest uppercase mb-2 text-center">Ritual en Marcha</h2>
                  <p class="text-white/40 text-sm text-center uppercase tracking-[0.2em]">Mesa 4 • Pedido #{{ (Math.random() * 1000).toFixed(0) }}</p>
                </div>

                <!-- Ritual Progress -->
                <div class="bg-white/5 rounded-[2rem] p-8 border border-white/10 mb-8">
                  <div class="flex justify-between items-center mb-8 relative">
                    <!-- Progress Line -->
                    <div class="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0"></div>
                    <div class="absolute top-1/2 left-0 w-1/3 h-1 bg-[#7dd3fc] -translate-y-1/2 z-0 shadow-[0_0_10px_#7dd3fc]"></div>

                    <!-- Steps -->
                    <div class="relative z-10 flex flex-col items-center gap-2">
                      <div class="w-10 h-10 rounded-full bg-[#7dd3fc] flex items-center justify-center text-black">
                        <mat-icon class="text-sm">check</mat-icon>
                      </div>
                      <span class="text-[#7dd3fc] text-[10px] font-bold uppercase tracking-wider">Recibido</span>
                    </div>
                    <div class="relative z-10 flex flex-col items-center gap-2">
                      <div class="w-10 h-10 rounded-full bg-[#0a0a0a] border-2 border-[#7dd3fc] flex items-center justify-center text-[#7dd3fc] animate-pulse">
                        <mat-icon class="text-sm">outdoor_grill</mat-icon>
                      </div>
                      <span class="text-white text-[10px] font-bold uppercase tracking-wider">En Brasa</span>
                    </div>
                    <div class="relative z-10 flex flex-col items-center gap-2 opacity-30">
                      <div class="w-10 h-10 rounded-full bg-[#0a0a0a] border-2 border-white/20 flex items-center justify-center text-white">
                        <mat-icon class="text-sm">restaurant</mat-icon>
                      </div>
                      <span class="text-white text-[10px] font-bold uppercase tracking-wider">Servido</span>
                    </div>
                  </div>
                  <p class="text-white/60 text-center text-sm italic">"El fuego lleva su tiempo. El Maestro Asador está cuidando cada detalle."</p>
                </div>

                <!-- Share the Ritual -->
                <div class="mb-10">
                  <h3 class="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-center">Comparte el Ritual</h3>
                  <div class="flex justify-center gap-4">
                    <button class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:-translate-y-1">
                      <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </button>
                    <button class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:-translate-y-1">
                      <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.65zm6.59-4.819c1.557.925 3.567 1.414 5.35 1.415 5.436 0 9.859-4.423 9.862-9.859.002-2.633-1.023-5.11-2.884-6.971-1.861-1.862-4.337-2.889-6.971-2.89-5.437 0-9.86 4.423-9.863 9.86-.001 1.93.55 3.804 1.59 5.435l-1.041 3.805 3.909-1.025zm11.346-7.42c-.301-.151-1.781-.878-2.057-.978-.275-.1-.476-.151-.676.151-.2.301-.777.978-.951 1.178-.175.2-.351.226-.652.075-.301-.151-1.27-.467-2.42-1.493-.894-.797-1.496-1.782-1.672-2.083-.176-.301-.019-.463.132-.613.135-.134.301-.351.451-.526.15-.175.201-.301.301-.501.1-.2.05-.376-.025-.526-.075-.151-.676-1.63-.926-2.232-.244-.594-.493-.513-.676-.522-.175-.009-.376-.01-.576-.01-.2 0-.527.075-.802.376-.275.301-1.053 1.028-1.053 2.507 0 1.479 1.078 2.908 1.228 3.108.15.2 2.122 3.24 5.139 4.541.718.31 1.279.495 1.716.635.722.23 1.378.197 1.897.12.579-.085 1.781-.728 2.031-1.43.25-.702.25-1.303.175-1.43-.075-.127-.275-.201-.576-.352z"/></svg>
                    </button>
                    <button class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all hover:-translate-y-1">
                      <mat-icon>share</mat-icon>
                    </button>
                  </div>
                </div>

                <!-- Voice of the Community (Reviews) -->
                <div class="mb-10">
                  <div class="flex items-center justify-between mb-6">
                    <h3 class="text-white font-bold tracking-widest uppercase text-sm">La Voz del Ritual</h3>
                    <div class="flex items-center gap-1 text-yellow-500">
                      <mat-icon class="text-sm">star</mat-icon>
                      <span class="text-white font-bold text-xs">4.9</span>
                      <span class="text-white/40 text-[10px] ml-1">(+6000 reseñas)</span>
                    </div>
                  </div>
                  
                  <div class="space-y-4">
                    <div class="bg-white/5 p-5 rounded-2xl border border-white/5 relative overflow-hidden group">
                      <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <mat-icon class="text-4xl">format_quote</mat-icon>
                      </div>
                      <div class="flex gap-1 text-yellow-500 mb-2">
                        <mat-icon class="text-xs">star</mat-icon>
                        <mat-icon class="text-xs">star</mat-icon>
                        <mat-icon class="text-xs">star</mat-icon>
                        <mat-icon class="text-xs">star</mat-icon>
                        <mat-icon class="text-xs">star</mat-icon>
                      </div>
                      <p class="text-white/80 text-sm italic mb-3">"La mejor entraña que he probado en mi vida. El punto de la carne es simplemente perfecto. Un ritual obligatorio en Madrid."</p>
                      <p class="text-[#7dd3fc] text-[10px] font-bold uppercase tracking-widest">— Carlos M. (Google Local Guide)</p>
                    </div>

                    <div class="bg-white/5 p-5 rounded-2xl border border-white/5 relative overflow-hidden group">
                      <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <mat-icon class="text-4xl">format_quote</mat-icon>
                      </div>
                      <div class="flex gap-1 text-yellow-500 mb-2">
                        <mat-icon class="text-xs">star</mat-icon>
                        <mat-icon class="text-xs">star</mat-icon>
                        <mat-icon class="text-xs">star</mat-icon>
                        <mat-icon class="text-xs">star</mat-icon>
                        <mat-icon class="text-xs">star</mat-icon>
                      </div>
                      <p class="text-white/80 text-sm italic mb-3">"Espectacular. El servicio es impecable y la calidad de la carne argentina es de otro planeta. 100% recomendable."</p>
                      <p class="text-[#7dd3fc] text-[10px] font-bold uppercase tracking-widest">— Elena R. (TripAdvisor)</p>
                    </div>
                  </div>
                </div>

                <!-- Join the Ritual CTA -->
                @if (!authService.currentUser()) {
                  <div class="bg-gradient-to-br from-[#7dd3fc]/20 to-transparent p-8 rounded-[2rem] border border-[#7dd3fc]/30 text-center mb-10">
                    <mat-icon class="text-[#7dd3fc] text-4xl mb-4">stars</mat-icon>
                    <h3 class="text-white font-black text-xl uppercase tracking-widest mb-3">¿Quieres más Brasa?</h3>
                    <p class="text-white/70 text-sm mb-6">Regístrate ahora y gana <strong>500 puntos</strong> extra por este pedido. Únete a nuestra comunidad de amantes del fuego.</p>
                    <button (click)="openLoginModal()" class="w-full py-4 rounded-xl bg-[#7dd3fc] text-black font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(125,211,252,0.3)]">
                      Registrarme y Ganar Puntos
                    </button>
                  </div>
                } @else {
                  <div class="bg-emerald-500/10 p-6 rounded-[2rem] border border-emerald-500/20 text-center mb-10">
                    <mat-icon class="text-emerald-400 text-3xl mb-2">check_circle</mat-icon>
                    <p class="text-white font-bold">¡Has ganado 150 puntos!</p>
                    <p class="text-white/40 text-xs mt-1">Se añadirán a tu perfil al finalizar el ritual.</p>
                  </div>
                }

                <button (click)="closeCheckout()" class="w-full py-4 text-white/40 font-bold uppercase tracking-[0.2em] text-xs hover:text-white transition-colors mb-8">
                  Volver al Catálogo
                </button>
              </div>
            }
          </div>
        </div>
      }

      <!-- Sidebar Menu -->
      @if (showSidebar()) {
        <div class="absolute inset-0 z-[2000] flex">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
               (click)="showSidebar.set(false)"
               (keydown.enter)="showSidebar.set(false)"
               role="button"
               tabindex="0"
               aria-label="Cerrar menú"></div>
          
          <!-- Sidebar Content -->
          <div class="relative w-80 max-w-[80vw] h-full bg-[#0a0a0a] border-r border-white/10 shadow-2xl flex flex-col animate-slide-in-left">
            <div class="p-6 flex justify-between items-center border-b border-white/5">
              <div class="flex items-center gap-2">
                <mat-icon class="text-[#7dd3fc]">local_fire_department</mat-icon>
                <span class="font-montserrat font-black text-xl text-white tracking-widest uppercase">Menú</span>
              </div>
              <button (click)="showSidebar.set(false)" class="text-white/60 hover:text-white transition-colors">
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <div class="flex-1 overflow-y-auto touch-pan-y p-6 flex flex-col gap-8 custom-scrollbar">
              <!-- Top: User Profile Section or Login CTA -->
              @if (authService.currentUser()) {
                <div class="bg-white/5 rounded-2xl p-5 border border-white/10">
                  <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-[#7dd3fc] to-blue-600 flex items-center justify-center text-black font-bold text-xl uppercase">
                      {{ authService.currentUser()?.name?.charAt(0) }}
                    </div>
                    <div>
                      <h3 class="text-white font-bold">{{ authService.currentUser()?.name }}</h3>
                      <p class="text-[#7dd3fc] text-xs uppercase tracking-wider">{{ authService.currentUser()?.role }}</p>
                    </div>
                  </div>
                  
                  @if (authService.currentUser()?.role === 'user') {
                    <div class="flex items-center justify-between bg-black/50 rounded-xl p-3 border border-white/5">
                      <span class="text-white/60 text-sm">Puntos de Brasa</span>
                      <span class="text-[#7dd3fc] font-mono font-bold">{{ authService.currentUser()?.points }} pts</span>
                    </div>
                  }
                  
                  <button (click)="logout()" class="w-full mt-4 py-2 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-colors text-sm font-bold uppercase tracking-wider">
                    Cerrar Sesión
                  </button>
                </div>
              } @else {
                <div class="bg-gradient-to-br from-[#7dd3fc]/10 to-transparent rounded-2xl p-6 border border-[#7dd3fc]/20 text-center">
                  <mat-icon class="text-[#7dd3fc] text-4xl mb-3">stars</mat-icon>
                  <h3 class="text-white font-bold mb-2">Únete al Ritual</h3>
                  <p class="text-white/60 text-sm mb-4">Regístrate para acumular puntos, ver tu historial y desbloquear cortes exclusivos.</p>
                  <button (click)="openLoginModal()" class="w-full py-3 rounded-xl bg-[#7dd3fc] text-black font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-[0_0_15px_rgba(125,211,252,0.3)]">
                    Iniciar Sesión
                  </button>
                </div>
              }

              <!-- Middle: Role-Specific Links -->
              <nav class="flex flex-col gap-2">
                @if (authService.currentUser()?.role === 'user') {
                  <div class="mb-2">
                    <h4 class="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 px-4">Mi Actividad</h4>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      <mat-icon class="text-[#7dd3fc]">event_seat</mat-icon>
                      <span class="font-medium">Mis Reservas</span>
                    </a>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      <mat-icon class="text-[#7dd3fc]">history</mat-icon>
                      <span class="font-medium">Historial de Pedidos</span>
                    </a>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      <mat-icon class="text-[#7dd3fc]">star_rate</mat-icon>
                      <span class="font-medium">Valorar Experiencia</span>
                    </a>
                  </div>
                }

                @if (authService.currentUser()?.role === 'kitchen' || authService.currentUser()?.role === 'admin') {
                  <div class="mb-2">
                    <h4 class="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 px-4">Cocina</h4>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-xl text-[#ff5a00] hover:bg-[#ff5a00]/10 transition-colors">
                      <mat-icon>outdoor_grill</mat-icon>
                      <span class="font-bold">KDS - Pantalla Cocina</span>
                    </a>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      <mat-icon class="text-[#ff5a00]">timer</mat-icon>
                      <span class="font-medium">Tiempos de Preparación</span>
                    </a>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      <mat-icon class="text-[#ff5a00]">inventory_2</mat-icon>
                      <span class="font-medium">Alertas de Stock</span>
                    </a>
                  </div>
                }

                @if (authService.currentUser()?.role === 'waiter' || authService.currentUser()?.role === 'admin') {
                  <div class="mb-2">
                    <h4 class="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 px-4">Sala</h4>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-xl text-[#7dd3fc] hover:bg-[#7dd3fc]/10 transition-colors">
                      <mat-icon>table_restaurant</mat-icon>
                      <span class="font-bold">Mapa de Mesas</span>
                    </a>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      <mat-icon class="text-[#7dd3fc]">reviews</mat-icon>
                      <span class="font-medium">Mis Valoraciones</span>
                    </a>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      <mat-icon class="text-[#7dd3fc]">payments</mat-icon>
                      <span class="font-medium">Propinas</span>
                    </a>
                  </div>
                }

                @if (authService.currentUser()?.role === 'admin') {
                  <div class="mb-2">
                    <h4 class="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 px-4">Administración Avanzada</h4>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-xl text-emerald-400 hover:bg-emerald-400/10 transition-colors">
                      <mat-icon>insights</mat-icon>
                      <span class="font-bold">Rendimiento Financiero</span>
                    </a>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      <mat-icon class="text-emerald-400">groups</mat-icon>
                      <span class="font-medium">Desempeño de Personal</span>
                    </a>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      <mat-icon class="text-emerald-400">restaurant</mat-icon>
                      <span class="font-medium">Uso y Desgaste de Mesas</span>
                    </a>
                    <a href="#" class="flex items-center gap-4 px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors">
                      <mat-icon class="text-emerald-400">event_available</mat-icon>
                      <span class="font-medium">Gestión de Reservas</span>
                    </a>
                  </div>
                }
              </nav>
            </div>
            
            <!-- Bottom: Common Links (Hidden away) -->
            <div class="p-6 border-t border-white/5 flex flex-col gap-3">
              <a href="#" class="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-3"><mat-icon class="text-[18px]">restaurant_menu</mat-icon> Nuestra Carta</a>
              <a href="#" class="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-3"><mat-icon class="text-[18px]">info</mat-icon> Sobre Nosotros</a>
              <a href="#" class="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-3"><mat-icon class="text-[18px]">contact_support</mat-icon> Contacto y Ubicación</a>
              <a href="#" class="text-white/40 hover:text-white text-sm transition-colors flex items-center gap-3"><mat-icon class="text-[18px]">gavel</mat-icon> Términos Legales</a>
              <p class="text-white/20 text-xs mt-4">Asado Central OS v1.0</p>
            </div>
          </div>
        </div>
      }

      <!-- Login Modal (Mock) -->
      @if (showLoginModal()) {
        <div class="absolute inset-0 z-[3000] flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/80 backdrop-blur-xl" 
               (click)="showLoginModal.set(false)"
               (keydown.enter)="showLoginModal.set(false)"
               role="button"
               tabindex="0"
               aria-label="Cerrar acceso"></div>
          
          <div class="relative w-full max-w-md bg-[#050505] border border-white/10 rounded-[2rem] p-8 shadow-2xl flex flex-col animate-fade-in">
            <div class="flex justify-between items-center mb-6">
              <h2 class="font-montserrat font-black text-2xl text-white tracking-widest uppercase">Acceso</h2>
              <button (click)="showLoginModal.set(false)" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <mat-icon>close</mat-icon>
              </button>
            </div>
            
            <p class="text-white/60 mb-8 text-sm">Selecciona un perfil de prueba para ver cómo cambia la interfaz según el rol.</p>
            
            <div class="flex flex-col gap-3">
              <button (click)="mockLogin('cliente@gmail.com', 'user')" class="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-left group">
                <div class="w-10 h-10 rounded-full bg-[#7dd3fc]/20 flex items-center justify-center text-[#7dd3fc] group-hover:scale-110 transition-transform">
                  <mat-icon>person</mat-icon>
                </div>
                <div>
                  <h4 class="text-white font-bold">Cliente VIP</h4>
                  <p class="text-white/50 text-xs">Desbloquea gamificación y puntos</p>
                </div>
              </button>
              
              <button (click)="mockLogin('cocina@asador.com', 'kitchen')" class="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-left group">
                <div class="w-10 h-10 rounded-full bg-[#ff5a00]/20 flex items-center justify-center text-[#ff5a00] group-hover:scale-110 transition-transform">
                  <mat-icon>outdoor_grill</mat-icon>
                </div>
                <div>
                  <h4 class="text-white font-bold">Maestro Asador</h4>
                  <p class="text-white/50 text-xs">Acceso a KDS (Pantalla de Cocina)</p>
                </div>
              </button>
              
              <button (click)="mockLogin('sala@asador.com', 'waiter')" class="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-left group">
                <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <mat-icon>room_service</mat-icon>
                </div>
                <div>
                  <h4 class="text-white font-bold">Camarero</h4>
                  <p class="text-white/50 text-xs">Acceso a Mapa de Mesas</p>
                </div>
              </button>
              
              <button (click)="mockLogin('dueño@asador.com', 'admin')" class="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-left group">
                <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <mat-icon>admin_panel_settings</mat-icon>
                </div>
                <div>
                  <h4 class="text-white font-bold">Propietario</h4>
                  <p class="text-white/50 text-xs">Acceso total y Dashboard</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      }

      <!-- RESERVATION SUCCESS MODAL -->
      @if (reservationSuccess()) {
        <div class="fixed inset-0 z-[3000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
          <div class="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center flex flex-col items-center gap-6 animate-fade-in shadow-[0_0_50px_rgba(125,211,252,0.1)]">
            <div class="w-16 h-16 rounded-full bg-[#7dd3fc]/20 flex items-center justify-center">
              <mat-icon class="text-[#7dd3fc] text-3xl !w-8 !h-8 flex items-center justify-center">check_circle</mat-icon>
            </div>
            <div>
              <h3 class="font-montserrat font-black text-2xl text-white mb-2">¡MESA CONFIRMADA!</h3>
              <p class="text-white/60 text-sm">Tu reserva ha sido registrada con éxito. Te esperamos para vivir el ritual del fuego.</p>
            </div>
            <button (click)="reservationSuccess.set(false)" class="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors">
              CERRAR
            </button>
          </div>
        </div>
      }

      <!-- Locations Section -->
      <section class="relative w-full py-32 px-6 flex flex-col items-center justify-center z-10">
        <div class="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer group">
            <mat-icon class="text-[#7dd3fc] text-4xl mb-4 group-hover:scale-110 transition-transform">location_on</mat-icon>
            <h3 class="font-montserrat font-black text-2xl text-white mb-2">SEDE MADRID</h3>
            <p class="text-white/60 font-light">Calle de Jorge Juan, 14</p>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer group">
            <mat-icon class="text-[#7dd3fc] text-4xl mb-4 group-hover:scale-110 transition-transform">location_on</mat-icon>
            <h3 class="font-montserrat font-black text-2xl text-white mb-2">SEDE BARCELONA</h3>
            <p class="text-white/60 font-light">Passeig de Gràcia, 92</p>
          </div>
        </div>
      </section>

      <!-- Terms and Conditions Hook -->
      <section class="relative w-full py-24 px-6 flex flex-col items-center justify-center border-t border-white/10 bg-[#050505]/80 backdrop-blur-xl z-10">
        <div class="max-w-2xl mx-auto text-center">
          <mat-icon class="text-[#7dd3fc] text-4xl mb-6">description</mat-icon>
          <h2 class="font-montserrat font-black text-3xl text-white mb-6 tracking-tight">TÉRMINOS Y CONDICIONES</h2>
          <p class="text-white/80 text-sm leading-loose font-light mb-8">
            Nosotros no vamos a contar nada de ti, pero estaríamos encantados de que le grites a viva voz a todo el mundo de nuestra existencia. Al hacerlo, te traerá beneficios exclusivos en nuestros locales.
          </p>
          <button class="bg-[#7dd3fc] text-black font-bold py-4 px-8 rounded-full hover:bg-white transition-colors shadow-[0_0_20px_rgba(125,211,252,0.3)]">
            DEJAR UNA RESEÑA
          </button>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="w-full py-12 bg-[#050505] flex flex-col items-center justify-center gap-6 border-t border-white/5 z-10 relative">
        <div class="flex items-center gap-2">
          <mat-icon class="text-[#7dd3fc] text-xl">local_fire_department</mat-icon>
          <span class="font-montserrat font-black tracking-widest text-white">ASADO CENTRAL</span>
        </div>
        <div class="flex gap-6">
          <a href="#" class="text-white/40 hover:text-white transition-colors"><mat-icon>camera_alt</mat-icon></a>
          <a href="#" class="text-white/40 hover:text-white transition-colors"><mat-icon>facebook</mat-icon></a>
        </div>
        <p class="text-white/20 text-xs font-mono text-center">
          © 2026 ASADO CENTRAL.<br>"EL DOMINIO DEL FUEGO."
        </p>
      </footer>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .perspective-\\[1200px\\] { perspective: 1200px; }
    .transform-style-3d { transform-style: preserve-3d; }
    
    @keyframes slideUp {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .animate-slide-up {
      animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideInLeft {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    .animate-slide-in-left {
      animation: slideInLeft 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    .animate-slide-up {
      animation: slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
  `]
})
export class CarouselCylinderComponent implements AfterViewInit {
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  menuService = inject(MenuService);
  reservationService = inject(ReservationService);

  ngAfterViewInit() {
    if (this.bgVideo && this.bgVideo.nativeElement) {
      this.bgVideo.nativeElement.volume = 1; // Start with full volume
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.bgVideo || !this.bgVideo.nativeElement) return;
    
    // Calculate scroll percentage relative to the ritual section
    const ritualSection = document.getElementById('ritual-section');
    if (!ritualSection) return;

    const rect = ritualSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // If ritual section is at the top or above, volume should be 0
    // If it's below the fold, volume should be 1
    // Fade out as it gets closer to the top
    let volume = 1;
    if (rect.top <= windowHeight) {
      // Calculate how much of the section is visible
      const visibleRatio = Math.max(0, rect.top / windowHeight);
      volume = visibleRatio;
    }

    // Ensure volume is between 0 and 1
    this.bgVideo.nativeElement.volume = Math.max(0, Math.min(1, volume));
  }

  async submitReservation(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    
    const reservation: Reservation = {
      name: (form.elements.namedItem('name') as HTMLInputElement)?.value || '',
      email: (form.elements.namedItem('email') as HTMLInputElement)?.value || '',
      location: (form.elements.namedItem('location') as HTMLSelectElement)?.value || '',
      guests: (form.elements.namedItem('guests') as HTMLSelectElement)?.value || '',
    };

    await this.reservationService.createReservation(reservation);
    
    this.reservationSuccess.set(true);
    setTimeout(() => {
      this.reservationSuccess.set(false);
      form.reset();
    }, 4000);
  }

  appMode = signal<'intro' | 'catalog'>('intro');
  activeModal = signal<'historia' | 'madrid' | 'barcelona' | 'terminos' | null>(null);

  enterCatalog() {
    this.appMode.set('catalog');
  }

  openModal(modal: 'historia' | 'madrid' | 'barcelona' | 'terminos') {
    this.activeModal.set(modal);
  }

  closeModal() {
    this.activeModal.set(null);
  }

  viewState = signal<'categories' | 'items'>('categories');
  activeCategory = signal<Category | null>(null);
  showAiAssistant = signal<boolean>(false);
  
  cartService = inject(CartService);
  aiAssistantService = inject(AiAssistantService);
  authService = inject(AuthService);
  
  Math = Math;
  
  isTransitioning = signal(false);
  categoryProgress = signal(1);

  // Order Flow State
  showCheckout = signal(false);
  showSidebar = signal(false);
  showLoginModal = signal(false);
  isConfirming = signal(false);
  orderSuccess = signal(false);
  isProductModalOpen = signal(false);
  selectedProduct = signal<MenuItem | null>(null);
  orderQuantity = signal(1);
  showToast = signal(false);
  reservationSuccess = signal(false);
  itemToRemove = signal<CartItem | null>(null);

  scrollToRitual() {
    const el = document.getElementById('ritual-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  displayCards = computed<DisplayCard[]>(() => {
    if (this.viewState() === 'categories') {
      return this.menuService.categories().map(c => ({
        id: c.id,
        title: c.name,
        icon: c.icon,
        image: c.image,
        originalData: c
      }));
    } else {
      const cat = this.activeCategory();
      if (!cat) return [];
      return cat.items.map(item => ({
        id: item.id,
        title: item.name,
        subtitle: item.description,
        price: item.price,
        image: item.image,
        originalData: item
      }));
    }
  });

  progress = signal(1); // Start at index 1
  selectedItemId = signal<string | null>(null);

  private isDragging = false;
  private hasDragged = false;
  private startX = 0;
  private startProgress = 0;
  private lastDragX = 0;
  private lastDragTime = 0;
  private velocity = 0;
  private animation: { stop: () => void } | undefined;

  getDiff(index: number, p: number, N: number): number {
    let diff = (((index - p) % N) + N) % N;
    if (diff > N / 2) diff -= N;
    return diff;
  }

  cardStyles = computed(() => {
    const p = this.progress();
    const cards = this.displayCards();
    const N = cards.length;
    
    return cards.map((_, index) => {
      const diff = this.getDiff(index, p, N);
      const absDiff = Math.abs(diff);

      const sign = Math.sign(diff);
      const x = sign * (1 - Math.exp(-absDiff * 1.5)) * 260; 
      const z = -absDiff * 300; 
      const rotateY = -diff * 15; 
      
      return {
        transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg)`,
        zIndex: Math.round(100 - absDiff * 10),
        opacity: Math.max(0, 1 - absDiff * 0.8),
        filter: `blur(${absDiff * 4}px) brightness(${Math.max(0.4, 1 - absDiff * 0.5)})`,
        isFront: absDiff < 0.1
      };
    });
  });

  onPointerDown(e: PointerEvent) {
    if (this.selectedItemId() !== null || this.isTransitioning() || this.isProductModalOpen()) return;
    
    this.isDragging = true;
    this.hasDragged = false;
    this.startX = e.clientX;
    this.lastDragX = e.clientX;
    this.startProgress = this.progress();
    this.lastDragTime = performance.now();
    this.velocity = 0;
    if (this.animation) {
      this.animation.stop();
    }
    
    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
  }

  onPointerMove(e: PointerEvent) {
    if (!this.isDragging) return;
    
    const deltaX = e.clientX - this.startX;
    if (Math.abs(deltaX) > 5) {
      this.hasDragged = true;
    }

    const newProgress = this.startProgress - deltaX / 250;
    this.progress.set(newProgress);
    
    const now = performance.now();
    const dt = now - this.lastDragTime;
    if (dt > 0) {
      this.velocity = -(e.clientX - this.lastDragX) / 250 / dt;
    }
    
    this.lastDragX = e.clientX;
    this.lastDragTime = now;
  }

  onPointerUp(e: PointerEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    
    const el = e.currentTarget as HTMLElement;
    el.releasePointerCapture(e.pointerId);

    this.applyInertia();
  }

  applyInertia() {
    const p = this.progress();
    const predictedProgress = p + this.velocity * 150; 
    
    const targetProgress = Math.round(predictedProgress);

    this.animation = animate(p, targetProgress, {
      type: "spring",
      stiffness: 400,
      damping: 40,
      mass: 1,
      onUpdate: (v) => this.progress.set(v)
    });
  }

  selectCard(card: DisplayCard, index: number) {
    if (this.selectedItemId() !== null || this.isTransitioning() || this.isProductModalOpen()) return;
    if (this.hasDragged) return;
    
    const diff = this.getDiff(index, this.progress(), this.displayCards().length);
    if (Math.abs(diff) > 0.1) {
      const targetProgress = this.progress() + diff;
      this.animation = animate(this.progress(), targetProgress, {
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 1,
        onUpdate: (v) => this.progress.set(v)
      });
      return;
    }

    if (this.viewState() === 'categories') {
      // Transition to items view
      this.isTransitioning.set(true);
      this.categoryProgress.set(this.progress());
      
      setTimeout(() => {
        this.activeCategory.set(card.originalData as Category);
        this.viewState.set('items');
        this.progress.set(0); // Reset progress for the new carousel
        this.isTransitioning.set(false);
      }, 300); // Wait for fade out
      
    } else {
      // Item selected
      this.selectedItemId.set(card.id);
      
      setTimeout(() => {
        this.selectedProduct.set(card.originalData as MenuItem);
        this.orderQuantity.set(1);
        this.isProductModalOpen.set(true);
        this.selectedItemId.set(null);
      }, 400); // Wait for the click animation
    }
  }

  goBack() {
    if (this.isTransitioning() || this.isProductModalOpen()) return;
    
    this.isTransitioning.set(true);
    
    setTimeout(() => {
      this.viewState.set('categories');
      this.activeCategory.set(null);
      this.progress.set(this.categoryProgress());
      this.isTransitioning.set(false);
    }, 300);
  }

  confirmOrder(event: MouseEvent) {
    this.createExplosion(event);
    this.isConfirming.set(true);
    // Simulate API call or processing
    setTimeout(() => {
      this.isConfirming.set(false);
      this.orderSuccess.set(true);
      this.cartService.clearCart();
    }, 2500);
  }

  decreaseCartQuantity(item: CartItem) {
    if (item.quantity === 1) {
      this.itemToRemove.set(item);
    } else {
      this.cartService.updateQuantity(item.id, -1);
    }
  }

  confirmRemove() {
    const item = this.itemToRemove();
    if (item) {
      this.cartService.updateQuantity(item.id, -1);
      this.itemToRemove.set(null);
    }
  }

  cancelRemove() {
    this.itemToRemove.set(null);
  }

  closeCheckout() {
    const wasSuccess = this.orderSuccess();
    this.showCheckout.set(false);
    setTimeout(() => {
      this.isConfirming.set(false);
      this.orderSuccess.set(false);
      if (wasSuccess) {
        this.showSidebar.set(true);
      }
    }, 300);
  }

  // --- Auth Flow Methods ---
  
  openLoginModal() {
    this.showSidebar.set(false);
    this.showLoginModal.set(true);
  }
  
  mockLogin(email: string, role: Role) {
    this.authService.login(email, role);
    this.showLoginModal.set(false);
    this.showSidebar.set(true);
  }
  
  logout() {
    this.authService.logout();
  }

  getItemTotal(item: CartItem): number {
    const match = item.price.match(/[\d.,]+/);
    let priceNum = 0;
    if (match) {
      let numStr = match[0];
      if (numStr.includes('.') && numStr.includes(',')) {
         const lastDot = numStr.lastIndexOf('.');
         const lastComma = numStr.lastIndexOf(',');
         if (lastComma > lastDot) {
           numStr = numStr.replace(/\./g, '').replace(',', '.');
         } else {
           numStr = numStr.replace(/,/g, '');
         }
      } else if (numStr.includes(',')) {
         const parts = numStr.split(',');
         if (parts.length === 2 && parts[1].length <= 2) {
           numStr = numStr.replace(',', '.');
         } else {
           numStr = numStr.replace(/,/g, '');
         }
      }
      priceNum = parseFloat(numStr);
    }
    return priceNum * item.quantity;
  }

  // --- Order Flow Methods ---

  closeProductModal() {
    this.isProductModalOpen.set(false);
    setTimeout(() => {
      this.selectedProduct.set(null);
      this.orderQuantity.set(1);
    }, 300); // wait for fade out animation
  }

  increaseQuantity() {
    this.orderQuantity.update(q => q + 1);
  }

  decreaseQuantity() {
    this.orderQuantity.update(q => Math.max(1, q - 1));
  }

  addToOrder(event?: MouseEvent) {
    if (event) {
      this.createExplosion(event);
    }
    
    const product = this.selectedProduct();
    if (product) {
      this.cartService.addItem(product, this.orderQuantity());
      console.log(`Added ${this.orderQuantity()}x ${product.name} to order.`);
    }
    
    this.closeProductModal();
    
    this.showToast.set(true);
    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }

  openAiAssistant() {
    this.showAiAssistant.set(true);
  }

  closeAiAssistant() {
    this.showAiAssistant.set(false);
  }

  async sendMessage(message: string) {
    if (!message.trim()) return;
    await this.aiAssistantService.processUserMessage(message);
  }

  createExplosion(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Button pop animation
    animate(
      button,
      { scale: [1, 0.9, 1] },
      { duration: 0.3, ease: "easeInOut" }
    );

    // Create smoke particles
    for (let i = 0; i < 15; i++) {
      const smoke = document.createElement('div');
      smoke.style.position = 'fixed';
      smoke.style.left = `${centerX}px`;
      smoke.style.top = `${centerY}px`;
      const size = 10 + Math.random() * 20;
      smoke.style.width = `${size}px`;
      smoke.style.height = `${size}px`;
      smoke.style.borderRadius = '50%';
      smoke.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
      smoke.style.filter = 'blur(2px)';
      smoke.style.pointerEvents = 'none';
      smoke.style.zIndex = '9999';
      smoke.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(smoke);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 20 + Math.random() * 40;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      animate(
        smoke,
        {
          x: [0, tx],
          y: [0, ty],
          opacity: [1, 0],
          scale: [0.5, 1.5]
        },
        {
          duration: 0.4 + Math.random() * 0.3,
          ease: "easeOut"
        }
      ).finished.then(() => smoke.remove());
    }

    // Create spark particles
    const colors = ['#ff5a00', '#ff8c00', '#ffffff'];
    for (let i = 0; i < 20; i++) {
      const spark = document.createElement('div');
      spark.style.position = 'fixed';
      spark.style.left = `${centerX}px`;
      spark.style.top = `${centerY}px`;
      const size = 3 + Math.random() * 5;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.borderRadius = '50%';
      spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '10000';
      spark.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(spark);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 50 + Math.random() * 80;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      animate(
        spark,
        {
          x: [0, tx],
          y: [0, ty],
          opacity: [1, 0],
          scale: [1, 0]
        },
        {
          duration: 0.3 + Math.random() * 0.3,
          ease: "easeOut"
        }
      ).finished.then(() => spark.remove());
    }
  }
}
