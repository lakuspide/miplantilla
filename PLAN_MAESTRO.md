# 🗺️ Plan Maestro y Arquitectura: Asado Central PWA

Este documento define la estrategia de desarrollo y la arquitectura técnica para construir la Progressive Web App (PWA) premium de "Asado Central", siguiendo la metodología Bycoding.

## 🛠️ Stack Tecnológico

*   **Frontend (Escaparate Interactivo):** Angular (v21+, Zoneless, Standalone Components, Signals).
*   **Estilos y Diseño:** Tailwind CSS (Mobile-first, utilidades premium).
*   **Animaciones:** `motion` (Vanilla JS para transiciones fluidas a 60fps).
*   **Backend y Base de Datos:** **InsForge** (Backend-as-a-Service para gestión de PostgreSQL, autenticación JWT y almacenamiento S3, integrado mediante protocolo MCP).

---

## 📍 Fase 1: Estructura "One-Page Scroll" (El Escaparate Angular)

El objetivo es crear un flujo continuo y elegante, optimizado para dispositivos móviles, donde el usuario navega a través de una historia visual.

1.  **Hero Section (Inicio del Ritual):** 
    *   Pantalla completa (100vh) con video/imagen inmersiva del fuego.
    *   Logo tipográfico y botón "TOCA PARA ENTRAR" con animación de latido sutil.
2.  **Transición al Carrusel:** 
    *   Al pulsar el botón, un *smooth scroll* dirige al usuario a la sección del carrusel 3D (El Ritual).
3.  **Secciones Narrativas ("No es solo una cena"):** 
    *   Bloques de texto e imágenes con animaciones *scroll-linked* (aparecen suavemente al hacer scroll).
4.  **Catálogo Extendido ("La Selección"):** 
    *   Secciones adicionales para mostrar cortes premium en formato lista/grid.
5.  **Conversión ("Asegura tu lugar"):** 
    *   Formulario final de reservas elegante, minimalista y validado reactivamente.

---

## 📍 Fase 2: Transformación a PWA Real

Para garantizar que la experiencia sea indistinguible de una app nativa:

*   **Service Workers y Manifest:** Implementación del paquete nativo `@angular/pwa` para generar el `manifest.json` (permitiendo la instalación en la pantalla de inicio del móvil) y configurar el Service Worker.
*   **Estrategia de Caché:** Cacheo de assets críticos (fuentes, imágenes base) para tiempos de carga casi instantáneos y soporte offline básico.
*   **Optimización de Assets:** *Lazy loading* (carga diferida) para imágenes pesadas, asegurando que el "Hero" cargue inmediatamente.

---

## 📍 Fase 3: Integración con InsForge (Backend)

Todo el escaparate Angular estará preparado para consumir datos dinámicos, abandonando el formato "demo" estático.

*   **Modelado de Datos Estricto:** Creación de interfaces TypeScript (`MenuItem`, `Category`, `Reservation`, `Order`).
*   **Servicios Reactivos:** Implementación de `MenuService` y `ReservationService` en Angular.
*   **Conexión con InsForge:** 
    *   Los servicios de Angular se conectarán a la base de datos PostgreSQL gestionada por **InsForge**.
    *   Se utilizará el protocolo MCP para estructurar automáticamente las tablas y esquemas necesarios.
    *   Implementación de políticas de seguridad (RLS) robustas desde el inicio para proteger los datos de reservas y pedidos.

---

## 💎 Propuesta de Valor (Experiencia "Top-Top-Top")

1.  **Rendimiento Extremo con Signals:** Todo el estado de la app (carrito, categoría activa, modales) se gestionará con Angular Signals. Esto garantiza que solo se actualice la parte exacta del DOM que cambia, ahorrando batería y recursos del móvil.
2.  **Animaciones Coreografiadas:** Evitaremos animaciones CSS genéricas. Usaremos `motion` para crear micro-interacciones y entradas por scroll que den una sensación de fluidez nativa (iOS/Android).
3.  **Feedback Háptico Visual:** Simularemos la respuesta táctil con sutiles expansiones visuales y destellos en cada botón importante (Añadir al carrito, Confirmar reserva, Eliminar plato), guiando al usuario de forma intuitiva.
