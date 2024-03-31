import React from "react";
import Image from "next/image";
import Link from "next/link";
interface ProfileLinkProps {
  imgUrl: string;
  title: string;
  href?: string;
}

const ProfileLink = ({ imgUrl, href, title }: ProfileLinkProps) => {
  return (
    <div className="flex items-center gap-1">
      <Image src={imgUrl} width={20} height={20} alt={title} />
      {href ? (
        <Link
          href={href}
          target="_blank"
          className="paragraph-medium text-accent-blue "
        >
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700 mt-1">{title}</p>
      )}
      <div></div>
    </div>
  );
};

export default ProfileLink;
