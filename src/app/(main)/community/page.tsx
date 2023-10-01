import { Icon } from "@/lib/db/schema/icons";
import Image from "next/image";

export const metadata = {
  title: "Community Icons",
  description: "Generated by create next app",
  icons: {
    icon: "/next.svg",
  },
};

export default async function Page() {
  // const icons = api.icons.getCommunityIcons.useQuery();
  const icons = { data: [] };

  return (
    <div>
      <h1 className="text-4xl">Community Icons</h1>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
        {icons.data?.map((icon: Icon) => (
          <li key={icon.id}>
            <Image
              className="w-full rounded-lg"
              width="100"
              height="100"
              alt={icon.prompt ?? "an image of an icon"}
              src={`https://icon-generator-course.s3.amazonaws.com/${icon.id}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
