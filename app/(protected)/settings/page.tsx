import SectionWrapper from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

const SettingsPage = () => {
  return (
    <div className="max-w-[800px] w-full flex flex-col mt-10 md:mt-12 mx-auto">
      <SectionWrapper
        sectionTitle="Theme"
        sectionDescription="Choose between light and dark mode to match your preferences"
        classNames="gap-4"
      >
        <Card className="rounded-lg">
          <CardContent className="flex items-center justify-end p-4">
            <ThemeSwitcher />
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
};

export default SettingsPage;
