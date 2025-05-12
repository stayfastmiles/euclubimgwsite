import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, photo, vote } = req.body;

  if (!name || !photo || !vote) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const sheetId = process.env.SPREADSHEET_ID;

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, photo, vote, new Date().toISOString()]],
      },
    });

    res.status(200).json({ message: 'Vote recorded' });
  } catch (err) {
    console.error('Error writing to sheet:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
