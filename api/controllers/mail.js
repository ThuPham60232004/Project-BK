import { sendMail } from '../helpers/sendMail.js';

export const sendMailController = async (req, res) => {
  const data = req.body;
  try {
    await sendMail({ template: 'template', templateVars: { ...data }, ...data });
    res.send('Send mail successfully!');
  } catch (error) {
    res.status(500).send('Send mail fail!');
  }
};
