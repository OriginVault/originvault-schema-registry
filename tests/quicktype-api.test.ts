import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server';

const api = request(app);

describe('QuickType API', () => {
  it('GET /api/quicktype/languages returns supported languages', async () => {
    const res = await api.get('/api/quicktype/languages');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('languages');
    expect(Array.isArray(res.body.languages)).toBe(true);
    expect(res.body.languages.length).toBeGreaterThan(0);
  });

  it('POST /api/quicktype/generate-from-registry with valid schemaId returns code', async () => {
    const res = await api.post('/api/quicktype/generate-from-registry')
      .send({
        schemaId: 'OriginVaultRootAuthority',
        targetLanguage: 'typescript',
        options: {
          justTypes: true,
          acronymStyle: 'original',
          packageName: '',
          namespace: ''
        }
      });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toHaveProperty('language', 'typescript');
    expect(res.body.result).toHaveProperty('code');
    expect(typeof res.body.result.code).toBe('string');
    expect(res.body.result.code.length).toBeGreaterThan(0);
  });

  it('POST /api/quicktype/generate-from-registry with PersonCredential (with $ref) returns code', async () => {
    const res = await api.post('/api/quicktype/generate-from-registry')
      .send({
        schemaId: 'PersonCredential',
        targetLanguage: 'typescript',
        options: {
          justTypes: true,
          acronymStyle: 'original',
          packageName: '',
          namespace: ''
        }
      });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toHaveProperty('language', 'typescript');
    expect(res.body.result).toHaveProperty('code');
    expect(typeof res.body.result.code).toBe('string');
    expect(res.body.result.code.length).toBeGreaterThan(0);
    
    // Verify that the generated code contains expected types from the referenced schema
    const code = res.body.result.code;
    expect(code).toContain('interface PersonCredential');
    // Should contain types from the referenced BasicPerson schema
    expect(code).toMatch(/givenName|familyName|email|birthDate/);
  });

  it('POST /api/quicktype/generate-from-registry with invalid schemaId returns error', async () => {
    const res = await api.post('/api/quicktype/generate-from-registry')
      .send({
        schemaId: 'NonExistentSchema',
        targetLanguage: 'typescript',
        options: {
          justTypes: true,
          acronymStyle: 'original',
          packageName: '',
          namespace: ''
        }
      });
    
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Schema not found in registry');
  });

  it('POST /api/quicktype/generate-from-registry with OrganizationCredential returns code', async () => {
    const res = await api.post('/api/quicktype/generate-from-registry')
      .send({
        schemaId: 'OrganizationCredential',
        targetLanguage: 'typescript',
        options: {
          justTypes: true,
          acronymStyle: 'original',
          packageName: '',
          namespace: ''
        }
      });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('result');
    expect(res.body.result).toHaveProperty('language', 'typescript');
    expect(res.body.result).toHaveProperty('code');
    expect(typeof res.body.result.code).toBe('string');
    expect(res.body.result.code.length).toBeGreaterThan(0);
    
    // Verify that the generated code contains expected organization types
    const code = res.body.result.code;
    expect(code).toContain('interface OrganizationCredential');
  });
}); 