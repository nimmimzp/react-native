import React, { Component } from "react";
import {
	View,
	Text,
	Button,
	TextInput,
	StyleSheet,
	ImageBackground,
	Dimensions,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback
} from "react-native";
import {connect} from 'react-redux';
import startMainTabs from "../MainTabs/startMainTabs";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/background.jpg";
import validate from "../../utility/validation";
import {tryAuth} from '../../store/actions/index'
class AuthScreen extends Component {
	state = {
		authMode:"login",
		viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
		controls:{
			email:{
				value:"",
				valid:false,
				valdationRules:{
					isEmail: true
				},
				touched:false
			},
			
			password:{
				value:"",
				valid:false,
				valdationRules:{
					minLength: 6
				},
				touched:false
			},
			confirmPassword:{
				value:"",
				valid:false,
				valdationRules:{
					equalTo: "password"
				},
				touched:false
			}
		}
	};

	constructor(props) {
		super(props);
		Dimensions.addEventListener("change", this.updateStyles);
	}

	componentWillUnmount() {
		Dimensions.removeEventListener("change", this.updateStyles);
	}

	updateStyles = (dims) => {
		this.setState({
			viewMode:
			dims.window.height > 500 ? "portrait" : "landscape"
		});
	}

	loginHandler = () => {
		const authData = {
			email: this.state.controls.email.value,
			password: this.state.controls.password.value
		}
		this.props.onLogin(authData);
		startMainTabs();
	}

	updateInputText = (key,value) => {
		let connectedValue = {};
		if(this.state.controls[key].valdationRules.equalTo){
			const equalControl = this.state.controls[key].valdationRules.equalTo;
			const equalValue = this.state.controls[equalControl].value;
			connectedValue = {
				...connectedValue,
				equalTo: equalValue
			}
		}
		this.setState(prevState => {
			return {
				controls: {
					...prevState.controls,
					[key]:{
						...prevState.controls[key],
						value:value,
						valid:validate(
							value,
							prevState.controls[key].valdationRules,
							connectedValue
						),
						touched:true
					}
				}
			}
		})
	}
	switchAuthModeHandler = () => {
		this.setState(prevState =>{
			return {
				authMode: prevState.authMode==="login"?"signup":"login"
			}
		})
	}
	render() {
		let headingText = null;
		let confrimPassword = null;
		if(this.state.authMode === 'signup'){
			confrimPassword = <View
			style={
				this.state.viewMode === "portrait"
				? styles.portraitPasswordWrapper
				: styles.landscapePasswordWrapper
			}
			>
				<DefaultInput
					placeholder="Confirm Password"
					style={styles.input}
					value={this.state.controls.confirmPassword.value}
					onChangeText={(val) => this.updateInputText('confirmPassword',val)}
					valid={this.state.controls.confirmPassword.valid}
					touched={this.state.controls.confirmPassword.touched}
					secureTextEntry
				/>
			</View>
		}
		if (this.state.viewMode === "portrait") {
			headingText = (
				<MainText>
					<HeadingText>Please Log In</HeadingText>
				</MainText>
			);
		}
		return (
			<ImageBackground source={backgroundImage} style={styles.backgroundImage}>
				<KeyboardAvoidingView behavior="padding" style={styles.container}>
					{headingText}
					<ButtonWithBackground 
						color="#29aaf4" 
						onPress={this.switchAuthModeHandler}>
					Switch to {this.state.authMode==='login'?'Sign Up' : 'Log In'}
					</ButtonWithBackground>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.inputContainer}>
							<DefaultInput
								placeholder="Your E-Mail Address"
								style={styles.input}
								value={this.state.controls.email.value}
								onChangeText={(val) => this.updateInputText('email',val)}
								valid={this.state.controls.email.valid}
								touched={this.state.controls.email.touched}
								autoCapitalize='none'
								autoCorrect={false}
								keyboardType='email-address'
							/>
							<View
								style={
								this.state.viewMode === "portrait" || this.state.authMode === 'login'
									? styles.portraitPasswordContainer
									: styles.landscapePasswordContainer
								}
							>
								<View
								style={
									this.state.viewMode === "portrait" ||  this.state.authMode === 'login'
									? styles.portraitPasswordWrapper
									: styles.landscapePasswordWrapper
								}
								>
									<DefaultInput 
										placeholder="Password" 
										style={styles.input} 
										value={this.state.controls.password.value}
										onChangeText={(val) => this.updateInputText('password',val)}
										valid={this.state.controls.password.valid}
										touched={this.state.controls.password.touched}
										secureTextEntry
										/>
								</View>
								{confrimPassword}
							</View>
						</View>
					</TouchableWithoutFeedback>
					<ButtonWithBackground 
					color="#29aaf4" 
					onPress={this.loginHandler}
					disabled={
						!this.state.controls.confirmPassword.valid && this.state.authMode === 'signup'||
						!this.state.controls.password.valid ||
						!this.state.controls.email.valid
					}>
					Submit
					</ButtonWithBackground>
				</KeyboardAvoidingView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	backgroundImage: {
		width: "100%",
		flex: 1
	},
		inputContainer: {
		width: "80%"
	},
	input: {
		backgroundColor: "#eee",
		borderColor: "#bbb"
	},
	landscapePasswordContainer: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	portraitPasswordContainer: {
		flexDirection: "column",
		justifyContent: "flex-start"
	},
	landscapePasswordWrapper: {
		width: "45%"
	},
	portraitPasswordWrapper: {
		width: "100%"
	}
});
const mapDispatchToProps = dispatch =>{
	return {
		onLogin : (authData) => dispatch(tryAuth(authData))
	}
}
export default connect(null,mapDispatchToProps)(AuthScreen);
