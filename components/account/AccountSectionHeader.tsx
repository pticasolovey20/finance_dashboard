interface IAccountSectionHeaderProps {
  title: string;
  description?: string;
}

const AccountSectionHeader = ({
  title,
  description,
}: IAccountSectionHeaderProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>

      {description && (
        <p className="text-base text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default AccountSectionHeader;
