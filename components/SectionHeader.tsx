interface ISectionHeaderProps {
  title: string;
  description?: string;
}

const SectionHeader = ({ title, description }: ISectionHeaderProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>

      {description && (
        <p className="text-base text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default SectionHeader;
