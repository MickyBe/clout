import * as Yup from "yup";

export default AnnouncementValidationSchema = Yup.object().shape({
  description: Yup.string()
    .min(10, "Description must be atleast 10 characters")
    .max(100, "Description must not exceed 100 characters")
    .required("Description is required"),
});
