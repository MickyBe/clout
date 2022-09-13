import * as Yup from 'yup';

export const LoginValidationSchema = Yup.object().shape({
    userName: Yup.string().required('Username or email is required'),
    password: Yup.string().required('Password is required'),
});