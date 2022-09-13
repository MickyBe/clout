import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export default SignupValidationSchema = Yup.object().shape({
  phone: Yup.string(),
  email: Yup.string()
    .email("Email format not correct")
    .required("Please enter email"),
  userName: Yup.string()
    .min(3, "User name must be greater than 2")
    .required("User name is required"),
  password: Yup.string()
    .min(6, "Password should be atleast 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
