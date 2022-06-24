import React from "react";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { buttonText, validations } from "../../config/translations/en.json";
import { getRoutes } from "../../utils/routes";
import { redirectTo } from "../../utils/nav";
import { register } from "../../api/auth/auth";
import { toast as toastTranslations } from "../../config/translations/en.json";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { setToast } from "../../utils/toast";
import { IParams } from "./interfaces";

const defaultProps = {
  className: null,
};

interface IRegister {
  className?: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email(validations.enterValidEmail)
    .required(validations.requireEmail),
  password: yup.string().required(validations.requiredPassword),
});

const routes = getRoutes();

const Register = ({ className }: IRegister) => {
  const onSubmit = (values: IParams) => {
    register(values)
      .then(({ data: { first_name } }) => {
        setToast({
          message: toastTranslations.accountCreated,
          type: "success",
        });
        redirectTo(routes.articles.index);
      })
      .catch(() => {
        toast.error(toastTranslations.errorGeneric);
      });
  };

  const formik = useFormik({
    initialValues: {
      first_name: "Jonathon",
      last_name: "Yamada",
      email: "jonathon.yamada@wpengine.com",
      // email: `jonathon.yamada+${Math.random()}@wpengine.com`,
      password: "password",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={className}>
      {[
        {
          id: "first-name",
          name: "first-name",
          error: formik.touched.first_name && !!formik.errors.first_name,
          fullWidth: true,
          helperText: formik.touched.first_name && formik.errors.first_name,
          label: "first-name",
          onChange: formik.handleChange,
          value: formik.values.first_name,
        },
        {
          id: "last-name",
          name: "last-name",
          error: formik.touched.last_name && !!formik.errors.last_name,
          fullWidth: true,
          helperText: formik.touched.last_name && formik.errors.last_name,
          label: "last-name",
          onChange: formik.handleChange,
          value: formik.values.last_name,
        },
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
        <TextField {...props} key={props.name || props.id} />
      ))}

      <Button color="primary" variant="contained" fullWidth type="submit">
        {buttonText.save}
      </Button>
    </form>
  );
};

Register.defaultProps = defaultProps;

export default Register;
