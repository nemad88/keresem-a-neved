"use client";
import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/schemas";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <label>Email</label>
          <input
            disabled={isPending}
            type="email"
            className="rounded-lg border-2"
            {...register("email")}
          />
          <ErrorMessage errors={errors} name="email" />
        </div>
        <div className="space-y-4">
          <label>Password</label>
          <input
            disabled={isPending}
            type="password"
            className="rounded-lg border-2"
            {...register("password")}
          />
          <ErrorMessage errors={errors} name="password" />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
