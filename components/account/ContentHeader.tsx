interface IContentHeaderProps {
  title: string;
  description?: string;
}

const ContentHeader = ({ title, description }: IContentHeaderProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>

      {description && (
        <p className="text-base text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default ContentHeader;
