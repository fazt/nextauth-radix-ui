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

function TaskNewPage() {
  const { control, handleSubmit } = useForm({
    values: {
        title: '',
        description: ''
    }
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <div>
      <Container size="1" height="100%" className="p-3 md:p-0">
        <Flex className="h-screen w-full items-center">
          <Card className="w-full p-7">
            <form className="flex flex-col gap-y-2" onSubmit={onSubmit}>
              <Heading>Create Project</Heading>
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

              <Button>Create Project</Button>
            </form>
          </Card>
        </Flex>
      </Container>
    </div>
  );
}

export default TaskNewPage;
