const request = require('supertest');
const app = require('../src/app');

describe('GET /tasks', () => {

    test('should respond with a 200 status code', async() => {
        const response = await request(app).get('/tasks').send()
        expect(response.statusCode).toBe(200);
    });

    test('should respond with an array', async() => {
        const response = await request(app).get('/tasks').send();
        // expect(response.body).toEqual(expect.arrayContaining([])); 
        expect(response.body).toBeInstanceOf(Array);
    });
});

describe('POST /tasks', () => {

    describe('given a title and description', () => {

        const newTask = {
            title: 'test title',
            description: 'test description'
        }

        test('should respond with a 200 status code', async() => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.statusCode).toBe(200);
        });

        test('should have a content-type: application/json in header', async() => {
            const response = await request(app).post('/tasks').send(newTask);
            // expect(response.header['content-type']).toBe('application/json');
            expect(response.header['content-type']).toEqual(expect.stringContaining('json'));
        });

        test('should respond with an task ID', async() => {
            const response = await request(app).post('/tasks').send(newTask);
            expect(response.body.id).toBeDefined();
        });

    });

    describe('when a title and description are missing', () => {
        test('should respond with a 400 status code', async() => {
            const fields = [
                {},
                { title: 'Test task' },
                { description: 'Test task' },
            ];

            for (const body of fields) {
                const response = await request(app).post('/tasks').send(body);
                expect(response.statusCode).toBe(400);
            }
        });
    });
});