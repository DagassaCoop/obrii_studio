"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/foundation/button";
import { Input } from "@/components/ui/foundation/input";
import { Label } from "@/components/ui/foundation/label";
import { Textarea } from "@/components/ui/foundation/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/foundation/select";
import { useState } from "react";
import { Mail, Send } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <Mail className="h-7 w-7 text-foreground/60" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {isSubmitted ? (
          <div className="rounded-xl border border-white/10 bg-card/50 p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <Send className="h-7 w-7 text-emerald-400" />
            </div>
            <p className="text-xl font-semibold">{t("form.success")}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-8 rounded-xl border border-white/5 bg-card/50 p-8 backdrop-blur-sm sm:p-10"
          >
            {/* Name & Email */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{t("form.name")}</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  className="border-white/10 bg-white/5 focus:border-white/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("form.email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="border-white/10 bg-white/5 focus:border-white/20"
                />
              </div>
            </div>

            {/* Project Type */}
            <div className="space-y-2">
              <Label>{t("form.projectType")}</Label>
              <Select name="projectType" required>
                <SelectTrigger className="border-white/10 bg-white/5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">
                    {t("form.projectTypes.video")}
                  </SelectItem>
                  <SelectItem value="social">
                    {t("form.projectTypes.social")}
                  </SelectItem>
                  <SelectItem value="smm">
                    {t("form.projectTypes.smm")}
                  </SelectItem>
                  <SelectItem value="bundle">
                    {t("form.projectTypes.bundle")}
                  </SelectItem>
                  <SelectItem value="other">
                    {t("form.projectTypes.other")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Budget & Timeline */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>{t("form.budget")}</Label>
                <Select name="budget">
                  <SelectTrigger className="border-white/10 bg-white/5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">
                      {t("form.budgetRanges.starter")}
                    </SelectItem>
                    <SelectItem value="mid">
                      {t("form.budgetRanges.mid")}
                    </SelectItem>
                    <SelectItem value="premium">
                      {t("form.budgetRanges.premium")}
                    </SelectItem>
                    <SelectItem value="enterprise">
                      {t("form.budgetRanges.enterprise")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{t("form.timeline")}</Label>
                <Select name="timeline">
                  <SelectTrigger className="border-white/10 bg-white/5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">
                      {t("form.timelines.urgent")}
                    </SelectItem>
                    <SelectItem value="normal">
                      {t("form.timelines.normal")}
                    </SelectItem>
                    <SelectItem value="relaxed">
                      {t("form.timelines.relaxed")}
                    </SelectItem>
                    <SelectItem value="flexible">
                      {t("form.timelines.flexible")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">{t("form.description")}</Label>
              <Textarea
                id="description"
                name="description"
                rows={5}
                placeholder={t("form.descriptionPlaceholder")}
                className="border-white/10 bg-white/5 focus:border-white/20 resize-none"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("form.sending") : t("form.submit")}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
