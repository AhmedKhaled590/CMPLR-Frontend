import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AuthInput from '../../partials/AuthInput';
import AuthBtn from '../../partials/AuthBtn';
import OrBar from '../../partials/OrBar';
import AuthAlert from '../../partials/AuthAlert';
import { handleLogin } from '../Controller';
import PlaystoreApplestore from '../../partials/PlaystoreApplestore';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/userContext/UserContext';
import { CircularProgress } from '@mui/material';

/**
 * LoginCard Component
 * @function LoginCard
 * @description The component that contains content fo login page
 * @returns {Component} Input fields for email and password,
 * forget password button, continue with Google button and two icons for downloading app on
 * Apple store and Google play
 */

export default function LoginCard() {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    return (
        <div className="LoginCard">
            <div className="LoginCard__logo-container">
                <p className="LoginCard__logo">cmplr</p>
            </div>
            {error &&
                error?.length !== 0 &&
                error?.map((errorMsg, index) => {
                    return (
                        <AuthAlert
                            key={index}
                            openError={error.length !== 0}
                            errorMessage={errorMsg}
                        />
                    );
                })}

            <div className="login-form">
                <AuthInput
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                    dataTestid="email"
                ></AuthInput>

                <AuthInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    dataTestid="password"
                ></AuthInput>

                <p>
                    {'By clicking "log in", or continuing with the other options' +
                        'below, you agree to Tumblr’s Terms of Service and have read' +
                        'the Privacy Policy'}
                </p>

                <AuthBtn
                    text="Log in"
                    color="#00b8ff"
                    dataTestid="login"
                    handleClick={() =>
                        handleLogin(
                            email,
                            password,
                            setError,
                            setUser,
                            setIsPending
                        )
                    }
                ></AuthBtn>
                {isPending && (
                    <div className="load-circle">
                        <CircularProgress />
                    </div>
                )}
            </div>

            <a className="LoginCard__a" href="/forget_password">
                Forgot your password?
            </a>

            <OrBar></OrBar>

            <AuthBtn
                text="Continue with Google"
                color="white"
                logo="https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20210618182605%21Google_%22G%22_Logo.svg"
                handleClick={() => '@todo'}
            ></AuthBtn>

            <p className="LoginCard__a">
                New to Cmplr?{' '}
                <Link to="/register" style={{ color: 'white' }}>
                    Sign up!
                </Link>
            </p>

            <PlaystoreApplestore />
        </div>
    );
}
