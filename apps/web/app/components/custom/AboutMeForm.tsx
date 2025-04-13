import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { userSchema } from "@repo/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Save from "../icons/Save";
import CustomButton from "./CustomButton";
import RightArrow from "../icons/RightArrow";
import { useCustomContext } from "@/context/MyContext";

const AboutMeForm = ({
  data,
  saveBio,
  btnLoading,
}: {
  data: z.infer<typeof userSchema> | undefined;
  saveBio: (data: z.infer<typeof userSchema>) => void;
  btnLoading: boolean;
}) => {
  const { setCurrentPage } = useCustomContext();
  const aboutMeForm = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: data?.id || undefined,
      aboutMe: data?.aboutMe || "",
      phoneNumber: data?.phoneNumber || "",
      place: data?.place || "",
      occupation: data?.occupation || "",
    },
  });

  return (
    <div>
      <Form {...aboutMeForm}>
        <form onSubmit={aboutMeForm.handleSubmit(saveBio)}>
          <div className="space-y-6">
            <FormField
              control={aboutMeForm.control}
              name="aboutMe"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        {...field}
                        placeholder="Ex. Full Stack Developer at LazyDev, working as remote engineer from Indore..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={aboutMeForm.control}
              name="phoneNumber"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ex. 7693989234"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={aboutMeForm.control}
              name="occupation"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ex. Software Engineer"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={aboutMeForm.control}
              name="place"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Place</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Ex. Indore" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="w-full flex justify-between  mt-10">
            <CustomButton
              btnLoading={btnLoading}
              onSubmit={aboutMeForm.handleSubmit(saveBio)}
              bg={`bg-primary`}
              hoverBg={`hover:bg-secondary`}
              color="text-white hover:text-white"
              type="submit"
            >
              <div className="flex items-center gap-2">
                <Save />
                Save Bio
              </div>
            </CustomButton>
            <CustomButton
              bg={`bg-primary`}
              hoverBg={`hover:bg-secondary`}
              color="text-white hover:text-white"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <div className="flex items-center gap-2">
                Next
                <RightArrow />
              </div>
            </CustomButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AboutMeForm;
