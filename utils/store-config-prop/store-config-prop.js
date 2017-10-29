const FS = require('fs');

/**
 * Store property key/value pair in the special ui5.config.json
 * @prop {string} propKey - Name of property
 * @prop {string} propValue - Value of property
 * @return {Promise} Promise 
 */
exports.storeConfigProp = (propKey, propValue) => {
    const CONFIG_FILE_PATH = './ui5.config.json';
    let propertyPair = {};
    let existPairs;

    propertyPair[propKey] = propValue;
    
    // if file does not exist, create it
    return new Promise((resolve) => {
        FS.access(CONFIG_FILE_PATH, (error) => {
            if (error) {
                FS.writeFileSync(
                    CONFIG_FILE_PATH, 
                    JSON.stringify(propertyPair)
                );
            } else {
                existPairs = FS.readFileSync(CONFIG_FILE_PATH);
                existPairs[propKey] = propertyPair;
    
                FS.writeFileSync(CONFIG_FILE_PATH, existPairs);
            }
            resolve();
        });
    });
};