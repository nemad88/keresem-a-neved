"use client";

import { register as registerAction } from "@/actions/register";
import { Button } from "@/components/ui/button";
import { RegisterSchema } from "@/schemas";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      registerAction(values);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <label>Name: </label>
          <input
            disabled={isPending}
            type="text"
            className="rounded-lg border-2"
            {...register("name")}
          />
          <ErrorMessage errors={errors} name="email" />
        </div>
        <div className="space-y-4">
          <label>Email: </label>
          <input
            disabled={isPending}
            type="email"
            className="rounded-lg border-2"
            {...register("email")}
          />
          <ErrorMessage errors={errors} name="email" />
        </div>
        <div className="space-y-4">
          <label>Password: </label>
          <input
            disabled={isPending}
            type="password"
            className="rounded-lg border-2"
            {...register("password")}
          />
          <ErrorMessage errors={errors} name="password" />
        </div>
        <Button type="submit">Create an account</Button>
      </form>
    </div>
  );
};

export default RegisterForm;
