// Transbank Webpay Plus Configuration
export const TRANSBANK_CONFIG = {
  // Use integration environment for testing, production for live
  environment: process.env.TRANSBANK_ENVIRONMENT || "integration",
  commerceCode: process.env.TRANSBANK_COMMERCE_CODE || "597055555532",
  apiKey: process.env.TRANSBANK_API_KEY || "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C",
  integrationUrl: "https://webpay3gint.transbank.cl",
  productionUrl: "https://webpay3g.transbank.cl",
}

export function getTransbankUrl() {
  return TRANSBANK_CONFIG.environment === "production"
    ? TRANSBANK_CONFIG.productionUrl
    : TRANSBANK_CONFIG.integrationUrl
}

export function getTransbankHeaders() {
  return {
    "Tbk-Api-Key-Id": TRANSBANK_CONFIG.commerceCode,
    "Tbk-Api-Key-Secret": TRANSBANK_CONFIG.apiKey,
    "Content-Type": "application/json",
  }
}
