import nodemailer from 'nodemailer';
import fs from 'fs';
import ejs from 'ejs';
import { convert } from 'html-to-text';
import juice from 'juice';

const smtp = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendMail = ({ template: templateName, templateVars, ...restOfOptions }) => {
  const templatePath = `api/templates/${templateName}.html`;
  const options = {
    from: process.env.EMAIL,
    ...restOfOptions,
  };

  if (templateName && fs.existsSync(templatePath)) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const html = ejs.render(template, templateVars);
    const htmlWithStylesInlined = juice(html);
    options.html = htmlWithStylesInlined;
  }

  return smtp.sendMail(options);
};
