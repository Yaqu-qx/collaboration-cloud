export const fetchProjects = async (
  value: string,
  isRecommend: boolean = false,
) =>
  fetch(
    `http://localhost:4000/projects?project_name=${value}&isRecommend=${isRecommend}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

export const fetchProjectsByTags = async (tags: string[]) =>
  fetch(
    `http://localhost:4000/projects?tags=${tags.join(",")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
