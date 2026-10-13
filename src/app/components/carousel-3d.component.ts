import { Component, input, output, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { animate } from 'motion';

export interface DisplayCard {
  id: string;
  title: string;
  subtitle?: string;
  price?: string;
  icon?: string;
  image?: string;
  originalData: unknown;
}

@Component({
  selector: 'app-carousel-3d',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="relative w-full flex-1 min-h-[450px] max-h-[600px] flex flex-col items-center justify-center perspective-[1200px] transform-style-3d pointer-events-auto mb-6 touch-pan-y transition-all duration-500"
         (pointerdown)="onPointerDown($event)"
         (pointermove)="onPointerMove($event)"
         (pointerup)="onPointerUp($event)"
         (pointercancel)="onPointerUp($event)"
         (pointerleave)="onPointerUp($event)">

      <!-- Cards Container -->
      <div class="relative w-full h-full transform-style-3d z-10 transition-opacity duration-300"
           [class.opacity-0]="isTransitioning()">
        @for (card of cards(); track card.id; let i = $index) {
          <div class="absolute top-1/2 left-1/2 w-72 h-[420px] -ml-36 -mt-[210px] origin-center will-change-transform"
               [style.transform]="cardStyles()[i]?.transform"
               [style.z-index]="cardStyles()[i]?.zIndex"
               [style.opacity]="cardStyles()[i]?.opacity"
               [style.filter]="cardStyles()[i]?.filter">
            
            <!-- Card -->
            <div class="w-full h-full relative rounded-[24px] bg-[#111] border border-white/10 flex flex-col items-center justify-end p-6 cursor-pointer overflow-hidden transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-[#7dd3fc]/50 shadow-2xl group/card"
                 role="button"
                 tabindex="0"
                 [attr.aria-label]="'Seleccionar ' + card.title"
                 [ngClass]="{
                   'border-[#7dd3fc]/50 shadow-[0_0_40px_rgba(125,211,252,0.2)]': cardStyles()[i]?.isFront,
                   'animate-vibrate-expand': selectedItemId() === card.id
                 }"
                 (click)="onCardSelect(card, i)"
                 (keydown.enter)="onCardSelect(card, i)"
                 (keydown.space)="onCardSelect(card, i)">
              
              <!-- Subtle Fire Glow on Card -->
              <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#ff5a00]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
              
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
    </div>
  `
})
export class Carousel3dComponent {
  cards = input.required<DisplayCard[]>();
  viewState = input<'categories' | 'items'>('categories');
  isTransitioning = input<boolean>(false);
  
  cardSelected = output<DisplayCard>();
  dragged = output<void>();

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
    const cardsList = this.cards();
    const N = cardsList.length;
    
    return cardsList.map((_, index) => {
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
    if (this.selectedItemId() !== null || this.isTransitioning()) return;
    
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
    if (Math.abs(deltaX) > 10) {
      this.hasDragged = true;
      this.dragged.emit();
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

  onCardSelect(card: DisplayCard, index: number) {
    if (this.selectedItemId() !== null || this.isTransitioning()) return;
    if (this.hasDragged) return;
    
    const diff = this.getDiff(index, this.progress(), this.cards().length);
    if (Math.abs(diff) > 0.1) {
      const targetProgress = this.progress() + diff;
      this.animation = animate(this.progress(), targetProgress, {
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 1,
        onUpdate: (v) => this.progress.set(v)
      });
      if (this.viewState() !== 'categories') {
        return;
      }
    }

    this.selectedItemId.set(card.id);
    
    setTimeout(() => {
      this.cardSelected.emit(card);
      this.selectedItemId.set(null);
    }, 400);
  }

  resetProgress() {
    this.progress.set(0);
  }

  setProgress(p: number) {
    this.progress.set(p);
  }
}
