// post-deploy-check.js
// Verifies that the API endpoint is up after deploy
import fetch from 'node-fetch';

const API_URL = process.env.API_URL ||('https://twoja-aplikacja.onrender.com/api/users');
const MAX_RETRIES = 5;
const RETRY_DELAY = 10_000; // 10s

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  console.log(`\n\u271cChecking API availability:\u271d
    ${API_URL}`);
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        console.log(`%wapi is UP on attempt ${attempt}`);
        process.exit(0);
      }
      console.warn(`%wAttempt ${attempt}: Status ${res.status} ');
    } catch (err) {
      console.warn(`%wAttempt ${attempt}: ${err.message} ');
    }
    if (attempt < MAX_RETRIES) {
      console.log(`\n\u273cWaiting ${RETRY_DELAY / 1000}s before retry...\u271d);
      await sleep(RETRY_DELAY);
    }
  }
  console.error('\n\u271cAPI did not respond successfully after all retries.\u271d');
  process.exit(1);
})();