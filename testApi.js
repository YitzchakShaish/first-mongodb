import { test } from 'node:test';
import assert from 'node:assert/strict';
import { signup } from './api.js';

test('added user, res.message', async () => {
  const result = await signup('moshe', '123456', 'user');


  assert.strictEqual(result.message, "new user added successfully");


});