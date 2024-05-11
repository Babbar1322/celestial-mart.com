import { FC } from 'react';
import { Formik } from 'formik';
import cn from 'classnames';

import Container from '@/components/Container';
import Typography from '@/components/Typography';
import { FloatingLabelInput } from '@/components/input';
import Button from '@/components/Button';
import { HttpClient } from '@/config/http-client';
import { toast } from 'react-toastify';

const ContactUsPage: FC = () => {
    const initialValues = { name: '', email: '', subject: '', message: '' };
    return (
        <>
            <Container>
                <div className="page-title mb-5">
                    <Typography fontSize={1} center fontWeight="bold" color="white">
                        Contact Us
                    </Typography>
                    <Typography center fontWeight="medium" color="white">
                        Send us a message
                    </Typography>
                </div>

                <Formik
                    initialValues={initialValues}
                    validate={(values) => {
                        const errors: { email?: string; name?: string; message?: string; subject?: string } = {};
                        if (!values.email) {
                            errors.email = 'Email is Required';
                        } else if (!values.name) {
                            errors.name = 'Name is Required';
                        } else if (!values.message) {
                            errors.message = 'Message is Required';
                        } else if (!values.subject) {
                            errors.subject = 'Subject is Required';
                        }
                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            const res: { message: string } = await HttpClient.post('/send_message', values);
                            toast.success(res.message);
                            resetForm();
                        } catch (err) {
                            console.log(err);
                        } finally {
                            setSubmitting(false);
                        }
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
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className={cn({ 'is-invalid': errors.email && touched.email })}
                                    label="Email Address"
                                    placeholder="Enter Your Email Address"
                                />
                                {errors.email && touched.email && (
                                    <div className="text-danger ms-2">{errors.email}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <FloatingLabelInput
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    className={cn({ 'is-invalid': errors.name && touched.name })}
                                    label="Name"
                                    placeholder="Enter Your Name"
                                />
                                {errors.name && touched.name && <div className="text-danger ms-2">{errors.name}</div>}
                            </div>
                            <div className="mb-3">
                                <FloatingLabelInput
                                    type="text"
                                    name="subject"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.subject}
                                    className={cn({ 'is-invalid': errors.subject && touched.subject })}
                                    label="Subject"
                                    placeholder="Enter Your Subject"
                                />
                                {errors.subject && touched.subject && (
                                    <div className="text-danger ms-2">{errors.subject}</div>
                                )}
                            </div>
                            <div className="mb-3">
                                <div className="form-floating">
                                    <textarea
                                        className={cn('form-control', {
                                            'is-invalid': errors.message && touched.message,
                                        })}
                                        placeholder="Leave a message here"
                                        id="message"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {values.message}
                                    </textarea>
                                    <label htmlFor="message">Message</label>
                                </div>
                                {errors.message && touched.message && (
                                    <div className="text-danger ms-2">{errors.message}</div>
                                )}
                            </div>
                            <div className="d-flex justify-content-center">
                                <Button type="submit" className="w-50" loading={isSubmitting}>
                                    Send Message
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </Container>
        </>
    );
};

export default ContactUsPage;
