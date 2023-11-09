"use client";

import { Project } from "@prisma/client";
import { Card, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

interface Props {
  project: Project;
}

function ProjectCard({ project }: Props) {
  const router = useRouter();

  return (
    <Card
      key={project.id}
      className="hover:cursor-pointer hover:opacity-90"
      onClick={() => router.push(`/dashboard/projects/${project.id}`)}
    >
      <Heading>{project.title}</Heading>
      <Text className="text-slate-500">{project.description}</Text>
    </Card>
  );
}

export default ProjectCard;
