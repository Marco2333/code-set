function connect(mapStateToProps, mapDispatchToProps) {
	return function(WrappedComponent) {
		class HocComponent extends React.Component {
			constructor() {
				super(...arguments);
				this.onChange = this.onChange.bind(this);
			}

			componentDidMount() {
				this.context.store.subscribe(this.onChange);
			}

			componentWillUnmount() {
				this.context.store.unsubscribe(this.onChange);
			}

			shouldComponentUpdate(nextProps, nextState) {
				for(const prop in this.props) { 
					if(this.props.hasOwnProperty(prop)) {
						if(nextProps[prop] !== this.props[prop]) {
							return true;
						}
					}
				}

				for(const prop in nextProps) { 
					if(nextProps.hasOwnProperty(prop)) {
						if(nextProps[prop] !== this.props[prop]) {
							return true;
						}
					}
				}

				return false;
			}

			onChange() {
				this.setState({});
			}

			render() {
				const store = this.context.store;
				const newProps = {
					...this.props,
					...mapStateToProps(store.getState(), this.props),
					...mapDispatchToProps(store.dispatch, this.props)
				};

				return (
					<WrappedComponent {...newProps} />
				);
			}
		}

		HocComponent.contextTypes = {
			store: React.PropTypes.object
		}

		return HocComponent;
	}
}