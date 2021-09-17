---
title: Simple Usage
order: 1
---

本 Demo 演示一行文字的用法。

```jsx
import React, { Component,useRef,useState } from 'react';
import ReactDOM from 'react-dom';
import SchulteGrid from 'schulte-grid';
import {NumberPicker,Box,Button} from '@alifd/next'

function App() {
	const ref = useRef();
	const [col, setCol] = useState(5);
	const [row, setRow] = useState(5);
	const [start, setStart] = useState(1);
	const [time, setTime] = useState(0);
	const [result, setResult] = useState('');
	const [t, setT] = useState(null);
	const startTimer = () => {
		let t = setInterval(() => {
			setTime((old) => {
				return old + 1;
			});
		}, 1000);
		setT(t);
	};
	const stopTimer = () => {
		t && clearInterval(t);
		setResult(time);
	};
	const resetTimer = () => {
		t && clearInterval(t);
		setTime(0);
	};
	return (
		<div>
			<Box spacing={8}>
				<Button
					style={{ width: 50 }}
					onClick={() => {
						ref.current.reSort();
						resetTimer();
						setResult('');
					}}
				>
					重置
				</Button>
				<div>
					列数：
					<NumberPicker
						value={col}
						onChange={(val) => {
							setCol(Number(val));
						}}
					/>
				</div>
				<div>
					行数：
					<NumberPicker
						value={row}
						onChange={(val) => {
							setRow(Number(val));
						}}
					/>
				</div>
				<div>
					起始数字：
					<NumberPicker
						value={start}
						onChange={(val) => {
							setStart(Number(val));
						}}
					/>
				</div>
				<Button
          type="primary"
					style={{ width: 100 }}
					onClick={() => {
            resetTimer();
						setResult('');
            startTimer();
						ref.current.reSort();
					}}
				>
					开始测试
				</Button>
				<div>
					<span>计时器：</span>
					<span>{time}</span>
					<span>秒</span>
				</div>
				<div>
					测试结果：<span style={{ color: 'red' }}>{result ? result + '秒' : ''}</span>
				</div>
				<SchulteGrid
					ref={ref}
					col={col}
					row={row}
					start={start}
					onFin={() => {
						stopTimer();
					}}
				/>
			</Box>
		</div>
	);
}

ReactDOM.render((
  <App />
), mountNode);
```
