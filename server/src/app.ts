import express, { Express } from 'express';
import config from 'config';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import routes from './routes/index.js'
dotenv.config()

class Server {
  private port: number;
  private app: Express;

  constructor(port: number) {
    this.port = port;
    this.app = express();
  }

  private initializeMiddleware(): void {
   this.app.use(express.json());
   this.app.use(express.urlencoded({ extended: false }));
  }

  private initializeRoutes(): void {
    this.app.use('/api/v1',routes);
  }

 public async start(): Promise<void> {
   
   try {
   await mongoose.connect(process.env.MONGO_URI as string)
   this.initializeMiddleware();
   this.initializeRoutes();
  
   this.app.listen(this.port, (): void => {
      console.log(`Server is running on port ${this.port}`);
    });
     
   } catch (error) {
   console.error(error);
   process.exit(1);
   }
  }
}

const PORT: number = config.get('port') ?? 8080;
const server: Server = new Server(PORT);
server.start();
