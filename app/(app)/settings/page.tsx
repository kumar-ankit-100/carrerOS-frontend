"use client";
import { Topbar } from "@/components/layout/topbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-auth";
import { useUpdateProfile, useUpdatePreferences } from "@/hooks/use-user";
import {
  useConnectIntegration,
  useDisconnectIntegration,
  useIntegrations,
} from "@/hooks/use-integrations";

const providerLabels: Record<string, { name: string; desc: string }> = {
  linkedin: { name: "LinkedIn", desc: "Sync applications and conversations." },
  gmail: { name: "Gmail", desc: "Detect recruiter outreach and schedule." },
  google_calendar: { name: "Google Calendar", desc: "Mirror interviews to your calendar." },
  slack: { name: "Slack", desc: "Notify yourself on follow-up reminders." },
};

const PROVIDERS = ["linkedin", "gmail", "google_calendar", "slack"];

export default function SettingsPage() {
  const { data: user } = useCurrentUser();
  const updateProfile = useUpdateProfile();
  const updatePrefs = useUpdatePreferences();
  const integrationsQ = useIntegrations();
  const connect = useConnectIntegration();
  const disconnect = useDisconnectIntegration();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [roleFocus, setRoleFocus] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.fullName ?? "");
      setEmail(user.email ?? "");
      setRoleFocus(user.roleFocus ?? "");
    }
  }, [user]);

  const prefs = user?.preferences ?? {
    emailDigests: true,
    browserNotifications: true,
    compactDensity: false,
    autoCapture: true,
  };

  return (
    <>
      <Topbar title="Settings" subtitle="Manage your account, preferences, and integrations" />
      <div className="p-6 lg:p-8 max-w-3xl">
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6 space-y-6">
            <Section title="Profile" desc="Your personal information and account details.">
              <div className="flex items-center gap-4">
                <Avatar name={fullName || "—"} size={56} />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Upload</Button>
                  <Button variant="ghost" size="sm">Remove</Button>
                </div>
              </div>
              <Row label="Full name">
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </Row>
              <Row label="Email">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </Row>
              <Row label="Role focus">
                <Input value={roleFocus} onChange={(e) => setRoleFocus(e.target.value)} />
              </Row>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  disabled={updateProfile.isPending}
                  onClick={() =>
                    updateProfile.mutate({ fullName, email, roleFocus })
                  }
                >
                  {updateProfile.isPending ? "Saving…" : "Save changes"}
                </Button>
              </div>
            </Section>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6 space-y-6">
            <Section title="Preferences" desc="Notifications, theme, and workspace defaults.">
              <Toggle
                label="Email digests"
                desc="Weekly summary of your pipeline and metrics."
                checked={prefs.emailDigests}
                onChange={(v) => updatePrefs.mutate({ emailDigests: v })}
              />
              <Toggle
                label="Browser notifications"
                desc="Get notified when recruiters reply or interviews update."
                checked={prefs.browserNotifications}
                onChange={(v) => updatePrefs.mutate({ browserNotifications: v })}
              />
              <Toggle
                label="Compact density"
                desc="Tighter spacing for dense workflows."
                checked={prefs.compactDensity}
                onChange={(v) => updatePrefs.mutate({ compactDensity: v })}
              />
              <Toggle
                label="Auto-capture from extension"
                desc="Add new applications to pipeline automatically."
                checked={prefs.autoCapture}
                onChange={(v) => updatePrefs.mutate({ autoCapture: v })}
              />
            </Section>
          </TabsContent>

          <TabsContent value="integrations" className="mt-6 space-y-6">
            <Section title="Integrations" desc="Connect external tools to InterviewWala.">
              {PROVIDERS.map((p) => {
                const meta = providerLabels[p];
                const integ = integrationsQ.data?.find((i) => i.provider === p);
                const connected = integ?.status === "connected";
                return (
                  <div
                    key={p}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <div className="text-sm font-medium">{meta.name}</div>
                      <div className="text-xs text-muted-foreground">{meta.desc}</div>
                    </div>
                    {connected ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => disconnect.mutate(p)}
                        disabled={disconnect.isPending}
                      >
                        Disconnect
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => connect.mutate(p)}
                        disabled={connect.isPending}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                );
              })}
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
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-border last:border-0">
      <div className="pr-4">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
