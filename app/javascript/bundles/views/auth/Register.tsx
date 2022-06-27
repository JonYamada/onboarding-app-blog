import React, { ChangeEvent, useState } from "react";
import {
  buttonText,
  toast as toastTranslations,
} from "../../config/translations/en.json";
import { getRoutes } from "../../utils/RoutesConnector";
import { redirectTo } from "../../utils/nav";
import { register } from "../../api/auth/auth";
import { toast } from "react-hot-toast";
import { Form, Formik } from "formik";
import { setToast } from "../../utils/toast";
import { IParams, IRegisterProps } from "./interfaces";
import LoadingButton from "@mui/lab/LoadingButton";
import withLoader from "../../HOCs/withLoader";
import { IWithLoaderProps } from "../articles/interfaces";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Input } from "@mui/material";

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

  const [values, setValues] = useState<IParams>(initialValues);

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
        redirectTo(routes.articles.index);
      })
      .catch(
        ({
          response: {
            data: { errors: resErrors },
          },
        }) => {
          if (resErrors) {
            let newErrors = {};
            Object.keys(resErrors).forEach((key) => {
              newErrors = {
                ...newErrors,
                ...{
                  [key]: {
                    message: resErrors[key]?.join(". "),
                  },
                },
              };
            });

            setErrors(newErrors);
          } else {
            toast.error(toastTranslations.errorGeneric);
          }
        }
      )
      .finally(() => {
        toggleLoading(false);
      });
  };

  return (
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
                  label: "Email",
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
                  label: "Password",
                  onChange: (
                    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                  ) => {
                    setValues({
                      ...values,
                      password: (event?.target as HTMLInputElement).value || "",
                    });
                  },
                  type: "password",
                  value: values.password,
                },
              ].map(({ label, name, ...rest }) => (
                <div key={name}>
                  <label htmlFor={name}>{label}</label>
                  <Input {...rest} />
                  {!!errors[name]?.message && (
                    <div className="error-message">{errors[name].message}</div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
          <LoadingButton
            type="submit"
            loading={loading}
            loadingPosition="center"
            sx={{ mt: 1, float: "right" }}
            variant="contained"
          >
            {buttonText.save}
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
};

Register.defaultProps = defaultProps;

export default withLoader(Register);
