/* eslint-disable no-undef */
const { expect } = require('chai');
const faker = require('faker');
const { createConnection, getConnectionOptions} = require("typeorm");
const { SnakeNamingStrategy } = require("typeorm-naming-strategies");
const Entity = require('../src/entities/EntityRepository');


before(async () => {
    const opts = await getConnectionOptions();
    await createConnection({ ...opts, namingStrategy: new SnakeNamingStrategy() });
})

describe('Test for the module orm', () => {
    const userTest = {
        email: faker.internet.email('c'),
        password: faker.internet.password(6,1,'c'),
        name: faker.name.findName('Camilo'),
        qboId: faker.random.number(100),
        role: 'Employee'
    };
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
        const result = await Entity.findOne({ email },'Employee');
        expect(result).to.be.an('Object');
        expect(result.email).to.be.a('String');
        expect(result.password).to.be.a('String');
        expect(result.name).to.be.a('String');
        expect(result.qboId).to.be.a('Number');
    });
    it('Test for the function update', async () => {
        const emailUpdate = { email: faker.internet.email('Ivan')};
        const { email }  = userTest;
        const result = await Entity.update({ email }, emailUpdate, 'Employee');
        expect(result).to.be.an('Object');
    });

    it('Test for the function delete', async () => {
        const { name }  = userTest;
        const result = await Entity.delete({ name }, 'Employee');
        expect(result).to.be.an('Object');
    });
});

