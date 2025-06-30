import { Request, Response } from 'express';
export declare const createManifest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addProvenance: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getProvenance: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const verifyManifest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getProvenanceChain: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createDerivative: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
