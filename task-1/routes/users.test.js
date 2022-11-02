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

//describe ('user request', () => {
  test('responds to get request with users object', async() => {

  const response = await supertest(app).get("/users");
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
   // test route for "GET /users/4" request

   test('responds to get request with users object', async() => {
   
    const response = await supertest(app).get("/users/4");
    const userObj = response.body.payload
     expect(response.status).toBe(200);

     expect(userObj).toStrictEqual({
      id: expect.any(Number),
      username: expect.any(String)
    
    });

  });

// Send a request to the server
//    URL must be correct
//    Include any data in the request (if necessary)
// Check response status code
//    Is the status code as expected?
// Check response body
//    Does it contain the expected data?
// Check the outer most level of the response object
//    If there's an array, visit each it