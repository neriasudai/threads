import { addCommentToPost, getPost } from "~/lib/turso";
import { useAuth } from "@clerk/remix";
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
  json,
  redirect,
  useParams,
} from "@remix-run/react";
import { Input } from "~/components/Input";
import {
  SubmissionResult,
  getFormProps,
  getInputProps,
  useForm,
} from "@conform-to/react";
import { commentSchema } from "~/utils/postValidation";
import { parseWithZod } from "@conform-to/zod";
import { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  console.log("body", body);
  const submission = parseWithZod(body, { schema: commentSchema });

  console.log("submission", submission);

  if (submission.status !== "success") {
    console.log(submission.reply());
    return json(submission.reply());
  }

  const { title, content, userId, postId } = submission.value;

  await addCommentToPost(title, content, userId, postId);

  return redirect(`/posts/${postId}/comments`);
}
export default function Comment() {
  const { id } = useParams();
  console.log("postId", id);
  const { isSignedIn, userId } = useAuth();
  const fetcher = useFetcher();
  const lastResult = useActionData<typeof action>();

  const [form, fields] = useForm({
    id: "submit-comment",
    lastResult: lastResult as SubmissionResult<string[]> | null | undefined,
    onValidate({ formData }) {
      const validate = parseWithZod(formData, {
        schema: commentSchema,
      });

      console.log("validate", validate);

      return validate;
    },
  });
  return (
    <div className="container p-2 border-red-300 border-2 mt-4">
      <h1 className="text-3xl font-bold text-primary">Add Comment</h1>
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
          placeholder="Content"
          {...getInputProps(fields.content, { type: "text" })}
          errors={fields.content.errors}
        />
        <input
          {...getInputProps(fields.userId, { type: "hidden" })}
          value={userId || ""}
        />
        <input
          {...getInputProps(fields.postId, { type: "hidden" })}
          value={id}
        />
        <button type="submit" className="btn btn-info" disabled={!form.valid}>
          Submit
        </button>
      </Form>
    </div>
  );
}
