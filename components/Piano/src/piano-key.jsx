import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
class PianoKey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentClassName: 'key-up',
		};
	}
	isKeyDown = false;
	//键盘按钮点击事件，也会被键盘按下调用
	keyDown = () => {
		this.isKeyDown = true;
		this.playMusic();
		this.setState({ currentClassName: 'key-down' });
		this.props.onKeyPlayStart && this.props.onKeyPlayStart();
	};
	//键盘按钮鼠标抬起事件，也会被键盘抬起调用
	keyUp = () => {
		this.isKeyDown = false;
		this.setState({ currentClassName: 'key-up' });
		this.props.onKeyPlayEnd && this.props.onKeyPlayEnd();
	};
	playMusic() {
		//本地播放模式
		if (window.location.host === '') {
			let audio = new Audio();
			// 设置好音频路径
			audio.src = 'audio/' + this.props.timbre + '/' + this.props.voice + '.mp3';
			// 播放音频
			audio.play();
			//在线播放模式
		} else {
			let audio = this.props.audio();
			// 播放音频
			var bufferSource = audio.context.createBufferSource();
			bufferSource.buffer = audio.buffer;
			bufferSource.connect(audio.context.destination);
			bufferSource.loop = false;
			bufferSource.start();
		}
	}
	render() {
		return (
			<button
				className={this.state.currentClassName}
				onMouseDown={this.keyDown.bind(this)}
				onMouseUp={this.keyUp.bind(this)}
				style={{
					background: this.props.color,
					width: this.props.w,
					height: this.props.h,
					left: this.props.x,
					color: 'white',
				}}
			>
				{this.props.voice}
			</button>
		);
	}
}
PianoKey.propTypes = {
	voice: PropTypes.string,
	color: PropTypes.string,
	w: PropTypes.number,
	h: PropTypes.number,
	x: PropTypes.number,
	audio: PropTypes.func,
	onKeyPlayEnd: PropTypes.func,
	onKeyPlayStart: PropTypes.func,
	timbre: PropTypes.string,
};
export default PianoKey;
