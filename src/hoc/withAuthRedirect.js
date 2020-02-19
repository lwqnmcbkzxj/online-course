import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

let mapStateToPropsForRedirect = (state) => ({
    logged: state.user.logged
});

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.logged) return <Redirect to={"/login"} />
            return <Component {...this.props}/>
        }
    }

  
    let ConnectredRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectredRedirectComponent;
}