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
        laymanSummary: 'This is the main power regulator for your computer. The silver cylinder has swollen up and cracked open on top, which causes your computer to crash, show blue-screens, or freeze up when doing work or playing games.',
        laymanFixGuide: 'Unplug power, desolder the swollen capacitor using a soldering iron, and solder in a fresh $2 replacement matching the minus stripe.',
        beginnerFriendly: 'Moderate — Requires basic soldering iron (20-30 mins).',
        diySavings: 'Saves ~$180 vs replacing motherboard',
        failureSeverity: 'CRITICAL: Random Blue Screens & Boot Failure',
        center: { x: 44, y: 44 },
        defectVent: { cx: 44, cy: 44, rx: 7.5, ry: 4.8 },
        polygon: [
          { x: 38.5, y: 39 },
          { x: 49.5, y: 39 },
          { x: 52, y: 43.5 },
          { x: 52, y: 74 },
          { x: 48, y: 78 },
          { x: 40, y: 78 },
          { x: 36, y: 74 },
          { x: 36, y: 43.5 }
        ],
        status: 'critical',
        statusLabel: 'CRITICAL FAULT: Bulging & Venting',
        healthScore: 14,
        confidence: 0.988,
        repairMetrics: {
          difficulty: 'Moderate (Soldering Iron)',
          estTime: '20-30 mins',
          estCost: '$1.50 - $3.00',
          riskRating: 'Electrical / Hot Iron'
        },
        technicianProTip: 'Multilayer motherboard ground planes dissipate heat rapidly. Pre-heat PCB underside or use a broad 360°C chisel tip to prevent ripping the fragile through-hole copper barrel plating.',
        testVerification: 'DMM / ESR Meter Check: Measure capacitance across unsoldered leads (Nominal: 1500μF ±20%, ESR < 0.04Ω). Defective unit measures < 320μF with ESR > 3.8Ω.',
        diagnosis: 'Visual analysis reveals severe convex doming on the top aluminum pressure vent with dried electrolyte. Internal resistance has spiked, causing dirty power ripple into the CPU.',
        rootCause: 'Prolonged heat buildup (>85°C) caused by restricted computer fan airflow over years of usage.',
        safetyAlert: 'Unplug PC power cord from the wall before opening the computer case.',
        tools: ['Soldering Iron (Chisel Tip)', 'Desoldering Braid / Sucker', 'New 1500μF 6.3V Low-ESR Capacitor', 'Rubbing Alcohol & Q-tips', 'Solder Wire'],
        steps: [
          'Unplug all power cords from your PC and press the power button once to drain leftover electricity.',
          'Remove the motherboard from the computer case and place it on a clean wooden table or non-conductive mat.',
          'Touch the hot soldering iron tip to the two wire legs on the back of the board while gently pulling the swollen capacitor out.',
          'Clean the two tiny holes with desoldering braid so the new wires can slide through.',
          'Insert the new capacitor matching the white stripe on its side to the white half-circle printed on the board.',
          'Solder both legs firmly from the back, clip off the extra wire length, and test your PC.'
        ],
        targetSpec: 'Rubycon ZLH / Nichicon FR Series 1500μF 6.3V ±20% 105°C, 5000h endurance.',
        museVisualRepair: 'Pristine flat vent seal with bright metallic finish and zero electrolyte residue.',
        reasoningTrace: '• Visual Telemetry: Radial aluminum capacitor C12 at coordinates [42%, 43%].\n• Optical Inspection: Positive convex doming on the top scored vent (+1.4mm deflection). Seeping brown electrolyte crystallization around the rubber base.\n• Physics & Electronics Reasoning: Vent rupture indicates internal hydrogen gas buildup caused by prolonged ripple current over-stress. Calculated ESR increase >18x nominal, resulting in 280mV ripple on the 12V Vcore rail.\n• Resolution Vector: Discharge capacitor via 1kΩ bleed resistor, desolder at 360°C, and replace with low-ESR solid polymer unit.'
      },
      {
        id: 'solid_cap',
        name: 'Solid-Polymer Capacitors (C18 / C19)',
        designator: 'C18 - 820μF 2.5V Solid Aluminum Polymer',
        deviceName: 'Motherboard Power Filter Capacitors',
        laymanSummary: 'These are healthy solid-state capacitors that smooth out electrical noise for your processor. They look completely flat and clean, with no swelling or leaks.',
        laymanFixGuide: 'No repair needed! This part is in great condition and working normally.',
        beginnerFriendly: 'Inspection only — 100% healthy.',
        diySavings: '$0.00 — Fully Operational',
        failureSeverity: 'NORMAL: Operating Perfectly',
        center: { x: 60.5, y: 56 },
        polygon: [
          { x: 55, y: 42 },
          { x: 66, y: 42 },
          { x: 68, y: 46 },
          { x: 68, y: 66 },
          { x: 65, y: 70 },
          { x: 56, y: 70 },
          { x: 53, y: 66 },
          { x: 53, y: 46 }
        ],
        status: 'normal',
        statusLabel: 'OPERATIONAL: Pristine Condition',
        healthScore: 98,
        confidence: 0.994,
        repairMetrics: {
          difficulty: 'Inspection Only',
          estTime: '2 mins',
          estCost: '$0.00',
          riskRating: 'None'
        },
        technicianProTip: 'Solid polymer capacitors have no liquid electrolyte and rarely burst; verify that nearby VRM airflow is unobstructed to maintain low ripple.',
        testVerification: 'In-circuit ESR check: Measures < 5mΩ at 100kHz. Zero DC voltage leakage detected.',
        diagnosis: 'Solid-polymer cans exhibit completely planar top surfaces with zero scorching or seal expansion. Low-ESR characteristics intact with ultra-stable transient response.',
        rootCause: 'Normal operational condition.',
        safetyAlert: 'Standard electrostatic discharge (ESD) handling applies.',
        tools: ['Flashlight / Magnifier'],
        steps: [
          'Verify the metal top is completely flat with no bulging.',
          'Verify there is no burnt smell or discoloration around the base.'
        ],
        targetSpec: 'Panasonic OS-CON 820μF 2.5V Ultra-Low ESR (<5mΩ).',
        museVisualRepair: 'Pristine metallic surface verified.',
        reasoningTrace: '• Visual Telemetry: Solid aluminum polymer capacitor C18 at coordinates [57%, 29%].\n• Optical Inspection: Flat aluminum casing with clean red silkscreen marking. Zero electrolytic fluid leakage or thermal bloating.\n• Electronics Reasoning: Operating within rated ripple current specifications. Impedance is nominal.\n• Resolution Vector: Component healthy and within tolerance.'
      },
      {
        id: 'choke_l1',
        name: 'R80 Sealed Ferrite Power Choke (L1)',
        designator: 'L1 - 0.80μH High-Current Inductor',
        deviceName: 'Motherboard Power Choke (L1)',
        laymanSummary: 'This dark grey block acts like an electrical shock-absorber, keeping power smooth and steady for your processor. It is solid, has zero cracks, and is functioning normally.',
        laymanFixGuide: 'No repair needed — this component is in perfect health.',
        beginnerFriendly: 'Inspection only — 100% healthy.',
        diySavings: '$0.00 — Fully Operational',
        failureSeverity: 'NORMAL: In Tolerance',
        center: { x: 28.5, y: 48 },
        polygon: [
          { x: 24, y: 38 },
          { x: 33, y: 38 },
          { x: 35, y: 43 },
          { x: 35, y: 54 },
          { x: 33, y: 58 },
          { x: 24, y: 58 },
          { x: 22, y: 54 },
          { x: 22, y: 43 }
        ],
        status: 'normal',
        statusLabel: 'OPERATIONAL: In Tolerance',
        healthScore: 96,
        confidence: 0.992,
        repairMetrics: {
          difficulty: 'Inspection Only',
          estTime: '2 mins',
          estCost: '$0.00',
          riskRating: 'None'
        },
        technicianProTip: 'If acoustic coil whine develops under GPU/CPU load, check for micro-cracks in the molded ferrite binder or loose SMD solder joints.',
        testVerification: 'DCR measurement: 1.15mΩ (spec: < 1.4mΩ). Inductance at 100kHz: 0.79μH (spec: 0.80μH ±15%).',
        diagnosis: 'Ferrite body intact with zero hairline cracks or coil whine resonance signs. Solder joints show clean concave wetting angles.',
        rootCause: 'Normal operational condition.',
        safetyAlert: 'No safety hazards detected.',
        tools: ['Visual Inspection Only'],
        steps: [
          'Visually check that the grey cube is firmly glued to the board.',
          'Verify no high-pitched buzzing or coil whine is heard under load.'
        ],
        targetSpec: 'TDK / Pulse Sealed Ferrite Choke 0.80μH, DCR 1.2mΩ max.',
        museVisualRepair: 'Optimal condition verified.',
        reasoningTrace: '• Visual Telemetry: Shielded ferrite choke L1 at coordinates [30%, 34%].\n• Optical Inspection: Zero crack propagation across molded ferrite body; solder fillets display 45° concave wetting meniscus meeting IPC Class 3 specs.\n• Physics & Electronics Reasoning: Inductance nominal at 0.80μH. Zero magnetostriction delamination or core saturation observed.\n• Resolution Vector: Component healthy and within tolerance. No replacement required.'
      },
      {
        id: 'vrm_heatsink',
        name: 'VRM Aluminum Heatsink Assembly',
        designator: 'HS-VRM - Extruded Cooling Fin Array',
        deviceName: 'PC Motherboard VRM Cooling (Voltage Regulator)',
        laymanSummary: 'This is the metal cooling block that sits on top of the small power chips next to your computer processor. The soft, squishy heat pad underneath has dried out and hardened, so your computer overheats, slows down, or freezes during games or work.',
        laymanFixGuide: 'Unplug power, pinch the two plastic pins on the back to lift the heatsink, peel off the dried crusty pad, wipe clean with rubbing alcohol, place a fresh $4 thermal pad on, and snap it back together.',
        beginnerFriendly: 'Yes — Super easy beginner fix (Takes ~15 mins, no soldering or special skills needed).',
        diySavings: 'Saves ~$120 vs PC Repair Shop',
        failureSeverity: 'WARNING: Overheating & System Freezes',
        center: { x: 75, y: 19 },
        polygon: [
          { x: 58, y: 13 },
          { x: 92, y: 11 },
          { x: 92, y: 27 },
          { x: 58, y: 29 }
        ],
        status: 'warning',
        statusLabel: 'THERMAL INSPECTION: Thermal Pad Degraded',
        healthScore: 62,
        confidence: 0.958,
        repairMetrics: {
          difficulty: 'Easy (No Soldering)',
          estTime: '15 mins',
          estCost: '$3.00 - $6.00',
          riskRating: 'Low'
        },
        technicianProTip: 'Never twist heatsinks aggressively while cold; thermal pads harden over time and can stick. Warm the area slightly with a hairdryer if it feels stuck.',
        testVerification: 'Thermal check: Power chips should remain under 70°C during heavy computer use after replacing the pad.',
        diagnosis: 'The thermal interface pad beneath the aluminum heatsink has dried out and lost elasticity, causing heat to get trapped inside the power chips.',
        rootCause: 'Normal aging from years of computer heat and dust accumulation.',
        safetyAlert: 'Unplug your computer power cable and let it cool for 10 minutes before touching.',
        tools: ['Small Screwdriver', 'New 1.5mm Thermal Pad', 'Rubbing Alcohol (IPA)', 'Soft Cloth / Paper Towel'],
        steps: [
          'Turn off your computer and unplug the power cord from the wall outlet.',
          'Pinch the two plastic spring clips on the back of the motherboard to release the heatsink.',
          'Gently lift the aluminum heatsink off the chips (do not yank or twist hard).',
          'Peel off the dried crusty pad and wipe both the chips and heatsink clean with rubbing alcohol.',
          'Cut a fresh piece of 1.5mm thermal pad to match the size, press it onto the chips, and snap the heatsink back in place.'
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
        laymanSummary: 'This is the tiny golden metal tip that melts plastic filament at 200°C and squirts it out to build 3D prints. It is clogged with burnt plastic crust, causing your prints to stop mid-way, skip layers, or click loudly.',
        laymanFixGuide: 'Warm up the printer to 220°C, unscrew the clogged brass nozzle using a 7mm wrench, screw in a fresh $3 nozzle, and tighten gently.',
        beginnerFriendly: 'Yes — Easy beginner fix (15-20 mins, wear gloves because the tip is hot!).',
        diySavings: 'Saves ~$60 vs buying new hotend assembly',
        failureSeverity: 'CRITICAL: Severe Clog & Print Failure',
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
          difficulty: 'Moderate (Hot Teardown)',
          estTime: '15-20 mins',
          estCost: '$2.00 - $5.00',
          riskRating: 'Hot Surface (200°C)'
        },
        technicianProTip: 'NEVER loosen or tighten a 3D printer nozzle when cold! The aluminum block contracts when cold; turning it cold can strip the metal threads.',
        testVerification: 'Extrusion test: Heated plastic should flow straight down like a smooth noodle without curling sideways.',
        diagnosis: 'Burnt charred plastic has crusty deposits blocking the 0.4mm nozzle hole, preventing plastic from extruding evenly.',
        rootCause: 'Old filament left cooking inside the hot nozzle at high temperatures without extruding.',
        safetyAlert: 'HOT WARNING: The nozzle gets over 200°C (hot enough to burn skin). Wear heat-resistant gloves.',
        tools: ['7mm Wrench / Spanner', 'Adjustable Pliers', 'New 0.4mm Brass Nozzle', 'Cleaning Needle / Wire Brush'],
        steps: [
          'Use the 3D printer screen menu to heat the hotend up to 220°C.',
          'Hold the square metal block steady with pliers so it does not twist.',
          'Use a 7mm wrench to unscrew the clogged golden nozzle while it is hot.',
          'Use a brass brush or cleaning needle to brush away any burnt plastic from the threads.',
          'Thread in a new 0.4mm brass nozzle and tighten gently until snug, then test extrusion.'
        ],
        targetSpec: 'E3D V6 Genuine Nozzle or Bondtech CHT 0.4mm.',
        museVisualRepair: 'Polished gold brass nozzle face with clean 0.400mm circular bore, zero molten residue.',
        reasoningTrace: '• Visual Telemetry: Extruder nozzle N1 at coordinates [51.5%, 76%].\n• Optical Inspection: Severe carbonized plastic crusting around 0.4mm orifice; molten filament back-leakage along M6 threads above the heater block.\n• Mechanical Reasoning: Thermal expansion gap between nozzle shoulder and heatbreak throat allowed pressurized polymer to weep into thread voids.\n• Resolution Vector: Perform 230°C hot-tighten teardown, clean M6 threads with brass wire brush, install new hardened nozzle at 250°C torqued to 2.5 Nm.'
      },
      {
        id: 'heater_block',
        name: 'Aluminum Heater Block & Assembly',
        designator: 'HB1 - 20x20x10mm CNC Aluminum Block',
        deviceName: '3D Printer Metal Heater Block',
        laymanSummary: 'This is the square metal block that gets hot to melt your 3D printer filament. Burnt plastic has leaked around it, and the blue rubber protective sock is missing, making the temperature swing up and down.',
        laymanFixGuide: 'Warm up the printer, carefully scrape away the burnt plastic with a brass wire brush, let it cool, and slip on a new $3 blue silicone cover.',
        beginnerFriendly: 'Yes — Easy beginner maintenance (15 mins, wear gloves because it gets hot).',
        diySavings: 'Saves ~$45 vs buying a whole new hotend',
        failureSeverity: 'WARNING: Temperature Fluctuations & Print Failures',
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
          difficulty: 'Easy (Cleaning & Sock Replacement)',
          estTime: '15 mins',
          estCost: '$3.00 - $5.00',
          riskRating: 'Hot Surface'
        },
        technicianProTip: 'Always put the silicone sock on; it keeps cooling fans from blowing cold air onto the hot metal block.',
        testVerification: 'Temperature check: Target 210°C; the temperature should stay steady within ±1°C on your printer screen.',
        diagnosis: 'Charred plastic crust is sticking to the metal block faces. The missing silicone protective sock allows cold fan air to disrupt heat stability.',
        rootCause: 'Nozzle was slightly loose when hot, allowing plastic to seep out around the threads.',
        safetyAlert: 'Allow heater block to cool down completely before touching with bare hands.',
        tools: ['Brass Wire Brush', 'Replacement Blue Silicone Sock', 'Cotton Swabs', 'Heat Gloves'],
        steps: [
          'Heat block to 220°C and gently wipe off soft plastic buildup using a brass wire brush or wooden stick.',
          'Turn off heating and let the printer cool down to room temperature.',
          'Wipe the metal surfaces clean with a cotton swab and rubbing alcohol.',
          'Slide a fresh heat-resistant silicone insulating sock firmly over the block.'
        ],
        targetSpec: 'High-Temperature Plated Copper or 6061-T6 Aluminum Heater Block.',
        museVisualRepair: 'Clean silver metallic block surface protected by snug blue silicone sock.',
        reasoningTrace: '• Visual Telemetry: Heater block HB1 at coordinates [51.5%, 49.5%].\n• Optical Inspection: Dark charred polymer glaze on aluminum faces. Temperature sensor retaining screw shows minor heat tinting.\n• Thermal Reasoning: Radiative heat losses increase heater cartridge duty cycle by 35% without silicone sock.\n• Resolution Vector: Clean outer block surfaces while hot and install thermal insulation jacket.'
      },
      {
        id: 'wires_th1',
        name: 'Thermistor & Heater Cartridge Wires',
        designator: 'TH1 - High-Temp Fiberglass Insulated Wires',
        deviceName: '3D Printer Temperature Sensor & Wires',
        laymanSummary: 'These are the thin wires that tell your printer how hot the nozzle is. The cloth insulation is bent and starting to fray from moving back and forth, which can cause temperature errors or trigger a printer shutoff.',
        laymanFixGuide: 'Unplug printer power, wrap high-temperature heat tape around the bent wires, and clip them to the frame so they do not yank back and forth.',
        beginnerFriendly: 'Yes — Quick beginner fix with heat tape (15 mins).',
        diySavings: 'Saves ~$35 vs service call',
        failureSeverity: 'WARNING: Risk of Temperature Sensor Error',
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
          difficulty: 'Easy (Tape & Cable Route)',
          estTime: '15 mins',
          estCost: '$2.00 - $5.00',
          riskRating: 'Low'
        },
        technicianProTip: 'Do not overtighten the small wire screw on the metal block; pinching the glass sensor bead will break it.',
        testVerification: 'Screen check: Room temperature reading on the printer screen should display 20°C - 25°C steadily.',
        diagnosis: 'Fiberglass braided insulation leads show mechanical bending stress and minor fraying at the bend point.',
        rootCause: 'Repetitive toolhead movements back and forth without adequate cable strain relief.',
        safetyAlert: 'Power off the 3D printer power supply completely before touching wire leads.',
        tools: ['Kapton / Heat Tape', 'Zip Ties', 'Small Screwdriver'],
        steps: [
          'Turn off and unplug the 3D printer power supply.',
          'Inspect the wires to make sure none of the tiny copper strands are snapped.',
          'Wrap heat-resistant yellow Kapton tape neatly around the frayed wire section.',
          'Secure the wire bundle with a zip tie to the printer bracket so it does not bend sharply.'
        ],
        targetSpec: 'PT1000 / Semitec Cartridge Thermistor with 300°C Fiberglass Loom.',
        museVisualRepair: 'Neatly organized cable loom with zero wire pinch or strain.',
        reasoningTrace: '• Visual Telemetry: Thermistor wiring at coordinates [75.5%, 26.5%].\n• Optical Inspection: Loom angle exceeds recommended 90° bend radius. Fibers slightly split.\n• Safety Reasoning: Broken sensor wire will report false low temperature and trigger runaway protection.\n• Resolution Vector: Reinforce loom with Kapton insulation and install rigid cable strain relief.'
      },
      {
        id: 'heatbreak_hb1',
        name: 'Bi-Metal Heatbreak & Heatsink Fins',
        designator: 'HS1 - Cold Zone Aluminum Fins',
        deviceName: '3D Printer Cooling Fins & Heat Barrier',
        laymanSummary: 'These metal cooling fins keep the upper part of the printer cool so plastic doesn\'t melt too early inside the tube. It is completely clean and working normally.',
        laymanFixGuide: 'No repair needed — heat barrier is operating properly.',
        beginnerFriendly: 'Inspection only — 100% healthy.',
        diySavings: '$0.00 — Fully Operational',
        failureSeverity: 'NORMAL: Good Thermal Barrier',
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
          estTime: '2 mins',
          estCost: '$0.00',
          riskRating: 'None'
        },
        technicianProTip: 'Ensure the small 30mm cooling fan in front of these fins is spinning whenever the hotend is above 50°C.',
        testVerification: 'Fins should stay cool to the touch (under 40°C) even while printing at 240°C.',
        diagnosis: 'Heatsink fins show clean thermal separation with unobstructed airflow channels. Titanium neck provides sharp thermal boundary.',
        rootCause: 'Normal operational condition.',
        safetyAlert: 'None.',
        tools: ['Visual Inspection Only'],
        steps: [
          'Verify that the small cooling fan spins freely when printer heats up.',
          'Ensure no dust bunnies or plastic strings are blocking the fin gaps.'
        ],
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
        laymanSummary: 'This is the main electrical wire coming out of your car alternator that recharges your 12V battery while driving. It is covered in thick green/white corrosion crust, which stops your battery from charging and leaves you stranded with a dead battery.',
        laymanFixGuide: 'Disconnect the car battery first, scrub off the green crust using warm baking soda water and a wire brush, tighten the nut with a 13mm wrench, and cover with grease.',
        beginnerFriendly: 'Yes — Super easy DIY fix (25 mins with common household baking soda and a basic wrench).',
        diySavings: 'Saves ~$160 vs Auto Repair Shop',
        failureSeverity: 'CRITICAL: Battery Drain & Dead Car Breakdown',
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
          difficulty: 'Easy (Wrench & Cleaning)',
          estTime: '20-25 mins',
          estCost: '$2.00 - $5.00',
          riskRating: 'Electrical (Disconnect Battery First)'
        },
        technicianProTip: 'NEVER touch a metal wrench to this post while the car battery is connected! Always remove the negative (-) battery terminal first.',
        testVerification: 'Multimeter check: With engine running at idle, battery terminals should read between 14.0V and 14.5V DC.',
        diagnosis: 'Heavy turquoise copper sulfate and oxide crust encrusting the B+ post, causing high resistance that prevents charging power from reaching the battery.',
        rootCause: 'Missing rubber insulator boot exposed bare copper to weather, moisture, and road salt.',
        safetyAlert: 'DANGER: Disconnect the negative (-) car battery cable before touching this terminal to prevent electrical sparks!',
        tools: ['10mm & 13mm Wrenches', 'Baking Soda & Warm Water', 'Old Toothbrush / Wire Brush', 'Dielectric Grease / Vaseline', 'Rubber Boot'],
        steps: [
          'Pop the car hood and use a 10mm wrench to disconnect the negative (-) black battery terminal first.',
          'Dip an old toothbrush into warm water mixed with 2 spoons of baking soda and scrub away the green fizzing crust.',
          'Use a 13mm wrench to remove the nut and pull off the circular wire terminal.',
          'Rub the metal ring with sandpaper or a kitchen scrub pad until it shines like bright shiny copper.',
          'Put the ring back on, tighten the 13mm nut firmly, and rub some grease over it to stop future corrosion.',
          'Snap a rubber cover boot over the post and reconnect your car battery.'
        ],
        targetSpec: 'OEM Heavy Duty Tin-Plated Copper Ring Terminal 4-AWG.',
        museVisualRepair: 'Polished bright metallic copper ring lug sealed with transparent dielectric coat under red rubber boot.',
        reasoningTrace: '• Visual Telemetry: Alternator B+ output terminal at coordinates [69%, 43%].\n• Optical Inspection: Heavy turquoise copper sulfate crystallization encrusting the terminal ring lug and stud.\n• Electrochemical Reasoning: Atmospheric moisture ingress combined with 130A galvanic action caused surface copper oxidation, generating a 1.4V contact drop and starving the battery of charging current.\n• Resolution Vector: Disconnect negative battery ground, neutralize sulfate with warm bicarbonate solution, abrade to bare copper, torque to 12 Nm, and seal with dielectric grease under rubber boot.'
      },
      {
        id: 'serp_belt',
        name: 'Multi-Rib Serpentine Accessory Belt (7PK1855)',
        designator: '7PK1855 - EPDM Micro-V Belt',
        deviceName: 'Car Alternator & Accessory Serpentine Belt',
        laymanSummary: 'This is the long rubber belt that spins around wheels to run your car alternator, power steering, and air conditioner. It has dry cracks across the ribs and frayed edges, which means it could snap while driving and leave you stranded.',
        laymanFixGuide: 'Use a wrench on the spring tensioner to loosen the old belt, pull it off, route a new $25 rubber belt following the pulley diagram, and let the tensioner snap back in place.',
        beginnerFriendly: 'Moderate — Easy with a basic wrench and a friend to help route the belt (30 mins).',
        diySavings: 'Saves ~$180 vs Mechanic Labor',
        failureSeverity: 'WARNING: Belt Snapping Risk on Highway',
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
          difficulty: 'Moderate (Wrench & Routing)',
          estTime: '30 mins',
          estCost: '$20.00 - $35.00',
          riskRating: 'Pinch Hazard'
        },
        technicianProTip: 'Snap a quick photo on your phone of how the belt weaves around the pulleys before taking it off, so you remember the path!',
        testVerification: 'Inspection check: New belt should sit centered in every pulley groove and not squeal when starting the car.',
        diagnosis: 'Micro-V ribs on belt exhibit dry transverse cracking exceeding 3 cracks per inch under tension with edge fraying.',
        rootCause: 'Normal rubber aging and drying after 50,000+ miles of driving.',
        safetyAlert: 'Ensure engine is turned off and keys are removed from the ignition before touching engine belts.',
        tools: ['15mm Wrench / Breaker Bar', 'New Serpentine Belt (Matching Part #)', 'Phone Camera (to photograph route)'],
        steps: [
          'Make sure the car engine is OFF and cool to the touch.',
          'Take a clear photo with your phone of the belt path weaving through the pulleys.',
          'Put a 15mm wrench on the tensioner bolt and push it sideways to release spring tension.',
          'Slide the old cracked belt off the top pulley and pull it out of the engine bay.',
          'Thread the new belt around all pulleys following your photo, push the tensioner to slip it on, and slowly release the wrench.'
        ],
        targetSpec: 'Continental ContiTech / Gates Micro-V 7PK1855 EPDM.',
        museVisualRepair: 'Flexible smooth matte black EPDM belt with deep intact V-ribs seated squarely in pulley channels.',
        reasoningTrace: '• Visual Telemetry: Serpentine accessory belt 7PK1855 at coordinates [49%, 72%].\n• Optical Inspection: Transverse rib micro-cracking measured at 3.4 cracks/inch; outer tensile cords exhibit edge fraying.\n• Mechanical Reasoning: Polymer plasticizer depletion after 60,000 km duty cycle combined with minor pulley misalignment accelerates fatigue.\n• Resolution Vector: De-tension with 15mm breaker bar, inspect idler bearings, and install new EPDM micro-V 7PK1855 belt.'
      },
      {
        id: 'alt_stator',
        name: 'Alternator Front Stator Ventilation Housing',
        designator: 'GEN-45 - Die-Cast Aluminum Stator Casing',
        deviceName: 'Car Alternator Metal Outer Casing',
        laymanSummary: 'This is the die-cast metal shell that protects the spinning electrical generator inside your car. The ventilation slots are clear and the casing has no cracks.',
        laymanFixGuide: 'No repair needed — casing is solid and intact.',
        beginnerFriendly: 'Inspection only — 100% healthy.',
        diySavings: '$0.00 — Fully Operational',
        failureSeverity: 'NORMAL: Solid Metal Shell',
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
          estTime: '2 mins',
          estCost: '$0.00',
          riskRating: 'None'
        },
        technicianProTip: 'Keep front ventilation slots free of oil spray; oil mist binds road grit and creates an insulating layer that overheats the rotor diodes.',
        testVerification: 'Stator Phase Output: 14.4V DC at 1800 RPM with < 0.25V AC diode ripple.',
        diagnosis: 'Die-cast aluminum housing is structurally intact with no mechanical impact fractures or bearing seat eccentricity.',
        rootCause: 'Normal operational condition.',
        safetyAlert: 'Ensure cooling slots remain unobstructed.',
        tools: ['Flashlight / Compressed Air'],
        steps: [
          'Visually inspect the metal casing for any cracks or missing bolts.',
          'Use compressed air to blow out any loose road dust from the air vents.'
        ],
        targetSpec: 'Denso / Bosch OEM 130A Die-Cast Alternator Housing.',
        museVisualRepair: 'Clean brushed aluminum housing with open airflow cooling channels.',
        reasoningTrace: '• Visual Telemetry: Alternator stator housing at coordinates [48%, 48%].\n• Optical Inspection: Zero crack propagation across aluminum alloy ribs; stator enamel windings show uniform insulation lacquer.\n• Electromechanical Reasoning: Cooling airflow is adequate. No stator winding burn marks or shorted turns observed.\n• Resolution Vector: Housing and stator within operational tolerance.'
      }
    ]
  }
];
