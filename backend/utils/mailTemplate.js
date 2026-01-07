const mailTemplate = (name,email)=>
{
    return` <div style="max-width: 600px; margin: auto; padding: 20px; 
        font-family: Arial, sans-serif; text-align: center; 
        border: 2px solid #007BFF; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #007BFF;">Welcome to WhatsApp!</h2>
        <p style="color: #333; font-size: 16px;">
            Hi, <b>${name}</b>!  Your account has been created successfully with the email address <b>${email}</b>.  
            We are excited to have you on board. Click the button below to get started.
        </p>
        <a href="https://bytestack.com/login" 
            style="display: inline-block; padding: 12px 24px; font-size: 16px; 
                    color: #ffffff; background-color: #007BFF; text-decoration: none; 
                    border-radius: 5px; font-weight: bold; margin-top: 15px;">
            Get Started
        </a>
        <p style="color: #666; font-size: 14px; margin-top: 20px;">
            If you did not sign up for WhatsApp , please ignore this email.
        </p>
    </div>`
}

export default mailTemplate;