"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { UpcomingEvents } from "@/components/calendar/UpcomingEvents";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageContainer } from "@/components/ui/PageContainer";
import { PageHeader } from "@/components/ui/PageHeader";

export function CalendarView() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Schedule"
        title="Calendar"
        description="May 2026 — plan focus blocks and meetings at a glance."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="lg:col-span-3" padding="lg" hover>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">May 2026</h3>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" aria-label="Previous month">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" aria-label="Next month">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CalendarGrid />
        </GlassCard>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold text-foreground">
            Upcoming events
          </h3>
          <UpcomingEvents />
        </div>
      </div>
    </PageContainer>
  );
}
