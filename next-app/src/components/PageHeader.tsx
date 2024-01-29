import React, { FC } from "react";

interface PageHeaderProps {
  title: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title }) => {
  return (
    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
  );
};

export default PageHeader;
