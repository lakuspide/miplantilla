import { Injectable, signal } from '@angular/core';
import { MenuItem } from './cart.service';

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  items: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // Estado global gestionado con Signals (preparado para hidratar desde InsForge)
  categories = signal<Category[]>([
    { 
      id: '1', 
      name: 'ENTRANTES', 
      icon: 'tapas', 
      image: 'https://image.pollinations.ai/prompt/premium_argentinian_empanadas_dark_moody_food_photography?width=800&height=800&nologo=true',
      items: [
        { id: '1-1', name: 'Steak Tartar de ternera gallega', price: '24.00 €', description: 'Steak tartar clásico de ternera black Angus argentina con picadillo de alcaparras, cebolla y pepinillos.', image: 'https://image.pollinations.ai/prompt/premium_steak_tartare_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '1-2', name: 'Empanadas de Carne', price: '13.00 €', description: 'Typical argentinian Empanadas. De carne.', image: 'https://image.pollinations.ai/prompt/premium_argentinian_beef_empanada_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '1-3', name: 'Empanada de Pollo', price: '13.00 €', description: 'Empanada filled with shredded chicken.', image: 'https://image.pollinations.ai/prompt/premium_chicken_empanada_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '1-4', name: 'Empanada Caprese', price: '13.00 €', description: 'Rellena de queso mozzarella, tomate, y albahaca.', image: 'https://image.pollinations.ai/prompt/premium_caprese_empanada_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '1-5', name: 'Morcilla 2 unidades', price: '12.00 €', description: 'Morcilla clásica a la brasa.', image: 'https://image.pollinations.ai/prompt/premium_grilled_blood_sausage_morcilla_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '1-6', name: 'Típico Chorizo Criollo', price: '11.00 €', description: 'Argentinian grill sausages. Cocinado lentamente a las brasas.', image: 'https://image.pollinations.ai/prompt/premium_grilled_chorizo_sausage_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '1-7', name: 'Provoleta Argentina', price: '14.00 €', description: 'Queso provolone cocinado lentamente a la brasa.', image: 'https://image.pollinations.ai/prompt/premium_grilled_provolone_cheese_provoleta_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '1-8', name: 'Choripán Argentino', price: '12.00 €', description: 'Typical argentinian choripan sandwich. Tomate, lechuga, mayonesa, salsa criolla, salsa chimichurri.', image: 'https://image.pollinations.ai/prompt/premium_argentinian_choripan_sandwich_dark_moody_food_photography?width=800&height=800&nologo=true' }
      ]
    },
    { 
      id: '2', 
      name: 'ENSALADAS', 
      icon: 'grass', 
      image: 'https://image.pollinations.ai/prompt/premium_gourmet_salad_dark_moody_food_photography?width=800&height=800&nologo=true',
      items: [
        { id: '2-1', name: 'Ensalada de la huerta', price: '9.00 €', description: 'Tomate, lechuga, cebolla encurtida zanahoria y vinagreta casera.', image: 'https://image.pollinations.ai/prompt/premium_fresh_garden_salad_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '2-2', name: 'Ensalada especial Asado Central', price: '12.00 €', description: 'Rucúla, lechuga, nueces, queso de cabra caramelizado con azúcar moreno, uvas pasas tostadas, confitura de higos de temporada y nuestra vinagreta casera.', image: 'https://image.pollinations.ai/prompt/premium_goat_cheese_walnut_salad_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '2-3', name: 'Ensalada de Burrata', price: '16.00 €', description: 'Burrata cremosa sobre un mézclum de lechugas mixtas aderezadas con vinagreta de mostaza y miel, gajos de tomate cherry, y pesto cremoso de albahaca.', image: 'https://image.pollinations.ai/prompt/premium_burrata_salad_cherry_tomatoes_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '2-4', name: 'Ensalada cesar con pollo a la brasa', price: '16.00 €', description: 'Mezclum de lechugas aderezadas con salsa César, crostones de pan, tomates cherrys, pollo jugoso a la brasa y queso parmesano.', image: 'https://image.pollinations.ai/prompt/premium_caesar_salad_grilled_chicken_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '2-5', name: 'Ensalada coleslaw', price: '7.00 €', description: 'Ensalada hecha a base de col lombarda, col blanca y zanahoria con una vinagreta dulce y cítrica de mayonesa.', image: 'https://image.pollinations.ai/prompt/premium_coleslaw_salad_dark_moody_food_photography?width=800&height=800&nologo=true' }
      ]
    },
    { 
      id: '3', 
      name: 'CORTES DE CARNE', 
      icon: 'set_meal', 
      image: 'https://image.pollinations.ai/prompt/premium_argentinian_grilled_steak_dark_moody_food_photography?width=800&height=800&nologo=true',
      items: [
        { id: '3-1', name: 'Vacío', price: '25.00 €', description: 'Flank Steak. Jugoso y tierno, suave y marmóreo de sabor robusto.', image: 'https://image.pollinations.ai/prompt/premium_grilled_flank_steak_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '3-2', name: 'Entraña', price: '25.00 €', description: 'Skirt Steak. La entraña es tierna, jugosa resalta su sabor intenso.', image: 'https://image.pollinations.ai/prompt/premium_grilled_skirt_steak_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '3-3', name: 'Colita de Cuadril', price: '25.00 €', description: 'Trip-Tip Steak. Tierno, versátil, de textura suave y sabor delicado.', image: 'https://image.pollinations.ai/prompt/premium_grilled_tri_tip_steak_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '3-4', name: 'Asado de Tira', price: '25.00 €', description: 'Short Ribs. Jugeso y entreverado, proviene de las costillas, de sabor robusto.', image: 'https://image.pollinations.ai/prompt/premium_grilled_short_ribs_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '3-5', name: 'Picaña', price: '32.00 €', description: 'Picaña de Ternera Angus.', image: 'https://image.pollinations.ai/prompt/premium_grilled_picanha_steak_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '3-6', name: 'Entrecôte', price: '27.00 €', description: 'Proveniente de las costillas combina jugosidad, suavidad y un sabor profundo.', image: 'https://image.pollinations.ai/prompt/premium_grilled_entrecote_steak_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '3-7', name: 'Ojo de bife', price: '30.00 €', description: 'Ribeye. Corte magro y marmóreo, se destaca por su terneza excepcional.', image: 'https://image.pollinations.ai/prompt/premium_grilled_ribeye_steak_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '3-8', name: 'Solomillo', price: '35.00 €', description: 'Tenderloin. Tierno, de textura suave y sabor delicado. Una experiencia refinada.', image: 'https://image.pollinations.ai/prompt/premium_grilled_tenderloin_steak_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '3-9', name: 'Chuletón de vaca gallega madurada', price: '80.00 €', description: 'Chuletón de vaca gallega madurada 20 de aproximadamente 1kg.', image: 'https://image.pollinations.ai/prompt/premium_grilled_tomahawk_steak_dark_moody_food_photography?width=800&height=800&nologo=true' }
      ]
    },
    { 
      id: '4', 
      name: 'NUESTRAS PARRILLADAS', 
      icon: 'outdoor_grill', 
      image: 'https://image.pollinations.ai/prompt/premium_argentinian_mixed_grill_platter_dark_moody_food_photography?width=800&height=800&nologo=true',
      items: [
        { id: '4-1', name: 'Parrillada Clásica para 1 persona', price: '33.00 €', description: '400 gr. Vacío, Entraña, Tira de asado, Muslo de pollo deshuesado, Chorizo, Morcilla.', image: 'https://image.pollinations.ai/prompt/premium_argentinian_mixed_grill_meat_platter_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '4-2', name: 'Parrillada Clásica para 2 personas', price: '68.00 €', description: '1 kg. Vacío, Entraña, Tira de asado, Muslo de pollo deshuesado, Chorizo, Morcilla.', image: 'https://image.pollinations.ai/prompt/large_premium_argentinian_mixed_grill_meat_platter_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '4-3', name: 'Parrillada Especial para 1 persona', price: '40.00 €', description: '400 gr. Solomillo, Ojo de bife, Entraña, Tira de asado, Vacío, Secreto Ibérico, Chorizo, Morcilla.', image: 'https://image.pollinations.ai/prompt/premium_gourmet_mixed_grill_meat_platter_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '4-4', name: 'Parrillada Especial para 2 personas', price: '78.00 €', description: '1 kg. Solomillo, Ojo de bife, Entraña, Tira de asado, Vacío, Secreto Ibérico, Chorizo, Morcilla.', image: 'https://image.pollinations.ai/prompt/large_premium_gourmet_mixed_grill_meat_platter_dark_moody_food_photography?width=800&height=800&nologo=true' }
      ]
    },
    { 
      id: '5', 
      name: 'ACOMPAÑANTES', 
      icon: 'kebab_dining', 
      image: 'https://image.pollinations.ai/prompt/premium_gourmet_side_dishes_dark_moody_food_photography?width=800&height=800&nologo=true',
      items: [
        { id: '5-1', name: 'Patatas Fritas', price: '6.00 €', description: 'French fries.', image: 'https://image.pollinations.ai/prompt/premium_french_fries_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '5-2', name: 'Arroz Blanco', price: '6.00 €', description: 'White rice.', image: 'https://image.pollinations.ai/prompt/premium_white_rice_bowl_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '5-3', name: 'Verduras al grill', price: '6.00 €', description: 'Grilled vegetables.', image: 'https://image.pollinations.ai/prompt/premium_grilled_vegetables_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '5-4', name: 'Patatas a la crema', price: '6.00 €', description: 'Creamy potatoes. Patatas envueltas en una salsa cremosa con queso parmesano y mozarella.', image: 'https://image.pollinations.ai/prompt/premium_creamy_potatoes_gratin_dark_moody_food_photography?width=800&height=800&nologo=true' }
      ]
    },
    { 
      id: '6', 
      name: 'MILANESAS', 
      icon: 'lunch_dining', 
      image: 'https://image.pollinations.ai/prompt/premium_argentinian_milanesa_dark_moody_food_photography?width=800&height=800&nologo=true',
      items: [
        { id: '6-1', name: 'Milanesa Napolitana', price: '24.00 €', description: 'Bistec de ternera empanado y frito recubierto de tomate natural, jamón cocido y queso gratinado al horno.', image: 'https://image.pollinations.ai/prompt/premium_milanesa_napolitana_with_tomato_and_cheese_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '6-2', name: 'Milanesa 4 quesos', price: '24.00 €', description: 'Bistec de ternera empanado y frito con 4 quesos fundidos.', image: 'https://image.pollinations.ai/prompt/premium_milanesa_with_four_cheeses_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '6-3', name: 'Milanesa de peperoni', price: '24.00 €', description: 'Clásica milanesa crocante, cubierta con rodajas de peperoni levemente picante y gratinada con queso fundido.', image: 'https://image.pollinations.ai/prompt/premium_milanesa_with_pepperoni_and_cheese_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '6-4', name: 'Milanesa USA', price: '24.00 €', description: 'Con mermelada de bacon, queso cheddar ahumado, queso edam, salsa barbacoa, tomate, cebolla roja, patatas fritas.', image: 'https://image.pollinations.ai/prompt/premium_milanesa_with_cheddar_bacon_bbq_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '6-5', name: 'Milanesa de Pimientos Asados', price: '24.00 €', description: 'Con salsa pomodoro, queso edam, jamón dulce y pimientos rojos asados.', image: 'https://image.pollinations.ai/prompt/premium_milanesa_with_roasted_red_peppers_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '6-6', name: 'Milanesa Clásica', price: '22.00 €', description: 'Bistec de ternera empanado y frito acompañado con trozos de limón.', image: 'https://image.pollinations.ai/prompt/premium_classic_breaded_beef_milanesa_dark_moody_food_photography?width=800&height=800&nologo=true' }
      ]
    },
    { 
      id: '7', 
      name: 'OTROS CORTES', 
      icon: 'lunch_dining', 
      image: 'https://image.pollinations.ai/prompt/premium_gourmet_burger_dark_moody_food_photography?width=800&height=800&nologo=true',
      items: [
        { id: '7-1', name: 'Secreto Ibérico', price: '18.00 €', description: 'Lead pork fillet. Secreto Ibérico acompañado de nuestras salsas.', image: 'https://image.pollinations.ai/prompt/premium_grilled_iberian_pork_secreto_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '7-2', name: 'Hamburguesa Angus', price: '19.90 €', description: 'Hamburguesa de ternera Angus (200gr) a la brasa, pan de brioche, Mermelada de bacon, cheddar ahumado.', image: 'https://image.pollinations.ai/prompt/premium_angus_beef_burger_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '7-3', name: 'Hamburguesa de pollo crujiente', price: '19.90 €', description: 'Pan brioche, pollo crujiente kentucky, mayonesa, chimichurri, cheddar ahumado, coleslaw y patatas fritas.', image: 'https://image.pollinations.ai/prompt/premium_crispy_chicken_burger_dark_moody_food_photography?width=800&height=800&nologo=true' }
      ]
    },
    { 
      id: '8', 
      name: 'POSTRES', 
      icon: 'cake', 
      image: 'https://image.pollinations.ai/prompt/premium_gourmet_dessert_dark_moody_food_photography?width=800&height=800&nologo=true',
      items: [
        { id: '8-1', name: 'Flan clásico', price: '8.00 €', description: 'Servido con dulce de leche y nata montada.', image: 'https://image.pollinations.ai/prompt/premium_creme_caramel_flan_with_dulce_de_leche_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '8-2', name: 'Panqueques', price: '12.00 €', description: 'Panqueques rellenos de dulce de leche.', image: 'https://image.pollinations.ai/prompt/premium_crepes_with_dulce_de_leche_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '8-3', name: 'Brownie de chocolate', price: '12.00 €', description: 'Servido con helado de vainilla, nata montada y dulce de leche.', image: 'https://image.pollinations.ai/prompt/premium_chocolate_brownie_with_ice_cream_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '8-4', name: 'Duo de helados', price: '7.00 €', description: 'Dos bolas de helados a escoger: chocolate, vainilla, stracciatella.', image: 'https://image.pollinations.ai/prompt/premium_ice_cream_scoops_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '8-5', name: 'Chocotorta', price: '12.00 €', description: 'Torta de queso mascaropone con dulce de leche, galletas remojadas en café y sirope de chocolate.', image: 'https://image.pollinations.ai/prompt/premium_argentinian_chocotorta_dessert_dark_moody_food_photography?width=800&height=800&nologo=true' },
        { id: '8-6', name: 'Alfajor clásico argentino', price: '6.00 €', description: 'Alfajor relleno de dulce de leche.', image: 'https://image.pollinations.ai/prompt/premium_argentinian_alfajor_with_dulce_de_leche_dark_moody_food_photography?width=800&height=800&nologo=true' }
      ]
    },
    { 
      id: '9', 
      name: 'BEBIDAS', 
      icon: 'local_bar', 
      image: 'https://image.pollinations.ai/prompt/premium_red_wine_glass_dark_moody_photography?width=800&height=800&nologo=true',
      items: [
        { id: '9-1', name: 'La Anita Malbec', price: '45.00 €', description: 'Ideal para acompañar carnes asada, al horno o guisadas.', image: 'https://image.pollinations.ai/prompt/premium_bottle_of_red_wine_malbec_dark_moody_photography?width=800&height=800&nologo=true' },
        { id: '9-2', name: 'PIATTELLI MALBEC 2022', price: '40.00 €', description: 'Vino audaz y distinguido de color rubio oscuro.', image: 'https://image.pollinations.ai/prompt/premium_glass_of_red_wine_dark_moody_photography?width=800&height=800&nologo=true' },
        { id: '9-3', name: 'Viablanca MALBEC', price: '30.00 €', description: 'Presenta un rojo cereza con matices bordo muy agradable.', image: 'https://image.pollinations.ai/prompt/premium_red_wine_pouring_dark_moody_photography?width=800&height=800&nologo=true' },
        { id: '9-4', name: 'LEGARIS 2023 RUEDA', price: '30.00 €', description: 'Verdejo (Cítrico, floral, intenso, sabroso).', image: 'https://image.pollinations.ai/prompt/premium_glass_of_white_wine_dark_moody_photography?width=800&height=800&nologo=true' },
        { id: '9-5', name: 'VIÑA POMAL BLANCO RIOJA', price: '25.00 €', description: 'Viura, Malvasia (Complejo/Seco).', image: 'https://image.pollinations.ai/prompt/premium_bottle_of_white_wine_dark_moody_photography?width=800&height=800&nologo=true' },
        { id: '9-6', name: 'Aire Brut Nature 2021', price: '24.00 €', description: 'Espumoso DO Cava.', image: 'https://image.pollinations.ai/prompt/premium_glass_of_champagne_cava_dark_moody_photography?width=800&height=800&nologo=true' },
        { id: '9-7', name: 'Sangría de vino tinto', price: '20.00 €', description: 'Jarra de litro.', image: 'https://image.pollinations.ai/prompt/premium_pitcher_of_sangria_with_fruit_dark_moody_photography?width=800&height=800&nologo=true' },
        { id: '9-8', name: 'Jarra de cerveza', price: '7.00 €', description: 'Medio litro.', image: 'https://image.pollinations.ai/prompt/premium_pint_of_beer_dark_moody_photography?width=800&height=800&nologo=true' }
      ]
    }
  ]);

  // Método preparado para integrarse con InsForge (MCP)
  async fetchMenuFromInsForge() {
    console.log('[InsForge] Sincronizando catálogo de productos...');
    // Aquí iría la llamada real: const { data } = await insforge.from('categories').select('*, items(*)');
    // this.categories.set(data);
  }
}
