const fs = require('fs');

const main = () => {
    const modelJson = JSON.parse(fs.readFileSync('path/to/model.json', 'utf8'));

// Recursively update 'batch_shape' to 'batchInputShape'
    function updateBatchShapeToBatchInputShape(obj) {
        if (typeof obj === 'object') {
            for (const key in obj) {
                if (key === 'batch_shape') {
                    obj['batchInputShape'] = obj['batch_shape'];
                    delete obj['batch_shape'];
                } else {
                    updateBatchShapeToBatchInputShape(obj[key]);
                }
            }
        } else if (Array.isArray(obj)) {
            obj.forEach(updateBatchShapeToBatchInputShape);
        }
    }

    updateBatchShapeToBatchInputShape(modelJson);

// Save the modified model.json file
    fs.writeFileSync('path/to/model_modified.json', JSON.stringify(modelJson, null, 2));
}
export default main();