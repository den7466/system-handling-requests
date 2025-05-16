import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Handling requests system REST API',
    description: 'Handling requests system',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: '',
    },
  ],
  tags: [],
  components: {},
};

const outputFile = './swagger-output.json';
const routes = ['../routes/handling.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
