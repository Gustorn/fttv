import React from "react";
import { connect } from "react-redux";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Action, Dispatch, bindActionCreators } from "redux";

import { getAuthorizeUrl } from "common/twitch-api";
import { returnOf } from "common/util";
import { add as addError } from "data/errors";
import { setAccessToken } from "data/user";
import Button from "components/button";

@translate("login-button")
class LoginButton extends React.Component<Props, {}> {
	onMessage = (e: MessageEvent) => {
		if (e.data.type !== "auth") return;

		if (e.data.payload.error) {
			this.props.addError(e.data.payload.error_description);
		} else {
			this.props.setAccessToken(e.data.payload.access_token);
		}
	}

	openWindow = () => {
		window.open(getAuthorizeUrl(), "auth", "width=540,height=640,menubar=0,toolbar=0");
	}

	componentDidMount() {
		window.addEventListener("message", this.onMessage);
	}

	componentWillUnmount() {
		window.removeEventListener("message", this.onMessage);
	}

	render() {
		const t = this.props.t!;

		return (
			<Button onClick={this.openWindow}>
				{t("text")}
			</Button>
		);
	}
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
	addError,
	setAccessToken
}, dispatch);

type Props = typeof DispatchProps & InjectedTranslateProps;
const DispatchProps = returnOf(mapDispatchToProps);

export default connect<{}, typeof DispatchProps, {}>(
	null,
	mapDispatchToProps
)(LoginButton);
