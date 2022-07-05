interface IToastParams {
  message: string;
  type: "success" | "error";
}

interface IAuthProps {
  currentUser: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export { IAuthProps, IToastParams };
