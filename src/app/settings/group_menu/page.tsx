import Navbar from "../../../components/Navbar";
import GroupMenuSection from "@/components/GroupMenuSection";

export default function GroupMenuPage() {
  return (
    <Navbar>
      <div className="max-w-3xl mx-auto py-8">
        <GroupMenuSection />
      </div>
    </Navbar>
  );
}