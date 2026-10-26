import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function sendOrderConfirmationEmail(
  email: string,
  customerName: string,
  orderId: string,
  totalAmount: number
) {
  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yemeni-ecommerce.com',
    subject: 'تأكيد الطلب - منصة التجارة اليمنية',
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">شكراً لتسوقك معنا!</h1>
        <p>مرحباً ${customerName}،</p>
        <p>تم استلام طلبك بنجاح. رقم الطلب: <strong>${orderId.slice(-6)}</strong></p>
        <p>المجموع الكلي: <strong>${totalAmount.toLocaleString()} ريال</strong></p>
        <p>سنبقيك على اطلاع بتحديثات حالة الطلب.</p>
        <p>مع تحيات،<br>فريق منصة التجارة اليمنية</p>
      </div>
    `,
  }

  try {
    await sgMail.send(msg)
    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}

export async function sendOrderStatusUpdateEmail(
  email: string,
  customerName: string,
  orderId: string,
  status: string
) {
  const statusLabels: Record<string, string> = {
    accepted: 'مقبول',
    preparing: 'قيد التحضير',
    out_for_delivery: 'في الطريق للتوصيل',
    delivered: 'تم التوصيل',
    cancelled: 'ملغي',
  }

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yemeni-ecommerce.com',
    subject: `تحديث حالة الطلب #${orderId.slice(-6)}`,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">تحديث حالة الطلب</h1>
        <p>مرحباً ${customerName}،</p>
        <p>تم تحديث حالة طلبك رقم <strong>${orderId.slice(-6)}</strong> إلى:</p>
        <p style="font-size: 18px; font-weight: bold; color: #2563eb;">${statusLabels[status] || status}</p>
        <p>شكراً لتسوقك معنا!</p>
        <p>مع تحيات،<br>فريق منصة التجارة اليمنية</p>
      </div>
    `,
  }

  try {
    await sgMail.send(msg)
    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}

export async function sendProductApprovedEmail(
  email: string,
  vendorName: string,
  productName: string
) {
  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yemeni-ecommerce.com',
    subject: 'تمت الموافقة على منتجك',
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">تهانينا!</h1>
        <p>مرحباً ${vendorName}،</p>
        <p>تمت الموافقة على منتجك <strong>${productName}</strong> وهو الآن متاح للعملاء.</p>
        <p>يمكنك مراجعة منتجاتك من لوحة التحكم.</p>
        <p>مع تحيات،<br>فريق منصة التجارة اليمنية</p>
      </div>
    `,
  }

  try {
    await sgMail.send(msg)
    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}

export async function sendProductRejectedEmail(
  email: string,
  vendorName: string,
  productName: string,
  reason: string
) {
  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yemeni-ecommerce.com',
    subject: 'تم رفض منتجك',
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #dc2626;">إشعار مهم</h1>
        <p>مرحباً ${vendorName}،</p>
        <p>تم رفض منتجك <strong>${productName}</strong> للسبب التالي:</p>
        <p style="background: #fef2f2; padding: 12px; border-radius: 8px; border: 1px solid #fecaca;">
          ${reason}
        </p>
        <p>يمكنك تعديل المنتج وإعادة إرساله للمراجعة.</p>
        <p>مع تحيات،<br>فريق منصة التجارة اليمنية</p>
      </div>
    `,
  }

  try {
    await sgMail.send(msg)
    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}
