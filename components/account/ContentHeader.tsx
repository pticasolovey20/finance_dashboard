interface IContentHeaderProps {
  title: string;
  description: string;
}

const ContentHeader = ({ title, description }: IContentHeaderProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ContentHeader;
