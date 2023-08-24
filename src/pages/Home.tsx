import BasicLayout from "@/layout/BasicLayout";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <BasicLayout>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            description: "Your message has been sent.",
          });
        }}
      >
        Show Toast
      </Button>
    </BasicLayout>
  );
};

export default Home;
