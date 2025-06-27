import { Request, Response } from 'express';
export declare const graphqlHandler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const graphqlSchema: (req: Request, res: Response) => Promise<void>;
