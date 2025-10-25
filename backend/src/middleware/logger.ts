import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date().toISOString();
  console.log(`\n[${now}] ${req.method} ${req.url}`);

  // Log headers
  console.log('Headers:', req.headers);

  // Log query parameters
  if (Object.keys(req.query).length) {
    console.log('Query:', req.query);
  }

  // Log body (careful with large files)
  if (req.body && Object.keys(req.body).length) {
    console.log('Body:', req.body);
  }

  // Log uploaded files
  if (req.files) {
    const fileKeys = Object.keys(req.files);
    console.log('Uploaded files:', fileKeys);
    fileKeys.forEach((key) => {
      const file = (req.files as any)[key];
      console.log(` - ${key}: ${file.name} (${file.size} bytes)`);
    });
  }

  next();
};
