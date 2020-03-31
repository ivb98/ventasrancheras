const QBO = require("../OAuth2/Auth/QBOAuth");
const QBOUtils = require("../ErpUtils");

/**
 * A separate function had to be created to achieve this because node-quickbooks
 * upload function does not support adding a note when uploading a file.
 * @param {Attachable} data Attachable received from Quickbooks.
 * @param {string} note note that will be added.
 */
const addNote = async (data, note) => {
    const updated = { ...data, Note: note };
    const qbo = await QBO.getQbo();
    return new Promise((resolve, reject) => {
        qbo.updateAttachable(updated, (err, updatedAtt) => {
            if (err) {
                reject(QBOUtils.parseError(err));
            } else {
                resolve(updatedAtt);
            }
        });
    });
};

/**
 * Uploads a signature as an Attachable to Quickbooks. This is used
 * to store the signature of clients and deliveries.
 * @param {Readstream} signatureStream Stream of the image.
 * @param {Object} opts
 * @param {string} note A note that will be added to the object attachable to document what it is.
 * @param {string} imgName Name given to the image on Quickbooks.
 * @param {string} [imgType=image/jpg] MIMEtype of the image.
 * @param {string} type Resource type that will have the signature attached to it.
 * @param {string} id Id of the resource.
 */
module.exports.uploadSignature = async (
    signatureStream,
    { note, imgName, imgType = "image/jpg", type, id }
) => {
    const qbo = await QBO.getQbo();
    return new Promise((resolve, reject) => {
        qbo.upload(imgName, imgType, signatureStream, type, id, (err, resp) => {
            if (err) {
                reject(QBOUtils.parseError(err));
            } else {
                addNote(resp, note)
                    .then(updated => resolve(updated))
                    .catch(updateErr => reject(updateErr));
            }
        });
    });
};
