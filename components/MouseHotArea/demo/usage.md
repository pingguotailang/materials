---
title: Simple Usage
order: 1
---

本 Demo 演示一行文字的用法。

```jsx
import React, { useEffect,useState } from 'react';
import ReactDOM from 'react-dom';
import MouseHotArea from 'mouse-hot-area';
const {HotMap,initRecord} = MouseHotArea
function App () {
  const [mapdata,setMapdata] = useState([]);
  const afterClick = (data)=>{
    setMapdata([...data])
  }
  useEffect(() => {
    initRecord(afterClick)
  }, [])
  
  return (
    <div>
    <button onClick={()=>{setMapdata([...window.mouseHotData])}}>create</button>
      <HotMap width={350} height={200} data={mapdata}/>
    </div>
  );
}

ReactDOM.render((
  <App />
), mountNode);
```
