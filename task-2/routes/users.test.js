import supertest from 'supertest';
import app from '../app.js';
import { expect, test} from '@jest/globals';


//check get request for all users
test('responds to get request for all users', async() => {

    //check the structure of the response.body
    const response = await supertest(app).get("/users");
     expect(response.status).toBe(200);
     expect(response.body).toStrictEqual({
      success: true,
      payload: expect.any(Array),
     });
    
     //check the structure of payload
     for(let i = 0; i<response.body.payload.length; i++) {
        const userObj = response.body.payload[i];
    
        expect(userObj).toStrictEqual({
          id: expect.any(Number),
          username: expect.any(String)
        
        })
       }
})

// check get request  for users by username

test('get request for a user by username', async() => {
    const response = await supertest(app).get('/users?username=jeremy')
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy;
    expect(response.body.payload[0].username).toMatch('Jeremy');
    expect(typeof response.body.payload[0].id).toBe('number');
})

test('get request for a user using a non-existing username', async() => {
    const response = await supertest(app).get('/users?username=jackma')
    expect(response.status).toBe(200);
    expect(response.body.success).toBeFalsy;
    // expect(response.body.payload[0].username).toMatch('Jeremy');
    expect(typeof response.body.payload).toBeUndefined;
})

// check get request for a user by id
test('get request for a user by id', async() => {
    const response = await supertest(app).get('/users/125')
    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy;
    expect(response.body.payload.id).toBe(125);
})

test('get request for a user using an invalid id', async() => {
    const response = await supertest(app).get('/users/525')
    expect(response.status).toBe(404);
    expect(response.body.success).toBeFalsy;
    expect(response.body.reason).toMatch("No user with that ID 525 was found!");
    }) 

