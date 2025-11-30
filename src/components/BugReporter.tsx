"use client";

import { useState, useEffect } from "react";
import { Bug, X, Send, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface BugReportFormData {
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  userEmail: string;
}

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = typeof window !== "undefined" ? localStorage.getItem("bearer_token") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Get browser info
const getBrowserInfo = (): string => {
  if (typeof window === "undefined") return "Unknown";
  
  const ua = navigator.userAgent;
  let browserName = "Unknown";
  let browserVersion = "";
  let osName = "Unknown";
  
  // Detect browser
  if (ua.includes("Firefox/")) {
    browserName = "Firefox";
    browserVersion = ua.match(/Firefox\/(\d+\.\d+)/)?.[1] || "";
  } else if (ua.includes("Chrome/") && !ua.includes("Edg/")) {
    browserName = "Chrome";
    browserVersion = ua.match(/Chrome\/(\d+\.\d+)/)?.[1] || "";
  } else if (ua.includes("Safari/") && !ua.includes("Chrome")) {
    browserName = "Safari";
    browserVersion = ua.match(/Version\/(\d+\.\d+)/)?.[1] || "";
  } else if (ua.includes("Edg/")) {
    browserName = "Edge";
    browserVersion = ua.match(/Edg\/(\d+\.\d+)/)?.[1] || "";
  }
  
  // Detect OS
  if (ua.includes("Windows")) {
    osName = ua.includes("Windows NT 10") ? "Windows 10/11" : "Windows";
  } else if (ua.includes("Mac OS X")) {
    const version = ua.match(/Mac OS X (\d+[._]\d+)/)?.[1]?.replace("_", ".");
    osName = version ? `macOS ${version}` : "macOS";
  } else if (ua.includes("Linux")) {
    osName = "Linux";
  } else if (ua.includes("Android")) {
    osName = "Android";
  } else if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad")) {
    osName = "iOS";
  }
  
  return `${browserName} ${browserVersion} / ${osName}`;
};

// Rate limit tracking in localStorage
const RATE_LIMIT_KEY = "bug_report_last_submit";

const checkLocalRateLimit = (): { allowed: boolean; waitSeconds: number } => {
  const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
  if (!lastSubmit) return { allowed: true, waitSeconds: 0 };
  
  const timeSince = Date.now() - parseInt(lastSubmit, 10);
  const waitTime = 60 * 1000; // 1 minute
  
  if (timeSince < waitTime) {
    return { allowed: false, waitSeconds: Math.ceil((waitTime - timeSince) / 1000) };
  }
  
  return { allowed: true, waitSeconds: 0 };
};

const setLocalRateLimit = () => {
  localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
};

export function BugReporter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<BugReportFormData>({
    title: "",
    description: "",
    severity: "medium",
    userEmail: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BugReportFormData, string>>>({});

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      // Wait for animation to complete
      const timer = setTimeout(() => {
        setFormData({
          title: "",
          description: "",
          severity: "medium",
          userEmail: "",
        });
        setErrors({});
        setIsSuccess(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BugReportFormData, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Please provide more details (at least 20 characters)";
    }
    
    if (formData.userEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
      newErrors.userEmail = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Check local rate limit first
    const rateLimit = checkLocalRateLimit();
    if (!rateLimit.allowed) {
      toast.error(`Please wait ${rateLimit.waitSeconds} seconds before submitting another report.`);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/db/bug-reports", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
          severity: formData.severity,
          pageUrl: typeof window !== "undefined" ? window.location.pathname : "",
          browserInfo: getBrowserInfo(),
          userEmail: formData.userEmail.trim() || null,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setLocalRateLimit();
        setIsSuccess(true);
        toast.success("Bug report submitted successfully! Thank you for your feedback.");
        
        // Close dialog after showing success state
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      } else if (response.status === 429) {
        // Rate limited
        toast.error(data.error || "Too many reports. Please try again later.");
      } else {
        toast.error(data.error || "Failed to submit bug report. Please try again.");
      }
    } catch (error) {
      console.error("Failed to submit bug report:", error);
      toast.error("Failed to submit bug report. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const severityOptions = [
    { value: "low", label: "Low", description: "Minor issue, cosmetic", color: "text-blue-600" },
    { value: "medium", label: "Medium", description: "Inconvenient but workable", color: "text-yellow-600" },
    { value: "high", label: "High", description: "Significant impact", color: "text-orange-600" },
    { value: "critical", label: "Critical", description: "Blocking, can't proceed", color: "text-red-600" },
  ];

  return (
    <>
      {/* Floating Button - positioned above mobile nav on small screens */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-4 z-30 flex items-center gap-2 px-4 py-2.5 bg-muted hover:bg-muted/80 border border-border rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 group"
        aria-label="Report a bug"
      >
        <Bug className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors hidden sm:inline">
          Report Bug
        </span>
      </button>

      {/* Bug Report Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          {isSuccess ? (
            // Success State
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
              <p className="text-muted-foreground">
                Your bug report has been submitted successfully. We appreciate your feedback!
              </p>
            </div>
          ) : (
            // Form State
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Bug className="w-5 h-5" />
                  Report a Bug
                </DialogTitle>
                <DialogDescription>
                  Help us improve by reporting any issues you encounter. Your feedback is valuable!
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="bug-title">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="bug-title"
                    placeholder="Brief summary of the issue..."
                    value={formData.title}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, title: e.target.value }));
                      if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
                    }}
                    className={errors.title ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="bug-description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="bug-description"
                    placeholder="Please describe what happened, what you expected, and steps to reproduce..."
                    value={formData.description}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, description: e.target.value }));
                      if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
                    }}
                    className={`min-h-[120px] ${errors.description ? "border-destructive" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Severity */}
                <div className="space-y-2">
                  <Label>Severity</Label>
                  <Select
                    value={formData.severity}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value as BugReportFormData["severity"] }))}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      {severityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${option.color}`}>{option.label}</span>
                            <span className="text-muted-foreground text-xs">
                              - {option.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Email (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="bug-email">
                    Email <span className="text-muted-foreground text-xs">(optional)</span>
                  </Label>
                  <Input
                    id="bug-email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.userEmail}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, userEmail: e.target.value }));
                      if (errors.userEmail) setErrors(prev => ({ ...prev, userEmail: undefined }));
                    }}
                    className={errors.userEmail ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-muted-foreground">
                    We&apos;ll only use this to follow up on your report if needed.
                  </p>
                  {errors.userEmail && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.userEmail}
                    </p>
                  )}
                </div>

                {/* Auto-detected info */}
                <div className="rounded-lg bg-muted/50 p-3 space-y-1.5 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground text-sm mb-2">Auto-detected information:</p>
                  <p>
                    <span className="font-medium">Page:</span>{" "}
                    {typeof window !== "undefined" ? window.location.pathname : "..."}
                  </p>
                  <p>
                    <span className="font-medium">Browser:</span> {getBrowserInfo()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Report
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
