// Preset scenarios for FixLens Hardware & Appliance Diagnostic Workbench
// Pixel-calibrated against authentic high-resolution macro photography

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
        name: 'Rubycon 1500μF 6.3V Bulging Capacitor (C12)',
        designator: 'C12 - VRM Vcore Electrolytic Filter',
        deviceName: 'Desktop PC Motherboard Power Delivery (VRM)',
        laymanSummary: 'This is your computer motherboard\'s main power station that converts power from your power supply to your CPU processor. When this capacitor bulges, your PC will randomly crash, blue-screen, or fail to boot.',
        laymanFixGuide: 'Unplug power, desolder the swollen silver can with a soldering iron, and solder in a new $2 low-ESR capacitor matching the polarity stripe.',
        beginnerFriendly: 'Moderate — Requires basic through-hole soldering (20-30 mins).',
        center: { x: 42, y: 43 },
        polygon: [
          { x: 36, y: 28 },
          { x: 48, y: 28 },
          { x: 48, y: 58 },
          { x: 36, y: 58 }
        ],
        status: 'critical',
        statusLabel: 'CRITICAL FAULT: Bulging & Venting',
        healthScore: 14,
        confidence: 0.988,
        repairMetrics: {
          difficulty: 'Moderate (Through-Hole Soldering)',
          estTime: '20-30 mins',
          estCost: '$1.50 - $3.00',
          riskRating: 'Electrical Shock & PCB Pad Delamination'
        },
        technicianProTip: 'Multilayer motherboard ground planes dissipate heat rapidly. Pre-heat PCB underside to 100°C with hot air or use a broad 360°C chisel tip to prevent ripping the fragile through-hole copper barrel plating.',
        testVerification: 'DMM / ESR Meter Check: Measure capacitance across unsoldered leads (Nominal: 1500μF ±20%, ESR < 0.04Ω). Defective unit measures < 320μF with ESR > 3.8Ω. Measure Vcore rail ripple post-repair: must be < 40mV p-p.',
        diagnosis: 'Visual analysis reveals severe convex doming on the top aluminum pressure vent, accompanied by brown electrolyte crystallization around the rubber bung. Internal ESR has skyrocketed, creating severe ripple voltage on the 12V Vcore rail.',
        rootCause: 'Prolonged thermal stress (>85°C sustained) caused by restricted airflow and high switching ripple currents.',
        safetyAlert: 'DANGER: Discharge capacitor with a 1kΩ 5W power resistor before servicing. Do NOT short directly with a screwdriver.',
        tools: ['Soldering Station (360°C Chisel Tip)', 'Desoldering Braid / Solder Sucker', 'Digital Multimeter / ESR Meter', '99% Isopropyl Alcohol (IPA)', 'Rosin Core 63/37 Lead-free Solder'],
        steps: [
          'Unplug ATX 24-pin and 8-pin EPS power cables from motherboard and ground yourself with an ESD wrist strap.',
          'Verify zero residual voltage across capacitor leads using digital multimeter (<0.1V).',
          'Apply rosin flux to bottom through-hole pads and heat with chisel tip soldering iron at 360°C.',
          'Extract damaged capacitor while applying gentle rocking pressure to avoid tearing copper traces.',
          'Clear through-holes with copper desoldering braid and wipe PCB clean with 99% IPA.',
          'Insert new 1500μF 6.3V Low-ESR capacitor matching strict polarity (negative stripe to hashed silkscreen).',
          'Solder leads, trim excess wire flush with side cutters, and inspect solder joint meniscus under 10x magnification.'
        ],
        targetSpec: 'Rubycon ZLH / Nichicon FR Series 1500μF 6.3V ±20% 105°C, 5000h endurance.',
        museVisualRepair: 'Pristine flat vent seal with bright metallic finish and zero electrolyte residue.',
        reasoningTrace: '• Visual Telemetry: Radial aluminum capacitor C12 at coordinates [42%, 43%].\n• Optical Inspection: Positive convex doming on the top scored vent (+1.4mm deflection). Seeping brown electrolyte crystallization around the rubber base.\n• Physics & Electronics Reasoning: Vent rupture indicates internal hydrogen gas buildup caused by prolonged ripple current over-stress. Calculated ESR increase >18x nominal, resulting in 280mV ripple on the 12V Vcore rail.\n• Resolution Vector: Discharge capacitor via 1kΩ bleed resistor, desolder at 360°C, and replace with low-ESR solid polymer unit.'
      },
      {
        id: 'solid_cap',
        name: 'Solid-Polymer Capacitors (C18 / C19)',
        designator: 'C18 - 820μF 2.5V Solid Aluminum Polymer',
        center: { x: 57, y: 29 },
        polygon: [
          { x: 52, y: 20 },
          { x: 61, y: 20 },
          { x: 61, y: 38 },
          { x: 52, y: 38 }
        ],
        status: 'normal',
        statusLabel: 'OPERATIONAL: Pristine Condition',
        healthScore: 98,
        confidence: 0.994,
        repairMetrics: {
          difficulty: 'Inspection Only',
          estTime: '5 mins',
          estCost: '$0.00',
          riskRating: 'Low (ESD Sensitive)'
        },
        technicianProTip: 'Solid polymer capacitors have no liquid electrolyte and rarely burst; verify that nearby VRM airflow is unobstructed to maintain low ripple.',
        testVerification: 'In-circuit ESR check: Measures < 5mΩ at 100kHz. Zero DC voltage leakage detected.',
        diagnosis: 'Solid-polymer cans exhibit completely planar top surfaces with zero scorching or seal expansion. Low-ESR characteristics intact with ultra-stable transient response.',
        rootCause: 'Normal operational condition.',
        safetyAlert: 'Standard ESD handling precautions apply.',
        tools: ['Magnification Loupe', 'LCR Meter'],
        steps: [
          'Verify solder fillets around surface mount base show clean concave wetting angles.',
          'Inspect board traces for physical scratch damage.'
        ],
        targetSpec: 'Panasonic OS-CON 820μF 2.5V Ultra-Low ESR (<5mΩ).',
        museVisualRepair: 'Pristine metallic surface verified.',
        reasoningTrace: '• Visual Telemetry: Solid aluminum polymer capacitor C18 at coordinates [57%, 29%].\n• Optical Inspection: Flat aluminum casing with clean red silkscreen marking. Zero electrolytic fluid leakage or thermal bloating.\n• Electronics Reasoning: Operating within rated ripple current specifications. Impedance is nominal.\n• Resolution Vector: Component healthy and within tolerance.'
      },
      {
        id: 'choke_l1',
        name: 'R80 Sealed Ferrite Power Choke (L1)',
        designator: 'L1 - 0.80μH High-Current Inductor',
        center: { x: 30, y: 34 },
        polygon: [
          { x: 24, y: 22 },
          { x: 35, y: 22 },
          { x: 35, y: 46 },
          { x: 24, y: 46 }
        ],
        status: 'normal',
        statusLabel: 'OPERATIONAL: In Tolerance',
        healthScore: 96,
        confidence: 0.992,
        repairMetrics: {
          difficulty: 'Inspection Only',
          estTime: '5 mins',
          estCost: '$0.00',
          riskRating: 'Low'
        },
        technicianProTip: 'If acoustic coil whine develops under GPU/CPU load, check for micro-cracks in the molded ferrite binder or loose SMD solder joints.',
        testVerification: 'DCR measurement: 1.15mΩ (spec: < 1.4mΩ). Inductance at 100kHz: 0.79μH (spec: 0.80μH ±15%).',
        diagnosis: 'Ferrite body intact with zero hairline cracks or coil whine resonance signs. Solder joints show concave wetting angles meeting IPC-A-610 Class 3 standards.',
        rootCause: 'Normal operational aging. No corrective intervention required.',
        safetyAlert: 'Standard ESD handling precautions apply.',
        tools: ['LCR Meter (100kHz test frequency)', 'Magnification Loupe'],
        steps: [
          'Verify inductance measures within 0.80μH ±15%.',
          'Ensure mechanical adhesion to PCB is firm.'
        ],
        targetSpec: 'TDK / Pulse Sealed Ferrite Choke 0.80μH, DCR 1.2mΩ max.',
        museVisualRepair: 'Optimal condition verified.',
        reasoningTrace: '• Visual Telemetry: Shielded ferrite choke L1 at coordinates [30%, 34%].\n• Optical Inspection: Zero crack propagation across molded ferrite body; solder fillets display 45° concave wetting meniscus meeting IPC Class 3 specs.\n• Physics & Electronics Reasoning: Inductance nominal at 0.80μH. Zero magnetostriction delamination or core saturation observed.\n• Resolution Vector: Component healthy and within tolerance. No replacement required.'
      },
      {
        id: 'vrm_heatsink',
        name: 'VRM Aluminum Heatsink Assembly',
        designator: 'HS-VRM - Extruded Cooling Fin Array',
        center: { x: 10, y: 43 },
        polygon: [
          { x: 2, y: 15 },
          { x: 18, y: 15 },
          { x: 18, y: 72 },
          { x: 2, y: 72 }
        ],
        status: 'warning',
        statusLabel: 'THERMAL INSPECTION: Thermal Pad Degraded',
        healthScore: 62,
        confidence: 0.958,
        repairMetrics: {
          difficulty: 'Easy (Disassembly & Re-padding)',
          estTime: '15 mins',
          estCost: '$4.00 - $8.00',
          riskRating: 'Component Crush / Pinch Hazard'
        },
        technicianProTip: 'Never twist heatsinks aggressively while cold; thermal pads harden over time and can rip SMD components clean off the PCB. Warm the area slightly with hot air if stubborn.',
        testVerification: 'Thermal camera check: MOSFET case temperatures must remain under 72°C during 100% CPU benchmark stress testing.',
        diagnosis: 'Thermal interface pad beneath aluminum extrusion has dried out, causing elevated thermal resistance between high-side MOSFETs and heatsink fins.',
        rootCause: 'Extended operation under high thermal cycling and dust accumulation.',
        safetyAlert: 'Allow heatsink to cool for 15 minutes before unmounting.',
        tools: ['Hex Screwdriver Set', 'Thermal Grizzly Minus Pad 1.5mm', '99% IPA Solvent', 'Lint-free Wipes'],
        steps: [
          'Release rear spring-loaded push pins securing the heatsink.',
          'Gently twist and lift heatsink to detach from MOSFETs.',
          'Clean old thermal pad residue using IPA and lint-free wipes.',
          'Install fresh high-conductivity 12 W/mK silicone thermal pad cut to size.',
          'Re-seat heatsink and ensure equal pressure across retention pins.'
        ],
        targetSpec: 'Anodized 6063 Aluminum Extrusion with 12 W/mK Interface Material.',
        museVisualRepair: 'Clean heatsink contact surface with uniform pressure distribution.',
        reasoningTrace: '• Visual Telemetry: Heatsink array at coordinates [10%, 43%].\n• Optical Inspection: Dust clogging lower fin gaps; silicone oil bleed visible at base.\n• Thermal Reasoning: Heat dissipation capacity reduced by 22% due to interface drying.\n• Resolution Vector: Remove heatsink, refresh thermal pad, and clear fin channels.'
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
        name: 'Extruder Brass Nozzle (0.4mm)',
        designator: 'N1 - M6 Standard Flow 0.4mm Brass Nozzle',
        deviceName: '3D Printer Hotend & Extruder Assembly',
        laymanSummary: 'This is the melting chamber of your 3D printer that melts plastic at 240°C and squirts it out through a tiny hole. When clogged or leaking, your 3D prints fail, layer lines break, or plastic blobs everywhere.',
        laymanFixGuide: 'Heat the hotend to 250°C, unscrew the clogged golden brass tip with a 7mm wrench while holding the block, clean the threads with a wire brush, and install a fresh $3 nozzle.',
        beginnerFriendly: 'Yes — Beginner DIY friendly (15-20 mins, use gloves because it\'s hot!).',
        center: { x: 51.5, y: 76 },
        polygon: [
          { x: 44, y: 64 },
          { x: 59, y: 64 },
          { x: 55, y: 88 },
          { x: 47, y: 88 }
        ],
        status: 'critical',
        statusLabel: 'CRITICAL: Severe Carbonized Filament Clog',
        healthScore: 18,
        confidence: 0.985,
        repairMetrics: {
          difficulty: 'Moderate (Hot Teardown & Torque Spec)',
          estTime: '20-25 mins',
          estCost: '$2.00 - $6.00',
          riskRating: 'Thermal Burn Hazard (250°C)'
        },
        technicianProTip: 'NEVER loosen or tighten a 3D printer nozzle when cold! The aluminum heater block contracts at room temperature; turning it cold will shear the delicate titanium heatbreak neck or strip the M6 threads.',
        testVerification: 'Hot torque wrench verification: Torque to exactly 2.5 Nm at 250°C. Perform 100mm extrusion test into air: extrudate must flow straight down without curling or clicking.',
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
        reasoningTrace: '• Visual Telemetry: Extruder nozzle N1 at coordinates [51.5%, 76%].\n• Optical Inspection: Severe carbonized plastic crusting around 0.4mm orifice; molten filament back-leakage along M6 threads above the heater block.\n• Mechanical Reasoning: Thermal expansion gap between nozzle shoulder and heatbreak throat allowed pressurized polymer to weep into thread voids.\n• Resolution Vector: Perform 230°C hot-tighten teardown, clean M6 threads with brass wire brush, install new hardened nozzle at 250°C torqued to 2.5 Nm.'
      },
      {
        id: 'heater_block',
        name: 'Aluminum Heater Block & Assembly',
        designator: 'HB1 - 20x20x10mm CNC Aluminum Block',
        center: { x: 51.5, y: 49.5 },
        polygon: [
          { x: 37, y: 35 },
          { x: 66, y: 35 },
          { x: 66, y: 63 },
          { x: 37, y: 63 }
        ],
        status: 'warning',
        statusLabel: 'WARNING: Molten Plastic Seepage & Missing Sock',
        healthScore: 54,
        confidence: 0.965,
        repairMetrics: {
          difficulty: 'Easy (Cleaning & Insulation)',
          estTime: '15 mins',
          estCost: '$3.00 - $5.00',
          riskRating: 'High Temperature Surface'
        },
        technicianProTip: 'Always run PID Autotune (M303 E0 S210 C8) after installing a silicone sock, because the sock significantly cuts convective heat loss and changes heater duty cycle.',
        testVerification: 'PID stability test: Target 210°C; temperature must hold steady within ±0.3°C without oscillating.',
        diagnosis: 'Burnt polymer seepage coating the top and bottom faces of the heater block. Missing silicone insulation sock causes convective air cooling from part-cooling fan, destabilizing PID temperature regulation.',
        rootCause: 'Repeated thermal expansion cycles without thread sealing compound and operation without silicone insulator.',
        safetyAlert: 'Allow heater block to reach ambient temperature before chemical solvent cleaning.',
        tools: ['Brass Wire Brush', 'Replacement Silicone Sock', 'Boron Nitride Thermal Paste', 'Cotton Swabs'],
        steps: [
          'Heat block to 240°C and wipe molten buildup using high-temp silicone pads or brass brush.',
          'Allow block to cool, then apply boron nitride paste to cartridge threads.',
          'Slide genuine temperature-resistant silicone insulating sock firmly over block.',
          'Execute PID Autotune calibration command: M303 E0 S210 C8.'
        ],
        targetSpec: 'High-Temperature Plated Copper or 6061-T6 Aluminum Heater Block.',
        museVisualRepair: 'Clean silver metallic block surface protected by snug blue silicone sock.',
        reasoningTrace: '• Visual Telemetry: Heater block HB1 at coordinates [51.5%, 49.5%].\n• Optical Inspection: Dark charred polymer glaze on aluminum faces. Temperature sensor retaining screw shows minor heat tinting.\n• Thermal Reasoning: Radiative heat losses increase heater cartridge duty cycle by 35% without silicone sock.\n• Resolution Vector: Clean outer block surfaces while hot and install thermal insulation jacket.'
      },
      {
        id: 'wires_th1',
        name: 'Thermistor & Heater Cartridge Wires',
        designator: 'TH1 - High-Temp Fiberglass Insulated Wires',
        center: { x: 75.5, y: 26.5 },
        polygon: [
          { x: 61, y: 5 },
          { x: 89, y: 5 },
          { x: 89, y: 48 },
          { x: 61, y: 48 }
        ],
        status: 'warning',
        statusLabel: 'WARNING: Wire Strain & Loom Fatigue',
        healthScore: 58,
        confidence: 0.948,
        repairMetrics: {
          difficulty: 'Moderate (Sensor Wiring & Calibration)',
          estTime: '20 mins',
          estCost: '$4.00 - $8.00',
          riskRating: 'Fire Hazard / Thermal Runaway'
        },
        technicianProTip: 'Do NOT overtighten the M3 thermistor retaining screw! Crushing the glass bead or pinching the fiberglass sleeving will cause intermittent short circuits to the metal block.',
        testVerification: 'DMM Resistance Test: Measure resistance at room temperature (25°C). Expected value: ~100kΩ ±3%. Heat with fingers: resistance should smoothly drop to ~85kΩ.',
        diagnosis: 'Fiberglass braided insulation leads exiting the right block face show mechanical bending stress and minor fraying at the strain relief bend. Risk of intermittent resistance variation.',
        rootCause: 'Repetitive toolhead gantry movements without sufficient cable relief bracket.',
        safetyAlert: 'CRITICAL FIRE HAZARD: Damaged thermistor leads can cause thermal runaway if temperature feedback drops.',
        tools: ['Hex Key 2.0mm', 'Kapton Tape', 'Heat-Resistant Wire Sleeve', 'Digital Multimeter'],
        steps: [
          'Power off printer 24V PSU and de-energize hotend.',
          'Inspect conductor strands under magnification for broken wire filaments.',
          'Wrap high-temperature Kapton tape around frayed fiberglass sleeve sections.',
          'Secure wire bundle to gantry strain relief mount to prevent flexion at block entry.',
          'Run PID Autotune calibration cycle: M303 E0 S210 C8.'
        ],
        targetSpec: 'PT1000 / Semitec Cartridge Thermistor with 300°C Fiberglass Loom.',
        museVisualRepair: 'Neatly organized cable loom with zero wire pinch or strain.',
        reasoningTrace: '• Visual Telemetry: Thermistor wiring at coordinates [75.5%, 26.5%].\n• Optical Inspection: Loom angle exceeds recommended 90° bend radius. Fibers slightly split.\n• Safety Reasoning: Broken sensor wire will report false low temperature and trigger runaway protection.\n• Resolution Vector: Reinforce loom with Kapton insulation and install rigid cable strain relief.'
      },
      {
        id: 'heatbreak_hb1',
        name: 'Bi-Metal Heatbreak & Heatsink Fins',
        designator: 'HS1 - Cold Zone Aluminum Fins',
        center: { x: 53.5, y: 16 },
        polygon: [
          { x: 41, y: 3 },
          { x: 66, y: 3 },
          { x: 66, y: 28 },
          { x: 41, y: 28 }
        ],
        status: 'normal',
        statusLabel: 'OPERATIONAL: Good Heatbreak Barrier',
        healthScore: 94,
        confidence: 0.989,
        repairMetrics: {
          difficulty: 'Inspection Only',
          estTime: '5 mins',
          estCost: '$0.00',
          riskRating: 'Low'
        },
        technicianProTip: 'Apply a dab of Boron Nitride paste to the cold-side threads that screw into the heatsink to maximize thermal dissipation away from the filament chamber.',
        testVerification: 'Cold zone temperature probe: Aluminum heatsink fins must stay below 45°C during continuous 260°C printing.',
        diagnosis: 'Heatsink fins show clean thermal separation with unobstructed airflow channels. Titanium thin-wall neck provides sharp thermal boundary preventing heat-creep into cold zone.',
        rootCause: 'Operating within normal mechanical tolerances.',
        safetyAlert: 'None.',
        tools: ['Thermal Paste (Boron Nitride)', 'Inspection Mirror'],
        steps: ['Ensure 30mm heatsink fan is spinning at full 100% RPM during active printing.'],
        targetSpec: 'Slice Engineering Copperhead / Phaetus Dragon Bi-Metal Heatbreak.',
        museVisualRepair: 'Clean heatsink transition zone.',
        reasoningTrace: '• Visual Telemetry: Heatsink array HS1 at coordinates [53.5%, 16%].\n• Optical Inspection: Titanium thin-wall neck shows clean metallurgical bond to copper heatsink base; zero discoloration or filament creep in cold zone.\n• Thermal Reasoning: Boundary layer cooling is optimal. Thermal barrier prevents premature polymer softening before melt chamber.\n• Resolution Vector: Normal operational condition verified.'
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
        designator: 'B+ Post - 12V 130A Corroded Terminal',
        deviceName: 'Car Alternator & 12V Charging System',
        laymanSummary: 'This is your car\'s alternator — the generator that charges your 12V battery and powers headlights, radio, and A/C while driving. This corroded terminal causes battery drain, dashboard warning lights, or sudden no-starts.',
        laymanFixGuide: 'Disconnect the black car battery cable first, dissolve the green crust using warm baking soda water and a wire brush, tighten the nut with a 13mm wrench, and seal with grease under a rubber boot.',
        beginnerFriendly: 'Yes — Super easy DIY fix (25 mins with common household baking soda and a basic wrench).',
        center: { x: 69, y: 43 },
        polygon: [
          { x: 63, y: 36 },
          { x: 75, y: 36 },
          { x: 75, y: 50 },
          { x: 63, y: 50 }
        ],
        status: 'critical',
        statusLabel: 'CRITICAL: Severe Galvanic Corrosion & Oxidation',
        healthScore: 18,
        confidence: 0.986,
        repairMetrics: {
          difficulty: 'Moderate (High-Current Mechanical Servicing)',
          estTime: '25-35 mins',
          estCost: '$3.00 - $7.00',
          riskRating: 'Direct Dead-Short / Battery Arc Flash Danger'
        },
        technicianProTip: 'NEVER touch a metal ratchet to the B+ nut while the battery ground cable is connected! A momentary bridge between the wrench and the alternator body or engine head will cause a blinding 800A arc flash, melt tools, and explode battery cells.',
        testVerification: 'Voltage Drop Test with DMM: Measure DC voltage between alternator B+ stud and battery positive post under 50A load (headlights + blower on high). Spec: < 0.20V drop. Defective terminal drops > 1.40V.',
        diagnosis: 'Heavy turquoise copper sulfate and oxide crust encrusting the B+ threaded stud, retaining nut, and 4-AWG copper ring terminal. Contact resistance generates severe voltage drop under alternator load, resulting in battery drain and electrical brownouts.',
        rootCause: 'Missing weather-resistant rubber insulator boot exposed bare copper to atmospheric humidity, road salt spray, and galvanic reaction.',
        safetyAlert: 'DANGER: Disconnect negative battery ground cable before touching the alternator B+ lug to prevent dead short fireworks!',
        tools: ['10mm & 13mm Insulated Box Wrenches', 'Brass Wire Terminal Brush', 'Baking Soda & Water Neutralizing Solution', 'Dielectric Grease', 'Protective Rubber Terminal Boot'],
        steps: [
          'Disconnect negative terminal of main car battery and wrap cable end in insulating cloth.',
          'Neutralize corrosion crust using warm baking soda solution and stiff brass brush.',
          'Remove 13mm retaining nut on B+ post and detach ring lug.',
          'Sand terminal mating surfaces with 400-grit wet/dry paper to bright bare copper.',
          'Torque terminal nut to exactly 12 Nm.',
          'Coat terminal thoroughly with dielectric grease to seal out moisture.',
          'Snap on protective heavy-duty rubber insulator boot.',
          'Reconnect battery ground and measure charging voltage at idle with DMM (should read 14.2V - 14.6V).'
        ],
        targetSpec: 'OEM Heavy Duty Tin-Plated Copper Ring Terminal 4-AWG.',
        museVisualRepair: 'Polished bright metallic copper ring lug sealed with transparent dielectric coat under red rubber boot.',
        reasoningTrace: '• Visual Telemetry: Alternator B+ output terminal at coordinates [69%, 43%].\n• Optical Inspection: Heavy turquoise copper sulfate crystallization encrusting the terminal ring lug and stud.\n• Electrochemical Reasoning: Atmospheric moisture ingress combined with 130A galvanic action caused surface copper oxidation, generating a 1.4V contact drop and starving the battery of charging current.\n• Resolution Vector: Disconnect negative battery ground, neutralize sulfate with warm bicarbonate solution, abrade to bare copper, torque to 12 Nm, and seal with dielectric grease under rubber boot.'
      },
      {
        id: 'serp_belt',
        name: 'Multi-Rib Serpentine Accessory Belt (7PK1855)',
        designator: '7PK1855 - EPDM Micro-V Belt',
        center: { x: 49, y: 72 },
        polygon: [
          { x: 42, y: 56 },
          { x: 55, y: 56 },
          { x: 55, y: 88 },
          { x: 42, y: 88 }
        ],
        status: 'warning',
        statusLabel: 'WARNING: Rib Cracking & Tensile Edge Fraying',
        healthScore: 48,
        confidence: 0.962,
        repairMetrics: {
          difficulty: 'Moderate (Tensioner Tool & Pulley Routing)',
          estTime: '30-45 mins',
          estCost: '$25.00 - $45.00',
          riskRating: 'Pinch & Entanglement Hazard'
        },
        technicianProTip: 'Always spin every idler and alternator pulley by hand while the belt is off! If any pulley feels gritty, whines, or has axial play, replace the bearing now before it seizes and destroys the new belt.',
        testVerification: 'Belt Wear Depth Gauge check: Rib depth must be < 0.8mm below pulley rim. Under 1500 RPM engine idle, belt vibration deflection must not exceed 6mm peak-to-peak.',
        diagnosis: 'Micro-V ribs on belt 7PK1855 exhibit transverse cracking exceeding 3 cracks per inch under tension. Outer tensile cords show edge fraying along the alternator pulley guide lip, risking sudden belt snapping at highway RPM.',
        rootCause: 'Material hardening due to 60,000 km duty cycle and minor pulley misalignment.',
        safetyAlert: 'Keep hands and loose clothing away from rotating belt pulleys.',
        tools: ['Serpentine Belt Tensioner Tool / 15mm Breaker Bar', 'Belt Wear Gauge', 'Replacement EPDM Belt 7PK1855'],
        steps: [
          'Sketch or photograph belt routing diagram across all 5 pulleys.',
          'Rotate spring-loaded tensioner pulley clockwise with 15mm breaker bar to release tension.',
          'Slip old belt off alternator pulley and remove from engine bay.',
          'Spin idler and alternator pulleys by hand to check for bearing roughness or play.',
          'Route new 7PK1855 EPDM belt ensuring every rib sits centered in pulley grooves.',
          'Release tensioner slowly and verify indicator arrow is within normal tension window.'
        ],
        targetSpec: 'Continental ContiTech / Gates Micro-V 7PK1855 EPDM.',
        museVisualRepair: 'Flexible smooth matte black EPDM belt with deep intact V-ribs seated squarely in pulley channels.',
        reasoningTrace: '• Visual Telemetry: Serpentine accessory belt 7PK1855 at coordinates [49%, 72%].\n• Optical Inspection: Transverse rib micro-cracking measured at 3.4 cracks/inch; outer tensile cords exhibit edge fraying.\n• Mechanical Reasoning: Polymer plasticizer depletion after 60,000 km duty cycle combined with minor pulley misalignment accelerates fatigue.\n• Resolution Vector: De-tension with 15mm breaker bar, inspect idler bearings, and install new EPDM micro-V 7PK1855 belt.'
      },
      {
        id: 'alt_stator',
        name: 'Alternator Front Stator Ventilation Housing',
        designator: 'GEN-45 - Die-Cast Aluminum Stator Casing',
        center: { x: 48, y: 48 },
        polygon: [
          { x: 41, y: 43 },
          { x: 55, y: 43 },
          { x: 56, y: 55 },
          { x: 41, y: 55 }
        ],
        status: 'normal',
        statusLabel: 'OPERATIONAL: Casing Intact',
        healthScore: 92,
        confidence: 0.978,
        repairMetrics: {
          difficulty: 'Inspection Only',
          estTime: '5 mins',
          estCost: '$0.00',
          riskRating: 'Low'
        },
        technicianProTip: 'Keep front ventilation slots free of oil spray; oil mist binds road grit and creates an insulating layer that overheats the rotor diodes.',
        testVerification: 'Stator Phase Output: 14.4V DC at 1800 RPM with < 0.25V AC diode ripple.',
        diagnosis: 'Die-cast aluminum housing is structurally intact with no mechanical impact fractures or bearing seat eccentricity. Stator copper windings visible through cooling slots show clean enamel coating with minor surface dust.',
        rootCause: 'Normal operational condition.',
        safetyAlert: 'Ensure cooling slots remain unobstructed to prevent thermal stator throttling.',
        tools: ['Compressed Air Duster', 'Inspection Mirror'],
        steps: [
          'Blow accumulated dust and debris out of ventilation slots with dry compressed air.',
          'Verify front bearing spins smoothly with zero axial lash.'
        ],
        targetSpec: 'Denso / Bosch OEM 130A Die-Cast Alternator Housing.',
        museVisualRepair: 'Clean brushed aluminum housing with open airflow cooling channels.',
        reasoningTrace: '• Visual Telemetry: Alternator stator housing at coordinates [48%, 48%].\n• Optical Inspection: Zero crack propagation across aluminum alloy ribs; stator enamel windings show uniform insulation lacquer.\n• Electromechanical Reasoning: Cooling airflow is adequate. No stator winding burn marks or shorted turns observed.\n• Resolution Vector: Housing and stator within operational tolerance.'
      }
    ]
  }
];
