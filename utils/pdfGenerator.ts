import type { Quote } from '../types';

// Declare global variables from CDN scripts
declare const jspdf: {
  jsPDF: new (options?: any) => jsPDFWithAutoTable;
};
// Comprehensive interface to fix typing issues with the jsPDF library and its autotable plugin
interface jsPDFWithAutoTable {
  autoTable: (options: any) => jsPDFWithAutoTable;
  lastAutoTable: { finalY: number };
  addImage(imageData: any, format: string, x: number, y: number, width: number, height: number): this;
  setFontSize(size: number): this;
  setTextColor(r: number, g?: number, b?: number): this;
  text(text: string | string[], x: number, y: number, options?: any): this;
  setFont(fontName: string, fontStyle: string): this;
  setDrawColor(r: number, g?: number, b?: number): this;
  line(x1: number, y1: number, x2: number, y2: number, style?: string): this;
  save(filename: string): void;
  getFontList(): any;
}

const T_S_SECURITYS_LOGO_PNG_BASE64 = "data:image/png;base64,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";

export const generateQuotePDF = (quote: Quote): boolean => {
  try {
    const { jsPDF } = jspdf;
    const doc = new jsPDF() as jsPDFWithAutoTable;
    const today = new Date();
    const validUntil = new Date();
    validUntil.setDate(today.getDate() + 15);

    doc.addImage(T_S_SECURITYS_LOGO_PNG_BASE64, 'PNG', 14, 12, 60, 15);
    doc.setFontSize(9); doc.setTextColor(150);
    doc.text("Soluciones Integrales de TI y Redes", 14, 30);
    doc.text("tssecuritys@gmail.com | +57 3043475757", 14, 35);


    doc.setFontSize(14); doc.setTextColor(40); doc.setFont('helvetica', 'bold');
    doc.text("COTIZACIÓN", 200, 20, { align: 'right' });
    doc.setFontSize(10); doc.setFont('helvetica', 'normal');
    doc.text(`NÚMERO: ${quote.id}`, 200, 26, { align: 'right' });
    doc.text(`FECHA: ${today.toLocaleDateString('es-CO')}`, 200, 32, { align: 'right' });
    doc.text(`VÁLIDA HASTA: ${validUntil.toLocaleDateString('es-CO')}`, 200, 38, { align: 'right' });

    doc.setDrawColor(230); doc.line(14, 45, 200, 45);
    doc.setFontSize(10); doc.setTextColor(100);
    doc.text("CLIENTE:", 14, 52);
    doc.setTextColor(40); doc.setFont('helvetica', 'bold');
    doc.text(quote.client_name || "Cliente Potencial", 14, 58);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(80);
    doc.text(quote.client_email || "N/A", 14, 64);
    doc.text(quote.client_phone || "N/A", 14, 70);
    doc.line(14, 75, 200, 75);
    
    const tableColumn = ["Item", "Descripción", "Cant.", "Vlr. Unitario (COP)", "Total (COP)"];
    const tableRows: any[] = quote.items.map(item => [item.item, item.description, item.quantity, formatCurrency(item.unit_price, false), formatCurrency(item.total, false)]);
    
    doc.autoTable({
      head: [tableColumn], body: tableRows, startY: 80, theme: 'grid',
      headStyles: { fillColor: [5, 2, 13], textColor: 255, fontStyle: 'bold' },
      styles: { cellPadding: 3, fontSize: 9 },
      columnStyles: { 0: { cellWidth: 35 }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 15, halign: 'right' }, 3: { cellWidth: 30, halign: 'right' }, 4: { cellWidth: 30, halign: 'right' }}
    });

    const finalY = doc.lastAutoTable.finalY;
    doc.setFontSize(10);

    let totalsY = finalY + 10;
    if (quote.competitor_total) {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(150);
        doc.text("Total Promedio Competencia:", 140, totalsY, { align: 'right' });
        doc.text(formatCurrency(quote.competitor_total), 200, totalsY, { align: 'right' });
        totalsY += 6;
    }

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40);
    doc.text("NUESTRO TOTAL:", 140, totalsY, { align: 'right' });
    doc.text(formatCurrency(quote.total), 200, totalsY, { align: 'right' });

    let footerY = finalY > 220 ? finalY + 15 : 235;
    doc.setFontSize(8); doc.setTextColor(100);
    doc.text("Términos y Condiciones:", 14, footerY);
    doc.setTextColor(150);
    doc.setFont('helvetica', 'bold');
    doc.text("- Precios no incluyen IVA.", 14, footerY + 4);
    doc.setFont('helvetica', 'normal');
    doc.text("- Precios en Pesos Colombianos (COP). No incluyen costos de envío o viáticos fuera de Bogotá.", 14, footerY + 8);
    doc.text("- Esta es una cotización preliminar y puede estar sujeta a cambios tras una visita técnica.", 14, footerY + 12);
    doc.text("- Forma de pago: 50% anticipo, 50% contra entrega.", 14, footerY + 16);

    doc.setDrawColor(230); doc.line(14, 275, 200, 275);
    doc.setFontSize(9); doc.setTextColor(40); doc.setFont('helvetica', 'bold');
    doc.text("Johan Eduardo Luna Parrado | TS Securitys", 107, 282, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setTextColor(100);
    doc.text("tssecuritys@gmail.com | +57 3043475757", 107, 287, { align: 'center' });
    doc.setFontSize(7).setTextColor(150).text("Generado con la asistencia de ChatIA", 107, 291, { align: 'center'});

    doc.save(`Cotizacion_TS-Securitys_${quote.id}.pdf`);
    return true;
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    return false;
  }
};

const formatCurrency = (amount: number, useSymbol = true) => {
    return new Intl.NumberFormat('es-CO', {
        style: useSymbol ? 'currency' : 'decimal',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};