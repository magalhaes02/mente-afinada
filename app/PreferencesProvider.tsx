"use client";

import { useEffect } from "react";
import { applyToDocument, readPreferences } from "./lib/preferencias";

export default function PreferencesProvider() {
  useEffect(() => {
    applyToDocument(readPreferences());
  }, []);
  return null;
}
