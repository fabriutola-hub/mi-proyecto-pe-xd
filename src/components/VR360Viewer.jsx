// src/components/VR360Viewer.jsx

import React from 'react';
import 'aframe'; 
import { Scene } from 'aframe-react';

function VR360Viewer({ src, caption, embedded = true }) {
  if (!src) {
    return null; 
  }

  const textProps = `value: ${caption || ''}; align: center; color: #FFFFFF; width: 3;`;

  return (
    <Scene embedded={embedded}>
      
      <a-sky src={src}></a-sky>

      {caption && (
        <a-entity
          text={textProps}
          position="0 -0.5 -1.5"
        ></a-entity>
      )}
    </Scene>
  );
}

export default VR360Viewer;