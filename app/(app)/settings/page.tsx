import { Topbar } from "@/components/layout/topbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";

export default function SettingsPage() {
  return (
    <>
      <Topbar title="Settings" subtitle="Manage your account, preferences, and integrations" />
      <div className="p-6 lg:p-8 max-w-3xl">
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6 space-y-6">
            <Section title="Profile" desc="Your personal information and account details.">
              <div className="flex items-center gap-4">
                <Avatar name="Ankit Sharma" size={56} />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Upload</Button>
                  <Button variant="ghost" size="sm">Remove</Button>
                </div>
              </div>
              <Row label="Full name">
                <Input defaultValue="Ankit Sharma" />
              </Row>
              <Row label="Email">
                <Input defaultValue="ankit@careeros.app" />
              </Row>
              <Row label="Role focus">
                <Input defaultValue="Backend Engineer" />
              </Row>
              <div className="flex justify-end">
                <Button size="sm">Save changes</Button>
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6 space-y-6">
            <Section title="Preferences" desc="Notifications, theme, and workspace defaults.">
              <Toggle label="Email digests" desc="Weekly summary of your pipeline and metrics." defaultChecked />
              <Toggle label="Browser notifications" desc="Get notified when recruiters reply or interviews update." defaultChecked />
              <Toggle label="Compact density" desc="Tighter spacing for dense workflows." />
              <Toggle label="Auto-capture from extension" desc="Add new applications to pipeline automatically." defaultChecked />
            </Section>
          </TabsContent>

          <TabsContent value="integrations" className="mt-6 space-y-6">
            <Section title="Integrations" desc="Connect external tools to CareerOS.">
              {[
                { n: "LinkedIn", d: "Sync applications and conversations." },
                { n: "Gmail", d: "Detect recruiter outreach and schedule." },
                { n: "Google Calendar", d: "Mirror interviews to your calendar." },
                { n: "Slack", d: "Notify yourself on follow-up reminders." },
              ].map((i) => (
                <div key={i.n} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <div className="text-sm font-medium">{i.n}</div>
                    <div className="text-xs text-muted-foreground">{i.d}</div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              ))}
            </Section>
          </TabsContent>

          <TabsContent value="billing" className="mt-6 space-y-6">
            <Section title="Billing" desc="Manage your subscription.">
              <div className="rounded-lg border border-border p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Pro plan · $12/month</div>
                  <div className="text-xs text-muted-foreground">Renews on June 14, 2026</div>
                </div>
                <Button size="sm" variant="outline">Manage</Button>
              </div>
              <Separator />
              <div className="text-xs text-muted-foreground">
                Need an invoice or VAT receipt? Contact billing@careeros.app.
              </div>
            </Section>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-6 space-y-5">
      <div>
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <label className="text-sm text-muted-foreground">{label}</label>
      <div className="col-span-2">{children}</div>
    </div>
  );
}

function Toggle({
  label,
  desc,
  defaultChecked,
}: {
  label: string;
  desc: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-border last:border-0">
      <div className="pr-4">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
