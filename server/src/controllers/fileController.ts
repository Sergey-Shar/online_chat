import { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';

class FileController {
  private upload: multer.Multer;

  constructor() {
    this.upload = multer({
      dest: 'uploads/', // Папка, куда будут сохраняться загруженные файлы
      limits: {
        fileSize: 5 * 1024 * 1024, // Ограничение размера файла (5MB в данном примере)
      },
      fileFilter: this.fileFilter, // Функция фильтрации файлов
    });
  }

  private fileFilter(
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ): void {
    // Пример простой функции фильтрации файлов
    if (file.mimetype.startsWith('image/')) {
      callback(null, true);
    } else {
      callback(new Error('Only image files are allowed'));
    }
  }

  public uploadFile(req: Request, res: Response): void {
    try {
      this.upload.single('file')(req, res, (error: any) => {
        if (error) {
          console.error('File upload error:', error);
          res.status(400).json({ error: error.message });
        } else {
          const file = req.file;
          // Здесь можно обработать загруженный файл (например, сохранить его путь или выполнить другую логику)
          res.status(200).json({ message: 'File uploaded successfully' });
        }
      });
    } catch (error) {
      console.error('File upload error:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  }
}

export default new FileController();
