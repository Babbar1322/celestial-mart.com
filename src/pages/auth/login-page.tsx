import { FC } from 'react';
import { Formik } from 'formik';
import cn from 'classnames';

import Container from '@/components/Container';
import Typography from '@/components/Typography';
import {FloatingLabelInput} from '@/components/input';
import Button from '@/components/Button';
import RouterLink from '@/components/RouterLink';
import { HttpClient } from '@/config/http-client';
import { CommonAxiosResponse } from '@/typings/data';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '@/redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

interface LoginResponse extends CommonAxiosResponse {
    token: string;
}

const LoginPage: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Container>
            <div className="page-title mb-5">
                <Typography fontSize={1} center fontWeight="bold" color="white">
                    Login
                </Typography>
                <Typography center fontWeight="medium" color="white">
                    Log into Your Account
                </Typography>
            </div>

            <Formik
                initialValues={{ email: '', password: '' }}
                validate={(values) => {
                    const errors: { email?: string; password?: string } = {};
                    if (!values.email) {
                        errors.email = 'Email is Required';
                    } else if (!values.password) {
                        errors.password = 'Password is Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const res: LoginResponse = await HttpClient.post('/login', values);
                        // console.log(res);
                        if (res.status) {
                            dispatch(setIsLoggedIn({
                                isLoggedIn: true,
                                token: res.token,
                            }));
                            navigate('/');
                        }
                    } catch (err) {
                        console.log(err);
                    } finally {
                        setSubmitting(false);
                    }
                    // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    //     setSubmitting(false);
                    // }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} className='w-md-75 w-lg-50 mx-auto mb-4'>
                        <div className="mb-3">
                            {/* <div className="form-label">Email Address</div> */}
                            <FloatingLabelInput
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className={cn({ 'is-invalid': errors.email && touched.email })}
                                label='Email Address'
                                placeholder="Enter Your Email Address"
                            />
                            {(errors.email && touched.email) && <div className="text-danger ms-2">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            {/* <div className="form-label">Password</div> */}
                            <FloatingLabelInput
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className={cn({ 'is-invalid': errors.password && touched.password })}
                                autoComplete="current-password"
                                label='Password'
                                placeholder="Enter Password"
                            />
                            {(errors.password && touched.password) && <div className="text-danger ms-2">{errors.password}</div>}
                        </div>
                        <div className="mb-3">
                            <RouterLink to='/forgot-password'>Forgot Password?</RouterLink>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Button type="submit" className="w-50" loading={isSubmitting}>
                                Login
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
            <div className="text-center">
                <RouterLink to="/signup">Create new Account</RouterLink>
            </div>
        </Container>
    );
};

export default LoginPage;
