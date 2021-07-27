import CommonLayout from "./CommonLayout";

interface ITemplate {
  title: string;
  hideBreak?: boolean;
  customBgColor?: string;
}

function Template({ title, hideBreak, customBgColor }: ITemplate) {
  return (
    <CommonLayout title={title} hideBreak={hideBreak} customBgColor={customBgColor}>
      <div className="topDiv"></div>
    </CommonLayout>
  );
}

export default Template;
