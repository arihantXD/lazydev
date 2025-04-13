"use client";

import { educationSchema } from "@repo/schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import ToolTip from "./ToolTip";
import Save from "../icons/Save";
import Add from "../icons/Add";
import Delete from "../icons/Delete";
import { convertToLocalDate } from "@/util/convertDateToString";
import { useEffect } from "react";

const EducationForm = ({
  data,
  edList,
  addEducation,
  saveEducation,
  deleteEducation,
  btnLoading,
  index,
}: {
  data: z.infer<typeof educationSchema>;
  edList: z.infer<typeof educationSchema>[];
  addEducation: () => void;
  saveEducation: (data: z.infer<typeof educationSchema>) => void;
  deleteEducation: (data: z.infer<typeof educationSchema>) => void;
  btnLoading: boolean;
  index: number;
}) => {
  const edForm = useForm<z.infer<typeof educationSchema>>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      id: data.id || undefined,
      index: index,
      school: data.school || "",
      course: data.course || "",
      from: (data.from && convertToLocalDate(data.from)) || "",
      to: (data.to && convertToLocalDate(data.to)) || "",
      score: data.score || "",
      userId: data.userId || undefined,
    },
  });

  useEffect(() => {
    edForm.setValue("id", data.id);
  }, [data]);

  return (
    <div>
      <Form {...edForm}>
        <form onSubmit={edForm.handleSubmit(saveEducation)}>
          <div className="space-y-6">
            <FormField
              control={edForm.control}
              name="school"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>School</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ex. LNCT, Bhopal"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={edForm.control}
              name="course"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="B. Tech, CSE"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={edForm.control}
              name="score"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Score</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Ex. 90%" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <FormField
                control={edForm.control}
                name="from"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" placeholder="Password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={edForm.control}
                name="to"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" placeholder="Password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <ToolTip
              onSubmit={edForm.handleSubmit(saveEducation)}
              type={"submit"}
              btnLoading={btnLoading}
              icon={<Save />}
              text={"Save / update institute"}
            />
            {edList.length <= 2 && (
              <ToolTip
                onClick={addEducation}
                icon={<Add />}
                text={"Add more institutes"}
              />
            )}
            <ToolTip
              onClick={() => deleteEducation(data)}
              icon={<Delete />}
              text={"Delete this institute"}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EducationForm;
