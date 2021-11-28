import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const ProtectedRoute = ({component: Component, isAdmin, ...rest}) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    return (
        <Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render = {props => {
                        if(isAuthenticated === false){
                            return <Redirect to='/login' />
                        }

                        console.log(isAdmin, user.role)

                        if(isAdmin && user.role !== 'admin'){
                            return <Redirect to='/login' />
                        }

                        return <Component {...props} />;
                    }}
                />
            )}
        </Fragment>
    )
}

export default ProtectedRoute;
