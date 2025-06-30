import { Request, Response } from 'express';
export declare const registerTrustEntity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getTrustEntity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createEndorsement: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getTrustChain: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const verifyTrust: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const revokeTrust: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const searchTrust: (req: Request, res: Response) => Promise<void>;
