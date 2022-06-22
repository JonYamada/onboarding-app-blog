import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LoadingButton from "@mui/lab/LoadingButton";
import RichTextEditor from "../../../components/editor/RichTextEditor";
import { Box, Input } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { IArticleForm, IParams } from "../interfaces";
import {
  buttonText,
  form,
  validations as validationTranslations,
} from "../../../config/translations/en.json";

const defaultProps = {
  article: [],
  className: null,
  onSubmit: null,
};

interface IErrors {
  [name: string]: IError;
}

interface IError {
  isEmpty?: boolean;
  message?: string;
}

const ArticleForm = ({
  article,
  className,
  loading,
  onSubmit: onSave,
}: IArticleForm) => {
  const [errors, setErrors] = useState<IErrors>({
    content: { isEmpty: false, message: "" },
    title: { isEmpty: false, message: "" },
  });

  const [values, setValues] = useState<IParams>({ content: "", title: "" });

  const validateForm = () => {
    const formikErrors: Record<string, string> = {};

    const validations = [
      {
        name: "title",
        isInvalid: !values.title,
        message: validationTranslations.requiredTitle,
      },
      {
        name: "content",
        isInvalid: !values.content || errors.content?.isEmpty,
        message: validationTranslations.requiredContent,
      },
    ];

    validations.forEach(({ name, isInvalid, message }) => {
      if (isInvalid) {
        setErrors({
          ...errors,
          [name]: {
            ...errors[name],
            message,
          },
        });

        formikErrors[name] = message;
      }
    });

    return formikErrors;
  };

  return (
    <Box className={className}>
      <Formik
        initialValues={values}
        onSubmit={() => {
          if (onSave) onSave(values);
        }}
        validate={validateForm}
      >
        {({ errors: formikErrors }) => (
          <Form>
            <Card>
              <CardContent>
                <Box sx={{ mb: 1 }}>
                  <label htmlFor="title">{form.label.title}</label>
                  <Input
                    type="text"
                    error={!!formikErrors?.title}
                    id="title"
                    name="title"
                    onChange={({ target: { value: title } }) =>
                      setValues({ ...values, title })
                    }
                    sx={{ width: "100%", marginBottom: 1 }}
                  />
                  <ErrorMessage
                    className="error-message"
                    name="title"
                    component="div"
                  />
                </Box>
                <Box sx={{ mb: 1 }}>
                  <label htmlFor="content">{form.label.content}</label>
                  <RichTextEditor
                    ariaLabel="aria-editor"
                    className={`${!!formikErrors?.content && "border-invalid"}`}
                    onChange={(html) => setValues({ ...values, content: html })}
                    onError={({ isEmpty, message }) =>
                      setErrors({ ...errors, content: { isEmpty, message } })
                    }
                  />
                  <ErrorMessage
                    className="error-message"
                    name="content"
                    component="div"
                  />
                </Box>
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
    </Box>
  );
};

ArticleForm.defaultProps = defaultProps;

export default ArticleForm;
