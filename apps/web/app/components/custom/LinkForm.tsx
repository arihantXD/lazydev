"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Link, linkSchema } from "@repo/schema";
import { useForm } from "react-hook-form";
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
import ToolTip from "./ToolTip";
import Add from "../icons/Add";
import Delete from "../icons/Delete";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Save from "../icons/Save";
import { useEffect } from "react";

const LinkForm = ({
  data,
  linkList,
  addLink,
  saveLink,
  deleteLink,
  btnLoading,
  index,
}: {
  data: z.infer<typeof linkSchema>;
  linkList: z.infer<typeof linkSchema>[];
  addLink: () => void;
  saveLink: (data: z.infer<typeof linkSchema>) => void;
  deleteLink: (data: z.infer<typeof linkSchema>) => void;
  btnLoading: boolean;
  index: number;
}) => {
  const linkForm = useForm<z.infer<typeof linkSchema>>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      id: data.id || undefined,
      title: data.title || "",
      url: data.url || "",
      userId: data.userId || undefined,
      index: index,
    },
  });

  useEffect(() => {
    linkForm.setValue("id", data.id);
  }, [data]);

  return (
    <div>
      <Form {...linkForm}>
        <form onSubmit={linkForm.handleSubmit(saveLink)}>
          <div className="space-y-6 sm:space-y-0 sm:flex sm:items-center sm:[&>*]:w-full sm:gap-4">
            <FormField
              control={linkForm.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Social Links</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Social Link" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={Link.GitHub}>GitHub</SelectItem>
                          <SelectItem value={Link.LinkedIn}>
                            LinkedIn
                          </SelectItem>
                          <SelectItem value={Link.Facebook}>
                            Facebook
                          </SelectItem>
                          <SelectItem value={Link.Instagram}>
                            Instagram
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={linkForm.control}
              name="url"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ex. http://localhost:5173"
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
              onSubmit={linkForm.handleSubmit(saveLink)}
              type={"submit"}
              icon={<Save />}
              text={"Save / update link"}
              btnLoading={btnLoading}
            />
            {linkList.length <= 2 && (
              <ToolTip
                onClick={addLink}
                icon={<Add />}
                text={"Add more links"}
              />
            )}
            <ToolTip
              onClick={() => deleteLink(data)}
              icon={<Delete />}
              text={"Delete this link"}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LinkForm;
