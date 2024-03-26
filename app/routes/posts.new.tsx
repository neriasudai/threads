import { useAuth } from "@clerk/remix";
import { Form, Link, json, useActionData, useHref } from "@remix-run/react";
import { Input } from "~/components/Input";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import type { InsertPost as PostType } from "~/lib/schema";
import { insertPost } from "~/lib/turso";
import { parseWithZod } from "@conform-to/zod";
import {
  SubmissionResult,
  getFormProps,
  getInputProps,
  useForm,
} from "@conform-to/react";
import { postSchema } from "~/utils/postValidation";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  const submission = parseWithZod(body, { schema: postSchema });

  if (submission.status !== "success") {
    console.log(submission.reply());
    return json(submission.reply());
  }

  const { title, content, userId } = submission.value;

  await insertPost(title, content, userId);

  return redirect("/posts");
}

export default function NewPosts() {
  const lastResult = useActionData<typeof action>();

  const { userId } = useAuth();

  const [form, fields] = useForm({
    id: "example",
    lastResult: lastResult as SubmissionResult<string[]> | null | undefined,
    onValidate({ formData }) {
      const validate = parseWithZod(formData, {
        schema: postSchema,
      });

      // console.log("validate", validate);

      return validate;
    },

    shouldRevalidate: "onBlur",
  });
  if (!userId) {
    return null;
  }
  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-primary">New Post</h1>
      <Form
        {...getFormProps(form)}
        method="POST"
        className="w-3/5 border-2 rounded-md flex flex-col gap-4 p-4 bg-card"
      >
        <Input
          placeholder="Title"
          {...getInputProps(fields.title, { type: "text" })}
          errors={fields.title.errors}
        />
        <Input
          placeholder="Post Content"
          {...getInputProps(fields.content, { type: "text" })}
          errors={fields.content.errors}
        />
        <input
          {...getInputProps(fields.userId, { type: "hidden" })}
          value={userId}
        />
        <button type="submit" className="btn btn-info" disabled={!form.valid}>
          Submit
        </button>
      </Form>
    </div>
  );
}
