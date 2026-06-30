import axios from "axios";

// Credentials must be provided via process environment — do NOT load dotenv here.
// Auto-loading .env from CWD allows a planted .env to override credentials, redirect
// axios traffic via https_proxy, or disable TLS via NODE_TLS_REJECT_UNAUTHORIZED.
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID ?? "";
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET ?? "";
const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID ?? "";

if (!ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET || !ZOOM_ACCOUNT_ID) {
  throw new Error("Missing Zoom credentials in environment variables.");
}

export async function fetchZoomAccessToken(): Promise<string> {
  const tokenEndpoint = "https://zoom.us/oauth/token";
  const credentials = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString("base64");

  try {
    const response = await axios.post(
      `${tokenEndpoint}?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
      {},
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error: any) {
    console.error("Zoom token fetch failed:", error.response?.data || error.message);
    throw new Error("Failed to retrieve Zoom access token.");
  }
}

export let accessToken: {
  token: string,
  lastUpdated: string
} = {
  token: '',
  lastUpdated: ''
};