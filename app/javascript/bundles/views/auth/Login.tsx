import React, { ChangeEvent, useState } from "react";
import {
  buttonText,
  headings,
  form,
  toast as toastTranslations,
} from "../../config/translations/en.json";
import { getRoutes } from "../../utils/RoutesConnector";
import { redirectTo } from "../../utils/nav";
import { login } from "../../api/auth/auth";
import { toast } from "react-hot-toast";
import { ErrorMessage, Form, Formik } from "formik";
import { setToast } from "../../utils/toast";
import { ILoginParams, ILoginProps } from "./interfaces";
import LoadingButton from "@mui/lab/LoadingButton";
import withLoader from "../../HOCs/withLoader";
import { IWithLoaderProps } from "../articles/interfaces";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Input, Link } from "@mui/material";
import AuthLayout from "../../layouts/AuthLayout";
import Typography from "@mui/material/Typography";

const defaultProps = {
  loading: false,
  toggleLoading: () => {},
};

const routes = getRoutes();

const Login = ({ loading, toggleLoading }: ILoginProps & IWithLoaderProps) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState<ILoginParams>(initialValues);

  const submit = () => {
    toggleLoading(true);
    login(values)
      .then(({ request }) => {
        setToast({
          message: toastTranslations.successLogin,
          type: "success",
        });
        redirectTo(request?.responseURL || routes.articles.index);
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {
          toast.error(errors || toastTranslations.errorGeneric);
        }
      )
      .finally(() => {
        toggleLoading(false);
      });
  };

  const validate = () => {
    const formikErrors: Record<string, string> = {};

    Object.keys(values).forEach((key) => {
      if (!values[key]) formikErrors[key] = `${key} can't be blank`;
    });

    return formikErrors;
  };

  return (
    <AuthLayout>
      <Typography align="center" variant="h2" sx={{ marginBottom: 3 }}>
        {headings.login}
      </Typography>

      <Formik
        initialValues={initialValues}
        onSubmit={submit}
        validate={validate}
      >
        {() => (
          <Form>
            <Card>
              <CardContent>
                {[
                  {
                    id: "email",
                    name: "email",
                    fullWidth: true,
                    label: "email",
                    onChange: (
                      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                    ) => {
                      setValues({
                        ...values,
                        email: (event?.target as HTMLInputElement).value || "",
                      });
                    },
                    value: values.email,
                  },
                  {
                    id: "password",
                    name: "password",
                    fullWidth: true,
                    label: "password",
                    onChange: (
                      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                    ) => {
                      setValues({
                        ...values,
                        password:
                          (event?.target as HTMLInputElement).value || "",
                      });
                    },
                    type: "password",
                    value: values.password,
                  },
                ].map(({ label, name, ...rest }) => (
                  <div key={name}>
                    <label htmlFor={name}>{label}</label>
                    <Input {...rest} name={name} id={name} />
                    <ErrorMessage
                      className="error-message"
                      name={name}
                      component="div"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Box sx={{ textAlign: "center", marginY: 1 }}>
              <Link href={routes?.users?.new}>
                {form.links.dontHaveAnAccount}
              </Link>
            </Box>
            <LoadingButton
              type="submit"
              loading={loading}
              loadingPosition="center"
              sx={{ mt: 1, float: "right" }}
              variant="contained"
            >
              {buttonText.submit}
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

Login.defaultProps = defaultProps;

export default withLoader(Login);
