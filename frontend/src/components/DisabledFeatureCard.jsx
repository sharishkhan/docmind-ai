import { Lock } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function DisabledFeatureCard({ title, icon: Icon }) {
  return (
    <Card className="p-6 opacity-70">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <Lock className="h-4 w-4 text-muted" aria-hidden="true" />
        </div>
        <CardTitle className="pt-4">{title}</CardTitle>
        <CardDescription>
          Available after document processing.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
