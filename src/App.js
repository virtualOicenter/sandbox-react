import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const modelRef = React.useRef();
  const [annots, setAnnots] = useState([]);

  const handleClick = (event) => {
    const { clientX, clientY } = event;

    if (modelRef.current) {
      let hit = modelRef.current.positionAndNormalFromPoint(clientX, clientY);
      if (hit) {
        setAnnots((annots) => {
          let toReturn = [...annots, hit];
          return toReturn;
        });
      }
    }
  };
  const handleButtonClick=(event)=>{
    console.log('send annots',annots);
    
    
  }
  const getDataPosition = (annot) => {
    return `${annot.position.x} ${annot.position.y} ${annot.position.z}`;
  };

  const getDataNormal = (annot) => {
    return `${annot.normal.x} ${annot.normal.y} ${annot.normal.z}`;
  };

  return (
    <div align="center">
      <div>
        <h1 >סמנו על גבי הממברנה נקודות לבחינה</h1>
        <input type="submit" padding-left="100px" onClick={handleButtonClick}></input>
      </div>
      <model-viewer
        // className="model-viewer"
        src="./cell_membrane.glb"
        alt="A rock"
        exposure="1"
        camera-controls
        ar
        // ar-modes="webxr"
        onClick={handleClick}
        ref={(ref) => {
          modelRef.current = ref;
        }}
      >
        {annots.map((annot, idx) => (
          <button
            key={`hotspot-${idx}`}
            className="view-button"
            slot={`hotspot-${idx}`}
            data-position={getDataPosition(annot)}
            data-normal={getDataNormal(annot)}
          >
          <div class="annotation">{idx}</div>
          </button>

        ))}
      </model-viewer>
    </div>
  );
}
