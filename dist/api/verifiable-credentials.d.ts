import express from 'express';
import { Request, Response } from 'express';
export declare const getVCSchemas: (req: Request, res: Response) => void;
export declare const getVCSchema: (req: Request, res: Response) => express.Response<any, Record<string, any>> | undefined;
export declare const validateVC: (req: Request, res: Response) => express.Response<any, Record<string, any>> | undefined;
export declare const createVCTemplate: (req: Request, res: Response) => void;
export declare const verifyPresentation: (req: Request, res: Response) => express.Response<any, Record<string, any>> | undefined;
export declare const getContexts: (req: Request, res: Response) => void;
