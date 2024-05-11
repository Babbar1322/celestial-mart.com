import { Formik } from 'formik';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import Button from '@/components/Button';
import { FloatingLabelInput } from '@/components/input';
import { HttpClient } from '@/config/http-client';
import { CommonAxiosResponse } from '@/typings/data';

const AddressModal = () => {
    const queryClient = useQueryClient();
    return (
        <div
            className="modal fade"
            id="addAddressModal"
            tabIndex={-1}
            aria-labelledby="addAddressModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="addAddressModalLabel">
                            Add New Address
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Formik
                            initialValues={{
                                name: '',
                                phone: '',
                                address_line1: '',
                                address_line2: '',
                                city: '',
                                state: '',
                                zip: '',
                            }}
                            onSubmit={async (values, { setSubmitting, resetForm }) => {
                                try {
                                    const res: CommonAxiosResponse = await HttpClient.post('/address', values);
                                    if (res.status) {
                                        toast.success('Address Added Successfully');
                                    }
                                    resetForm();
                                } catch (err) {
                                    console.log(err);
                                } finally {
                                    queryClient.invalidateQueries(['getAddress']);
                                    setSubmitting(false);
                                }
                            }}
                        >
                            {({ values, handleSubmit, handleBlur, handleChange, isSubmitting }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <FloatingLabelInput
                                            label="Name"
                                            placeholder="Enter Full Name"
                                            value={values.name}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <FloatingLabelInput
                                            label="Phone"
                                            placeholder="Enter Phone"
                                            value={values.phone}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="phone"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <FloatingLabelInput
                                            label="Address Line 1"
                                            placeholder="Enter Address Line 1"
                                            value={values.address_line1}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="address_line1"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <FloatingLabelInput
                                            label="Address Line 2"
                                            placeholder="Enter Address Line 2"
                                            value={values.address_line2}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="address_line2"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <FloatingLabelInput
                                            label="City"
                                            placeholder="Enter City"
                                            value={values.city}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="city"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <FloatingLabelInput
                                            label="State"
                                            placeholder="Enter State"
                                            value={values.state}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="state"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <FloatingLabelInput
                                            label="ZIP"
                                            placeholder="Enter ZIP"
                                            value={values.zip}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="zip"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <Button type="submit" loading={isSubmitting} className="text-white w-100">
                                            Submit
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressModal;
