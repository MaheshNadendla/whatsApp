const verifyOtpTemp = (name, email, otp) => {
    return `
    <div style="max-width: 600px; margin: auto; padding: 30px; 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        text-align: center; border: 2px solid #25D366; border-radius: 12px; 
        background-color: #ffffff; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">

        <h2 style="color: #25D366; margin-bottom: 10px;">Welcome to WhatsApp!</h2>
        <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
            Hi <strong>${name}</strong>, your registered email is <strong>${email}</strong>.
        </p>

        <p style="color: #555; font-size: 15px;">
            Please use the following One-Time Password (OTP) to verify your account.
            Do not share this code with anyone.
        </p>

        <div style="margin-top: 20px; margin-bottom: 20px;">
            <span style="display: inline-block; padding: 14px 30px; font-size: 18px; 
                background-color: #25D366; color: #fff; border-radius: 8px; 
                font-weight: bold; letter-spacing: 2px;">
                ${otp}
            </span>
        </div>

        <p style="color: #888; font-size: 14px;">
            If you did not request this verification, please ignore this email.
        </p>
    </div>
    `;
};

export default verifyOtpTemp;
