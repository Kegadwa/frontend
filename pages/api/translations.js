import { db } from '../../utils/firebase';

export default async function handler(req, res) {
  const translationsRef = db.collection('translations');

  switch (req.method) {
    case 'GET':
      try {
        const snapshot = await translationsRef.get();
        const translations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(translations);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch translations' });
      }
      break;

    case 'POST':
      try {
        const translation = req.body;
        const docRef = await translationsRef.add(translation);
        res.status(201).json({ id: docRef.id, ...translation });
      } catch (error) {
        res.status(400).json({ error: 'Failed to add translation' });
      }
      break;

    case 'PUT':
      try {
        const { id } = req.query;
        const translation = req.body;
        await translationsRef.doc(id).set(translation, { merge: true });
        res.status(200).json({ id, ...translation });
      } catch (error) {
        res.status(400).json({ error: 'Failed to update translation' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        await translationsRef.doc(id).delete();
        res.status(204).end();
      } catch (error) {
        res.status(400).json({ error: 'Failed to delete translation' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}