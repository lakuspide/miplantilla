const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'carousel-cylinder.component.ts');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = {
  // Category 1
  'https://picsum.photos/seed/empanada/800/800': 'https://image.pollinations.ai/prompt/premium_argentinian_empanadas_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/tartar/800/800': 'https://image.pollinations.ai/prompt/premium_steak_tartare_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/empanadacarne/800/800': 'https://image.pollinations.ai/prompt/premium_argentinian_beef_empanada_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/empanadapollo/800/800': 'https://image.pollinations.ai/prompt/premium_chicken_empanada_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/empanadacaprese/800/800': 'https://image.pollinations.ai/prompt/premium_caprese_empanada_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/morcilla/800/800': 'https://image.pollinations.ai/prompt/premium_grilled_blood_sausage_morcilla_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/chorizo/800/800': 'https://image.pollinations.ai/prompt/premium_grilled_chorizo_sausage_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/provoleta/800/800': 'https://image.pollinations.ai/prompt/premium_grilled_provolone_cheese_provoleta_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/choripan/800/800': 'https://image.pollinations.ai/prompt/premium_argentinian_choripan_sandwich_dark_moody_food_photography?width=800&height=800&nologo=true',

  // Category 2
  'https://picsum.photos/seed/salad/800/800': 'https://image.pollinations.ai/prompt/premium_gourmet_salad_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/huerta/800/800': 'https://image.pollinations.ai/prompt/premium_fresh_garden_salad_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/asadocentral/800/800': 'https://image.pollinations.ai/prompt/premium_goat_cheese_walnut_salad_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/burrata/800/800': 'https://image.pollinations.ai/prompt/premium_burrata_salad_cherry_tomatoes_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/cesar/800/800': 'https://image.pollinations.ai/prompt/premium_caesar_salad_grilled_chicken_dark_moody_food_photography?width=800&height=800&nologo=true',

  // Category 3
  'https://picsum.photos/seed/steak/800/800': 'https://image.pollinations.ai/prompt/premium_argentinian_grilled_steak_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/vacio/800/800': 'https://image.pollinations.ai/prompt/premium_grilled_flank_steak_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/entrana/800/800': 'https://image.pollinations.ai/prompt/premium_grilled_skirt_steak_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/cuadril/800/800': 'https://image.pollinations.ai/prompt/premium_grilled_tri_tip_steak_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/asadotira/800/800': 'https://image.pollinations.ai/prompt/premium_grilled_short_ribs_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/picana/800/800': 'https://image.pollinations.ai/prompt/premium_grilled_picanha_steak_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/entrecote/800/800': 'https://image.pollinations.ai/prompt/premium_grilled_entrecote_steak_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/ojobife/800/800': 'https://image.pollinations.ai/prompt/premium_grilled_ribeye_steak_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/solomillo/800/800': 'https://image.pollinations.ai/prompt/premium_grilled_tenderloin_steak_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/chuleton/800/800': 'https://image.pollinations.ai/prompt/premium_grilled_tomahawk_steak_dark_moody_food_photography?width=800&height=800&nologo=true',

  // Category 4
  'https://picsum.photos/seed/parrillada/800/800': 'https://image.pollinations.ai/prompt/premium_argentinian_mixed_grill_platter_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/parrillada1/800/800': 'https://image.pollinations.ai/prompt/premium_argentinian_mixed_grill_meat_platter_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/parrillada2/800/800': 'https://image.pollinations.ai/prompt/large_premium_argentinian_mixed_grill_meat_platter_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/parrilladaesp1/800/800': 'https://image.pollinations.ai/prompt/premium_gourmet_mixed_grill_meat_platter_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/parrilladaesp2/800/800': 'https://image.pollinations.ai/prompt/large_premium_gourmet_mixed_grill_meat_platter_dark_moody_food_photography?width=800&height=800&nologo=true',

  // Category 5
  'https://picsum.photos/seed/sides/800/800': 'https://image.pollinations.ai/prompt/premium_gourmet_side_dishes_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/fries/800/800': 'https://image.pollinations.ai/prompt/premium_french_fries_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/rice/800/800': 'https://image.pollinations.ai/prompt/premium_white_rice_bowl_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/veggies/800/800': 'https://image.pollinations.ai/prompt/premium_grilled_vegetables_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/creampotatoes/800/800': 'https://image.pollinations.ai/prompt/premium_creamy_potatoes_gratin_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/coleslaw/800/800': 'https://image.pollinations.ai/prompt/premium_coleslaw_salad_dark_moody_food_photography?width=800&height=800&nologo=true',

  // Category 6
  'https://picsum.photos/seed/milanesa/800/800': 'https://image.pollinations.ai/prompt/premium_argentinian_milanesa_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/napolitana/800/800': 'https://image.pollinations.ai/prompt/premium_milanesa_napolitana_with_tomato_and_cheese_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/4quesos/800/800': 'https://image.pollinations.ai/prompt/premium_milanesa_with_four_cheeses_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/peperoni/800/800': 'https://image.pollinations.ai/prompt/premium_milanesa_with_pepperoni_and_cheese_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/milanesausa/800/800': 'https://image.pollinations.ai/prompt/premium_milanesa_with_cheddar_bacon_bbq_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/milanesapimientos/800/800': 'https://image.pollinations.ai/prompt/premium_milanesa_with_roasted_red_peppers_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/milanesaclasica/800/800': 'https://image.pollinations.ai/prompt/premium_classic_breaded_beef_milanesa_dark_moody_food_photography?width=800&height=800&nologo=true',

  // Category 7
  'https://picsum.photos/seed/burger/800/800': 'https://image.pollinations.ai/prompt/premium_gourmet_burger_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/secreto/800/800': 'https://image.pollinations.ai/prompt/premium_grilled_iberian_pork_secreto_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/burgerangus/800/800': 'https://image.pollinations.ai/prompt/premium_angus_beef_burger_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/burgerpollo/800/800': 'https://image.pollinations.ai/prompt/premium_crispy_chicken_burger_dark_moody_food_photography?width=800&height=800&nologo=true',

  // Category 8
  'https://picsum.photos/seed/dessert/800/800': 'https://image.pollinations.ai/prompt/premium_gourmet_dessert_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/flan/800/800': 'https://image.pollinations.ai/prompt/premium_creme_caramel_flan_with_dulce_de_leche_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/panqueques/800/800': 'https://image.pollinations.ai/prompt/premium_crepes_with_dulce_de_leche_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/brownie/800/800': 'https://image.pollinations.ai/prompt/premium_chocolate_brownie_with_ice_cream_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/icecream/800/800': 'https://image.pollinations.ai/prompt/premium_ice_cream_scoops_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/chocotorta/800/800': 'https://image.pollinations.ai/prompt/premium_argentinian_chocotorta_dessert_dark_moody_food_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/alfajor/800/800': 'https://image.pollinations.ai/prompt/premium_argentinian_alfajor_with_dulce_de_leche_dark_moody_food_photography?width=800&height=800&nologo=true',

  // Category 9
  'https://picsum.photos/seed/wine/800/800': 'https://image.pollinations.ai/prompt/premium_red_wine_glass_dark_moody_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/wine1/800/800': 'https://image.pollinations.ai/prompt/premium_bottle_of_red_wine_malbec_dark_moody_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/wine2/800/800': 'https://image.pollinations.ai/prompt/premium_glass_of_red_wine_dark_moody_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/wine3/800/800': 'https://image.pollinations.ai/prompt/premium_red_wine_pouring_dark_moody_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/wine4/800/800': 'https://image.pollinations.ai/prompt/premium_glass_of_white_wine_dark_moody_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/wine5/800/800': 'https://image.pollinations.ai/prompt/premium_bottle_of_white_wine_dark_moody_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/cava/800/800': 'https://image.pollinations.ai/prompt/premium_glass_of_champagne_cava_dark_moody_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/sangria/800/800': 'https://image.pollinations.ai/prompt/premium_pitcher_of_sangria_with_fruit_dark_moody_photography?width=800&height=800&nologo=true',
  'https://picsum.photos/seed/beer/800/800': 'https://image.pollinations.ai/prompt/premium_pint_of_beer_dark_moody_photography?width=800&height=800&nologo=true'
};

for (const [oldUrl, newUrl] of Object.entries(replacements)) {
  content = content.replace(oldUrl, newUrl);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Images updated successfully!');
