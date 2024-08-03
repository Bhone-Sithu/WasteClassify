import {useState, useEffect, useRef} from 'react';
import * as tf from '@tensorflow/tfjs';

const ImageClassifier = () => {
    const [model, setModel] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    const fileInputRef = useRef(null); // Reference for the file input

    useEffect(() => {
        // Load the TensorFlow.js model
        const loadModel = async () => {
            try {
                const model = await tf.loadLayersModel('../tfjs_model/model.json'); // Adjust path to your model
                setModel(model);
            } catch (error) {
                console.error('Error loading the model:', error);
            }
        };

        loadModel();
    }, []);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        if (file && model) {

            img.onload = async () => {
                // Preprocess the image
                const tensor = tf.browser.fromPixels(img)
                    .resizeNearestNeighbor([224, 224]) // Resize to (224, 224)
                    .toFloat() // Convert to float32
                    .div(tf.scalar(255)) // Normalize pixel values to [0, 1]
                    .expandDims(); // Add batch dimension

                // Make prediction
                const prediction = model.predict(tensor);
                const classNames = ['Organic', 'Recycle'];

                // Get the predicted class
                const predictionArray = await prediction.array();
                const predictedClass = classNames[predictionArray[0].indexOf(Math.max(...predictionArray[0]))];

                setPrediction(predictedClass);
            };

            // Display the image
        }

        setImageSrc(img.src);
    };
    const handleCustomUpload = () => {
        // Trigger click on hidden file input
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div>
            <button onClick={handleCustomUpload} style={{
                height:"60px",
                padding: '10px 20px',
                backgroundColor: 'rgb(0,140,255)',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}>
                Upload Waste Image
            </button>
            {/* Hidden file input */}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{display: 'none'}}
                ref={fileInputRef}
            />
            <br/> <br/>
            {imageSrc && <img src={imageSrc} alt="Uploaded" style={{width: '300px', height: "200px", borderRadius: '5px', border:"2px solid lightblue"}} />}
            {prediction && <p style={{fontSize:"27px"}}>Predicted: {prediction === "Recycle" ? <span style={{color: "cyan"}}>Recycle</span> :

                <span style={{color: "green"}}>Organic</span>}</p>}
        </div>
    );
};

export default ImageClassifier;