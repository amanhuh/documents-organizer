import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from "@/auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res, { params }) {
  if (req.method === 'POST') {
    const session = await auth(req, res);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const form = new formidable.IncomingForm();

    form.options.fileWriteStreamHandler = () => {
      const chunks = [];
      return {
        write: (chunk) => chunks.push(chunk),
        end: () => Buffer.concat(chunks),
        destroy: () => {},
      };
    };

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing form' });
      }

      try {

        const file = files.file;
        const fileBuffer = file ? file._writeStream : null;

        if (fileBuffer) {
          
        }

        return res.status(200).json({ message: 'Files uploaded successfully' });
      } catch (error) {
        return res.status(500).json({ error: 'Error uploading files' });
      }
    });
  } else {
    return res.status(405).end();
  }
}