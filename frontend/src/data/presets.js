// Preset scenarios for FixLens Hardware & Appliance Diagnostic Workbench

export const PRESET_SCENARIOS = [
  {
    id: 'motherboard',
    title: 'PC Motherboard VRM & Capacitor Circuit',
    subtitle: 'Desktop ATX Power Delivery & Phase Filtering Stage',
    category: 'Electronics & Computing',
    imageType: 'circuit',
    description: 'Visual inspection of power delivery VRM phases, filtering electrolytic capacitors, and MOSFET heatsinks.',
    parts: [
      {
        id: 'cap_c12',
        name: 'Electrolytic Filter Capacitor (C12)',
        designator: 'C12 - 1000μF 16V 105°C Low-ESR',
        center: { x: 38, y: 44 },
        polygon: [
          { x: 32, y: 36 },
          { x: 44, y: 36 },
          { x: 46, y: 52 },
          { x: 30, y: 52 }
        ],
        status: 'critical',
        statusLabel: 'CRITICAL FAULT: Bulging & Venting',
        healthScore: 12,
        confidence: 0.984,
        diagnosis: 'Visual analysis reveals severe doming on the top aluminum pressure vent, accompanied by brown electrolyte crystallization around the rubber bung. Internal ESR has skyrocketed, creating severe ripple voltage on the 12V Vcore rail.',
        rootCause: 'Prolonged thermal stress (>85°C sustained) caused by restricted airflow and high switching ripple currents.',
        safetyAlert: 'DANGER: Discharge capacitor with a 1kΩ 5W power resistor before servicing. Do NOT short directly with a screwdriver.',
        tools: ['Soldering Station (350°C - 380°C)', 'Desoldering Pump / Copper Braid', 'Digital Multimeter (Capacitance/ESR mode)', '99% Isopropyl Alcohol (IPA)', 'Rosin Core 63/37 Lead-free Solder'],
        steps: [
          'Unplug ATX 24-pin and 8-pin EPS power cables from motherboard.',
          'Verify zero residual voltage across capacitor leads using digital multimeter (<0.1V).',
          'Apply rosin flux to bottom through-hole pads and heat with chisel tip soldering iron.',
          'Extract damaged capacitor while applying gentle rocking pressure.',
          'Clear through-holes with desoldering braid and wipe PCB clean with 99% IPA.',
          'Insert new 1000μF 16V Low-ESR capacitor matching strict polarity (negative stripe to hashed silkscreen).',
          'Solder leads, trim excess wire, and inspect solder joint meniscus under 10x magnification.'
        ],
        targetSpec: 'Nichicon / Panasonic FR Series 1000μF 16V ±20% 105°C, 5000h endurance.',
        museVisualRepair: 'Pristine flat vent seal with bright metallic finish and zero electrolyte residue.',
        reasoningTrace: '• Visual Telemetry: Radial aluminum capacitor C12 at coordinates [38%, 44%].\n• Optical Inspection: Positive convex doming on the top scored vent (+1.4mm deflection). Seeping brown electrolyte crystallization around the rubber base.\n• Physics & Electronics Reasoning: Vent rupture indicates internal hydrogen gas buildup caused by prolonged ripple current over-stress. Calculated ESR increase >18x nominal, resulting in 280mV ripple on the 12V Vcore rail.\n• Resolution Vector: Discharge capacitor via 1kΩ bleed resistor, desolder at 360°C, and replace with low-ESR solid polymer Nichicon FR 105°C unit.'
      },
      {
        id: 'mosfet_q4',
        name: 'High-Side Power MOSFET (Q4)',
        designator: 'Q4 - N-Channel TrenchFET 30V 45A D-PAK',
        center: { x: 62, y: 38 },
        polygon: [
          { x: 56, y: 32 },
          { x: 68, y: 32 },
          { x: 70, y: 44 },
          { x: 54, y: 44 }
        ],
        status: 'warning',
        statusLabel: 'THERMAL STRESS: Discoloration Detected',
        healthScore: 64,
        confidence: 0.961,
        diagnosis: 'Silkscreen around drain tab exhibits localized dark amber discoloration indicating continuous junction temperatures exceeding 105°C. Solder fillet shows early signs of thermal fatigue micro-cracking.',
        rootCause: 'Dried thermal interface pad beneath the heatsink causing poor heat dissipation to the chassis.',
        safetyAlert: 'CAUTION: Component operates at elevated temperatures. Allow 15 minutes cooldown before tactile inspection.',
        tools: ['Thermal Imaging Camera / IR Thermometer', 'Thermal Grizzly 1.5mm Silicone Pad', 'Hex Screwdriver Set', 'Contact Cleaner'],
        steps: [
          'Remove VRM aluminum heatsink retention push-pins.',
          'Peel away degraded silicone thermal interface pad.',
          'Clean MOSFET package surface and heatsink base with lint-free wipes and solvent.',
          'Test gate-to-source resistance using diode mode (verify no short circuit).',
          'Apply high-performance 12 W/mK silicone thermal pad cut precisely to dimension.',
          'Re-torque heatsink evenly to ensure planar pressure distribution.'
        ],
        targetSpec: 'Vishay Siliconix Si4838DY or equivalent D-PAK N-Channel 30V 40A.',
        museVisualRepair: 'Even thermal pad compression, zero scorching, clean silver solder fillets.',
        reasoningTrace: '• Visual Telemetry: High-side power MOSFET Q4 at coordinates [62%, 38%].\n• Optical Inspection: Discoloration halo on PCB silkscreen substrate extending 4.2mm from the drain tab; micro-voiding visible along the solder perimeter.\n• Physics & Electronics Reasoning: Thermal resistance has degraded due to dried silicone pad beneath heatsink. Junction temperature exceeds 105°C under continuous switching load.\n• Resolution Vector: Unclamp VRM heatsink, degrease mating faces with IPA, and apply high-conductivity 12 W/mK silicone thermal pad cut to size.'
      },
      {
        id: 'choke_l1',
        name: 'Ferrite Core Inductor / Choke (L1)',
        designator: 'L1 - 0.82μH 35A Shielded Choke',
        center: { x: 50, y: 65 },
        polygon: [
          { x: 42, y: 58 },
          { x: 58, y: 58 },
          { x: 58, y: 72 },
          { x: 42, y: 72 }
        ],
        status: 'normal',
        statusLabel: 'OPERATIONAL: In Tolerance',
        healthScore: 96,
        confidence: 0.992,
        diagnosis: 'Ferrite body intact with zero hairline cracks or coil whine resonance signs. Solder joints show concave wetting angles meeting IPC-A-610 Class 3 standards.',
        rootCause: 'Normal operational aging. No corrective intervention required.',
        safetyAlert: 'Standard ESD handling precautions apply.',
        tools: ['LCR Meter (100kHz test frequency)', 'Magnification Loupe'],
        steps: [
          'Verify inductance measures within 0.82μH ±15%.',
          'Ensure mechanical adhesion to PCB is firm.'
        ],
        targetSpec: 'Pulse Engineering Sealed Choke 0.82μH, DCR 1.8mΩ max.',
        museVisualRepair: 'Optimal condition verified.',
        reasoningTrace: '• Visual Telemetry: Shielded ferrite choke L1 at coordinates [50%, 65%].\n• Optical Inspection: Zero crack propagation across molded ferrite body; solder fillets display 45° concave wetting meniscus meeting IPC Class 3 specs.\n• Physics & Electronics Reasoning: Inductance nominal at 0.82μH. Zero magnetostriction delamination or core saturation observed.\n• Resolution Vector: Component healthy and within tolerance. No replacement required.'
      }
    ]
  },
  {
    id: 'printer3d',
    title: '3D Printer Direct-Drive Extruder & Hotend',
    subtitle: 'V6 Style All-Metal Hotend Assembly with 0.4mm Nozzle',
    category: 'Rapid Prototyping & Additive Mfg',
    imageType: 'printer',
    description: 'Diagnosis of extrusion jamming, heat creep, heater cartridge resistance, and nozzle assembly geometry.',
    parts: [
      {
        id: 'nozzle_n1',
        name: 'MK8 0.4mm Brass Extrusion Nozzle',
        designator: 'N1 - M6 Thread 0.4mm Orifice',
        center: { x: 50, y: 78 },
        polygon: [
          { x: 44, y: 70 },
          { x: 56, y: 70 },
          { x: 53, y: 86 },
          { x: 47, y: 86 }
        ],
        status: 'critical',
        statusLabel: 'CRITICAL: Severe Carbonized Filament Clog',
        healthScore: 18,
        confidence: 0.975,
        diagnosis: 'Heavy carbon deposit crust encrusting the nozzle tip with visible filament backpressure leaking above the heater block threads. Internal orifice is partially occluded by degraded PETG/PLA blend.',
        rootCause: 'Improper hot-tightening procedure leaving microscopic gap between heatbreak face and nozzle base.',
        safetyAlert: 'HOT SURFACE WARNING: Hotend must be heated to 250°C during removal/tightening. Use insulated leather gloves.',
        tools: ['7mm Socket Wrench / Nozzle Spanner', 'Kanthal Cleaning Needle (0.35mm)', 'Heat-resistant Silicone Sock', 'Brass Wire Brush', 'Torque Wrench (2.5 Nm)'],
        steps: [
          'Heat hotend to 230°C via firmware control menu.',
          'Retract filament and perform cold-pull (atomic pull) using cleaning filament at 90°C.',
          'Hold heater block firmly with adjustable wrench to prevent shearing the delicate heatbreak neck.',
          'Unscrew clogged nozzle with 7mm socket while hot.',
          'Clean heater block internal M6 threads using brass wire brush and wooden pick.',
          'Screw new 0.4mm hardened steel or brass nozzle until finger tight against heatbreak.',
          'Heat to 250°C and torque to exactly 2.5 Nm to create leak-proof metal-to-metal seal.',
          'Re-install clean silicone thermal insulator sock.'
        ],
        targetSpec: 'E3D V6 Genuine Nozzle or Bondtech CHT 0.4mm.',
        museVisualRepair: 'Polished gold brass nozzle face with clean 0.400mm circular bore, zero molten residue.',
        reasoningTrace: '• Visual Telemetry: Extruder nozzle N1 at coordinates [50%, 78%].\n• Optical Inspection: Severe carbonized plastic crusting around 0.4mm orifice; molten filament back-leakage along M6 threads above the heater block.\n• Mechanical Reasoning: Thermal expansion gap between nozzle shoulder and heatbreak throat allowed pressurized polymer to weep into thread voids.\n• Resolution Vector: Perform 230°C hot-tighten teardown, clean M6 threads with brass wire brush, install new hardened nozzle at 250°C torqued to 2.5 Nm.'
      },
      {
        id: 'thermistor_th1',
        name: 'Glass Bead NTC 100k Thermistor Sensor',
        designator: 'TH1 - NTC 3950 100kΩ Cartridge',
        center: { x: 68, y: 55 },
        polygon: [
          { x: 62, y: 48 },
          { x: 74, y: 48 },
          { x: 74, y: 62 },
          { x: 62, y: 62 }
        ],
        status: 'warning',
        statusLabel: 'WARNING: Frayed PTFE Sleeve Insulation',
        healthScore: 52,
        confidence: 0.948,
        diagnosis: 'Fiberglass insulation sleeve has slid backward, leaving bare sensor leads dangerously close to the aluminum heater block clamping screw. High risk of intermittent ground-short and "Thermal Runaway" shutdown.',
        rootCause: 'Repetitive toolhead carriage acceleration causing cable fatigue at stress concentration point.',
        safetyAlert: 'CRITICAL FIRE HAZARD: Damaged thermistor wires can disable firmware thermal runaway protection.',
        tools: ['Hex Key 2.0mm', 'Heat-resistant Kapton Tape', 'Replacement Cartridge Thermistor', 'Multimeter'],
        steps: [
          'Turn off main 24V printer power supply.',
          'Loosen M3 thermistor retaining screw on aluminum block.',
          'Inspect glass bead sensor under magnification for fracture cracks.',
          'Slide high-temperature silicone sleeve over both lead wires up to bead neck.',
          'Secure lead gently with M3 button head screw (do NOT over-tighten and crush glass bead).',
          'Run PID Autotune calibration cycle: M303 E0 S210 C8.'
        ],
        targetSpec: 'Semitec 104NT-4-R025H42G Cartridge Thermistor (Max 300°C).',
        museVisualRepair: 'Fully sleeved fiberglass leads secured with zero pinch or exposed copper.',
        reasoningTrace: '• Visual Telemetry: NTC thermistor sensor TH1 at coordinates [68%, 55%].\n• Optical Inspection: Fiberglass sleeving has migrated backward, exposing bare conductor leads within 1.2mm of aluminum heater block clamping screw.\n• Electrical Safety Reasoning: Risk of intermittent short to ground inducing temperature read errors or firmware thermal runaway trigger.\n• Resolution Vector: Isolate power, refit high-temp silicone sleeving up to bead neck, re-clamp gently without crushing glass bead, and execute M303 PID autotune.'
      },
      {
        id: 'heatbreak_hb1',
        name: 'Bi-Metal Thermal Heatbreak',
        designator: 'HB1 - Titanium/Copper Bi-Metallic M6/M7',
        center: { x: 50, y: 38 },
        polygon: [
          { x: 44, y: 30 },
          { x: 56, y: 30 },
          { x: 56, y: 46 },
          { x: 44, y: 46 }
        ],
        status: 'normal',
        statusLabel: 'OPERATIONAL: Good Heatbreak Barrier',
        healthScore: 94,
        confidence: 0.989,
        diagnosis: 'Heatsink fins and titanium thin-wall tube show clean thermal separation. Heatsink fan airflow provides adequate boundary cooling with zero heat-creep clogging in cold zone.',
        rootCause: 'Operating within normal mechanical tolerances.',
        safetyAlert: 'None.',
        tools: ['Thermal Paste (Boron Nitride)'],
        steps: ['Ensure 30mm heatsink fan is spinning at full 100% RPM during active printing.'],
        targetSpec: 'Slice Engineering Copperhead / Phaetus Dragon Bi-Metal Heatbreak.',
        museVisualRepair: 'Clean heatsink transition zone.',
        reasoningTrace: '• Visual Telemetry: Bi-metal heatbreak HB1 at coordinates [50%, 38%].\n• Optical Inspection: Titanium thin-wall neck shows clean metallurgical bond to copper heatsink base; zero discoloration or filament creep in cold zone.\n• Thermal Reasoning: Boundary layer cooling is optimal. Thermal barrier prevents premature polymer softening before melt chamber.\n• Resolution Vector: Normal operational condition verified.'
      }
    ]
  },
  {
    id: 'automotive',
    title: 'Automotive Engine Compartment & Alternator Bay',
    subtitle: '12V Charging System, High-Output Alternator & Accessory Belt',
    category: 'Automotive & Mechanical',
    imageType: 'engine',
    description: 'Visual analysis of high-amp battery terminals, accessory serpentine belt tension, pulley alignment, and ground straps.',
    parts: [
      {
        id: 'alt_bplus',
        name: 'Alternator B+ Main Output Terminal',
        designator: 'B+ Post - 12V 130A Heavy Cable Terminal',
        center: { x: 42, y: 45 },
        polygon: [
          { x: 36, y: 38 },
          { x: 48, y: 38 },
          { x: 50, y: 52 },
          { x: 34, y: 52 }
        ],
        status: 'critical',
        statusLabel: 'CRITICAL: Severe Galvanic Corrosion & Oxidation',
        healthScore: 22,
        confidence: 0.979,
        diagnosis: 'Heavy blue-green copper sulfate crust encrusting the terminal ring lug and copper post. Contact resistance causes a 1.4V drop under load, resulting in battery charging failure and dimming headlights.',
        rootCause: 'Missing weather-resistant rubber boot and atmospheric salt spray ingress over 4 years.',
        safetyAlert: 'DANGER: Disconnect negative battery ground cable before touching the alternator B+ lug to prevent dead short fireworks!',
        tools: ['10mm & 13mm Insulated Box Wrenches', 'Brass Wire Terminal Brush', 'Baking Soda & Water Neutralizing Solution', 'Dielectric Grease', 'Protective Rubber Terminal Boot'],
        steps: [
          'Disconnect negative terminal of main car battery.',
          'Neutralize corrosion crust using warm baking soda solution and stiff brass brush.',
          'Remove 13mm retaining nut on B+ post and detach ring lug.',
          'Sand terminal mating surfaces with 400-grit wet/dry paper to bright bare copper.',
          'Torque terminal nut to 12 Nm.',
          'Coat terminal thoroughly with dielectric grease to seal out moisture.',
          'Snap on protective heavy-duty rubber insulator boot.',
          'Reconnect battery ground and measure charging voltage at idle (should read 14.2V - 14.6V).'
        ],
        targetSpec: 'OEM Heavy Duty Tin-Plated Copper Ring Terminal 4-AWG.',
        museVisualRepair: 'Polished bright metallic copper ring lug sealed with transparent dielectric coat under red rubber boot.',
        reasoningTrace: '• Visual Telemetry: Alternator B+ output terminal at coordinates [42%, 45%].\n• Optical Inspection: Heavy turquoise copper sulfate crystallization encrusting the terminal ring lug and stud.\n• Electrochemical Reasoning: Atmospheric moisture ingress combined with 130A galvanic action caused surface copper oxidation, generating a 1.4V contact drop and starving the battery of charging current.\n• Resolution Vector: Disconnect negative battery ground, neutralize sulfate with warm bicarbonate solution, abrade to bare copper, torque to 12 Nm, and seal with dielectric grease under rubber boot.'
      },
      {
        id: 'serp_belt',
        name: 'Multi-Rib Serpentine Accessory Belt',
        designator: '6PK1195 - EPDM Micro-V Belt',
        center: { x: 62, y: 65 },
        polygon: [
          { x: 52, y: 56 },
          { x: 72, y: 56 },
          { x: 74, y: 74 },
          { x: 50, y: 74 }
        ],
        status: 'warning',
        statusLabel: 'WARNING: Rib Cracking & Tensile Edge Fraying',
        healthScore: 48,
        confidence: 0.952,
        diagnosis: 'Micro-V ribs exhibit transverse cracking exceeding 3 cracks per inch. Edge cords show early delamination and fraying along the outer guide lip, risking sudden belt snapping at highway RPM.',
        rootCause: 'Material hardening due to 60,000 km duty cycle and minor pulley misalignment.',
        safetyAlert: 'Keep hands and loose clothing away from rotating belt pulleys.',
        tools: ['Serpentine Belt Tensioner Tool / 15mm Breaker Bar', 'Belt Wear Gauge', 'Replacement EPDM Belt'],
        steps: [
          'Sketch or photograph belt routing diagram across all 5 pulleys.',
          'Rotate spring-loaded tensioner pulley clockwise with 15mm breaker bar to release tension.',
          'Slip old belt off alternator pulley and remove from engine bay.',
          'Spin idler and alternator pulleys by hand to check for bearing roughness or play.',
          'Route new EPDM belt ensuring every rib sits centered in pulley grooves.',
          'Release tensioner slowly and verify indicator arrow is within normal tension window.'
        ],
        targetSpec: 'Continental ContiTech / Gates Micro-V 6PK1195 EPDM.',
        museVisualRepair: 'Flexible smooth matte black EPDM belt with deep intact V-ribs seated squarely in pulley channels.',
        reasoningTrace: '• Visual Telemetry: Serpentine accessory belt at coordinates [62%, 65%].\n• Optical Inspection: Transverse rib micro-cracking measured at 3.4 cracks/inch; outer tensile cords exhibit edge fraying.\n• Mechanical Reasoning: Polymer plasticizer depletion after 60,000 km duty cycle combined with minor pulley misalignment accelerates fatigue.\n• Resolution Vector: De-tension with 15mm breaker bar, inspect idler bearings, and install new EPDM micro-V 6PK1195 belt.'
      }
    ]
  }
];
