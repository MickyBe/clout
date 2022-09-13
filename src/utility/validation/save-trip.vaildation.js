import * as Yup from 'yup';

export const SaveTripValidationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
});