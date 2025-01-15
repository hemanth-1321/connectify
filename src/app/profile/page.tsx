import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { profile } from "@/app/actions/userProfile/route";
import { getUserDetails } from "@/lib/session";
import { Activity, MessageSquare, Users } from "lucide-react";
import { redirect } from "next/navigation";
import { DialogDemo } from "../../components/Dialogbox";
export default async function () {
  const session = await getUserDetails();
  if (!session) {
    redirect("/");
  }
  const user = await profile(session?.user.id);

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="relative">
          <div className="h-48 rounded-xl bg-gradient-to-r from-chart-1 via-chart-2 to-chart-4 animate-gradient" />
          <div className="absolute -bottom-16 left-8 flex items-end space-x-4">
            <div className="relative">
              <img
                src={user?.profileImg || "./avatar.png"}
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background bg-black dark:bg-white"
              />
            </div>
          </div>
          <div className="flex absolute bottom-4 right-4 space-x-2">
            <DialogDemo />

            <Button size="sm">
              <Users className="w-4 h-4 mr-2" />
              Follow
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20">
          <Card className="p-6 mt-8 space-y-4">
            <div className="pb-4">
              <h1 className="text-2xl font-bold">{user.fullname}</h1>
              <p className="text-muted-foreground">
                Digital Explorer • Web3 Enthusiast
              </p>
            </div>
          </Card>

          <Card className="p-6 space-y-4 md:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold">2.4K</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div>
                <p className="text-2xl font-bold">1.2K</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
              <div>
                <p className="text-2xl font-bold">485</p>
                <p className="text-sm text-muted-foreground">Posts</p>
              </div>
              <div>
                <p className="text-2xl font-bold">12K</p>
                <p className="text-sm text-muted-foreground">Likes</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Bio and Links */}
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="font-semibold">About Me</h3>
            <p className="text-muted-foreground">
              Digital nomad exploring the intersection of technology and
              creativity. Building the future of web experiences one pixel at a
              time. Always learning, always growing. 🚀
            </p>
            <Separator />
          </div>
        </Card>
      </div>
    </main>
  );
}
