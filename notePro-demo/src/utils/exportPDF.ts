import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { Note } from '../types';

// Create a hidden container for rendering
let hiddenContainer: HTMLDivElement | null = null;

const getHiddenContainer = (): HTMLDivElement => {
  if (!hiddenContainer) {
    hiddenContainer = document.createElement('div');
    hiddenContainer.style.position = 'absolute';
    hiddenContainer.style.left = '-9999px';
    hiddenContainer.style.top = '0';
    hiddenContainer.style.width = '595px'; // A4 width in pixels at 72 DPI
    hiddenContainer.style.background = '#fff';
    hiddenContainer.style.padding = '20px';
    hiddenContainer.style.fontFamily = '"Microsoft YaHei", "PingFang SC", "SimHei", sans-serif';
    document.body.appendChild(hiddenContainer);
  }
  return hiddenContainer;
};

export const exportToPDF = async (note: Note): Promise<void> => {
  const container = getHiddenContainer();

  // Build HTML content with Chinese font support
  const content = `
    <div style="font-family: 'Microsoft YaHei', 'PingFang SC', 'SimHei', sans-serif;">
      <h1 style="font-size: 24px; margin-bottom: 10px; color: #333;">${note.title || '无标题'}</h1>
      <p style="font-size: 12px; color: #666; margin-bottom: 20px;">
        创建于: ${new Date(note.createdAt).toLocaleString()}
      </p>
      <div style="font-size: 14px; line-height: 1.8; color: #333; white-space: pre-wrap;">
        ${note.content || ''}
      </div>
    </div>
  `;

  container.innerHTML = content;

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const fileName = note.title ? `${note.title}.pdf` : 'note.pdf';
    pdf.save(fileName);
  } catch (error) {
    console.error('PDF export error:', error);
  }
};

export const exportNotesToPDF = async (notes: Note[]): Promise<void> => {
  const container = getHiddenContainer();

  // Build HTML for all notes
  const notesHtml = notes.map((note, index) => `
    <div style="margin-bottom: 30px; page-break-inside: avoid;">
      <h2 style="font-size: 18px; margin-bottom: 8px; color: #333;">${index + 1}. ${note.title || '无标题'}</h2>
      <p style="font-size: 11px; color: #666; margin-bottom: 10px;">
        更新于: ${new Date(note.updatedAt).toLocaleString()}
      </p>
      <div style="font-size: 13px; line-height: 1.6; color: #333; white-space: pre-wrap;">
        ${(note.content || '').substring(0, 500)}
      </div>
    </div>
  `).join('<hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">');

  container.innerHTML = `
    <div style="font-family: 'Microsoft YaHei', 'PingFang SC', 'SimHei', sans-serif;">
      <h1 style="font-size: 22px; margin-bottom: 10px; color: #333;">笔记导出</h1>
      <p style="font-size: 12px; color: #666; margin-bottom: 20px;">
        共 ${notes.length} 篇笔记 - 导出时间: ${new Date().toLocaleString()}
      </p>
      ${notesHtml}
    </div>
  `;

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`笔记导出_${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (error) {
    console.error('PDF export error:', error);
  }
};
