import request from 'supertest';
import { app } from '../app';

describe('Test TimerController', () => {
  it('Request /timer should return sucess!', async () => {
    const result = await request(app).post('/timer').send({
      durationTime: 1,
      endTime: 1599706874600,
      startTime: 1599706873556
    });

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('success');
  });
});