/**
 * Generic Repository functions that can be shared among all
 * entities.
 * For more information: https://typeorm.io/#/repository-api
 */
const { getRepository } = require("typeorm");

/**
 * Finds all database records of the given entity that match the given criteria
 * @param {object} criteria Criteria to find the results. Must be in json format.
 * @param {object} entity Definition of a class that is associated to a Schema.
 * @return {object[]} array of objects found.
 */
module.exports.findAll = async (criteria, entity) => {
    const found = await getRepository(entity).find(criteria);
    return found;
};

/**
 * Finds one database record matching the given criteria.
 * @param {object} criteria Criteria to find the result. Must be in json format.
 * @param {object} entity Definition of a class that is associated to a Schema.
 * @return {object} object found.
 */
module.exports.findOne = async (criteria, entity) => {
    const found = await getRepository(entity).findOne(criteria);
    return found;
};

/**
 * Finds one database record matching the given criteria.
 * @param {object} object Object to insert into the database.
 * @param {object} entity Definition of a class that is associated to a Schema.
 * @return {object} saved object.
 */
module.exports.create = async (object, entity) => {
    const saved = await getRepository(entity).save(object);
    return saved;
};

/**
 * Updates one or more database record matching the given criteria with the given information.
 * @param {object} criteria Criteria to find the updated object(s). Must be in json format.
 * @param {object} updateInfo Object containing the new information.
 * @param {object} entity Definition of a class that is associated to a Schema.
 * @return {object} Object of type UpdateResults. More info ->  https://typeorm.delightful.studio/classes/_query_builder_result_updateresult_.updateresult.html
 */
module.exports.update = async (criteria, updatedInfo, entity) => {
    const updated = await getRepository(entity).update(criteria, updatedInfo);
    return updated;
};

/**
 * Deletes all database records matching the given criteria for the given entity;
 * @param {object} criteria Criteria to find the result(s). Must be in json format.
 * @param {object} entity Definition of a class that is associated to a Schema.
 */
module.exports.delete = async (criteria, entity) => {
    const deleted = await getRepository(entity).delete(criteria);
    return deleted;
};
