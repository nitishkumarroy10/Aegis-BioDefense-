import { DefensePlan } from "../types";

export async function generatePlanPdf(plan: DefensePlan, prices?: { monthly: string; setup: string }) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const primaryColor = [16, 185, 129]; // Emerald 500
  const darkBg = [15, 23, 42]; // Slate 900
  const textColor = [51, 65, 85]; // Slate 700
  const lightBg = [241, 245, 249]; // Slate 100

  // 1. Top Header Banner
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, 210, 42, "F");

  // Accent bar
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 42, 210, 2, "F");

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("PESTDEFENSE AI™", 15, 16);

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text("OFFICIAL DEFENSE PLAN BROCHURE & TECHNICAL SPECIFICATION", 15, 23);

  // Plan Name Right aligned in header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(16, 185, 129); // Emerald 400
  doc.text(plan.name.toUpperCase(), 195, 17, { align: "right" });

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(203, 213, 225);
  doc.text(plan.badge || "Verified Security Protocol", 195, 23, { align: "right" });

  let y = 50;

  // 2. Plan Tagline & Description Box
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(15, y, 180, 26, 3, 3, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.text(plan.tagline, 20, y + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  const splitDesc = doc.splitTextToSize(plan.description, 170);
  doc.text(splitDesc, 20, y + 14);

  y += 32;

  // 3. Pricing & Key Metrics Summary Box
  const monthlyText = prices?.monthly || `$${plan.monthlyPriceUSD}/mo`;
  const setupText = prices?.setup || `$${plan.initialSetupPriceUSD} setup`;

  doc.setFillColor(240, 253, 244); // Light Emerald
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(15, y, 180, 22, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(5, 150, 105);
  doc.text(`Monthly Rate: ${monthlyText}`, 20, y + 9);

  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Initial Setup Fee: ${setupText}`, 20, y + 16);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(`Response SLA: ${plan.specs.responseTime}`, 115, y + 9);
  doc.text(`Inspection Freq: ${plan.specs.inspectionFreq}`, 115, y + 16);

  y += 28;

  // 4. What's Included in Setup
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.text("1. WHAT'S INCLUDED IN THE SETUP FEE", 15, y);
  y += 3;

  doc.setDrawColor(226, 232, 240);
  doc.line(15, y, 195, y);
  y += 6;

  const setupIncludes = plan.setupIncludes || [
    "Initial 360° property vulnerability & foundation audit",
    "Placement of tamper-proof smart perimeter sensors",
    "Foundation crack sealing & moisture barrier preparation",
    "Initial deep molecular boundary barrier treatment"
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);

  setupIncludes.forEach((item) => {
    doc.setFillColor(16, 185, 129);
    doc.circle(18, y - 1, 1, "F");
    const itemLines = doc.splitTextToSize(item, 168);
    doc.text(itemLines, 22, y);
    y += itemLines.length * 4.8;
  });

  y += 4;

  // 5. Tech Features & Protocols
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.text("2. PRECISION TECH FEATURES & DEFENSE PROTOCOLS", 15, y);
  y += 3;

  doc.line(15, y, 195, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);

  plan.features.forEach((feat) => {
    doc.setFillColor(16, 185, 129);
    doc.circle(18, y - 1, 1, "F");
    const featLines = doc.splitTextToSize(feat, 168);
    doc.text(featLines, 22, y);
    y += featLines.length * 4.8;
  });

  y += 4;

  // 6. Warranty & Verification Terms
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.text("3. WARRANTY TERMS & ECO-RATING CERTIFICATION", 15, y);
  y += 3;

  doc.line(15, y, 195, y);
  y += 6;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.text("Official Warranty Protection:", 15, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(5, 150, 105);
  doc.text(plan.specs.warranty, 65, y);

  y += 6;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.text("Eco Safety Rating:", 15, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(plan.specs.ecoRating, 65, y);

  y += 12;

  // Footer Box
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 275, 210, 22, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("PESTDEFENSE AI™ COMMAND & DISPATCH CENTER", 15, 282);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text("CPCB & EPA Green Certified • 24/7 Hotline: +91 (011) 4900-DEFENSE • www.pestdefense.ai", 15, 287);

  doc.text(`Generated on ${new Date().toLocaleDateString("en-US", { dateStyle: "medium" })} • Doc Ref: PDF-${plan.id.toUpperCase()}`, 195, 287, { align: "right" });

  doc.save(`${plan.id}-defense-plan-brochure.pdf`);
}
