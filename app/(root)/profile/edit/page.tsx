import { EditProfileForm } from "@/components/shared/Form/EditProfileForm";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const EditProfilePage = async () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("user not logged in");
  }
  const mongoUser = await getUserById({ userId });
  return (
    <div>
      <h1 className="text-dark100_light900 h1-bold"> ویرایش پروفایل</h1>
      <EditProfileForm mongoUser={JSON.stringify(mongoUser)} />
    </div>
  );
};

export default EditProfilePage;
