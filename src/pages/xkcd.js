
export default async function handler(req, res) {
  try {
    const comicNumber = Math.floor(Math.random() * 3000) + 1;
    const response = await fetch(`https://xkcd.com/${comicNumber}/info.0.json`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch XKCD comic' });
  }
}
