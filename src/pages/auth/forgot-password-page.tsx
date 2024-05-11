import { FC } from 'react';
import { Formik } from 'formik';
import cn from 'classnames';

import Container from '@/components/Container';
import Typography from '@/components/Typography';
import {FloatingLabelInput} from '@/components/input';
import Button from '@/components/Button';
import RouterLink from '@/components/RouterLink';

const ForgotPasswordPage: FC = () => {
    return (
        <Container>
            <div className="page-title mb-5">
                <Typography fontSize={1} center fontWeight="bold" color="white">
                    Forgot Password
                </Typography>
                <Typography center fontWeight="medium" color="white">
                    Reset Your Password
                </Typography>
            </div>

            <Typography center marginBottom="3" fontWeight='medium'>We will send you an email to reset your password</Typography>

            <Formik
                initialValues={{ email: '' }}
                validate={(values) => {
                    const errors: { email?: string; } = {};
                    if (!values.email) {
                        errors.email = 'Email is Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
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
                            {errors.email && <div className="text-danger ms-2">{errors.email}</div>}
                        </div>
                        <div className="d-flex justify-content-center">
                            <Button type="submit" className="w-50" loading={isSubmitting}>
                                Submit
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
            <div className="text-center">
                <RouterLink to="/login" marginBottom="3">Login to Your Account</RouterLink>
                <br />
                <RouterLink to="/signup">Create new Account</RouterLink>
            </div>
        </Container>
    );
};

export default ForgotPasswordPage;
