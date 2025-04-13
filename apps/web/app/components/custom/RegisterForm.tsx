import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { signUpSchema } from "@repo/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import CustomButton from "./CustomButton";
import Link from "next/link";

const RegisterForm = ({
  saveBio,
  btnLoading,
}: {
  saveBio: (data: z.infer<typeof signUpSchema>) => void;
  btnLoading: boolean;
}) => {
  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="pt-10">
      <Form {...signUpForm}>
        <form onSubmit={signUpForm.handleSubmit(saveBio)}>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:[&>*]:w-1/2 gap-6">
              <FormField
                control={signUpForm.control}
                name="firstName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Firstname</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ex. Raju" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={signUpForm.control}
                name="lastName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Lastname</FormLabel>
                      <FormControl>
                        <Input
                          className="min-w-full"
                          {...field}
                          placeholder="Ex. Raj"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <FormField
              control={signUpForm.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ex. raju@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={signUpForm.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={signUpForm.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div>
              <span className="text-xs">
                Are you already reigstered ?{" "}
                <Link href={"/login"}>Login Here.</Link>
              </span>
            </div>
          </div>
          <div className="w-full flex justify-between  mt-10">
            <CustomButton
              bg={`bg-primary w-full mx-auto  `}
              hoverBg={`hover:bg-secondary`}
              type="submit"
              btnLoading={btnLoading}
              color="text-white hover:text-white"
              onClick={() => signUpForm.handleSubmit(saveBio)}
            >
              <div className="flex items-center gap-2">Register</div>
            </CustomButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
