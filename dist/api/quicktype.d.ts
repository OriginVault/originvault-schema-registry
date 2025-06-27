import { Request, Response } from 'express';
export declare const generateFromFiles: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const downloadZip: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const validateSchema: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
