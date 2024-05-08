// pages/api/proxy.js
export default async function handler(req, res) {
    const response = await fetch('https://www.princexml.com/samples/invoice/invoicesample.pdf');
    const data = await response.blob();
    res.setHeader('Content-Type', 'application/pdf');
    data.stream().pipe(res);
  }