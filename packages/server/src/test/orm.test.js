/* eslint-disable no-undef */
const { expect } = require('chai');
const faker = require('faker');
const { createConnection, getConnectionOptions, Connection } = require("typeorm");
const { SnakeNamingStrategy } = require("typeorm-naming-strategies");
const Entity = require('../entities/EntityRepository');


before(async () => {
    const opts = await getConnectionOptions();
    await createConnection({ ...opts, namingStrategy: new SnakeNamingStrategy() });
})

const userTest = {
    email: faker.internet.email('c'),
    password: faker.internet.password(6,1,'c'),
    name: faker.name.findName('Camilo'),
    qboId: faker.random.number(100),
    role: 'Employee'
};
describe('Test for the module orm', () => {
    it('Test for the function create', async () => {
        const result = await Entity.create(userTest, 'Employee');
        expect(result).to.be.an('Object');
        expect(result.email).to.be.a('String');
        expect(result.password).to.be.a('String');
        expect(result.name).to.be.a('String');
        expect(result.qboId).to.be.a('Number');
    });
    it('Test for the function findAll', async () => {
        const result = await Entity.findAll({},'Employee');
        expect(result).to.be.an('Array');
    });
    it('Test for the function findOne', async () => {
        const { email } = userTest;
        const result = await Entity.findOne({ email }, 'Employee');
        expect(result).to.be.an('Object');
        expect(result.email).to.be.a('String');
        expect(result.password).to.be.a('String');
        expect(result.name).to.be.a('String');
        expect(result.qboId).to.be.a('Number');
    })
});
