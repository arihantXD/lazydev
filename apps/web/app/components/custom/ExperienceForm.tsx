"use client";

import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { experienceSchema, Type } from "@repo/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import CustomButton from "./CustomButton";
import Add from "../icons/Add";
import Delete from "../icons/Delete";
import { convertToLocalDate } from "@/util/convertDateToString";
import ToolTip from "./ToolTip";
import Save from "../icons/Save";
import { useEffect } from "react";

const ExperienceForm = ({
  data,
  expList,
  addExperience,
  saveExperience,
  deleteExperience,
  btnLoading,
  index,
}: {
  data: z.infer<typeof experienceSchema>;
  expList: z.infer<typeof experienceSchema>[];
  addExperience: () => void;
  saveExperience: (data: z.infer<typeof experienceSchema>) => void;
  deleteExperience: (data: z.infer<typeof experienceSchema>) => void;
  btnLoading: boolean;
  index: number;
}) => {
  const expForm = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      id: data.id || undefined,
      index: index,
      companyName: data.companyName || "",
      type: Type.Professional,
      role: data.role || "",
      from: (data.from && convertToLocalDate(data.from)) || "",
      to: (data.to && convertToLocalDate(data.to)) || "",
      userId: data.userId || undefined,
      tasks: data.tasks || [{ value: "" }],
    },
  });

  useEffect(() => {
    expForm.setValue("id", data.id);
  }, [data]);

  const { fields, append, remove } = useFieldArray({
    control: expForm.control,
    name: "tasks",
  });

  return (
    <div>
      <Form {...expForm}>
        <form onSubmit={expForm.handleSubmit(saveExperience)}>
          <div className="space-y-6">
            <FormField
              control={expForm.control}
              name="companyName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ex. Neflick, India"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={expForm.control}
              name="role"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:[&>*]:w-full gap-4">
              <FormField
                control={expForm.control}
                name="from"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>From</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={expForm.control}
                name="to"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <FormLabel>Tasks</FormLabel>
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={expForm.control}
                name={`tasks.${index}.value`}
                render={({ field }) => (
                  <FormItem className="flex w-full items-center gap-4">
                    <div className="w-full">
                      <FormControl>
                        <Textarea
                          className="resize-none"
                          {...field}
                          placeholder="Describe the task you performed while working there...."
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                    <CustomButton
                      type="button"
                      onClick={() => {
                        if (fields.length === 1) {
                          return append({ value: "" });
                        }
                        return remove(index);
                      }}
                    >
                      {fields.length === 1 && (
                        <div className="flex items-center gap-2">
                          Task
                          <Add />
                        </div>
                      )}
                      {fields.length === 2 && (
                        <div className="flex items-center gap-2">
                          Task
                          <Delete />
                        </div>
                      )}
                    </CustomButton>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="flex gap-4 mt-8">
            <ToolTip
              onSubmit={expForm.handleSubmit(saveExperience)}
              type={"submit"}
              icon={<Save />}
              btnLoading={btnLoading}
              text={"Save / update experience"}
            />
            {expList.length <= 2 && (
              <ToolTip
                onClick={addExperience}
                icon={<Add />}
                text={"Add more experiences"}
              />
            )}
            <ToolTip
              onClick={() => deleteExperience(data)}
              icon={<Delete />}
              text={"Delete this experiences"}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ExperienceForm;
