import React from "react";

const Layout = ({
  children,
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center ">
      {children}
    </div>
  );
};

export default Layout;
