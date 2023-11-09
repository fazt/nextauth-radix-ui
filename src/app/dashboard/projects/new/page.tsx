"use client";
import {
  TextField,
  TextArea,
  Button,
  Container,
  Flex,
  Card,
  Heading,
} from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { TrashIcon } from "@radix-ui/react-icons";

function TaskNewPage() {
  const { control, handleSubmit } = useForm({
    values: {
      title: "",
      description: "",
    },
  });
  const router = useRouter();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    if (!params.projectId) {
      const res = await axios.post(`/api/projects`, data);
      if (res.status === 201) {
        router.push(`/dashboard`);
        router.refresh();
      }
    } else {
      console.log("updating");
    }
  });

  return (
    <div>
      <Container size="1" height="100%" className="p-3 md:p-0">
        <Flex className="h-screen w-full items-center">
          <Card className="w-full p-7">
            <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
              <Heading>
                {params.projectId ? "Edit Project" : "New Project"}
              </Heading>
              <label>Project Title</label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField.Input
                      size="3"
                      placeholder="Search the docs…"
                      {...field}
                    />
                  );
                }}
              />

              <label>Project Description</label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => {
                  return (
                    <TextArea
                      size="3"
                      placeholder="Reply to comment…"
                      {...field}
                    />
                  );
                }}
              />

              <Button>
                {params.projectId ? "Edit Project" : "Create Project"}
              </Button>
            </form>

            <div className="flex justify-end my-4">
              {params.projectId && (
                <Button color="red">
                  <TrashIcon />
                  Delete Project
                </Button>
              )}
            </div>
          </Card>
        </Flex>
      </Container>
    </div>
  );
}

export default TaskNewPage;
