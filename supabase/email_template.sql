-- Set up custom email template for confirmation emails
INSERT INTO auth.email_templates (template_id, is_active, template)
VALUES (
  'confirmation',
  TRUE,
  '{
    "subject": "Welcome to Expense Tracker - Confirm Your Email",
    "content_html": "<div style=\"background-color: #f8fafc; padding: 40px 0; font-family: Arial, sans-serif;\">
      <div style=\"max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); padding: 32px;\">
        <div style=\"text-align: center; margin-bottom: 32px;\">
          <h1 style=\"color: #2563eb; margin: 0; font-size: 24px;\">Welcome to Expense Tracker!</h1>
        </div>
        
        <div style=\"color: #475569; font-size: 16px; line-height: 24px; margin-bottom: 32px;\">
          <p>Hello,</p>
          <p>Thank you for signing up for Expense Tracker! We''re excited to help you manage your finances better.</p>
          <p>Please confirm your email address by clicking the button below:</p>
        </div>

        <div style=\"text-align: center; margin-bottom: 32px;\">
          <a href=\"{{ .ConfirmationURL }}\" style=\"display: inline-block; background: linear-gradient(45deg, #2563eb, #7c3aed); color: white; padding: 12px 32px; text-decoration: none; border-radius: 8px; font-weight: 500; transition: all 0.2s ease;\">
            Confirm Email Address
          </a>
        </div>

        <div style=\"color: #64748b; font-size: 14px; line-height: 20px; margin-bottom: 24px;\">
          <p>Or copy and paste this URL into your browser:</p>
          <p style=\"word-break: break-all; color: #2563eb;\">{{ .ConfirmationURL }}</p>
        </div>

        <div style=\"color: #94a3b8; font-size: 14px; line-height: 20px; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 24px;\">
          <p>If you didn''t sign up for Expense Tracker, you can safely ignore this email.</p>
        </div>
      </div>
    </div>",
    "content_text": "Welcome to Expense Tracker!\n\nThank you for signing up! Please confirm your email address by clicking the link below:\n\n{{ .ConfirmationURL }}\n\nIf you didn''t sign up for Expense Tracker, you can safely ignore this email."
  }'
) ON CONFLICT (template_id) DO UPDATE
SET 
  is_active = EXCLUDED.is_active,
  template = EXCLUDED.template;
