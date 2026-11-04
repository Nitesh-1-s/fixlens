// FixLens Plain English Simplifier (Ages 10 to 80)
// Translates dense electrical, telecom, and industrial engineering jargon into clear everyday English.

const EXACT_REPLACEMENTS = {
  // Telecommunications & Cable Repair (from uploaded photo)
  "De-energize all equipment feeding cable and verify 0V tip-to-ring and tip-to-ground with DMM.":
    "Unplug all power cords from the wall outlet so the wire has zero electricity and is 100% safe to touch.",
  "Cut back both damaged ends squarely 6 inches behind frayed broom to expose undamaged jacket and straight conductors.":
    "Snip off the frayed, damaged ends of the wire with scissors or wire cutters so you have clean, straight wire ends.",
  "Strip outer jacket 4 inches, preserve pair twists to within 0.5 inch of splice point per TIA/EIA-568-B.":
    "Carefully peel back 3 to 4 inches of the outer rubber coating to reveal the colored wires hidden inside.",
  "Splice pair-for-pair using color-code chart (match White-Blue to White-Blue, etc.) using gel-filled butt connectors, staggering splices to avoid bulk.":
    "Match the matching colored wires together (blue to blue, orange to orange, white to white) and twist or clamp them securely.",
  "Seal in weatherproof inline enclosure, test every pair for continuity (<2 Ohms), shorts, and insulation resistance (>100 MegaOhms) before re-energizing.":
    "Wrap the repaired area tightly with electrical tape or a waterproof case, plug it back in, and test your device."
};

const PHRASE_REPLACEMENTS = [
  // De-energize & Power
  [/\bde-energize all equipment feeding cable\b/gi, "unplug all power cords from the wall"],
  [/\bde-energize\b/gi, "unplug power from"],
  [/\bde-energizing\b/gi, "plugging it back in"],
  [/\bverify 0v tip-to-ring and tip-to-ground with dmm\b/gi, "make sure the power is completely off"],
  [/\bverify 0v[^\.]*with dmm\b/gi, "make sure the power is completely off"],
  [/\bwith dmm\b/gi, "with a tester tool"],
  [/\bdmm\b/gi, "multimeter tester"],

  // Cable & Wire terms
  [/\bfrayed broom\b/gi, "frayed, broken wire ends"],
  [/\bpreserve pair twists to within [^\.]*per tia\/eia-568-b\b/gi, "keep the matching colored wires paired together"],
  [/\bper tia\/eia-568-b\b/gi, "following the color pattern"],
  [/\bsplice pair-for-pair\b/gi, "match each colored wire to its matching partner"],
  [/\bgel-filled butt connectors\b/gi, "small twist connectors or wire caps"],
  [/\bstaggering splices to avoid bulk\b/gi, "spacing out the joints so it stays neat"],
  [/\bweatherproof inline enclosure\b/gi, "waterproof electrical tape or sealed box"],
  [/\binsulation resistance \(>100 megaohms\)\b/gi, "good electrical safety"],
  [/\bcontinuity \(<2 ohms\)\b/gi, "a solid electrical connection"],
  [/\bcontinuity\b/gi, "solid connection"],

  // Soldering & Circuit terms
  [/\bdesoldering braid\b/gi, "copper wick"],
  [/\bconvex doming\b/gi, "bulging swollen top"],
  [/\bgalvanic corrosion\b/gi, "crusty green rust"],
  [/\brubycon zlh[^\.]*5000h endurance\b/gi, "standard replacement capacitor"],
  [/\bmultilayer motherboard ground planes dissipate heat rapidly\b/gi, "Motherboard copper cools the iron quickly; hold the hot iron steady"],
  [/\bipc class 3\b/gi, "standard safety"],
  [/\bthermal interface pad\b/gi, "squishy heat pad"],
  [/\bextruded cooling fin array\b/gi, "metal cooling fins"],
  [/\bre-torque mounting hardware\b/gi, "tighten all screws firmly"],
  [/\b99% ipa\b/gi, "rubbing alcohol"],
  [/\bipa\b/gi, "rubbing alcohol"]
];

/**
 * Translates any technical repair step into plain, friendly English that anyone aged 10 to 80 can understand.
 */
export function toPlainEnglish(step) {
  if (!step || typeof step !== 'string') return step;

  const trimmed = step.trim();
  if (EXACT_REPLACEMENTS[trimmed]) {
    return EXACT_REPLACEMENTS[trimmed];
  }

  let result = trimmed;
  for (const [pattern, replacement] of PHRASE_REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }

  // Capitalize first letter
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result;
}
