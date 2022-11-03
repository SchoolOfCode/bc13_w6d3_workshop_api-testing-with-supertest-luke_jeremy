// Write your tests for task 2 in this file. Plan out what you need to import/require.
// import supertest into our test file
import supertest from 'supertest';
import app from '../app.js';
// import users from '../models/users.js'
// import the Express app
// import what we need from jest (expect, test)
import { expect, test} from '@jest/globals'
// Run the server (taken care of for us by Supertest)
// Write a test

//3. Write an asynchronous test (in `routes/users.test.js`) which Sends a `GET /users` request 
test('responds to get request with users object', async() => {
  
   //.set('Accept', 'application/json')
   // expect(response.headers["Content-Type"]).toMatch(/json/);
   expect(response.status).toBe(200);
   expect(response.body).toStrictEqual({
    success: true,
    payload: expect.any(Array),
   });
   
   
   for(let i = 0; i<response.body.payload.length; i++) {
    const userObj = response.body.payload[i];

    expect(userObj).toStrictEqual({
      id: expect.any(Number),
      username: expect.any(String)
    
    })
   }
})

// 4. Write an asynchronous test (in `routes/users.test.js`) Sends a `GET /users/4` request  :

test('responds to specific get with specific user', async() => {
   
    const response = await supertest(app).get("/users/4");
    const userObj = response.body.payload
     expect(response.status).toBe(200);

     expect(userObj).toStrictEqual({
      id: 4,
      username: expect.any(String)
     });
});

//5. Write an asynchronous test (in `routes/users.test.js`) which Sends a `GET /users/99` request 

test('respondes to a non-existing user', async () => {
  const response = await supertest(app).get('/users/99');
  const userObj = response.body;
  expect(response.status).toBe(404);
  expect(userObj).toStrictEqual({
    success: false,
    reason: "No user with ID 99 was found." 
  })
})