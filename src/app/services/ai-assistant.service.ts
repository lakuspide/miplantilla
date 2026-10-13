import { Injectable, signal } from '@angular/core';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Injectable({ providedIn: 'root' })
export class AiAssistantService {
  messages = signal<ChatMessage[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy el Maestro Asador. Estoy aquí para ayudarte a elegir el corte perfecto, recomendarte maridajes y preparar tu pedido. ¿En qué te puedo ayudar hoy?'
    }
  ]);
  
  async processUserMessage(message: string) {
    // Add user message
    this.messages.update(msgs => [...msgs, { role: 'user', content: message }]);
    
    // Simulate N8N / LLM processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple simulated responses based on keywords
    let response = 'Esa es una excelente elección. Nuestro catálogo está diseñado para ofrecer la mejor experiencia de asado argentino.';
    
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('vino') || lowerMessage.includes('maridaje')) {
      response = 'Para acompañar nuestras carnes, te sugiero encarecidamente el Malbec Reserva. Sus notas de ciruela y roble realzan los sabores ahumados de la parrilla.';
    } else if (lowerMessage.includes('carne') || lowerMessage.includes('corte') || lowerMessage.includes('bife')) {
      response = 'Si buscas la máxima expresión de terneza, el Ojo de Bife es espectacular. Si prefieres un sabor más intenso, te recomiendo la Entraña o el Asado de Tira.';
    } else if (lowerMessage.includes('reserva') || lowerMessage.includes('mesa')) {
      response = '¡Por supuesto! Puedes hacer tu reserva directamente en el formulario que se encuentra al final de la página. Te esperamos para vivir el ritual.';
    } else if (lowerMessage.includes('hola')) {
      response = '¡Bienvenido al ritual! ¿Qué te gustaría probar hoy?';
    }
    
    this.messages.update(msgs => [...msgs, { role: 'assistant', content: response }]);
  }
}
