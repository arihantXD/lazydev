"use client";

import { convertToLocalDate } from "@/util/convertDateToString";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceSchema, Type } from "@repo/schema";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import CustomButton from "./CustomButton";
import Add from "../icons/Add";
import Delete from "../icons/Delete";
import ToolTip from "./ToolTip";
import Save from "../icons/Save";
import { useEffect } from "react";

const ProjectForm = ({
  data,
  projectList,
  addProject,
  saveProject,
  deleteProject,
  btnLoading,
  index,
}: {
  data: z.infer<typeof experienceSchema>;
  projectList: z.infer<typeof experienceSchema>[];
  addProject: () => void;
  saveProject: (data: z.infer<typeof experienceSchema>) => void;
  deleteProject: (data: z.infer<typeof experienceSchema>) => void;
  btnLoading: boolean;
  index: number;
}) => {
  const projectForm = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      id: data.id || undefined,
      index: index,
      companyName: data.companyName || "",
      about: data.about || "",
      type: Type.Personal,
      from: (data.from && convertToLocalDate(data.from)) || "",
      to: (data.to && convertToLocalDate(data.to)) || "",
      userId: data.userId || undefined,
      tasks: data.tasks || [{ value: "" }],
      gitHubLink: data.gitHubLink || "",
      liveLink: data.liveLink || "",
    },
  });

  useEffect(() => {
    projectForm.setValue("id", data.id);
  }, [data]);

  const { fields, append, remove } = useFieldArray({
    control: projectForm.control,
    name: "tasks",
  });

  return (
    <div>
      <Form {...projectForm}>
        <form onSubmit={projectForm.handleSubmit(saveProject)}>
          <div className="space-y-6">
            <FormField
              control={projectForm.control}
              name="companyName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ex. AI based Poha and Jalebi Reviewer"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={projectForm.control}
              name="about"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none"
                        {...field}
                        placeholder="Ex. Upload the Poha and Jalebi Pictures and based on LLM trained data model it gives rating levels from Edible to Vomit level"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="flex flex-col sm:flex-row sm:items-center sm:[&>*]:w-full gap-4">
              <FormField
                control={projectForm.control}
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
                control={projectForm.control}
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
            <FormField
              control={projectForm.control}
              name="gitHubLink"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      Git Hub Link
                      <span className="text-light-gray text-xs">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ex. http://panipuri.github.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={projectForm.control}
              name="liveLink"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      Live Link
                      <span className="text-light-gray text-xs">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ex. http://panipuri.livelink.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormLabel>Tasks</FormLabel>
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={projectForm.control}
                name={`tasks.${index}.value`}
                render={({ field }) => (
                  <FormItem className="flex w-full items-center gap-4">
                    <div className="w-full">
                      <FormControl>
                        <Textarea
                          className="resize-none"
                          {...field}
                          placeholder="Describe the task you performed while working on this project"
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
              onSubmit={projectForm.handleSubmit(saveProject)}
              type={"submit"}
              btnLoading={btnLoading}
              icon={<Save />}
              text={"Save / update project"}
            />
            {projectList.length <= 2 && (
              <ToolTip
                onClick={addProject}
                icon={<Add />}
                text={"Add more projects"}
              />
            )}
            <ToolTip
              onClick={() => deleteProject(data)}
              icon={<Delete />}
              text={"Delete this project"}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectForm;
