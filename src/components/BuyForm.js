import React, { Component } from "react";
import ethLogo from "../eth-logo.png";
import tokenLogo from "../token-logo.png";
import daiLogo from '../dai-logo.png';
import chainLinkLogo from "../chainlink-link-logo.png";

class BuyForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			output: "0",
			rate: 100,
			selected : props.selectedToken.name
		};
	}

	handleChange = (event) => {
		    this.setState({selected: event.target.value});
				this.props.handleTokenChange(event.target.value);
	}

	render() {
		let {selected, rate} = this.state;
		return (
			<form
				className="mb-5"
				onSubmit={(event) => {
					event.preventDefault();
					let etherAmount;
					etherAmount = this.input.value.toString();
					etherAmount = window.web3.utils.toWei(etherAmount, "Ether");
					this.props.buyTokens(etherAmount);
				}}
			>
				<div>
					<label className="float-left">
						<b>Input</b>
					</label>
					<span className="float-right text-muted">
						Balance: {window.web3.utils.fromWei(this.props.ethBalance, "Ether")}
					</span>
				</div>
				<div className="input-group mb-4">
					<input
						type="text"
						onChange={(event) => {
							const etherAmount = this.input.value.toString();
							this.setState({
								output: etherAmount * rate,
							});
						}}
						ref={(input) => {
							this.input = input;
						}}
						placeholder="0"
						className="form-control form-control-lg"
						required
					/>
					<div className="input-group-append">
						<div className="input-group-text">
						&nbsp;&nbsp;&nbsp;
							<img src={ethLogo} height="32" alt="" />
							&nbsp;&nbsp;&nbsp; ETH
							&nbsp;&nbsp;&nbsp;
						</div>
					</div>
				</div>
				<div>
					<label className="float-left">
						<b>Output</b>
					</label>
					<span className="float-right text-muted">
						Balance: {window.web3.utils.fromWei(this.props.tokenBalance, "Ether")}
					</span>
				</div>
				<div className="input-group mb-2">
					<input
						value={this.state.output}
						type="text"
						placeholder="0"
						className="form-control form-control-lg"
						disabled
					/>
					<div className="input-group-append">
						<div className="input-group-text">
							<img src={selected==='LINK'? chainLinkLogo
							:selected==='DAI'? daiLogo
							:tokenLogo} height="32" alt="" />
							&nbsp;
							<select onChange={this.handleChange}>
							<option defaultValue={selected}>LINK</option>
							<option defaultValue={selected}>DEV</option>
						  <option defaultValue={selected}>DAI</option>
						</select>
						</div>
					</div>
				</div>
				<div className="mb-5">
					<span className="float-left text-muted">
						<b>Exchange Rate</b>
					</span>
					<span className="float-right text-muted">1 ETH = {rate} {selected}</span>
				</div>
				<button type="submit" className="btn btn-primary btn-block btn-lg">
					SWAP!
				</button>
			</form>
		);
	}
}

export default BuyForm;
