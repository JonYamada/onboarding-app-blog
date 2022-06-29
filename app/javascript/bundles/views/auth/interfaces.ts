interface IRegisterProps {
  className?: string;
}

interface ILoginProps {
  className?: string;
}

interface ILoginParams {
  email: string;
  password: string;
}

interface IRegisterParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export { ILoginProps, ILoginParams, IRegisterParams, IRegisterProps };
