"use client";
import {
  GoogleAnalytics as GoogleAnalyticsComponent,
  usePageViews,
} from "nextjs-google-analytics";

export default function GoogleAnalytics(): JSX.Element {
  usePageViews({ gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID });

  return <GoogleAnalyticsComponent trackPageViews={true} />;
}
