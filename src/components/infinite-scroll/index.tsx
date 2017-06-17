import React from "react";

export default class InfiniteScroll extends React.PureComponent<{}, {}> {

}

interface OwnProps {
	scrollElement?: HTMLElement | Window;
	threshold: number;
}
