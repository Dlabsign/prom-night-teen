import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Tambahkan ekstrasi adaCgDisana
        const { nama, email, cg, isYes, pindahKemana, adaCgDisana } = body;

        // 1. PENENTUAN TEMA WARNA (LOGIKA DINAMIS)
        // Jika Yes -> Oranye, Jika No -> Biru
        const themeColor = isYes ? "#FF6B1A" : "#3B82F6";
        const gradientHeader = isYes
            ? "linear-gradient(135deg, #FF6B1A, #FF3CAC)"
            : "linear-gradient(135deg, #00E5FF, #3B82F6)";
        const statusText = isYes ? `Halo, ${nama}!` : `Halo, ${nama}!`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // 2. TEMPLATE HTML DENGAN WARNA DINAMIS DAN DEKORASI
        const emailHtml = `
      <div style="font-family: 'Poppins', sans-serif; background-color: #0A0A0F; padding: 40px 20px; color: #ffffff;">
        
        <div style="position: relative; max-width: 500px; margin: auto; background: #141420; border: 1px solid ${themeColor}33; border-radius: 20px; overflow: hidden; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
         
          <div style="background: ${gradientHeader}; padding: 30px 20px; position: relative; z-index: 1;">
            <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 28px; color: white; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">${statusText}</h1>
          </div>

          <div style="padding: 30px; color: #e0e0e0; position: relative; z-index: 1;">
            <p style="font-size: 14px; margin-bottom: 24px;">Silahkan tunjukkan undangan berikut pada front-desk</p>
            
            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; margin: 24px 0; text-align: left; border-left: 4px solid ${themeColor};">
              <h2 style="margin: 5px 0; font-size: 16px; font-weight: 400;">Asal CG: <b style="font-weight: 600;">${cg}</b></h2>
              
              ${!isYes ? `<h2 style="margin: 8px 0 5px 0; font-size: 16px; font-weight: 400;">Pindah ke: <b style="font-weight: 600;">${pindahKemana}</b></h2>` : ""}
              ${!isYes ? `<h2 style="margin: 8px 0 5px 0; font-size: 16px; font-weight: 400;">Sudah ada CG?: <b style="font-weight: 600;">${adaCgDisana}</b></h2>` : ""}
            </div>

            <h2 style="color: ${themeColor}; font-weight: 600; font-size: 18px; margin-bottom: 5px;">Jumat, 22 Mei 2026 | 07:00 PM</h2>
            <h2 style="font-size: 14px; font-weight: 400; opacity: 0.8; margin-top: 0;">GMS Sidoarjo</h2>
          </div>

        </div>
      </div>
    `;

        const mailOptions = {
            from: `"Prom Night RSVP" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `RSVP Confirmation - ${nama}`,
            html: emailHtml,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "Email terkirim" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Gagal" }, { status: 500 });
    }
}