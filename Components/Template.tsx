import CommonLayout from "./CommonLayout";

interface ITemplate {
  title: string;
  hideBreak?: boolean;
}

function Template({ title, hideBreak }: ITemplate) {
  return (
    <CommonLayout title={title} hideBreak={hideBreak}>
      <div className="topDiv"></div>
    </CommonLayout>
  );
}

export default Template;
