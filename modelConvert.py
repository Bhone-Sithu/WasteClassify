import tensorflowjs as tfjs
from tensorflow.keras.models import load_model

# Load your Keras model
model = load_model('/Users/bhonesithu/Developer/waste_classify/waste_classifier_model.keras')

# Convert the Keras model to TensorFlow.js format
tfjs.converters.save_keras_model(model, './tfjs_model')

import json

# Load the model.json file
with open('./tfjs_model/model.json', 'r') as f:
    model_json = json.load(f)

# Recursively update 'batch_shape' to 'batchInputShape'
def update_batch_shape_to_batch_input_shape(obj):
    if isinstance(obj, dict):
        for key in list(obj.keys()):
            if key == 'batch_shape':
                obj['batchInputShape'] = obj.pop('batch_shape')
            else:
                update_batch_shape_to_batch_input_shape(obj[key])
    elif isinstance(obj, list):
        for item in obj:
            update_batch_shape_to_batch_input_shape(item)

update_batch_shape_to_batch_input_shape(model_json)

# Save the modified model.json file
with open('./tfjs_model/model.json', 'w') as f:
    json.dump(model_json, f, indent=2)
