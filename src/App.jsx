import OrganicLogo from './assets/Organic.svg'
import RecycleLogo from './assets/Recycle.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WasteClassification from "./WasteClassifier.jsx";

function App() {


  return (
      <>
          <div>
              <a>
                  <img src={RecycleLogo} className="logo" alt="Vite logo"/>
              </a>
              <a  >
                  <img src={OrganicLogo} className="logo react" alt="React logo"/>
              </a>
          </div>
          <h1>Waste Classify</h1>

          <WasteClassification/>

          <p className="read-the-docs">
              Upload only photos of waste to see if it is Organic or Recycle. <br/> <br/> This AI model is trained only by waste images. Therefore, uploading photos other than wastes will not give correct predictions.
          </p>
          </>
  )
}

export default App
