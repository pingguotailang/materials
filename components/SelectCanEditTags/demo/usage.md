---
title: Simple Usage
order: 1
---

本 Demo 演示一行文字的用法。

```jsx
import React, { Component,useState } from 'react';
import ReactDOM from 'react-dom';
import SelectCanEditTags from 'select-can-edit-tags';

const App = () => {
  const [value,setValue] = useState(['11111', '22222'])
  function handleChange(value) {
      console.log(`selected ${value}`);
      setValue(value)
  }
  return (
    <div >
          <SelectCanEditTags
              style={{ width: '100%' }}
              value={value}
              onChange={handleChange}
          />
      </div>
  );
}

ReactDOM.render((
  <App />
), mountNode);
```
