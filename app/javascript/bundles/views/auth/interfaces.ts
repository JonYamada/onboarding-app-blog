interface IRegisterProps {
  className?: string;
}

interface ILoginProps {
  className?: string;
}

interface ILoginParams {
  email: string;
  password: string;
  [key: string]: string;
}

interface IRegisterParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export { ILoginProps, ILoginParams, IRegisterParams, IRegisterProps };
