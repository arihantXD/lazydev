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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Save from "../icons/Save";
import ToolTip from "./ToolTip";
import Add from "../icons/Add";
import Delete from "../icons/Delete";
import { Textarea } from "../ui/textarea";
import { statSchema } from "@repo/schema";
import { useEffect } from "react";

const StatsForm = ({
  data,
  statsList,
  addStats,
  saveStats,
  deleteStats,
  btnLoading,
  index,
}: {
  data: z.infer<typeof statSchema>;
  statsList: z.infer<typeof statSchema>[];
  addStats: () => void;
  saveStats: (data: z.infer<typeof statSchema>) => void;
  deleteStats: (data: z.infer<typeof statSchema>) => void;
  btnLoading: boolean;
  index: number;
}) => {
  const statsForm = useForm<z.infer<typeof statSchema>>({
    resolver: zodResolver(statSchema),
    defaultValues: {
      id: data.id || undefined,
      title: data.title || "",
      about: data.about || "",
      userId: data.userId || undefined,
      index: index,
    },
  });

  useEffect(() => {
    statsForm.setValue("id", data.id);
  }, [data]);

  return (
    <div>
      <Form {...statsForm}>
        <form onSubmit={statsForm.handleSubmit(saveStats)}>
          <div className="space-y-6">
            <FormField
              control={statsForm.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Achivement</FormLabel>
                    <FormControl>
                      <Input
                        className="resize-none"
                        {...field}
                        placeholder="Ex. Serial Eater"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={statsForm.control}
              name="about"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="resize-none"
                        placeholder="Ex. Ate Poha 4 KGs in 2 Hrs. straight"
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
              onSubmit={statsForm.handleSubmit(saveStats)}
              type={"submit"}
              icon={<Save />}
              btnLoading={btnLoading}
              text={"Save / update stats"}
            />
            {statsList.length <= 2 && (
              <ToolTip
                onClick={addStats}
                icon={<Add />}
                text={"Add more stats"}
              />
            )}
            <ToolTip
              onClick={() => deleteStats(data)}
              icon={<Delete />}
              text={"Delete this stats"}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StatsForm;
