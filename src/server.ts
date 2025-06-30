import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import quicktypeRouter from './routes/quicktype.js';
import vcRouter from './routes/verifiable-credentials.js';
import c2paRouter from './routes/c2pa.js';
import trustRegistryRouter from './routes/trust-registry.js';
import { graphqlHandler, graphqlSchema } from './api/graphql.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' })); // Allow larger payloads for file uploads
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/quicktype', quicktypeRouter);
app.use('/api/vc', vcRouter);
app.use('/api/c2pa', c2paRouter);
app.use('/api/trust', trustRegistryRouter);

// GraphQL endpoint
app.post('/api/graphql', graphqlHandler);
app.get('/api/graphql/schema', graphqlSchema);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Only start the server if this file is run directly (not imported)
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {

  });
}

export default app; 