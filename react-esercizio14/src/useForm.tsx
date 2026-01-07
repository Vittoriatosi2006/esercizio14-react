import { useState } from "react";

type FormData = {
  username: string;
  password: string;
};
export function useForm() {
  const [data, setData] = useState<FormData>({ username: "", password: "" });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;

    setData({ ...data, [name]: value });
  }

  return {
    data,
    handleInputChange,
  };
}
