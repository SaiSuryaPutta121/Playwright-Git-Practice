const { test, expect } = require('@playwright/test');
require('dotenv').config();
const baseURL =
process.env.PETSTORE_URL || 'https://petstore.swagger.io/v2';
test.describe('Petstore API Tests @api', () => {

test('@api TC1  - Get  pets', async ({ request }) => {
const response = await request.get(
`${baseURL}/pet/findByStatus`,
{
params: { status: 'available' },
headers: { Accept: 'application/json' }
}
);
expect(response.status()).toBe(200);

const pets = await response.json();

expect(Array.isArray(pets)).toBeTruthy();
expect(pets.length).toBeGreaterThan(0);

for (const pet of pets) {
  expect(pet.status).toBe('available');
  expect(pet).toHaveProperty('id');
  expect(pet).toHaveProperty('name');
  expect(pet).toHaveProperty('photoUrls');
}
});


test('@api TC2 - Create and retrieve a pet', async ({ request }) => {
const petId = Date.now();
const petPayload = {
  id: petId,
  category: { id: 1, name: 'dogs' },
  name: 'Surya',
  photoUrls: ['https://example.com/buddy.jpg'],
  tags: [{ id: 1, name: 'cute' }],
  status: 'available'
};

const postResponse = await request.post(`${baseURL}/pet`, {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  data: petPayload
});

expect(postResponse.status()).toBe(200);

const createdPet = await postResponse.json();

expect(createdPet.id).toBe(petId);
expect(createdPet.name).toBe('Surya');
expect(createdPet.status).toBe('available');

const getResponse = await request.get(`${baseURL}/pet/${petId}`);

expect(getResponse.status()).toBe(200);

const retrievedPet = await getResponse.json();

expect(retrievedPet.id).toBe(petId);
expect(retrievedPet.name).toBe('Surya');
});


test('API_03 - Create and retrieve an order', async ({ request }) => {
const orderId = Date.now();
const petId = 123456;
const orderPayload = {
  id: orderId,
  petId,
  quantity: 1,
  shipDate: '2026-10-28T10:00:00.000Z',
  status: 'placed',
  complete: false
};

const postResponse = await request.post(`${baseURL}/store/order`, {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  data: orderPayload
});

expect(postResponse.status()).toBe(200);

const createdOrder = await postResponse.json();

expect(createdOrder.id).toBe(orderId);
expect(createdOrder.petId).toBe(petId);
expect(createdOrder.status).toBe('placed');
expect(createdOrder.quantity).toBeGreaterThan(0);

const getResponse = await request.get(
  `${baseURL}/store/order/${orderId}`
);

expect(getResponse.status()).toBe(200);

const retrievedOrder = await getResponse.json();

expect(retrievedOrder.id).toBe(orderId);
expect(retrievedOrder.petId).toBe(petId);
expect(retrievedOrder.status).toBe('placed');
});
});

