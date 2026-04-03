import { jsPDF } from 'jspdf';

export interface OrderData {
  id: string;
  items: string[];
  total: string;
  timestamp: number;
  status: string;
  paymentMethod: string;
  customerName?: string;
  orderNote?: string;
}

export const generateInvoice = (order: OrderData) => {
  // Group items to calculate dynamic height
  const itemCounts: Record<string, number> = {};
  order.items.forEach(item => {
    itemCounts[item] = (itemCounts[item] || 0) + 1;
  });

  // Calculate dynamic height for the receipt roll
  const baseHeight = 110;
  const itemsHeight = Object.keys(itemCounts).length * 8;
  const noteHeight = order.orderNote ? 15 : 0;
  const totalHeight = baseHeight + itemsHeight + noteHeight;

  // 80mm width is standard thermal receipt size
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [80, totalHeight]
  });

  const pageWidth = 80;
  const margin = 5;
  const contentWidth = pageWidth - (margin * 2);
  const centerX = pageWidth / 2;

  // Brand Colors
  const bgPaper = '#FDFBF7'; // Warm receipt paper color
  const textDark = '#0B4A31'; // Surgawi Dark Green
  const textMuted = '#5A7A68'; // Faded green for secondary text
  const accentOrange = '#E87B21'; // Surgawi Orange
  const accentLightGreen = '#98C964'; // Surgawi Light Green

  // 1. Background
  doc.setFillColor(bgPaper);
  doc.rect(0, 0, pageWidth, totalHeight, 'F');

  // Helper for dashed lines
  const drawDashedLine = (y: number) => {
    doc.setDrawColor(textDark);
    doc.setLineWidth(0.3);
    doc.setLineDashPattern([1, 1.5], 0);
    doc.line(margin, y, pageWidth - margin, y);
    doc.setLineDashPattern([], 0); // reset
  };

  let yPos = 12;

  // 2. Logo Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  
  const surW = doc.getTextWidth('Sur');
  const gW = doc.getTextWidth('g');
  const awiW = doc.getTextWidth('awi');
  const totalLogoW = surW + gW + awiW;
  const startX = (pageWidth - totalLogoW) / 2;
  
  doc.setTextColor(textDark);
  doc.text('Sur', startX, yPos);
  doc.setTextColor(accentOrange);
  doc.text('g', startX + surW, yPos);
  doc.setTextColor(textDark);
  doc.text('awi', startX + surW + gW, yPos);
  
  // Leaves detail
  doc.setFillColor(accentLightGreen);
  doc.ellipse(startX + totalLogoW + 2, yPos - 8, 1.5, 3, 'F');
  doc.ellipse(startX + totalLogoW + 5, yPos - 4, 2, 1.5, 'F');

  yPos += 5;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Drink', startX + surW - 1, yPos);

  yPos += 6;
  doc.setFontSize(7);
  doc.setTextColor(textMuted);
  doc.text('Joglo, Jakarta Barat', centerX, yPos, { align: 'center' });
  yPos += 3;
  doc.text('IG: @surgawidrink | WA: 0813-8315-8680', centerX, yPos, { align: 'center' });

  yPos += 5;
  drawDashedLine(yPos);
  yPos += 6;

  // 3. Receipt Title & Queue Number
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(textDark);
  doc.text('BUKTI JAJAN SURGAWI', centerX, yPos, { align: 'center' });

  yPos += 6;
  doc.setFontSize(14);
  doc.setTextColor(accentOrange);
  doc.text(`#${order.id}`, centerX, yPos, { align: 'center' });

  yPos += 5;
  drawDashedLine(yPos);
  yPos += 5;

  // 4. Order Meta (Casual Language)
  const dateStr = new Date(order.timestamp).toLocaleDateString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textMuted);
  doc.text('Tgl Jajan', margin, yPos);
  doc.setTextColor(textDark);
  doc.text(`: ${dateStr}`, margin + 15, yPos);

  yPos += 4;
  doc.setTextColor(textMuted);
  doc.text('Buat Kak', margin, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textDark);
  doc.text(`: ${order.customerName || 'Pelanggan Setia'}`, margin + 15, yPos);

  yPos += 4;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted);
  doc.text('Bayar Pake', margin, yPos);
  doc.setTextColor(textDark);
  doc.text(`: ${order.paymentMethod || 'Cash / QRIS'}`, margin + 15, yPos);

  yPos += 4;
  doc.setTextColor(textMuted);
  doc.text('Status', margin, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(textDark);
  doc.text(`: ${order.status.toUpperCase()}`, margin + 15, yPos);

  yPos += 5;
  drawDashedLine(yPos);
  yPos += 6;

  // 5. Items List
  doc.setFontSize(7);
  doc.setTextColor(textMuted);
  doc.text('PESANAN:', margin, yPos);
  yPos += 5;

  doc.setTextColor(textDark);
  Object.entries(itemCounts).forEach(([item, count]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${count}x`, margin, yPos);
    
    doc.setFont('helvetica', 'normal');
    const splitTitle = doc.splitTextToSize(item, contentWidth - 10);
    doc.text(splitTitle, margin + 6, yPos);
    
    yPos += (splitTitle.length * 4) + 2;
  });

  // 6. Notes
  if (order.orderNote) {
    yPos += 2;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(accentOrange);
    doc.text('Catatan:', margin, yPos);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(textMuted);
    const splitNote = doc.splitTextToSize(`"${order.orderNote}"`, contentWidth);
    doc.text(splitNote, margin, yPos + 4);
    yPos += (splitNote.length * 4) + 6;
  } else {
    yPos += 2;
  }

  drawDashedLine(yPos);
  yPos += 6;

  // 7. Totals
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textDark);
  doc.text('Subtotal', margin, yPos);
  doc.text(order.total, pageWidth - margin, yPos, { align: 'right' });

  yPos += 4;
  doc.setFontSize(7);
  doc.setTextColor(textMuted);
  doc.text('Pajak & Layanan', margin, yPos);
  doc.text('Udah Termasuk', pageWidth - margin, yPos, { align: 'right' });

  yPos += 6;
  
  // Highlighted Grand Total
  doc.setFillColor(accentOrange);
  doc.roundedRect(margin, yPos - 5, contentWidth, 9, 1, 1, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor('#FFFFFF');
  doc.text('TOTAL JAJAN', margin + 3, yPos + 1.5);
  doc.text(order.total, pageWidth - margin - 3, yPos + 1.5, { align: 'right' });

  yPos += 9;
  drawDashedLine(yPos);
  yPos += 6;

  // 8. Footer (Friendly)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(textDark);
  doc.text('Makasih kak udah jajan! 🌿', centerX, yPos, { align: 'center' });
  
  yPos += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textMuted);
  doc.text('Kalo seger, jangan lupa tag IG kita ya.', centerX, yPos, { align: 'center' });
  
  yPos += 3;
  doc.text('@surgawidrink', centerX, yPos, { align: 'center' });

  // Save PDF
  doc.save(`Struk_Surgawi_${order.id}.pdf`);
};
