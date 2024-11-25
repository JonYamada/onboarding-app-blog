import React, { ChangeEvent, useState } from "react";
import {
  buttonText,
  headings,
  form,
  toast as toastTranslations,
} from "../../config/translations/en.json";
import { getRoutes } from "../../utils/RoutesConnector";
import { redirectTo } from "../../utils/nav";
import { register } from "../../api/auth/auth";
import { toast } from "react-hot-toast";
import { Form, Formik } from "formik";
import { setToast } from "../../utils/toast";
import { IRegisterParams, IRegisterProps } from "./interfaces";
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

interface IErrors {
  [name: string]: {
    message?: string;
  };
}

const routes = getRoutes();

const Register = ({
  loading,
  toggleLoading,
}: IRegisterProps & IWithLoaderProps) => {
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const [values, setValues] = useState<IRegisterParams>(initialValues);

  const [errors, setErrors] = useState<IErrors>({
    first_name: { message: "" },
    last_name: { message: "" },
    email: { message: "" },
    password: { message: "" },
  });

  const submit = () => {
    toggleLoading(true);
    register(values)
      .then(() => {
        setToast({
          message: toastTranslations.accountCreated,
          type: "success",
        });
        redirectTo(routes?.articles?.index);
      })
      .catch(({ response, ...rest }) => {
        if (response?.data?.errors || !!rest.errors) {
          const allErrors = response?.data?.errors || rest.errors;
          let newErrors = {};
          Object.keys(allErrors).forEach((key) => {
            newErrors = {
              ...newErrors,
              ...{
                [key]: {
                  message: allErrors[key]?.join(". "),
                },
              },
            };
          });
          setErrors(newErrors);
        } else {
          toast.error(toastTranslations.errorGeneric);
        }
      })
      .finally(() => toggleLoading(false));
  };

  return (
    <AuthLayout>
      <Typography align="center" variant="h2" sx={{ marginBottom: 3 }}>
        {headings.signUp}
      </Typography>

      <Formik initialValues={initialValues} onSubmit={submit} isInitialValid>
        {() => (
          <Form>
            <Card>
              <CardContent>
                {[
                  {
                    id: "first-name",
                    name: "first_name",
                    error: !!errors?.first_name?.message,
                    fullWidth: true,
                    label: "first name",
                    onChange: (
                      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                    ) => {
                      setValues({
                        ...values,
                        first_name:
                          (event?.target as HTMLInputElement).value || "",
                      });
                    },
                    value: values.first_name,
                  },
                  {
                    id: "last-name",
                    name: "last_name",
                    error: !!errors?.last_name?.message,
                    fullWidth: true,
                    label: "last name",
                    onChange: (
                      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                    ) => {
                      setValues({
                        ...values,
                        last_name:
                          (event?.target as HTMLInputElement).value || "",
                      });
                    },
                    value: values.last_name,
                  },
                  {
                    id: "email",
                    name: "email",
                    error: !!errors?.email?.message,
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
                    error: !!errors?.password?.message,
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
                    {!!errors[name]?.message && (
                      <div className="error-message">
                        {errors[name].message}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
            <Box sx={{ textAlign: "center", marginY: 1 }}>
              <Link href={routes?.sessions?.create}>
                {form.links.alreadyHaveAnAccount}
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

Register.defaultProps = defaultProps;

export default withLoader(Register);
