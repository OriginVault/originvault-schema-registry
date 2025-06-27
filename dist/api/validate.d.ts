import { Request, Response } from 'express';
export declare const validateData: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const validateAgainstSchema: (req: Request, res: Response) => Promise<void>;
