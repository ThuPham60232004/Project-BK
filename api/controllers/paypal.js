import paypal from '@paypal/checkout-server-sdk';

// Thiết lập môi trường PayPal
const environment = new paypal.core.SandboxEnvironment(
  'ASyHmprhh4dMBAMcbNFAA8rm8eRQ7Z_aCYQU6Q7GvyC9N9dKeTP1C136cNS8YZ0ceRc6AL1POd7pI9oY',    // Thay thế bằng Client ID từ PayPal Sandbox
  'EGXDY7q6utyGNpdgouPDdZi5lSeIhjLSnYVZWscqMHwDHvaUeXjg33uNMDl-E8lHnP5QuTqd4VCzFZxJ' // Thay thế bằng Client Secret từ PayPal Sandbox
);

const client = new paypal.core.PayPalHttpClient(environment);

const createOrder = async (amount) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.headers['prefer'] = 'return=representation';
  request.body = {
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: amount
      }
    }]
  };
  try {
    const order = await client.execute(request);
    return order.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const captureOrder = async (orderId) => {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.headers['prefer'] = 'return=representation';
  try {
    const capture = await client.execute(request);
    return capture.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { createOrder, captureOrder };
