import Image from "next/image";
import Link from "next/link";
import Tag from "../Tag/Tag";
import { getTopInteractedTags } from "@/lib/actions/tag.action";
interface PropType {
  userData: {
    name: string;
    username: string;
    picture: string;
    _id: string;
    clerkId: string;
  };
}
export default async function UserCard({ userData }: PropType) {
  const { name, username, picture, clerkId, _id } = userData;
  const interactedTags = await getTopInteractedTags({ userId: _id });
  return (
    <Link
      href={`/profile/${clerkId}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article
        className="background-light900_dark200 light-border
   flex w-full flex-col items-center
   justify-center gap-2 rounded-2xl border p-8 "
      >
        <Image
          src={picture}
          alt={username}
          width={100}
          height={100}
          className="rounded-[50%]"
        />
        <h3 className="h3-bold text-dark200_light900 line-clamp-1">{name}</h3>
        <h2 dir="ltr" className="body-regular text-dark500_light500  ">
          @{` ${username}`}
        </h2>
        <div className="mt-1 flex items-center gap-2">
          {interactedTags!.length > 0 ? (
            interactedTags!.map((tag: any) => {
              return (
                <div key={tag._id}>
                  <Tag text={tag.name} showScore={false} url="/" />
                </div>
              );
            })
          ) : (
            <div>تگ ندارد</div>
          )}
        </div>
      </article>
    </Link>
  );
}
