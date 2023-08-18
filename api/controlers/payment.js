import axios from "axios";
import { Buffer } from "buffer";
export const getmpesaToken = async (req, resp, next) => {
  console.log("hello");
  const consumerKey = process.env.CONSUMER_KEY;
  const secretKey = process.env.SECRET_KEY;

  const auth = new Buffer.from(`${consumerKey}:${secretKey}`).toString(
    "base64"
  );

  try {
    const data = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    resp.status(200).json(data.data);
  } catch (error) {
    next(error);
  }
};
