import CommonLayout from "./CommonLayout";

interface ITemplate {
  title: string;
}

function Template({ title }: ITemplate) {
  return (
    <CommonLayout title={title}>
      <div className="topDiv"></div>
    </CommonLayout>
  );
}

export default Template;
