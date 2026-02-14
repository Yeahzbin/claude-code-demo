import * as XLSX from 'xlsx';
import type { Note } from '../types';

export const exportToExcel = (note: Note): void => {
  const worksheetData = [
    ['标题', note.title || '无标题'],
    ['创建时间', new Date(note.createdAt).toLocaleString()],
    ['更新时间', new Date(note.updatedAt).toLocaleString()],
    [''],
    ['内容', stripHtml(note.content)],
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Set column width
  worksheet['!cols'] = [{ wch: 20 }, { wch: 80 }];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '笔记');

  const fileName = note.title ? `${note.title}.xlsx` : 'note.xlsx';
  XLSX.writeFile(workbook, fileName);
};

export const exportNotesToExcel = (notes: Note[]): void => {
  const worksheetData = [
    ['标题', '创建时间', '更新时间', '内容摘要'],
  ];

  notes.forEach(note => {
    worksheetData.push([
      note.title || '无标题',
      new Date(note.createdAt).toLocaleString(),
      new Date(note.updatedAt).toLocaleString(),
      stripHtml(note.content).substring(0, 200),
    ]);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Set column widths
  worksheet['!cols'] = [
    { wch: 30 },
    { wch: 20 },
    { wch: 20 },
    { wch: 60 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, '笔记列表');

  const fileName = `笔记导出_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

// Helper function to strip HTML tags
function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}
