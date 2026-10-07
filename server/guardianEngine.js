/**
 * AI UAE GUARDIAN - Keyless AI Core Engine
 *
 * Central AI Architecture:
 * DETECT -> EXPLAIN -> RECOMMEND -> HUMAN DECIDES
 */

// Universal Risk Level Standardizer
export function calculateRiskLevel(score) {
  if (score <= 25) return 'LOW';
  if (score <= 50) return 'MODERATE';
  if (score <= 75) return 'HIGH';
  return 'CRITICAL';
}

// 1. PEOPLE GUARDIAN ANALYSIS
export function analyzePeopleEvent(scenario, customData = {}) {
  const type = scenario || customData.type || 'normal';

  let riskScore = 12;
  let eventName = 'Normal Environmental Conditions';
  let confidence = 96;
  let factors = [
    { name: 'Standard pathway clearance', points: 0, description: 'No physical hazards observed in area' },
    { name: 'Ambient illumination', points: 0, description: 'Illumination levels within normal parameters' }
  ];
  let recommendation = 'No immediate action needed. Continuous environmental monitoring active.';
  let visualIndicator = 'GREEN';

  switch (type.toLowerCase()) {
    case 'person fall':
    case 'fall':
      riskScore = 94;
      eventName = 'Possible Person Fall Detected';
      confidence = 94;
      factors = [
        { name: 'Abrupt vertical displacement', points: 42, description: 'Sudden trajectory drop detected in subject bounding box' },
        { name: 'Horizontal position stasis', points: 30, description: 'Subject remains in prone position > 5 seconds' },
        { name: 'Unusual posture orientation', points: 15, description: 'Angle relative to ground plane indicates fall' },
        { name: 'High-density motion burst', points: 7, description: 'Rapid deceleration spike before stasis' }
      ];
      recommendation = 'Human verification recommended. Dispatch safety steward or verify via station intercom if necessary.';
      visualIndicator = 'RED';
      break;

    case 'smoke detected':
    case 'smoke':
      riskScore = 88;
      eventName = 'Visual Smoke Condition Detected';
      confidence = 91;
      factors = [
        { name: 'Particulate opacity plume', points: 40, description: 'Low-contrast expanding visual plume in upper visual frame' },
        { name: 'Luminance fluctuation', points: 28, description: 'Rapid diffusion pattern typical of airborne particulates' },
        { name: 'Thermal contrast shift', points: 20, description: 'Ambient color histogram shift towards grey/white haze' }
      ];
      recommendation = 'Human verification required. Inspect HVAC and environmental sensors in Zone A-3.';
      visualIndicator = 'ORANGE';
      break;

    case 'blocked path':
    case 'blocked':
      riskScore = 65;
      eventName = 'Blocked Evacuation Pathway';
      confidence = 88;
      factors = [
        { name: 'Stationary spatial obstruction', points: 35, description: 'Unidentified obstruction covering > 60% of marked walkway' },
        { name: 'Egress path constraint', points: 20, description: 'Emergency corridor clear width reduced below standard' },
        { name: 'Duration threshold exceeded', points: 10, description: 'Object present in restricted zone > 15 minutes' }
      ];
      recommendation = 'Notify facility management to clear emergency exit pathway.';
      visualIndicator = 'AMBER';
      break;

    case 'object left behind':
    case 'unattended':
      riskScore = 72;
      eventName = 'Unattended Object Detected';
      confidence = 89;
      factors = [
        { name: 'Unattended parcel stasis', points: 38, description: 'Isolated object without proximate owner detected' },
        { name: 'High foot-traffic zone', points: 22, description: 'Located in public transit concourse' },
        { name: 'Time delta trigger', points: 12, description: 'Stasis duration > 10 minutes' }
      ];
      recommendation = 'Conduct security protocol check and verify package owner.';
      visualIndicator = 'AMBER';
      break;
  }

  const riskLevel = calculateRiskLevel(riskScore);

  return {
    guardian: 'PEOPLE_GUARDIAN',
    eventName,
    riskScore,
    riskLevel,
    confidence,
    factors,
    recommendation,
    visualIndicator,
    notice: 'PROTOTYPE AI ASSESSMENT (No facial recognition or identity tracking performed)',
    isDemo: true,
    timestamp: new Date().toISOString()
  };
}

// 2. RESOURCE GUARDIAN ANALYSIS (Water Conservation & Anomaly)
export function analyzeWaterResource(flowRateLMin = 31, durationMins = 45, baselineLMin = 12) {
  let riskScore = 15;
  let factors = [];

  if (flowRateLMin > baselineLMin * 2) {
    riskScore += 35;
    factors.push({ name: 'Continuous continuous elevated flow', points: 35, description: `Current flow (${flowRateLMin} L/min) is > 2.5x normal baseline (${baselineLMin} L/min)` });
  } else if (flowRateLMin > baselineLMin) {
    riskScore += 18;
    factors.push({ name: 'Moderate elevated flow', points: 18, description: `Current flow exceeds normal baseline` });
  }

  if (durationMins > 30) {
    riskScore += 27;
    factors.push({ name: 'Usage above continuous baseline duration', points: 27, description: `Uninterrupted flow recorded for ${durationMins} minutes` });
  }

  if (flowRateLMin > 25 && durationMins > 20) {
    riskScore += 15;
    factors.push({ name: 'Unexpected flow pattern profile', points: 15, description: 'Flow profile matches pipe leakage or open main valve' });
    riskScore += 10;
    factors.push({ name: 'Historical mismatch anomaly', points: 10, description: 'No scheduled irrigation or facility activity at current hour' });
  }

  riskScore = Math.min(99, riskScore);
  const riskLevel = calculateRiskLevel(riskScore);

  const dailyWasteLiters = Math.round((flowRateLMin - baselineLMin) * 60 * 16 / 1000) * 1000 || 480;
  const monthlySavingsLiters = dailyWasteLiters * 30;

  return {
    guardian: 'RESOURCE_GUARDIAN',
    currentFlowRate: flowRateLMin,
    baselineFlowRate: baselineLMin,
    riskScore,
    riskLevel,
    confidence: 89,
    factors,
    potentialWaste: {
      dailyLiters: dailyWasteLiters,
      monthlyLiters: monthlySavingsLiters
    },
    recommendation: riskScore > 50
      ? 'Inspect main distribution line Zone 4 for pipe breach or open isolation valve. Consider automated shutoff.'
      : 'Water consumption parameters within optimal range. Continue standard monitoring.',
    notice: 'DEMO DATA - PROTOTYPE AI ASSESSMENT',
    isDemo: true,
    timestamp: new Date().toISOString()
  };
}

// 3. PRIVACY GUARDIAN ANALYSIS (Text PII Detection & Safe Rewrite)
export function analyzeTextPrivacy(text = '') {
  if (!text || typeof text !== 'string') text = '';

  let riskScore = 5;
  let factors = [];
  let detectedTypes = [];

  // PII Regex Patterns
  const phonePattern = /(?:\+?971|0)?5[0245689]\d{7}|\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const addressPattern = /\b(?:Villa|Apartment|Flat|Street|Avenue|Building|Block)\s+\d+|Zone\s+\d+|P\.?O\.?\s*Box\s*\d+/gi;
  const schoolPattern = /\b(?:School|Academy|University|College|Campus|ABC School)\b/gi;
  const eidPattern = /784-\d{4}-\d{7}-\d/g;

  const phoneMatches = text.match(phonePattern);
  const emailMatches = text.match(emailPattern);
  const addressMatches = text.match(addressPattern);
  const schoolMatches = text.match(schoolPattern);
  const eidMatches = text.match(eidPattern);

  if (phoneMatches) {
    riskScore += 30;
    factors.push({ name: 'Personal Phone Number Detected', points: 30, description: `Found contact number: "${phoneMatches[0]}"` });
    detectedTypes.push('Phone Number');
  }

  if (emailMatches) {
    riskScore += 25;
    factors.push({ name: 'Email Address Exposed', points: 25, description: `Found email: "${emailMatches[0]}"` });
    detectedTypes.push('Email Address');
  }

  if (addressMatches) {
    riskScore += 35;
    factors.push({ name: 'Exact Physical Location / Address', points: 35, description: `Found address hint: "${addressMatches[0]}"` });
    detectedTypes.push('Home Address');
  }

  if (schoolMatches) {
    riskScore += 20;
    factors.push({ name: 'Educational Institution Name', points: 20, description: `Found school reference: "${schoolMatches[0]}"` });
    detectedTypes.push('School Name');
  }

  if (eidMatches) {
    riskScore += 40;
    factors.push({ name: 'Emirates ID / Government Identification', points: 40, description: `Found National ID format` });
    detectedTypes.push('Emirates ID');
  }

  if (text.toLowerCase().includes('my name is') || text.toLowerCase().includes('i am ')) {
    riskScore += 15;
    factors.push({ name: 'Explicit Self-Identity Disclosure', points: 15, description: 'Direct declaration of personal name' });
    detectedTypes.push('Full Name');
  }

  riskScore = Math.min(98, riskScore);
  const riskLevel = calculateRiskLevel(riskScore);

  // Safe Rewrite Generation
  let safeRewrite = text;
  if (riskScore > 20) {
    safeRewrite = text
      .replace(phonePattern, '[PHONE REMOVED]')
      .replace(emailPattern, '[EMAIL REMOVED]')
      .replace(addressPattern, '[GENERAL REGION, UAE]')
      .replace(schoolPattern, '[LOCAL EDUCATIONAL INSTITUTION]')
      .replace(eidPattern, '[ID REDACTED]')
      .replace(/My name is [A-Z][a-z]+/gi, "I'm a student")
      .replace(/I live in [^,.]+/gi, "I reside in the UAE");
  }

  return {
    guardian: 'PRIVACY_GUARDIAN',
    originalText: text,
    safeRewrite,
    riskScore,
    riskLevel,
    confidence: 93,
    detectedTypes,
    factors,
    recommendation: riskScore > 40
      ? 'Remove exact addresses, contact numbers, and school names before posting publicly online.'
      : 'Text contains low or minimal private identifier markers.',
    notice: 'PROTOTYPE PRIVACY ASSESSMENT - Demo Data',
    isDemo: true,
    timestamp: new Date().toISOString()
  };
}

// 4. PRIVACY IMAGE SCANNER ANALYSIS
export function analyzeImagePrivacy(imageName = 'Uploaded Image') {
  return {
    guardian: 'PRIVACY_GUARDIAN',
    imageName,
    riskScore: 82,
    riskLevel: 'HIGH',
    confidence: 91,
    detectedRegions: [
      { type: 'Identity Document / ID Badge', confidence: 'HIGH', bbox: [15, 20, 35, 40] },
      { type: 'Readable Contact Number', confidence: 'HIGH', bbox: [50, 60, 20, 15] },
      { type: 'Geographic Location Landmark', confidence: 'MEDIUM', bbox: [70, 10, 25, 30] }
    ],
    factors: [
      { name: 'Government ID card visible', points: 38, description: 'Document structural layout matches standard ID' },
      { name: 'Printed contact phone string', points: 26, description: 'Optical character scan identified numeric sequence' },
      { name: 'Location clue landmark', points: 18, description: 'Background sign contains street address marker' }
    ],
    recommendation: 'Use automatic blurring on ID card numbers and contact phone before sharing.',
    notice: 'DEMO MODE - PROTOTYPE VISION SCANNER',
    isDemo: true,
    timestamp: new Date().toISOString()
  };
}

// 5. SCAM GUARDIAN TEXT SCANNER ANALYSIS
export function analyzeScamText(message = '') {
  const msg = message.toLowerCase();
  let riskScore = 8;
  let factors = [];
  let category = 'GENERAL_COMMUNICATION';

  // Scam indicators
  if (msg.includes('won') || msg.includes('congratulations') || msg.includes('prize') || msg.includes('winner') || msg.includes('aed 50,000')) {
    riskScore += 27;
    factors.push({ name: 'Unexpected financial prize / win', points: 27, description: 'Unsolicited reward offer detected ("won", "prize", "AED 50,000")' });
    category = 'PRIZE_SCAM';
  }

  if (msg.includes('immediately') || msg.includes('urgent') || msg.includes('within 30 minutes') || msg.includes('expire') || msg.includes('act now')) {
    riskScore += 24;
    factors.push({ name: 'High-pressure urgency tactic', points: 24, description: 'Artificial time pressure imposed to disable critical verification' });
  }

  if (msg.includes('click') || msg.includes('link') || msg.includes('http') || msg.includes('bit.ly') || msg.includes('.xyz') || msg.includes('claim')) {
    riskScore += 22;
    factors.push({ name: 'Suspicious call-to-action link', points: 22, description: 'Prompts user to follow unverified link or claim URL' });
  }

  if (msg.includes('otp') || msg.includes('password') || msg.includes('pin') || msg.includes('verification code') || msg.includes('bank details')) {
    riskScore += 28;
    factors.push({ name: 'Credential / OTP credential harvesting', points: 28, description: 'Requests sensitive authentication tokens or bank credentials' });
    category = 'FINANCIAL_SCAM';
  }

  if (msg.includes('package') || msg.includes('delivery') || msg.includes('reschedule') || msg.includes('courier') || msg.includes('customs fee')) {
    riskScore += 25;
    factors.push({ name: 'Unsolicited parcel delivery fee alert', points: 25, description: 'Classic logistics fee lure requesting instant micro-payment' });
    category = 'DELIVERY_SCAM';
  }

  if (msg.includes('earn') || msg.includes('per week') || msg.includes('no experience') || msg.includes('job offer') || msg.includes('work from home')) {
    riskScore += 26;
    factors.push({ name: 'Unrealistic income promise', points: 26, description: 'Exaggerated wage rate requiring upfront account/bank details' });
    category = 'JOB_SCAM';
  }

  if (msg.includes('manager') || msg.includes('gift card') || msg.includes('transfer money') || msg.includes('help urgently')) {
    riskScore += 25;
    factors.push({ name: 'Executive or family impersonation', points: 25, description: 'Urgent request for non-standard payment instrument' });
    category = 'IMPERSONATION';
  }

  riskScore = Math.min(99, riskScore);
  const riskLevel = calculateRiskLevel(riskScore);

  // Safe Reply Generation
  let safeReply = "I am unable to assist with this request. I will verify directly through official verified communication channels.";
  if (msg.includes('otp') || msg.includes('password') || msg.includes('code')) {
    safeReply = "I do not share verification codes or passwords. I will contact the service provider directly using their official mobile application.";
  } else if (msg.includes('package') || msg.includes('delivery')) {
    safeReply = "I will check my shipment status directly on the official postal tracking app without using provided links.";
  } else if (msg.includes('won') || msg.includes('prize')) {
    safeReply = "Please send official written notification through registered postal service. I do not click unverified prize links.";
  }

  return {
    guardian: 'SCAM_GUARDIAN',
    message,
    category,
    riskScore,
    riskLevel,
    confidence: 91,
    factors,
    safeReply,
    actionPlan: [
      "Do not click any provided links or download attachments.",
      "Never share OTPs, PINs, or online banking passwords with anyone.",
      "Verify the identity of the sender through official phone numbers listed on legitimate websites.",
      "Report suspicious numbers to your telecom carrier or official digital security authorities."
    ],
    assessmentSummary: riskScore > 50
      ? 'AI detected multiple scam warning signs. Extreme caution advised.'
      : 'Low scam indicator presence. Standard digital security precautions apply.',
    disclaimer: 'This is an AI risk assessment, not proof that the message is fraudulent or legitimate.',
    notice: 'PROTOTYPE SCAM ASSESSMENT - Demo Data',
    isDemo: true,
    timestamp: new Date().toISOString()
  };
}

// 6. SCAM URL ANALYSIS
export function analyzeScamUrl(url = '') {
  const target = url.toLowerCase();
  let riskScore = 15;
  let factors = [];

  if (!target.startsWith('https://')) {
    riskScore += 20;
    factors.push({ name: 'Insecure Protocol (No HTTPS)', points: 20, description: 'Connection is unencrypted or uses invalid SSL parameters' });
  }

  if (target.includes('bank') || target.includes('claim') || target.includes('verify') || target.includes('login') || target.includes('update')) {
    riskScore += 25;
    factors.push({ name: 'High-risk keyword combination', points: 25, description: 'URL string contains keywords frequently used in phishing redirects' });
  }

  if (target.includes('.xyz') || target.includes('.top') || target.includes('.tk') || target.includes('.cc') || target.includes('-pay')) {
    riskScore += 30;
    factors.push({ name: 'Suspicious TLD or hyphenated domain', points: 30, description: 'Top-Level Domain associated with low-cost disposable hosting' });
  }

  if (target.includes('emirates') || target.includes('dubaipost') || target.includes('uaepass')) {
    riskScore += 25;
    factors.push({ name: 'Lookalike branding pattern detected', points: 25, description: 'Domain attempts to imitate recognized UAE entity' });
  }

  riskScore = Math.min(98, riskScore);
  const riskLevel = calculateRiskLevel(riskScore);

  return {
    guardian: 'SCAM_GUARDIAN',
    url,
    riskScore,
    riskLevel,
    confidence: 90,
    factors,
    httpsAvailable: target.startsWith('https://'),
    recommendation: 'Do not enter passwords, credit card numbers, or personal credentials on unverified domain structures.',
    notice: 'Prototype analysis based on URL characteristics. Website was not automatically opened.',
    isDemo: true,
    timestamp: new Date().toISOString()
  };
}

// 7. QR SAFETY SCANNER
export function analyzeQrSafety(qrImageName = 'Uploaded QR Code') {
  return {
    guardian: 'SCAM_GUARDIAN',
    qrImageName,
    destinationUrl: 'https://pay-verify-uae-portal.xyz/checkout',
    riskScore: 78,
    riskLevel: 'HIGH',
    confidence: 92,
    factors: [
      { name: 'Unverified external payment gateway', points: 35, description: 'Destination points to third-party payment form outside recognized bank portals' },
      { name: 'Shortened or redirected URL structure', points: 25, description: 'QR destination uses URL obfuscation layers' },
      { name: 'Non-standard domain suffix (.xyz)', points: 18, description: 'Domain extension possesses high risk index' }
    ],
    recommendation: 'Payment destination should be independently verified prior to authorizing transactions.',
    notice: 'QR scanned safely in sandbox mode. Destination was not visited automatically.',
    isDemo: true,
    timestamp: new Date().toISOString()
  };
}

// 8. 90-SECOND EXPO DEMO SCRIPT DATA
export function getExpoDemoScript() {
  return [
    {
      phase: 1,
      timeframe: '0s - 20s',
      title: 'PEOPLE GUARDIAN',
      guardian: 'PEOPLE_GUARDIAN',
      subtitle: 'AI-Assisted Safety Event Awareness',
      scenario: 'Person Fall',
      riskScore: 94,
      riskLevel: 'HIGH',
      confidence: 94,
      details: 'Visual camera feed analysis detected sudden posture drop & 5-second stasis.',
      recommendation: 'Human verification recommended. Dispatch safety steward.',
      quote: 'Protecting people without facial recognition or identity tracking.'
    },
    {
      phase: 2,
      timeframe: '20s - 40s',
      title: 'RESOURCE GUARDIAN',
      guardian: 'RESOURCE_GUARDIAN',
      subtitle: 'AI Water Conservation & Anomaly Detection',
      scenario: 'Water Continuous Flow Leak',
      flowChange: '12 L/min baseline → 31 L/min continuous',
      riskScore: 87,
      riskLevel: 'HIGH',
      confidence: 89,
      details: 'Uninterrupted overnight flow exceeds normal baseline by 158%. Potential waste: 480 L/day.',
      recommendation: 'Inspect isolation valve Zone 4. Automated valve alert triggered.',
      quote: 'Small AI decisions create large environmental impact.'
    },
    {
      phase: 3,
      timeframe: '40s - 60s',
      title: 'PRIVACY GUARDIAN',
      guardian: 'PRIVACY_GUARDIAN',
      subtitle: 'Identify Sensitive Information Before Sharing',
      scenario: 'PII Disclosure Scan & Rewrite',
      inputSample: 'My name is Ahmed and I live in Villa 24. Contact 0501234567.',
      riskScore: 82,
      riskLevel: 'HIGH',
      confidence: 93,
      details: 'Identified exact location, mobile number, and personal identity markers.',
      recommendation: 'Transformed into anonymized safe version before social post.',
      quote: 'Think before you share. Safeguarding digital identities.'
    },
    {
      phase: 4,
      timeframe: '60s - 80s',
      title: 'SCAM GUARDIAN',
      guardian: 'SCAM_GUARDIAN',
      subtitle: 'Detect Warning Signs in Suspicious Messages',
      scenario: 'Fake Prize / Financial Urgency Scam',
      inputSample: 'Congratulations! You won AED 50,000! Click link in 30 mins!',
      riskScore: 91,
      riskLevel: 'CRITICAL',
      confidence: 91,
      details: 'Flagged financial lure (+27), urgency pressure (+24), and unverified claim URL (+22).',
      recommendation: 'Do not click links. Generated safe refusal reply.',
      quote: 'Detect the warning signs before you click, pay, or share.'
    },
    {
      phase: 5,
      timeframe: '80s - 90s',
      title: 'CENTRAL AI CORE SYNTHESIS',
      guardian: 'ALL_GUARDIANS',
      subtitle: '4 Guardians. 1 Mission.',
      statement: 'PROTECT PEOPLE. PROTECT RESOURCES. PROTECT DIGITAL LIVES.',
      flowFormula: 'DETECT → EXPLAIN → RECOMMEND → HUMAN DECIDES',
      eventQuote: 'Technology becomes meaningful when it improves lives. - BTF AKSI EXPO 2026'
    }
  ];
}
