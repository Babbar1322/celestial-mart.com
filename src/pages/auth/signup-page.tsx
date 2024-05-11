import { FC } from 'react';
import { Formik } from 'formik';
import cn from 'classnames';

import Container from '@/components/Container';
import Typography from '@/components/Typography';
import { FloatingLabelInput } from '@/components/input';
import Button from '@/components/Button';
import RouterLink from '@/components/RouterLink';
import { HttpClient } from '@/config/http-client';
import { toast } from 'react-toastify';
import { setIsLoggedIn } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SignupPage: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <Container>
            <div className="page-title mb-5">
                <Typography fontSize={1} center fontWeight="bold" color="white">
                    Signup
                </Typography>
                <Typography center fontWeight="medium" color="white">
                    Create new Account
                </Typography>
            </div>

            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validate={(values) => {
                    const errors: { name?: string; last_name?: string; email?: string; password?: string } = {};
                    if (!values.name) {
                        errors.name = 'First Name is Required';
                    } else if (!values.email) {
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
                        const res: {status: boolean; message?: string; token: string;} = await HttpClient.post('/register', values);
                        if (res.status) {
                            dispatch(setIsLoggedIn({
                                isLoggedIn: true,
                                token: res.token,
                            }));
                            toast.success(res.message);
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
                    <form onSubmit={handleSubmit} className="w-md-75 w-lg-50 mx-auto mb-4">
                        <div className="mb-3">
                            <FloatingLabelInput
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className={cn({ 'is-invalid': errors.name && touched.name })}
                                label="Full Name *"
                                placeholder="Enter Full Name"
                            />
                            {errors.name && <div className="text-danger ms-2">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            {/* <div className="form-label">Email Address</div> */}
                            <FloatingLabelInput
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className={cn({ 'is-invalid': errors.email && touched.email })}
                                label="Email Address"
                                placeholder="Enter Your Email Address"
                            />
                            {errors.email && <div className="text-danger ms-2">{errors.email}</div>}
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
                                label="Password"
                                placeholder="Create Password"
                            />
                            {errors.password && <div className="text-danger ms-2">{errors.password}</div>}
                        </div>
                        <div className="d-flex justify-content-center">
                            <Button type="submit" className="w-50" loading={isSubmitting}>
                                Create
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
            <div className="text-center">
                <RouterLink to="/login">Login to Your Account</RouterLink>
            </div>
        </Container>
    );
};

export default SignupPage;
