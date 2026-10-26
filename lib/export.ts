import * as XLSX from 'xlsx'
import Papa from 'papaparse'

export interface ExportData {
  [key: string]: any
}

export function exportToExcel(data: ExportData[], filename: string) {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')
  XLSX.writeFile(workbook, `${filename}.xlsx`)
}

export function exportToCSV(data: ExportData[], filename: string) {
  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportFinancialReport(data: any[], filename: string) {
  const formattedData = data.map(item => ({
    'التاريخ': new Date(item.date).toLocaleDateString('ar-EG'),
    'إجمالي المبيعات': item.totalSales,
    'عدد الطلبات': item.totalOrders,
    'عمولة المنصة': item.platformFees,
    'صافي الأرباح': item.netEarnings,
  }))
  
  exportToExcel(formattedData, filename)
}

export function exportOrdersReport(data: any[], filename: string) {
  const formattedData = data.map(item => ({
    'رقم الطلب': item.id.slice(-6),
    'اسم العميل': item.customerName,
    'رقم الهاتف': item.customerPhone,
    'العنوان': item.customerAddress,
    'المبلغ': item.totalAmount,
    'الحالة': item.status,
    'التاريخ': new Date(item.createdAt).toLocaleDateString('ar-EG'),
  }))
  
  exportToExcel(formattedData, filename)
}
