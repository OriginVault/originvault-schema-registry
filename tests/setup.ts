// Vitest setup file for OriginVault Schema Registry tests

// Set test timeout
vi.setConfig({ testTimeout: 10000 });

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}; 