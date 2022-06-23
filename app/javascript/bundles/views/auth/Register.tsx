import React from "react";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { buttonText, validations } from "../../config/translations/en.json";
import { useFormik } from "formik";

const defaultProps = {
  className: null,
};

interface ISignUp {
  className?: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email(validations.enterValidEmail)
    .required(validations.requireEmail),
  password: yup.string().required(validations.requiredPassword),
});

const Register = ({ className }: ISignUp) => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={className}>
      {[
        {
          id: "email",
          name: "email",
          error: formik.touched.email && !!formik.errors.email,
          fullWidth: true,
          helperText: formik.touched.email && formik.errors.email,
          label: "Email",
          onChange: formik.handleChange,
          value: formik.values.email,
        },
        {
          id: "password",
          name: "password",
          error: formik.touched.password && !!formik.errors.password,
          fullWidth: true,
          helperText: "",
          label: "Password",
          onChange: formik.handleChange,
          type: "password",
          value: formik.values.password,
        },
      ].map((props) => (
        <TextField {...props} key={props.name} />
      ))}

      <Button color="primary" variant="contained" fullWidth type="submit">
        {buttonText.save}
      </Button>
    </form>
  );
};

Register.defaultProps = defaultProps;

export default Register;
