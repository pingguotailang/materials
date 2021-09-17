import React from 'react';
// import { Select as AntdSelect, Input } from 'antd';
import { Select, Input } from '@alifd/next';
import PropTypes from 'prop-types';
import './index.scss';
const Option = Select.Option;
class InputTag extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			holdSpaceSpanValue: undefined, //用来占位撑开tag标签，防止input位置错乱以及关闭按钮消失
			showInput: false,
		};
	}
	render() {
		const { defaultValue, onChange, disabled } = this.props;
		const { holdSpaceSpanValue, showInput } = this.state;
		return showInput && !disabled ? (
			<span className="input-tag-wrap">
				<span className="hold-space-span">{holdSpaceSpanValue === undefined ? defaultValue : holdSpaceSpanValue}</span>
				<Input
					className="input-tag"
					onMouseDown={(e) => {
						e.stopPropagation();
					}}
					autoFocus={true}
					onBlur={(e) => {
						onChange(defaultValue, e.target.value);
						this.setState({ showInput: false });
					}}
					defaultValue={defaultValue}
					onPressEnter={(e) => {
						e.target.blur();
					}}
					//设置占位符w占位
					onChange={(value) => {
						this.setState({ holdSpaceSpanValue: value === '' ? 'w' : value });
					}}
				/>
			</span>
		) : (
			<span
				onClick={() => {
					this.setState({ showInput: true });
				}}
			>
				{defaultValue}
			</span>
		);
	}
}
InputTag.propTypes = {
	defaultValue: PropTypes.string,
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
};
class SelectCanEditTags extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			values: props.value || props.defaultValue,
			children: props.value ? this.valueToOption(props.value) : this.valueToOption(props.defaultValue),
		};
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.value !== this.props.value) {
			this.setState({ values: nextProps.value, children: this.valueToOption(nextProps.value) });
			return false;
		} else {
			return true;
		}
	}
	valueToOption = (value) => {
		if (!value) return [];
		return value.map((item) => (
			<Option key={item} value={item}>
				<InputTag disabled={this.props.disabled} defaultValue={item} onChange={this.onTagInputChange.bind(this)} />
			</Option>
		));
	};
	onTagInputChange = (old, now) => {
		if (old === now) {
			return;
		}
		let value = Array.from(this.state.values);
		if (value.includes(now)) {
			//修改项与已填项重复，修改无效
			return;
		}
		if (!now) {
			value.splice(value.indexOf(old), 1);
		} else {
			value[value.indexOf(old)] = now;
		}
		let children = this.valueToOption(value);
		this.setState({ values: value, children: children }, () => {
			this.props.onChange && this.props.onChange(value, children);
		});
	};
	onChange_add = (value) => {
		if (value.length > this.state.values.length) {
			let children = this.valueToOption(value);
			this.setState({ values: value, children: children });
			this.props.onChange && this.props.onChange(value, children);
		}
	};
	onChange_del = (value) => {
		let children = this.valueToOption(value);
		this.setState({ values: value, children: children });
		this.props.onChange && this.props.onChange(value, children);
	};
	render() {
		return (
			<Select
				{...this.props}
				popupStyle={{ display: 'none' }}
				mode="tag"
				onRemove={(item) => {
					const result = this.state.values.filter((ele) => {
						return ele !== item.value;
					});
					this.onChange_del(result);
				}}
				onChange={this.onChange_add.bind(this)}
				autoHighlightFirstItem={true}
				value={this.state.values}
			>
				{this.state.children}
			</Select>
		);
	}
}
export default SelectCanEditTags;
