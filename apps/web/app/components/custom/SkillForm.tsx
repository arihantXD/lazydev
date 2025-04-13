"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { skillSchema } from "@repo/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Save from "../icons/Save";
import ToolTip from "./ToolTip";
import Add from "../icons/Add";
import Delete from "../icons/Delete";
import { useEffect } from "react";

const SkillForm = ({
  data,
  skillList,
  addSkill,
  saveSkill,
  deleteSkill,
  btnLoading,
  index,
}: {
  data: z.infer<typeof skillSchema>;
  skillList: z.infer<typeof skillSchema>[];
  addSkill: () => void;
  saveSkill: (data: z.infer<typeof skillSchema>) => void;
  deleteSkill: (data: z.infer<typeof skillSchema>) => void;
  btnLoading: boolean;
  index: number;
}) => {
  const skillForm = useForm<z.infer<typeof skillSchema>>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      index: index,
      id: data.id || undefined,
      skills: data.skills || "",
      title: data.title || "",
      userId: data.userId || undefined,
    },
  });

  useEffect(() => {
    skillForm.setValue("id", data.id);
  }, [data]);

  return (
    <div>
      <Form {...skillForm}>
        <form onSubmit={skillForm.handleSubmit(saveSkill)}>
          <div className="space-y-6">
            <FormField
              control={skillForm.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        className="resize-none"
                        {...field}
                        placeholder="Ex. Fronted Developer"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={skillForm.control}
              name="skills"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ex. HTML, CSS, JavaScript "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="flex gap-4 mt-8">
            <ToolTip
              onSubmit={skillForm.handleSubmit(saveSkill)}
              type={"submit"}
              btnLoading={btnLoading}
              icon={<Save />}
              text={"Save / update skill"}
            />
            {skillList.length <= 2 && (
              <ToolTip
                onClick={addSkill}
                icon={<Add />}
                text={"Add more skills"}
              />
            )}
            <ToolTip
              onClick={() => deleteSkill(data)}
              icon={<Delete />}
              text={"Delete this skill"}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SkillForm;
